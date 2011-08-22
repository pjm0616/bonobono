
if (typeof window == 'undefined') {
	var sys = require('sys');
	var print = function(s) { return sys.print(JSON.stringify(s) + '\n') };
	var listparser = require('./listparser.js')
} else {
	var exports = window;
	var print = function(s) { alert(s); };
	var listparser = {listparse: listparse};
}


function format_listtree(t) {
	switch (t.type) {
	case 'list':
		var list = t.list;
		var buf = '[';
		for(i in list) {
			buf += format_listtree(list[i]) + ', ';
		}
		buf += ']';
		return buf;
	case 'number':
		return t.value;
	case 'symbol':
		return t.symbol;
	case 'literal':
		return '"' + t.literal + '"';
	}
}
function print_listtree(t) {
	sys.print(format_listtree(t) + '\n');
}

function format_lang(t) {
	switch (t.type) {
	case 'Abs':
		return '(lambda ' + JSON.stringify(t.vars) + ' ' + format_lang(t.body) + ')';
	case 'App':
		var buf = '(' + format_lang(t.func) + ' ';
		for (i in t.args) {
			buf += format_lang(t.args[i]) + ' ';
		}
		buf += ')';
		return buf;
	case 'Var':
		return t.name;
	case 'Number':
		return t.value;
	case 'Bool':
		return t.value;
	case 'String':
		return '"' + t.data + '"';
	case 'If':
		return 'If(' + format_lang(t.cond) + ', ' + format_lang(t.trueexpr) + ', ' + format_lang(t.falseexpr) + ')';
	default:
		return '???';
	}
}
function printlang(t) {
	sys.print(format_lang(t) + '\n');
}


var parse_lang;
(function() {
	function error(t, msg) {
		var pos = '(' + t.pos[0] + ', ' + t.pos[1] + ')';
		var msg = 'parsing error at ' + pos + ': ' + msg;
		throw msg;
	}

	function check_type(t, exp) {
		if (t.type != exp) {
			error(t, 'expected ' + exp + ', got ' + t.type);
		}
	}
	function check(expr, expected, msg) {
		if (expr != expected) {
			if(!msg) {
				msg = 'expected ' + expected + ', got ' + expr;
			}
			error(null, msg);
		}
	}

	function parse_app(t) {
		//check_type(t, 'list');
		var list = t.list;

		var func = parse_lang(list[0])
		var args = [];
		var targlist = list.slice(1)
		for (i in targlist) {
			args[args.length] = parse_lang(targlist[i])
		}

		return {type: 'App', func: func, args: args};
	}
	function parse_lambda(t) {
		//check_type(t, 'list');
		var list = t.list;
		check(list.length, 3, 'list.length is not 3')
		//check_type(list[0], 'symbol'); check(list[0].symbol, 'lambda');

		// parse variable list
		check_type(list[1], 'list');
		var vars = []
		var tvarlist = list[1].list
		for (i in tvarlist) {
			var elem = tvarlist[i]
			check_type(elem, 'symbol');
			vars[vars.length] = elem.symbol;
		}

		body = parse_lang(list[2])
		return {type: 'Abs', vars: vars, body: body};
	}
	function parse_let(t) {
		//check_type(t, 'list');
		var list = t.list;
		check(list.length, 3, 'list.length is not 3');
		//check_type(list[0], 'symbol'); check(list[0].symbol, 'let');

		// parse (var expr) list
		var varname, expr;
		check_type(list[1], 'list');
		{
			var list2 = list[1].list;
			check(list2.length, 2, 'list.length is not 2');
			check_type(list2[0], 'symbol');

			varname = list2[0].symbol;
			expr = parse_lang(list2[1]);
		}

		var body = parse_lang(list[2]);
		return {type: 'Let', varname: varname, expr: expr, body: body};
	}
	function parse_letrec(t) {
		var res = parse_let(t);
		res.type = 'LetRec';
		check_type(res.expr, 'Abs');
		return res;
	}

	function parse_if(t) {
		var list = t.list;
		check(list.length, 4, 'list.length is not 4');

		var cond = parse_lang(list[1]);
		var trueexpr = parse_lang(list[2]);
		var falseexpr = parse_lang(list[3]);
		return {type: 'If', cond: cond, trueexpr: trueexpr, falseexpr: falseexpr};
	}

	var parsers = {
		'number': function(t) {
			return {type: 'Number', value: t.value, pos: t.pos};
		},
		'symbol': function(t) {
			var sym = t.symbol;
			if (sym == 'true' || sym == 'false') {
				var value = (sym == 'true') ? true : false;
				return {type: 'Bool', value: value, pos: t.pos};
			}
			return {type: 'Var', name: sym, pos: t.pos};
		},
		'literal': function(t) {
			return {type: 'String', data: t.string, pos: t.pos};
		},
		'list': function(t) {
			var list = t.list;
			var len = list.length;
			if (len == 0) {
				_parser_error('empty list');
			}

			var first = list[0];
			if (first.type == 'symbol') {
				var sym = first.symbol;
				if (sym == 'lambda') {
					return parse_lambda(t);
				} else if (sym == 'let') {
					return parse_let(t);
				} else if (sym == 'letrec') {
					return parse_letrec(t);
				} else if (sym == 'if') {
					return parse_if(t);
				}
			}

			return parse_app(t);
		}
	};

	parse_lang = function(t) {
		parser = parsers[t.type];
		return parser(t);
	}
})();

function parse(inp) {
	list = listparser.listparse(inp);
	return parse_lang(list);
}

exports.parse = parse;
exports.format_lang = format_lang;
exports.printlang = printlang;

/*
var inp = '((lambda (n1 n2) (+ n1 n2)) 4 2)'
list = listparser.listparse(inp);
expr = parse_lang(list);
printlang(expr);
//*/


