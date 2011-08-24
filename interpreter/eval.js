
if (typeof window === 'undefined') {
	var sys = require('sys');
	var print = function(s) { return sys.print(JSON.stringify(s) + '\n') };
	var logmsg = print;
	var parser = require('./parser.js')
} else {
	var exports = window;
	var print = function(s) { alert(s); };
	var parser = {parse: parse, printlang: printlang};
}

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

function native_func(func, opts) {
	return {type: 'NativeFunc', apply: func, opts: opts};
}

function Scheduler() {
	this.QUANTUM = 30;
	this.queue = [];
	this.reset_counter();
}
Scheduler.prototype.time = function() {
	return new Date().getTime();
}
Scheduler.prototype.reset_counter = function() {
	this.counter = this.QUANTUM;
}
Scheduler.prototype.add_schedule = function(s) {
	this.queue[this.queue.length] = s;
}
Scheduler.prototype.add = function(k, v, opts) {
	if (opts && opts.resume_at && opts.resume_at < 0) {
		throw 'must not happen';
	}
	this.add_schedule({cont: k, cont_res: v, opts: opts});
}
Scheduler.prototype.pop_queue = function() {
	var s = this.queue[0];
	this.queue = this.queue.slice(1);
	return s;
}
Scheduler.prototype.runnable = function(s) {
	var resume_at = 0;
	if (s.opts) {
		resume_at = s.opts.resume_at;
	}
	return !s.suspended && resume_at === 0 || (resume_at > 0 && resume_at <= this.time());
}
Scheduler.prototype.pop = function() {
	var queue = [];
	var min_resume_s = null;
	var suspended_s = null;
	var endcont_res = null;
	while (true) {
		var s = this.pop_queue();
		if (!s) {
			if (queue.length > 0) {
				this.queue = queue;
				// all continuations are sleeping
				if (min_resume_s) {
//					print('Pausing interpreter')
					return {resume_at: min_resume_s.opts.resume_at, s: min_resume_s};
				} else if (suspended_s) {
//					print('Halting interpreter')
					return {cont: Interp.HaltCont, cont_res: null};
				} else {
					throw 'cannot happen; asoi3yhc';
				}
			} else {
				// the queue is empty
				// HACK: return the last EndCont's result
				// FIXME: this should return right result for the thread
				return {cont: Interp.EndCont, cont_res: endcont_res};
			}
		}

		if (this.runnable(s)) {
			if (s.cont.name == 'EndCont') {
				endcont_res = s.cont_res;
				continue;
			}
			if (queue.length > 0) {
				this.queue = this.queue.concat(queue);
			}
			return s;
		} else {
			if (s.opts && typeof (s.opts.resume_at) == 'number') {
				var resume_time = s.opts.resume_at;
				if (min_resume_s === null) {
					min_resume_s = s;
				} else if (resume_time > 0 && resume_time < min_resume_s.opts.resume_at) {
					min_resume_s = s;
				}
			} else if (s.suspended) {
				suspended_s = s;
			} else {
				throw 'cannot happen; a03casf';
			}
			queue[queue.length] = s;
		}
	}
}
Scheduler.prototype.getnext = function(k, v) {
	this.counter -= 1;
	if (this.counter == 0 || k.name == 'EndCont') {
		this.reset_counter();
		this.add(k, v);
		s = this.pop();
	} else {
		var s = {cont: k, cont_res: v};
	}
	return s;
}


