var curStart = 0;
var curEnd = 0;
var ohiQ = Array(0,0,0,0,0,0);
var ohiTimeout = 0;
var ohiStatus = document.createElement('a');

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
	tmp.innerHTML = code.innerHTML;
	moveInput();
	highlight();
}
function moveInput() {
	var input = $('#input')[0];
	var code = $('#orgCode')[0].innerHTML.substr(0, curStart).replace(/[ㄱ-ㅎ가-힣]/gi, 'aa');
	pos = Math.max(code.lastIndexOf(' '), code.lastIndexOf('\n'), code.lastIndexOf('('), code.lastIndexOf(')')) + 1;
	input.value = code.substr(pos);
	var coord = curPosition2coord();
	$('#input').css('left', coord[0] - (input.value.length * 8) + 8);
	$('#input').css('top', coord[1]);
	$('#cursur').css('left', coord[0] + 8);
	$('#cursur').css('top', coord[1] - 3);
}
function curPosition2coord() {
	var code = $('#orgCode')[0].innerHTML.substr(0, curStart).replace(/[ㄱ-ㅎㅏ-ㅢ가-힣]/g, '\t\t');
	var line = 0;
	var col = 0;
	rest = 0;
	while(code) {
		tmp = code.indexOf('\n');
		col = code.length;
		if (tmp <= 46 && tmp >= 0) 
			code = code.substr(tmp + 1);
		else {
			if (code[45] == '\t' && code[46] == '\t')
				code = code.substr(45);
			else
				code = code.substr(46);
		}
		line += 1;
	}
	return [(col) * 8 + 800, (line) * 16 + 46];
}

function ohiDoubleJamo(a,c,d) {
	var i, a=Array( // Double Jamos
			Array(Array(1,7,18,21,24),1,7,18,21,24), // Cho
			Array(Array(39,44,49),Array(31,32,51),Array(35,36,51),51), // Jung
			Array(Array(1,4,9,18,21),Array(1,21),Array(24,30),Array(1,17,18,21,28,29,30),Array(0,21),21))[a]; // Jong
	for (i=a[0].length; c!=a[0][i-1]; i--) if (!i) return i;
	for (a=a[i], i=a.length||1; 1; i--) if (!i || d==a || d==a[i-1]) return i;
}

function ohiInsert(m,c) { // Insert
	console.log('insert : ' + m + ' ' + curStart + ' ' + curEnd + ' ' + ohiQ);
	if (m == 'En') {
		var f = $('#orgCode')[0];
		var endText = f.innerHTML.substr(curEnd,f.value.length);
		f.innerHTML = f.innerHTML.substr(0, curStart) + String.fromCharCode(c);
		f.innerHTML += endText;
		curStart += 1;
		curEnd = curStart;
		moveInput();
		reHilight();
		return false;
	}
	if (!c && ohiQ=='0,0,0,0,0,0') return true;
	if (c.length!=6) ohiQ=Array(0,0,0,0,0,0);
	else {
		var m=m||'0,0,0,0,0,0', i=c[0]+c[1], j=c[2]+c[3], k=c[4]+c[5];
		c=i&&j?0xac00+(i-(i<3?1:i<5?2:i<10?4:i<20?11:12))*588+(j-31)*28+k-(k<8?0:k<19?1:k<25?2:3):0x3130+(i||j||k);
	}
	if (document.selection) { // IE
		var s = document.selection.createRange(), t=s.text;
		if (t && document.selection.clear) document.selection.clear();
		s.text=(m=='0,0,0,0,0,0'||c&&t.length>1?'':t)+String.fromCharCode(c);
		if (!c || !m || s.moveStart('character',-1)) s.select();
	}
	else if (curEnd + 1) {
		if (m!='0,0,0,0,0,0' && curEnd-curStart==1) curStart++;
		var e=document.createEvent('KeyboardEvent');
		if (e.initKeyEvent) { // Gecko
			e.initKeyEvent('keypress',0,0,null,0,0,0,0,127,c);
			if (c && f.dispatchEvent(e) && m) curStart--;
		}else { // Chrome
			var f = $('#orgCode')[0];
			var endText = f.innerHTML.substr(curEnd,f.value.length);
			f.innerHTML = f.innerHTML.substr(0, curStart) + String.fromCharCode(c);
			f.innerHTML += endText;
			curEnd = curStart + 1;
			curStart += m?0:1;
		}
	}
	moveInput();
	reHilight();
	return false;
}

