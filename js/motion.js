function set_log(str)
{
	log = document.getElementById("logbono");
	log.value = log.value + str+"\n";
}


function speak(str)
{
	set_log("speak :"+str);
	speak_elemnt = document.getElementById("vocal");

	speak_elemnt.src = "http://sapzil.sigkill.kr/tts/tts_synth_api.php?w=tts&lang=ko&text="+encodeURIComponent(str);
	speak_elemnt.load();
	speak_elemnt.play();

}
function face_left()
{
	set_log("face left : <']");
}
function face_right()
{
	set_log("face right : ['>");
}

function face_red()
{
	set_log("face red : ['_']");
}

function face_eye(n,sec)
{
	set_log("face eye : n = " + n + " | sec = " + sec);
}
function face_mouth(speed,sec)
{
	set_log("face mouth : speed = "+ speed + " | sec = " + sec);
}
function face_sweat(n)
{
	set_log("face sweat : n = " + n);
	speak_elemnt = document.getElementById("sweat");
	speak_elemnt.play();
}
function face_shake(speed,sec)
{
	set_log("face shake : speed = " + speed + " | sec = " + sec);
	face_shake_speed = 0.5;
	face_shake_A = 15;
}

function body_left()
{
	set_log("body left : ( [ )");
}
function body_right()
{
	set_log("body right : ( ] )");
}

function body_shell()
{
	set_log("body shell : ( * )");
}
function body_shake(speed,deg)
{
	set_log("body shake : speed = " + speed + " | deg = " + deg);
	
	face_shake_speed = 0.5;
	face_shake_A = 15;
	body_shake_speed = 0.5;
	body_shake_A = 15;
}
function body_arm_shake(speed,deg)
{
	set_log("body arm shake : speed = " + speed + " | deg = " + deg);
}
function body_walk(speed,sec)
{
	set_log("body walk : speed = " + speed + " | sec = " + sec);
}

