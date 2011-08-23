var curStart = 0;
var curEnd = 0;

function highlight() {
	SyntaxHighlighter.highlight();
}

function reHilight() {
	var code = $('#orgCode')[0];
	$('#codeArea')[0].removeChild($('#code')[0]);
	var tmp = document.createElement('textarea');
	tmp.id = "code";
	tmp.setAttribute("class", "brush: bn");
	tmp.setAttribute("z-index", 10);
	$('#codeArea')[0].appendChild(tmp);
	tmp.value = code.value;
	moveInput();
	highlight();
}
function moveInput() {
	var input = $('#input')[0];
	input.width = input.value.length * 8;
	var coord = curPosition2coord();
	$('#input').css('left', coord[0] - (input.value.length * 8));
	$('#input').css('top', coord[1]);
	$('#cursur').css('left', coord[0] + 8);
	$('#cursur').css('top', coord[1] - 3);
}
function curPosition2coord() {
	var code = $('#orgCode')[0].value.substr(0, curStart).replace(/[ㄱ-힣]/, 'aa');
	var line = 0;
	var col = 0;
	rest = 0;
	while(rest < curStart) {
		tmp = code.indexOf('\n');
		if (tmp == -1) {
			col += code.length % 48;
			line += Math.floor(code.length / 48);
			break;
		}
		code = code.substr(tmp + 1);
		line += Math.floor(tmp / 48) + 1;
		rest = tmp;
	}
	return [col * 8 + 800, (line + 1) * 16 + 46];
}
function processKey2(e) {
	var code = $('#orgCode')[0];
	var input = $('#input')[0];
	if(window.event) // IE
		keycode = e.keyCode
	else if(e.which) // Netscape/Firefox/Opera
		keycode = e.which

	console.log("down" + keycode);
	switch(keycode) {
	case 8:
		// backspace
		if (curStart == curEnd) {
			code.value = code.value.substr(0, curStart - 1) + code.value.substr(curEnd);
			curStart -= curStart > 1?1:0;
		}
		else
			code.value = code.value.substr(0, curStart) + code.value.substr(curEnd);
		curEnd = curStart;
		reHilight();
		break;
	case 46:
		// del
		if (curStart == curEnd) {
			code.value = code.value.substr(0, curStart) + code.value.substr(curEnd + 1);
			curEnd += curEnd < code.value.length?1:0;
		}
		else
			code.value = code.value.substr(0, curStart) + code.value.substr(curEnd);
		curStart = curEnd;
		reHilight();
		break;
	case 37:
		//left
		curStart -= curStart > 0?1:0;
		if (!e.shiftKey) {
			curEnd = curStart;
		}
		break;
	case 38:
		//up
		break;
	case 39:
		//right
		curEnd += code.value.length > curEnd?1:0;
		if (!e.shiftKey) {
			curStart = curEnd;
		}
		break;
	case 40:
		//down
		break;
	default:
		if ((keycode >= 65 && keycode <= 90) || (keycode >= 48 && keycode <= 57) || keycode == 9 || keycode == 45 || keycode == 91 ||
				(keycode >= 187 &&keycode <= 189) || keycode == 16 || keycode == 32 || keycode == 222 || keycode == 13 || keycode == 229)
			return true;
	}
	moveInput();
}
function processKey(e) {
	var code = $('#orgCode')[0];
	var input = $('#input')[0];
	if(window.event) // IE
		keycode = e.keyCode
	else if(e.which) // Netscape/Firefox/Opera
		keycode = e.which

	console.log(keycode);
	if (keycode >= 37 && keycode < 40) {
		return false;
	}
	if (keycode == 13){
		code.value = code.value.substr(0, curStart) +  "\n" + code.value.substr(curEnd);
	}
	else if (keycode == 40) {
		code.value = code.value.substr(0, curStart) + '( )'+ code.value.substr(curEnd);
	}
	else 
	{
		code.value = code.value.substr(0, curStart) + String.fromCharCode(keycode) + code.value.substr(curEnd);
	}
	curStart += 1;
	curEnd = curStart;
	reHilight();
	if (keycode == 13 || keycode == 32 || keycode == 40 || keycode == 41)
	{
		input.value = "";
		return false;
	}
	return true;
}