function Interp() {
	this.store = {};
	this.global_env = {};
	this.sched = new Scheduler();
	this.running = false;
	this.scheduled_eval = null;
	this.init();
}
Interp.EndCont = {type: 'Continuation', name: 'EndCont',
	apply: function(result) {
		return result;
	}
};
Interp.HaltCont = {type: 'Continuation', name: 'HaltCont',
	apply: function(result) {
		return result;
	}
};
Interp.prototype.init = function() {
	this.global_env['begin'] = native_func(function(interp, args) { return args[args.length - 1]; });
	this.global_env['concat'] = native_func(function(interp, args) { return args.join(''); });
	this.global_env['print'] = native_func(function(interp, args) { print(args[0]); return null; });

	this.global_env['sleep'] = native_func(function(interp, args, state) {
		var resume_at = interp.sched.time() + args[0];
		interp.sched.add(state.cont, null, {resume_at: resume_at});
		state.cont = Interp.EndCont;
		return null;
	});
	this.global_env['suspend'] = native_func(function(interp, args, state) {
		var func = args[0];
		if (func === undefined) {
			throw 'arg1 missing';
		}
		if (func.type != 'NativeFunc') {
			throw 'first argument must be NativeFunc';
		}

		var s = {cont: state.cont, cont_res: null, suspended: true};
		func.apply(interp, args.slice(1), {
			set_return_value: function(value) {
				s.suspended = false;
				s.cont_res = value;
			},
			do_return: function(value) {
				this.set_return_value(value);
				interp.continue_eval('suspend_return')
			}
		});
		interp.sched.add_schedule(s);
		state.cont = Interp.EndCont;
		return null;
	});
	this.global_env['getglobal'] = native_func(function(interp, args, state) {
		var name = args[0];
		return interp.global_env[name];
	});
	this.global_env['setglobal'] = native_func(function(interp, args, state) {
		var name = args[0];
		var value = args[1];
		return interp.global_env[name] = value;
	});

	this.global_env['eq'] = native_func(function(interp, args) { return args[0] == args[1]; });
	this.global_env['ne'] = native_func(function(interp, args) { return args[0] != args[1]; });
	this.global_env['gt'] = native_func(function(interp, args) { return args[0] > args[1]; });
	this.global_env['ge'] = native_func(function(interp, args) { return args[0] >= args[1]; });
	this.global_env['lt'] = native_func(function(interp, args) { return args[0] < args[1]; });
	this.global_env['le'] = native_func(function(interp, args) { return args[0] <= args[1]; });

	this.global_env['add'] = native_func(function(interp, args) { return args[0] + args[1]; });
	this.global_env['sub'] = native_func(function(interp, args) { return args[0] - args[1]; });
	this.global_env['mul'] = native_func(function(interp, args) { return args[0] * args[1]; });
	this.global_env['div'] = native_func(function(interp, args) { return args[0] / args[1]; });
	this.global_env['mod'] = native_func(function(interp, args) { return args[0] % args[1]; });

	this.global_env['not'] = native_func(function(interp, args) { return !args[0]; });
	this.global_env['and'] = native_func(function(interp, args) { return args[0] && args[1]; });
	this.global_env['or'] = native_func(function(interp, args) { return args[0] || args[1]; });

	this.global_env['loop'] = this.eval(parser.parse(
		'(lambda (func n)'+
			'(letrec (loop (lambda (n)'+
				'(if (gt n 0)'+
					'(begin (func n) (loop (sub n 1)))'+
					'0)))'+
				'(loop n)))'
		));
	this.global_env['infloop'] = this.eval(parser.parse(
		'(lambda (func)'+
			'(letrec (loop (lambda ()'+
				'(begin (func) (loop))))'+
				'(loop)))'
		));
}
Interp.prototype.error = function(msg) {
	print(msg);
	throw msg;
}
Interp.prototype.check_type = function(t, type) {
	if (t.type != type) {
		this.error('Type not matched: expected ' + type + ', got ' + t.type);
	}
}
Interp.prototype.getenv = function(e, name) {
	var res = e.get(name);
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
		return function() {
			return self.eval_k(t.func, e, {type: 'Continuation', name: 'AppCont',
				apply: function(result) {
					if (t.args.length == 0 || (result.opts && result.opts.passthru_args === true)) {
						return function() { return self.apply_func(result, [], k, e); };
					} else {
						// evaluate arguments
						cont = {type: 'Continuation', name: 'AppArgCont', origargs: t.args, args: [],
							eval_nextarg: function() {
								var argcont = this;
								if (this.origargs.length == 0) {
									return function() { return self.apply_func(result, argcont.args, k, e); };
								} else {
									return function() { return self.eval_k(argcont.origargs[0], e, argcont); };
								}
							},
							apply: function(result) {
								this.args[this.args.length] = result;
								this.origargs = this.origargs.slice(1);
								return this.eval_nextarg();
							}
						};
						return cont.eval_nextarg();
					}
				}
			}); 
		};
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
				return function() { return self.eval_k(t.body, newenv, k); };
			}
		};
		return function() { return self.eval_k(t.expr, e, cont); };
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
	'Start': function(self, t, e, k) {
		self.sched.add(k, null);
		return function() { return self.eval_k(t.body, e, Interp.EndCont); };
	},
};
Interp.prototype.apply_func = function(func, args, k, env) {
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
		return function() {
			var state = {
				cont: k,
				env: env,
			};
			var res = func.apply(self, args, state);
			return self.apply_k(state.cont, res);
		};
	} else {
		this.error('invalid function type');
	}
};
Interp.prototype.continue_eval = function(called_by) {
	if (this.running) {
//		logmsg('already running')
		return null;
	} else if (this.scheduled_eval) {
//		logmsg('cancelling scheduled eval ' + this.scheduled_eval)
		clearTimeout(this.scheduled_eval);
		this.scheduled_eval = null;
	}
	this.running = true;
//	logmsg('eval start: ' + called_by)
	var s = this.sched.pop();
	var res = this.apply_k_real(s);
	while (typeof res == 'function') {
		res = res();
	}
	this.running = false;
//	logmsg('eval end: ' + called_by)
	return res;
}
Interp.prototype.make_interp_continuation = function() {
	return this.continue_eval.bind(this);
}
Interp.prototype.apply_k = function(k, v) {
	if (k.name == 'HaltCont') {
		// don't reschedule continuations and halt here
		var s = {cont: k, cont_res: v};
	} else {
		var s = this.sched.getnext(k, v);
	}
	return this.apply_k_real(s);
}
Interp.prototype.apply_k_real = function(s) {
	if (s.cont) {
		return s.cont.apply(s.cont_res);
	} else if (s.resume_at) {
//		print('delay: ' +(s.resume_at - this.sched.time()));
//		logmsg('delay: '+(s.resume_at - this.sched.time()))

		var interp = this;
		this.scheduled_eval = setTimeout(function() {
				interp.scheduled_eval = null;
				interp.continue_eval('timeout');
			}, s.resume_at - this.sched.time());
		return null;
	} else {
		// cannot happen
		throw 'Cannot happen';
	}
};
Interp.prototype.eval_k = function(t, e, k) {
	return this.evalers[t.type](this, t, e, k);
};
Interp.prototype.eval = function(t) {
	if (!t) {
		return null;
	}

	var self = this;
	cont = {type: 'Continuation', name: 'EvalCont',
		apply: function(result) {
			return function() { return self.eval_k(t, new Env(null), Interp.EndCont); };
		}
	};
	this.sched.add(cont, null);
	return this.continue_eval('eval');
}


