SyntaxHighlighter.all();
var code = $('#orgCode')[0], input = $('#input')[0];
$.fx.speeds._default = 500;
jQuery(function($) {
	$(this).everyTime(500, 'cursur', function() {
		$('#cursur').fadeIn(250).fadeOut(250);
	});
});
$(function() {
	$("button").button();
	$("#helpDialog").dialog({
		autoOpen: false,
		show: "blind",
		hide: "blind",
		width: 400,
		height: 600,
		open: (function() {
			$('#helpDialog').load('help.html');
		})
	});
	$("#helpButton").button().click(function() {
		if ($("#helpDialog").dialog("isOpen")) {
			$("#helpDialog").dialog("close");
		}
		else {
			$("#helpDialog").dialog("open");
		}
	});
	$("#clearButton").button().click(function() {
		code.value = "";
		curStart = 0;
		reHilight();
	});
	$('#runButton').button().click(function() {
		var interp = new Interp();
		interp.eval(parse($('#orgCode')[0].value));
	});
	$("#exampleComboBox").combobox({
		selected: function(event, ui) {
								$('#orgCode').load('example/' + $('#exampleComboBox')[0].value);
								curStart = curEnd = 0;
								reHilight();
							}
	});
	var keyword = [
		"loop", "rand", "concat", "speak", "face-left", "face-right",
		"face-red", "face-eye", "face-mouth", "face-sweat", "face-shake",
		"body-left", "body-right", "body-shell", "body-shake", "body-arm-shake",
		"body-walk", "lambda", "begin", "if", "true", "false", "let", "letrec",
		"try", "raise", "except", "newref", "getref", "setref", "and", "or",
		"eq", "lt", "gt", "add", "mul", "sub", "mod", "div", "pow", "print"];
	$('#input').autocomplete({
		delay: 100,
		open: function(event, ui) {
			$(this).next().css('left', $('#input')[0].style['left']);
			$(this).next().css('top', $('#input')[0].style['top']);
		},
		source: function(req, responseFn) {
			var pos = req.term.lastIndexOf(' ');
			if (req.term.lastIndexOf('\n') > pos)
				pos = req.term.lastIndexOf('\n');
			text = req.term.substr(pos + 1);
			var re = $.ui.autocomplete.escapeRegex(text);
			var matcher = new RegExp("^" + re);
			var a = $.grep(keyword, function(item,index){
				return matcher.test(item);
			});
			console.log(a);
			responseFn(a);
		},
		select: function(event, ui) {
			var input = $('#input')[0];
			var code = $('#orgCode')[0];
			console.log(curStart);
			console.log(input.selectionStart);
			code.value = code.value.substr(0, curStart - input.selectionStart) + ui.item.value + code.value.substr(curStart - input.selectionStart + input.value.length);
			curStart = curStart + ui.item.value.length - input.selectionStart;
			curEnd = curStart;
			input.value = "";
			reHilight();
			return false;
		},
		focus: function(event, ui){
			 return false;
		 }
	});
});
function showSelectionDialog(content, callback, data) {
	$('#userInputDialog').dialog({
		autoOpen: true,
		show: "blind",
		hide: "blind",
		resizable: false,
		draggable: false,
		width: 400,
		open: (function() {
			$('#userInputDialog')[0].innerHTML = '<p>' + content + '</p>';
			console.log(data);
			for (var i in data) {
				var button = document.createElement('button');
				button.innerText = data[i];
				button.id = "button" + data[i];
				$('#userInputDialog')[0].appendChild(button);
				$('#button' + data[i]).button().click(function() {
							callback(data[i]);
							$('#userInputDialog').dialog('close');
							$('#userInputDialog').dialog('destroy');
						});
				$('#button' + data[i]).css('width', 375);
			}
		})
	});
}
