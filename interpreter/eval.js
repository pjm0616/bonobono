
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

function Interp() {
	this.store = {};
	this.global_env = {};
	this.init();
}
Interp.prototype.init = function() {
	this.global_env['add'] = native_func(function(interp, args) { return args[0] + args[1]; });
	this.global_env['sub'] = native_func(function(interp, args) { return args[0] - args[1]; });
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
		throw 'getenv: no such name: ' + name;
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
	'Var': function(self, t, e, k) {
		return function() { return self.apply_k(k, self.getenv(e, t.name)); };
	},
	'Abs': function(self, t, e, k) {
		print('Abs')
		return function() { return self.apply_k(k, {type: 'Func', vars: t.vars, body: t.body, env: e}); };
	},
	'NativeFunc': function(self, t, e, k) {
		null=5;
		return t;
	},
	'App': function(self, t, e, k) {
		print('App')
		cont = {type: 'Continuation', name: 'AppArgCont', origargs: t.args, args: [],
			eval_nextarg: function() {
				print('AppArgCont.eval_nextarg')
				var argcont = this;
				if (this.origargs.length == 0) {
					return function() {
						return self.eval_k(t.func, e, {type: 'Continuation', name: 'AppCont',
							apply: function(result) {
								print('AppCont.apply')
								print(result)
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
				print('AppArgCont.apply')
				this.args[this.args.length] = result;
				this.origargs = this.origargs.slice(1);
				return this.eval_nextarg();
			}
		};
		return cont.eval_nextarg();
	}
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
	return k.apply(v)
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
var inp = '((lambda (n1 n2) (add n1 n2)) 4.3 2.1)'
t = parser.parse(inp);
var interp = new Interp();
//try {
	r = interp.eval(t);
	print(r)
/*} catch (e) {
	print(e)
}*/
//*/