function ohiHangul2(c) { // 2-Bulsik
	console.log('hangul : ' + c + ' ' + curStart + ' ' + curEnd + ' ' + ohiQ);
	if (c<65 || (c-1)%32>25) ohiInsert(0,c);
	else if ((c=Array(17,48,26,23,7,9,30,39,33,35,31,51,49,44,32,36,18,1,4,21,37,29,24,28,43,27)[c%32-1]
				+(c==79||c==80?2:c==69||c==81||c==82||c==84||c==87?1:0))<31) { // Jaum
		if ((!ohiQ[5] || !(ohiQ[0]=-1)) && ohiQ[2]) ohiQ[5]=ohiDoubleJamo(2,ohiQ[4],c);
		if (!ohiQ[2] || ohiQ[0]<0 || ohiQ[0] && (!ohiQ[4] || !ohiQ[5]) && (ohiQ[4] || c==8 || c==19 || c==25))
			ohiInsert((ohiQ=(ohiQ[1]||ohiQ[2]||!ohiDoubleJamo(0,ohiQ[0],c))?ohiQ:0),ohiQ=Array(c,ohiQ?0:1,0,0,0,0));
		else if (!ohiQ[0] && (ohiQ[0]=c) || (ohiQ[4]=ohiQ[4]||c)) ohiInsert(0,ohiQ);
		if (ohiQ[5]) ohiQ[5]=c;
	}
	else { // Moum
		if ((!ohiQ[3] || ohiQ[4] || !(ohiQ[2]=-1)) && !ohiQ[4]) ohiQ[3]=ohiDoubleJamo(1,ohiQ[2],c);
		if ((ohiQ[0] && ohiQ[2]>0 && ohiQ[4]) && (ohiQ[5] || !(ohiQ[5]=ohiQ[4]) || !(ohiQ[4]=0))) {
			ohiInsert(0,Array(ohiQ[0],ohiQ[1],ohiQ[2],ohiQ[3],ohiQ[4],0));
			ohiInsert(ohiQ,ohiQ=Array(ohiQ[5],0,c,0,0,0));
		}
		else if ((!ohiQ[0] || ohiQ[2]) && (!ohiQ[3] || ohiQ[4]) || ohiQ[2]<0) ohiInsert(ohiQ,ohiQ=Array(0,0,c,0,0,0));
		else if (ohiQ[2]=ohiQ[2]||c) ohiInsert(0,ohiQ);
	}
}

function ohiKeypress(e) {
	var e=e||window.event, c=e.which||e.which==0?e.which:e.keyCode;
	var i=0, kbd=ohiStatus.innerHTML.substr(3), swaped=Array();
	if (kbd=='QWERTZ') swaped=Array(89,90,90,89,121,122,122,121);
	if (c==32 && e.shiftKey) { // Toggle
		if (ohiQ[0]||ohiQ[1]||ohiQ[2]||ohiQ[3]||ohiQ[4]||ohiQ[5]) {
			curStart += 1;
			console.log('adsf');
			moveInput();
		}
		ohiQ = Array(0,0,0,0,0,0);
		ohiStart('Ko') + ohiStatus.innerHTML.substr(2);
		if (e.preventDefault) e.preventDefault();
		return false;
	}
	if (ohiStatus.innerHTML.substr(0,2)!='En' && c>32 && c<127 && e.keyCode<127 && !e.altKey && !e.ctrlKey) {
		if (c>64 && c<91 && !e.shiftKey) c+=32;
		if (c>96 && c<123 && e.shiftKey) c-=32;
		if (curEnd - curStart !=1) ohiQ=Array(0,0,0,0,0,0);
		while (swaped[i] && swaped[i]!=c) i+=2;
		if (i!=swaped.length) c=swaped[i+1];
		if (ohiStatus.innerHTML.substr(0,2)=='Ko') ohiHangul2(c);
	}
	else if (ohiStatus.innerHTML.substr(0,2) == 'En' || c == 32)
	{
		if (ohiQ[0]||ohiQ[1]||ohiQ[2]||ohiQ[3]||ohiQ[4]||ohiQ[5]) {
			curStart +=1;
			moveInput();
		}
		ohiQ = Array(0,0,0,0,0,0);
		ohiInsert("En", c);
	}
	if (e.preventDefault) e.preventDefault();
	return false;
}

