/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		// Copyright 2006 Shin, YoungJin
	
		var datatypes =	'and or eq lt gt add mul sub mod div pow ge le';

		var keywords =	'begin lambda let letrec define if newref getref setref try raise except and or getaddr getvalue';
					
		var functions =	'concat speak print sleep suspend ' +
										'floor random ' +
										'loop forloop-step infloop forloop '+
										'getglobal setglobal ' +
										'start ' +
										'list-new list-get list-set list-len list-foreach ' +
										'dict-set dict-foreach ' +
										'face_left face_right face_red face_eye face_mouth face_sweat face_shake ' + 
										'body_left body_right body_shell body_shake body_arm_shake body_walk';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },			// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// strings
			{ regex: new RegExp("-?[0-9]+\.?[0-9]*", 'gm'), 											css: 'number' },
			{ regex: new RegExp(this.getKeywords(datatypes), 'gm'),		css: 'constants bold' },
			{ regex: new RegExp(this.getKeywords(functions), 'gm'),		css: 'functions bold' },
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword bold' }
			];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['bn'];

	SyntaxHighlighter.brushes.Cpp = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
