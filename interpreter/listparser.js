
if (typeof window === 'undefined') {
	var sys = require('sys');
	var print = function(s) { return sys.print(JSON.stringify(s) + '\n') };
	var lexer = require('./lexer.js');
} else {
	var exports = window;
	var print = function(s) { alert(s); };
	var lexer = {lex: lex};
}

function ListParser(tokens) {
	this.tokens = tokens;
	this.pos = 0;
}

ListParser.prototype.error = function(msg) {
	var pos = this.tokens[(this.pos > 0) ? (this.pos - 1) : (0)];
	var msg = 'parsing error at (' + pos[0] + ', ' + pos[1] + '): ' + msg;
	throw msg;
}

ListParser.prototype.next = function() {
	return this.tokens[this.pos++];
}
ListParser.prototype.current = function() {
	return this.tokens[this.pos];
}

ListParser.prototype.check = function(tok, exp) {
	if (tok.token != exp) {
		this.error('expected ' + exp + ', got ' + tok.token);
	}
}
ListParser.prototype.check_next = function(exp) {
	var tok = this.next();
	this.check(tok, exp);
	return tok;
}
ListParser.prototype.parse = function() {
	var tok = this.current();
	if (tok.token == '(') {
		return this._parse_list();
	} else if (tok.token == 'symbol') {
		return this._parse_symbol();
	} else if (tok.token == 'number') {
		return this._parse_number();
	} else if (tok.token == 'literal') {
		return this._parse_literal();
	}
}
ListParser.prototype._parse_list = function() {
	var tok = this.check_next('(');
	var elems = []
	while (true) {
		if (!this.current()) {
			this.error('unexpected end of list')
		} else if (this.current().token == ')') {
			this.next();
			break;
		}
		var elem = this.parse();
		elems[elems.length] = elem;
	}
	return {type: 'list', list: elems, pos: tok.pos};
}
ListParser.prototype._parse_symbol = function() {
	var tok = this.check_next('symbol');
	return {type: 'symbol', symbol: tok.data, pos: tok.pos};
}
ListParser.prototype._parse_number = function() {
	var tok = this.check_next('number');
	return {type: 'number', value: tok.data, pos: tok.pos};
}
ListParser.prototype._parse_literal = function() {
	var tok = this.check_next('literal');
	return {type: 'literal', string: tok.data, pos: tok.pos};
}

function listparse(inp) {
	var tokens = lexer.lex(inp);
	var res = new ListParser(tokens).parse()
	return res;
}

exports.listparse = listparse;

/*
var inp = '(a (s f) "d dd" f)'
r = listparse(inp);
print(r);
//*/

