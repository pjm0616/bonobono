
if (typeof window === 'undefined') {
	var sys = require('sys');
	var print = function(s) { return sys.print(JSON.stringify(s) + '\n') };
	var logmsg = print;
	var parser = require('./parser.js')
	var parse = parser.parse;
} else {
	var exports = window;
	var print = function(s) { alert(s); };
}

function loadlibs(interp) {
	var set_global = function(name, value) {
		interp.set_global(name, value);
	};
	var add_func = function(name, func) {
		set_global(name, interp.eval(parse(func)));
	};
	var add_native_func = function(name, func) {
		set_global(name, interp.make_native_func(func));
	};

	var load_etc = function() {
		add_func('loop',
			'(lambda (func n)'+
				'(letrec (loop (lambda (n)'+
					'(if (gt n 0)'+
						'(begin (func n) (loop (sub n 1)))'+
						'0)))'+
					'(loop n)))'
		);
		add_func('infloop',
			'(lambda (func)'+
				'(letrec (loop (lambda ()'+
					'(begin (func) (loop))))'+
					'(loop)))'
		);
	};

	var load_math = function() {
		add_native_func('floor', function(interp, args) {
			return Math.floor(args[0]);
		});
	};

	var load_list = function() {
		add_native_func('list-new', function(interp, args) {
			return args;
		});
		add_native_func('list-get', function(interp, args) {
			return args[0][args[1]];
		});
		add_native_func('list-set', function(interp, args) {
			return args[0][args[1]] = args[2];
		});
		add_native_func('list-len', function(interp, args) {
			return args[0].length;
		});
		add_func('forloop-step',
			'(lambda (start end step func)'+
				'(letrec (loop (lambda (n)'+
					'(begin'+
						'(func n)'+
						'(if (eq n end)'+
							'0'+
							'(loop (add n step))) )))'+
					'(loop start)))'
		);
		add_func('forloop',
			'(lambda (start end func) (forloop-step start end 1 func))'
		);
		add_func('list-foreach',
			'(lambda (lst func)'+
				'(forloop 0 (sub (list-len lst) 1)'+
					'(lambda (n)'+
						'(func (list-get lst n)))))'
		);
	};

	load_etc();
	load_math();
	load_list();
}

exports.loadlibs = loadlibs;


