
var sys = require('sys');
var print = function(s) { return sys.print(JSON.stringify(s) + '\n') };

var parser = require('./parser.js')

function Env(parent) {
	this.parent = parent;
	this.name = null;
	this.value = null;
}
Env.prototype.let = function(name, value) {
	this.name = name;
	this.value = value;
}
Env.prototype.get = function(name) {
	if (this.name == name) {
		return this.value;
	} else if (this.parent) {
		return this.parent.get(name);
	} else {
		return null;
	}
}
Env.prototype.extend = function(name, value) {
	var newenv = new Env(this);
	newenv.let(name, value);
	return newenv;
}

function native_func(func) {
	return {type: 'NativeFunc', apply: func};
}

function Scheduler() {
	this.QUANTUM = 30;
	this.queue = [];
	this.reset_counter();
}
Scheduler.prototype.reset_counter = function() {
	this.counter = this.QUANTUM;
}
Scheduler.prototype.add = function(k, v) {
	this.queue[this.queue.length] = {cont: k, cont_res: v};
}
Scheduler.prototype.pop = function(k, v) {
	var s = this.queue[0];
	this.queue = this.queue.slice(1);
	return s;
}
Scheduler.prototype.next = function(k, v) {
	this.add(k, v);
	this.reset_counter();
	return this.pop();
}
Scheduler.prototype.getnext = function(k, v) {
	this.counter -= 1;
	var s = {cont: k, cont_res: v};
	if (this.counter == 0) {
		s = this.next(k, v);
	}
	while (s.cont.name == 'EndCont' && this.queue.length > 0) {
		s = this.pop();
	}
	return s;
}


