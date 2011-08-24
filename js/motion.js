
function set_log(str)
{
	log = document.getElementById("logbono");
	log.value = log.value + str+"\n";
}

var motion = {
	speak: function(msg, speed, pitch)
	{
		if (speed === undefined) { var speed = 100; }
		if (pitch === undefined) { var pitch = 100; }
		set_log("speak :"+msg);
		speak_elemnt = document.getElementById("vocal");

		speak_elemnt.src = "http://sapzil.sigkill.kr/tts/tts_synth_api.php?w=tts&lang=ko&pitch="+pitch+"&speed="+speed+"&text="+encodeURIComponent(msg);
		speak_elemnt.load();
		speak_elemnt.play();
	},
	face_left: function()
	{
		set_log("face left : <']");
	},
	
	face_right: function ()
	{
		set_log("face right : ['>");
	},


	face_red : function (sec)
	{
		set_log("face red : ['_']");
		face_red = 1;

		$(document).oneTime(1000 * sec, function(){
			face_red = 0;
		});
	},
	
	face_eye : function (n,sec)
	{
		set_log("face eye : n = " + n + " | sec = " + sec);
		face_eye_state = n;
	},
	
	face_mouth: function(speed,sec)
	{
		set_log("face mouth : speed = "+ speed + " | sec = " + sec);
		face_mouse_speed = speed;
	},
	
	face_sweat: function(n)
	{
		set_log("face sweat : n = " + n);
		speak_elemnt = document.getElementById("effect");
		speak_elemnt.src = "data/sweat.mp3";
		speak_elemnt.play();

		face_sweat_len = n;
	},

	face_shake: function(speed,sec)
	{
		set_log("face shake : speed = " + speed + " | sec = " + sec);
		face_shake_speed = 0.5;
		face_shake_A = 15;
	},

	body_left: function()
	{
		set_log("body left : ( [ )");
		body_walk_dir = 1;
	},

	body_right: function()
	{
		set_log("body right : ( ] )");
		body_walk_dir = 2;
	},

	body_shell: function()
	{
		set_log("body shell : ( * )");
	},

	body_shake: function(speed,deg)
	{
		set_log("body shake : speed = " + speed + " | deg = " + deg);
	
		face_shake_speed = 0.5;
		face_shake_A = 15;
		body_shake_speed = 0.5;
		body_shake_A = 15;
	},

	body_arm_shake: function(speed,deg)
	{
		set_log("body arm shake : speed = " + speed + " | deg = " + deg);
		body_arm_speed = 0.5;
		body_arm_A = 30;
	},

	body_walk: function(speed,sec)
	{
		set_log("body walk : speed = " + speed + " | sec = " + sec);
		body_walk_dir = 0;
	}

}

