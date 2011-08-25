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
		$('#orgCode')[0].innerHTML = "";
		curStart = 0;
		reHilight();
		moveInput();
	});
	$('#runButton').button().click(function() {
		resetInterp();
		g_interp.eval(parse($('#orgCode')[0].innerHTML));
	});
	$("#exampleComboBox").combobox({
		selected: function(event, ui) {
			$.ajax({
			  url: 'example/' + $('#exampleComboBox')[0].value,
			  context: document.body,
			  success: function(data){
				    $('#orgCode')[0].innerHTML = data.replace(/\t/g, '\ \ \ \ ').replace(/\r\n/, '\n').replace(/\r/, '\n');
						curStart = curEnd = 0;
						console.log($('#orgCode')[0].value);
						reHilight();
				  }
			});
		}
	});
	var keyword = [
		"loop", "rand", "concat", "speak", "face_left", "face_right",
		"face_red", "face_eye", "face_mouth", "face_sweat", "face_shake",
		"body_left", "body_right", "body_shell", "body_shake", "body_arm_shake",
		"body_walk", "lambda", "begin", "if", "true", "false", "let", "letrec",
		"try", "raise", "except", "newref", "getref", "setref", "and", "or",
		"eq", "lt", "gt", "add", "mul", "sub", "mod", "div", "pow", "print",
		"sleep", "suspend", "getglobal", "setglobal", "ne", "ge", "le", "not",
		"infloop", "forloop-step", "forloop", "floor", "random", "list-new", "list-get",
		"list-set", "list-len", "list-foreach",
		"dict-set", "dict-foreach"];
	$('#input').autocomplete({
		delay: 100,
		open: function(event, ui) {
			$(this).next().css('left', $('#input')[0].style['left']);
			$(this).next().css('top', $('#input')[0].style['top']);
		},
		source: function(req, responseFn) {
			var re = $.ui.autocomplete.escapeRegex(req.term);
			var matcher = new RegExp("^" + re);
			var a = $.grep(keyword, function(item,index){
				return matcher.test(item);
			});
			responseFn(a);
		},
		select: function(event, ui) {
			var input = $('#input')[0];
			var code = $('#orgCode')[0];
			var codeSeg = $('#orgCode')[0].innerHTML.substr(curStart);
			pos = Math.min(codeSeg.indexOf(' ')==-1?9999:codeSeg.indexOf(' '), codeSeg.indexOf('\n')==-1?9999:codeSeg.indexOf('\n'), codeSeg.indexOf('(')==-1?9999:codeSeg.indexOf('('), codeSeg.indexOf(')')==-1?9999:codeSeg.indexOf(')'));
			code.innerHTML = code.innerHTML.substr(0, curStart - input.selectionStart) + ui.item.value + code.innerHTML.substr(curStart + pos);
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
	if (data == "none") {
		$('#userInputDialog').dialog({
			autoOpen: true,
			show: "blind",
			hide: "blind",
			resizable: false,
			draggable: false,
			width: 400,
			open: function() {
				$('#userInputDialog')[0].innerHTML = '<p>' + content + '</p>' +
																						 '<input type="text" id="userInput" class="text ui-widget-content ui-corner-all" size=50 />';
				},
			buttons: {
				"확인": function() {
						var ret = $('#userInput')[0].value;
						$('#userInputDialog').dialog('close');
						$('#userInputDialog').dialog('destroy');
						while (typeof $('#userInputDialog')[0].children[0] != "undefined") {
							$('#userInputDialog')[0].removeChild($('#userInputDialog')[0].children[0]);
						}
						callback(ret);
				}}
		});
	}
	else {
		$('#userInputDialog').dialog({
			autoOpen: true,
			show: "blind",
			hide: "blind",
			resizable: false,
			draggable: false,
			width: 400,
			open: (function() {
				$('#userInputDialog')[0].innerHTML = '<p>' + content + '</p>';
				for (var i in data) {
					var button = document.createElement('button');
					var str = new String(data[i]);
					button.innerText = data[i];
					button.id = "button" + i;
					$('#userInputDialog')[0].appendChild(button);
					$('#button' + i).button().click(function() {
								var ret = $(this)[0].innerText; 
								$('#userInputDialog').dialog('close');
								$('#userInputDialog').dialog('destroy');
								while (typeof $('#userInputDialog')[0].children[0] != "undefined") {
									$('#userInputDialog')[0].removeChild($('#userInputDialog')[0].children[0]);
								}
								callback(ret);
							});
					$('#button' + i).css('width', 375);
				}
			})
		});
	}
}
