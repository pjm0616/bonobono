
if (typeof window === 'undefined') {
	var sys = require('sys');
	var print = function(s) { return sys.print(JSON.stringify(s) + '\n') };
} else {
	var exports = window;
	var print = function(s) { alert(s); };
}

function Lexer(inp) {
	this.inp = inp;

	this.pos = 0;
	this.srcpos = [1, 1]; // current porition in the input
	this.ch = '';

	this.token_srcpos = [1, 1]; // current token's position in the input
	this.state = 'start';
	this.buf = ''

	this.tokens = [];
}
Lexer.prototype.next = function() {
	if (this.ch != '') {
		if (this.ch == '\n') {
			this.srcpos = [this.srcpos[0] + 1, 1];
		} else {
			this.srcpos = [this.srcpos[0], this.srcpos[1] + 1];
		}
	}
	this.ch = this.inp.charAt(this.pos);
	this.pos += 1;
	return this.ch
};
Lexer.prototype.append_token = function(tok) {
	var t = {
		token: tok,
		data: this.buf,
		pos: this.token_srcpos
	};
	this.tokens[this.tokens.length] = t;
};
Lexer.prototype.error = function(msg) {
	var msg = 'lex error: (' + this.srcpos[0] + ', ' + this.srcpos[1] + '): ' + msg;
	throw msg;
};
Lexer.prototype.lex = function() {
	do {
		var ch = this.next();
		this.step(ch);
	} while(ch);
	return this.tokens;
};
Lexer.prototype.step = function(ch) {
	if (this.state == 'start') {
		this.token_srcpos = this.srcpos;
		this.buf = '';
		if (ch == '' || ' \t\n'.indexOf(ch) >= 0) {
		} else if ('()'.indexOf(ch) >= 0) {
			this.append_token(ch)
		} else if (',.<>?/:[]{\\|`~!@#$%^&*_='.indexOf(ch) >= 0
				|| (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
			this.state = 'symbol';
			this.buf += ch;
		} else if ((ch >= '0' && ch <= '9') || '+-'.indexOf(ch) >= 0) {
			this.state = 'number';
			this.buf += ch;
		} else if (ch == '"') {
			this.state = 'literal';
		} else {
			this.error('invalid token: ' + ch)
		}
	} else if (this.state == 'symbol') {
		if (',.<>?/:[]{}\\|`~!@#$%^&*-_=+'.indexOf(ch) >= 0
				|| (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
			this.buf += ch;
		} else {
			this.append_token('symbol');
			this.state = 'start';
			return this.step(ch);
		}
	} else if (this.state == 'number') {
		if ((ch >= '0' && ch <= '9') || ch == '.') {
			this.buf += ch;
		} else {
			this.buf = parseFloat(this.buf);
			this.append_token('number');
			this.state = 'start';
			return this.step(ch);
		}
	} else if (this.state == 'literal') {
		if (ch == '"') {
			this.append_token('literal');
			this.state = 'start';
		} else if (ch == '\\') {
			var ch = this.next();
			if (ch == '') {
				this.error('invalid escape sequence');
			}
			this.buf += ch;
		} else if (ch == '' || ch == '\n') {
			this.error('unterminated string literal')
		} else {
			this.buf += ch;
		}
	}
};

function lex(inp) {
	return new Lexer(inp).lex()
}

exports.lex = lex;


/*
inp = '(let (v e) "asdf")'
r = new Lexer(inp).lex()
print(r)
//*/

