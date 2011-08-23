var log = document.getElementById("logbono");

function set_log(str)
{
	log.innerHTML = str+"\n";
}


function speak(str)
{
	set_log("speak :"+str);
	speak_elemnt = document.getElementById("vocal");

	speak_elemnt.src = "http://sapzil.sigkill.kr/tts/tts_synth_api.php?w=tts&amp;lang=ko&amp;text="+encodeURIComponent(str);
	speak_elemnt.load();

}
function face-left()
{
	set_log("face left : <']");
}
function face-right()
{
	set_log("face right : ['>");
}

function face-red()
{
	set_log("face red : ['-']");
}

function face-eye(n,sec)
{
	set_log("face eye : n = " + n + " | sec = " + sec);
}
function face-mouth(speed,sec)
{
	set_log("face mouth : speed = "+ speed + " | sec = " + sec);
}
function face-sweat(n)
{
	set_log("face sweat : n = " + n);
}
function face-shake(speed,sec)
{
	set_log("face shake : speed = " + speed + " | sec = " + sec);
}

function body-left()
{
	set_log("body left : ( [ )");
}
function body-right()
{
	set_log("body right : ( ] )");
}

function body-shell()
{
	set_log("body shell : ( * )");
}
function body-shake(speed,deg)
{
	set_log("body shake : speed = " + speed + " | deg = " + deg);
}
function body-arm-shake(speed,deg)
{
	set_log("body arm shake : speed = " + speed + " | deg = " + deg);
}
function body-walk(speed,sec)
{
	set_log("body walk : speed = " + speed + " | sec = " + sec);
}