function ohiKeydown(e) {
	var e=e||window.event;
	if (e.keyCode==8 && (ohiQ[1] || ohiQ[3] || ohiQ[0] && ohiQ[2])) { // Backspace
		for (var i=5; !ohiQ[i];) i--;
		ohiInsert(ohiQ[i]=0,ohiQ);
		if (e.preventDefault) e.preventDefault();
		return false;
	}
	else if (e.keyCode == 8)
	{
		var code = $('#orgCode')[0];
		if (curStart == curEnd) {
			code.innerHTML = code.innerHTML.substr(0, curStart - 1) + code.innerHTML.substr(curEnd);
			curStart -= curStart > 0?1:0;
		}
		else
			code.innerHTML = code.innerHTML.substr(0, curStart) + code.innerHTML.substr(curEnd);
		curEnd = curStart;
		console.log('backspace' + curStart +' '+curEnd);
		moveInput();
		reHilight();
		return false;
	}
	else if (e.keyCode == 37)
	{
		curStart -= curStart > 0?1:0;
		if (!e.shiftKey)
			curEnd = curStart
		moveInput();
		return false;
	}
	else if (e.keyCode == 39)
	{
		curEnd += curEnd < $('#orgCode')[0].innerHTML.length ?1:0;
		if (!e.shiftKey)
			curStart = curEnd;
		moveInput();
		return false;
	}
	console.log(e.keyCode);
}

function ohiStart(l) {
	if (typeof(l)=='string') {
		var kbd=ohiStatus.innerHTML.substr(2);
		if (l=='KBD') ohiStatus.innerHTML = ohiStatus.innerHTML.substr(0,2)+(!kbd?':QWERTZ':kbd==':QWERTZ'?':AZERTY':'');
		else ohiStatus.innerHTML = ((l=='En'||l==ohiStatus.innerHTML)?'En':l.substr(0,2))+kbd;
	}
	if (document.body) {
		if (document.all) {
			ohiStatus.style.position = 'absolute';
			ohiStatus.style.right = -(document.body.scrollLeft||document.documentElement.scrollLeft)+'px';
			ohiStatus.style.bottom = -(document.body.scrollTop||document.documentElement.scrollTop)+'px';
			if (ohiTimeout) clearTimeout(ohiTimeout);
			ohiTimeout = setTimeout("ohiStart()",100);
		}
		if (document.body!=ohiStatus.parentNode) {
			if (!ohiStatus.style.position) {
				ohiStatus.style.position = 'fixed';
				ohiStatus.style.right = '0px';
				ohiStatus.style.bottom = '0px';
			}
			ohiStatus.target = '_blank';
			ohiStatus.href = 'http://ohi.kr/';
			ohiStatus.style.fontFamily = 'GulimChe,monospace';
			ohiStatus.style.fontWeight = 'normal';
			ohiStatus.style.color = 'white';
			ohiStatus.style.backgroundColor = 'royalblue';
			ohiStatus.style.fontSize = '10pt';
			ohiStatus.style.lineHeight = '10pt';
			ohiStatus.style.zIndex = '255';
			document.body.appendChild(ohiStatus);
			for (var i=0; i<window.frames.length; i++) {
				var ohi = document.createElement('script');
				ohi.type= 'text/javascript';
				ohi.src = 'http://ohi.kr/ohi.js';
				if (typeof(window.frames[i].document)!='unknown') window.frames[i].document.body.appendChild(ohi);
			}
		}
	}
	else ohiTimeout = setTimeout("ohiStart()",100);
}

ohiStart('En');