function Interp() {
	this.store = {};
	this.global_env = {};
	this.sched = new Scheduler();
	this.init();
}
Interp.prototype.init = function() {
	this.global_env['begin'] = native_func(function(interp, args) { return args[args.length - 1]; });
	this.global_env['concat'] = native_func(function(interp, args) { return args.join(''); });
	this.global_env['print'] = native_func(function(interp, args) { print(args[0]); return null; });

	this.global_env['eq'] = native_func(function(interp, args) { return args[0] == args[1]; });
	this.global_env['gt'] = native_func(function(interp, args) { return args[0] > args[1]; });
	this.global_env['ge'] = native_func(function(interp, args) { return args[0] >= args[1]; });
	this.global_env['lt'] = native_func(function(interp, args) { return args[0] < args[1]; });
	this.global_env['le'] = native_func(function(interp, args) { return args[0] <= args[1]; });

	this.global_env['add'] = native_func(function(interp, args) { return args[0] + args[1]; });
	this.global_env['sub'] = native_func(function(interp, args) { return args[0] - args[1]; });
	this.global_env['mul'] = native_func(function(interp, args) { return args[0] * args[1]; });
	this.global_env['mod'] = native_func(function(interp, args) { return args[0] % args[1]; });
}
Interp.prototype.error = function(msg) {
	print(msg);
	null = 1;
	throw msg;
}
Interp.prototype.check_type = function(t, type) {
	if (t.type != type) {
		this.error('Type not matched: expected ' + type + ', got ' + t.type);
	}
}
Interp.prototype.getenv = function(e, name) {
	res = e.get(name);
	if (res == null) {
		res = this.global_env[name];
	}
	if (res == null) {
		this.error('getenv: no such name: ' + name);
	}
	return res;
}
Interp.prototype.evalers = {
	'Number': function(self, t, e, k) {
		return function() { return self.apply_k(k, t.value); };
	},
	'Bool': function(self, t, e, k) {
		return function() { return self.apply_k(k, t.value); };
	},
	'String': function(self, t, e, k) {
		return function() { return self.apply_k(k, t.data); };
	},
	'Var': function(self, t, e, k) {
		return function() { return self.apply_k(k, self.getenv(e, t.name)); };
	},
	'Abs': function(self, t, e, k) {
//		print('Abs')
		return function() { return self.apply_k(k, {type: 'Func', vars: t.vars, body: t.body, env: e}); };
	},
	'App': function(self, t, e, k) {
//		print('App')
		cont = {type: 'Continuation', name: 'AppArgCont', origargs: t.args, args: [],
			eval_nextarg: function() {
//				print('AppArgCont.eval_nextarg')
				var argcont = this;
				if (this.origargs.length == 0) {
					return function() {
						return self.eval_k(t.func, e, {type: 'Continuation', name: 'AppCont',
							apply: function(result) {
//								print('AppCont.apply')
//								print(result)
								return function() { return self.apply_func(result, argcont.args, k); };
							}
						}); 
					};
				} else {
					return function() {
						return self.eval_k(argcont.origargs[0], e, argcont);
					};
				}
			},
			apply: function(result) {
//				print('AppArgCont.apply')
				this.args[this.args.length] = result;
				this.origargs = this.origargs.slice(1);
				return this.eval_nextarg();
			}
		};
		return cont.eval_nextarg();
	},
	'If': function(self, t, e, k) {
//		print('If')
		cont = {type: 'Continuation', name: 'IfCondCont',
			apply: function(result) {
				var expr;
				if(result == true) {
					expr = t.trueexpr;
				} else {
					expr = t.falseexpr;
				}
				return function() { return self.eval_k(expr, e, k); }
			}
		};
		return function() { return self.eval_k(t.cond, e, cont); };
	},
	'Let': function(self, t, e, k) {
		// varname, expr, body
		cont = {type: 'Continuation', name: 'LetCont',
			apply: function(result) {
				var newenv = e.extend(t.varname, result);
				return function() { return self.eval_k(t.body, k); };
			}
		};
		return function() { return self.eval_k(t.expr, cont); };
	},
	'LetRec': function(self, t, e, k) {
		// t: varname, expr, body
		// t.expr: vars, body
		var varname = t.varname;
		var params = t.expr.vars;
		var funcbody = t.expr.body;
		var body = t.body;

		var newenv = new Env(e);
		var func = {type: 'Func', vars: params, body: funcbody, env: newenv};
		newenv.let(varname, func);

		return function() { return self.eval_k(body, newenv, k); };
	},
};
Interp.prototype.apply_func = function(func, args, k) {
	var self = this;
	if (func.type == 'Func') {
		var newenv = func.env;
		for (i in func.vars) {
			var varname = func.vars[i];
			var arg = args[i]
			newenv = newenv.extend(varname, arg);
		}
		return function() { return self.eval_k(func.body, newenv, k); };
	} else if (func.type == 'NativeFunc') {
		return function() {return self.apply_k(k, func.apply(self, args)); };
	} else {
		this.error('invalid function type');
	}
};
Interp.prototype.apply_k = function(k, v) {
	s = this.sched.getnext(k, v);
	return s.cont.apply(s.cont_res);
};
Interp.prototype.eval_k = function(t, e, k) {
	return this.evalers[t.type](this, t, e, k);
};
Interp.prototype.eval = function(t) {
	res = this.eval_k(t, new Env(null), {type: 'continuation', name: 'endcont', apply: function(result) {return result;}});
	while(typeof(res) == 'function') {
//	print('eval loop a')
//	print(typeof(res))
		res = res();
//	print('eval loop b')
//	print(typeof(res))
	}
	return res;
}



//*
//var inp = '((lambda (n1 n2) (add n1 n2)) 4.3 2.1)'
//var inp = '((lambda (n1 n2) (add n1 n2)) (if true 4.3 0) 2.1)'
var inp = '(begin (if true '
					+'(print (concat "PRINT TEST asldkfjasldfasfwioq3coaic " 3))'
					+'0)'
				+'('
					+'(lambda (n1 n2) (add n1 n2))'
					+'(if (gt 0.1 0.2) 4.3 100)'
					+'2.1))';
inp = '((lambda (n)\n'+
'		(letrec (loop (lambda (i)\n'+
'			(if (lt n (mul i i))\n'+
'				true\n'+
'				(if (eq (mod n i) 0)\n'+
'					false\n'+
'					(loop (add i 1))\n'+
'				)\n'+
'			)\n'+
'		))\n'+
'		(loop 2)\n'+
'		)\n'+
'	) 49)';
t = parser.parse(inp);
//parser.printlang(t)
var interp = new Interp();
//try {
	r = interp.eval(t);
	print(r)
/*} catch (e) {
	print(e)
}*/
//*/