/*
var interp = new Interp();

//var inp = '((lambda (n1 n2) (add n1 n2)) 4.3 2.1)'
//var inp = '((lambda (n1 n2) (add n1 n2)) (if true 4.3 0) 2.1)'
var inp = '(begin (if true '
					+'(print (concat "PRINT TEST asldkfjasldfasfwioq3coaic " 3 " " (add 1 2.4)))'
					+'(print "FALSE"))'
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
inp = '(letrec (loop (lambda (v)\n' +
			'(if (eq v 0)' +
				'0' +
				'(add v (loop (sub v 1))))))' +
			'(loop 100000))';
inp = '(letrec (print_number'+
		'(lambda (num)'+
			'(begin'+
//				'(print num)'+
				'(print (concat num "    " (if (eq (mod num 2) 0)  "EVEN"  "ODD")))'+
//				'(sleep 1000)'+
				'(sleep (mul num 100))'+
//				'(sleep (if (eq (mod num 2) 0)  1600  2000))'+
				'(print_number (add num 2)))))'+
		'(begin'+
			'(start (print_number 1))'+
			'(start (print_number 2))))';
xinp = '(begin '+
		'(start (begin (print "a") (sleep 1000) (print "a end")))'+
		'(start (begin (print "b") (sleep 2000) (print "b end"))))'
inp = '(begin'+
			'(print "A")'+
			'(print (concat "ret: \'" (suspend delayed_continue 33) "\' end"))'+
			'(print "B")'+
		')';
inp = '(begin'+
			'(print "a") (sleep 1000) (print "b") (sleep 1000)'+
			'(print "c") (sleep 1000) (print "d") (sleep 1000)'+
		')';
inp = '(begin'+
		'(setglobal "loop2" (getglobal "loop"))'+
		'(setglobal "loop" 0)'+
		'(loop2 (lambda () (print "test")) 4)'+
		')';

interp.global_env['delayed_continue'] = native_func(function(interp, args, state) {
	setTimeout(function() {
		state.set_return_value('arg0 is: ' + args[0] + ' and time is: ' + interp.sched.time());
		interp.continue_eval();
	}, 1000);
});

try {
	t = parser.parse(inp);
} catch (e) {
	print(e)
	return;
}
parser.printlang(t)

try {
	r = interp.eval(t);
	print('eval result: ' + JSON.stringify(r))
//*
} catch (e) {
	print(e)
}
//*/

