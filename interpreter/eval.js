
var sys = require('sys');
var print = function(s) { return sys.print(JSON.stringify(s) + '\n') };

var parser = require('./parser.js')



function Interp(tree) {
	this.tree = tree;
}
Interp.prototype.evalers = {
	'Int': function(t, e, k) {
		
	},
};
Interp.prototype.eval_k = function(t, e, k) {
	
};



