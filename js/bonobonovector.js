var canvas;
var ctx;
var pi = Math.PI;

// face function global
var face_shake_speed, face_shake_A;
var face_sweat_len;
var face_eye_state, face_eye_sec;

// body function global
var body_shake_speed, body_shake_A;
var body_arm_speed, body_arm_A;


var time, time_interval;

var face_eye_time, face_sweat_time;
var face_axis_x, face_axis_y;
var face_org_x, face_org_y;
var face_shake_degree;


var body_axis_x, body_axis_y;
var body_arm_left_axis_x, body_arm_left_axis_y;
var body_arm_right_axis_x, body_arm_right_axis_y;
var body_shake_degree, body_arm_degree;



function iniCanvas(){
	canvas=document.getElementById("test");
	ctx=canvas.getContext("2d");
	ctx.font = "20px Arial";
	ctx.clearRect(0,0,1000,1000);
}

function init_data(){
	face_shake_speed = 0;
	face_shake_A = 0;
	face_sweat_len = 0;
	face_eye_state = 0;
	face_eye_sec = 0;
		
	body_shake_speed = 0;
	body_shake_A = 0;
	body_arm_speed = 0;
	body_arm_A = 0;
		
	time = 0;
	time_interval = 10;
		
	face_eye_time = 0;
	face_sweat_time = 0;
	face_axis = [ 227, 200 ];
	face_org = [ 227, 200 ];
	face_shake_degree = 0;
		
	body_axis = [ 227, 600 ];
	body_arm_left = [ 130, 390 ];
	body_arm_right = [ 320, 390 ];
	body_shake_degree = 0;
	body_arm_degree = 0;
}

function rotate_point(axis,point,degree){
	var x, y;
	var x_new, y_new , x_axis , y_axis;
	x_axis = axis[0];
	y_axis = axis[1];
	var point_new = new Array();
	for( var i = 0 ; i < point.length; i+=2 ){
		x = point[i];
		y = point[i+1];
		x_new = ( x - x_axis ) * Math.cos(degree) - ( y - y_axis ) * Math.sin(degree) + x_axis;
		y_new = ( x - x_axis ) * Math.sin(degree) + ( y - y_axis ) * Math.cos(degree) + y_axis;
		point_new[i] = x_new;
		point_new[i+1] = y_new;
	}
	return point_new
}

function get_degree(){
	face_shake_degree = face_shake_A / 180 * pi * Math.sin(face_shake_speed*time/1000*pi);
	body_shake_degree = body_shake_A / 180 * pi * Math.sin(body_shake_speed*time/1000*pi);
	body_arm_degree = body_arm_A / 180 * pi * Math.sin(body_arm_speed*time/1000*pi);
}

function draw_head(){
	var point = new Array();
	point = rotate_point(face_axis,face_org,face_shake_degree);
	point = rotate_point(body_axis,point,body_shake_degree);
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.arc(point[0], point[1], 134, pi*2/3 + face_shake_degree + body_shake_degree, pi/3 + face_shake_degree + body_shake_degree, false);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
}

function draw_body(){

	var point = [184.9769, 224.05079999999998, 87.989, 302.041, 87.989, 437.0241, 86.9891, 511.0149, 130.9836, 578.0065, 81.8095, 590.1088, 99.2936, 617.701, 103.9378, 639.283, 146.2822, 621.7988, 191.6317, 613.8763, 176.3331, 587.3769, 170.323, 587.9233, 188.3535, 559.5116, 243.5379, 571.8051, 269.7641, 551.0426, 271.4032, 565.5217, 278.7794, 575.3566, 261.8416, 590.382, 271.13, 600.7632, 312.9281, 627.2627, 328.7731, 625.3503, 342.4326, 625.3503, 345.1645, 619.3401, 355.8189, 616.335, 347.0768, 599.9436, 342.7059, 587.9233, 317.5724, 577.5421, 354.9556, 519.0139, 358.9551, 443.02340000000004, 385.9517, 363.0334, 272.9659, 233.0496, 246.9691, 200.05380000000002, 184.9769, 224.05079999999998] ;
	point = rotate_point(body_axis,point,body_shake_degree);
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.quadraticCurveTo(point[14], point[15], point[16], point[17]);
	ctx.quadraticCurveTo(point[18], point[19], point[20], point[21]);
	ctx.quadraticCurveTo(point[22], point[23], point[24], point[25]);
	ctx.quadraticCurveTo(point[26], point[27], point[28], point[29]);
	ctx.quadraticCurveTo(point[30], point[31], point[32], point[33]);
	ctx.quadraticCurveTo(point[34], point[35], point[36], point[37]);
	ctx.quadraticCurveTo(point[38], point[39], point[40], point[41]);
	ctx.quadraticCurveTo(point[42], point[43], point[44], point[45]);
	ctx.quadraticCurveTo(point[46], point[47], point[48], point[49]);
	ctx.quadraticCurveTo(point[50], point[51], point[52], point[53]);
	ctx.quadraticCurveTo(point[54], point[55], point[56], point[57]);
	ctx.quadraticCurveTo(point[58], point[59], point[60], point[61]);
	ctx.quadraticCurveTo(point[62], point[63], point[64], point[65]);
	ctx.fill();
	ctx.stroke();
	
}

function draw_eye(){
	var point = [ 124, 185, 335 , 185 ];
	point = rotate_point(face_axis,point,face_shake_degree);
	point = rotate_point(body_axis,point,body_shake_degree);
	ctx.fillStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.arc(point[0], point[1], 5, 0, Math.PI*2, 1);
	ctx.closePath();
	ctx.fill();
	ctx.beginPath();
	ctx.arc(point[2], point[3], 5, 0, Math.PI*2, 1);
	ctx.closePath();
	ctx.fill();
}

function draw_nose(){
	var point = [227, 244];
	point = rotate_point(face_axis,point,face_shake_degree);
	point = rotate_point(body_axis,point,body_shake_degree);
	ctx.beginPath();
	ctx.arc(point[0], point[1], 23, 0, pi*2, 1);
	ctx.fillStyle="rgb(0,0,0)";
	ctx.fill();
}

function draw_lip(){
	ctx.fillStyle="rgb(215,191,205)";
	ctx.strokeStyle="rgb(0,0,0)";
	
	var point = [225.9717, 248.0478, 177.9777, 241.04860000000002, 182.9771, 283.0434, 206.9741, 318.039, 228.9714, 286.043, 242.9696, 270.045, 225.9717, 248.0478];
	point = rotate_point(face_axis,point,face_shake_degree);
	point = rotate_point(body_axis,point,body_shake_degree);
	
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.fill();
	ctx.stroke();

	point = [232.9709, 246.048, 271.966, 244.04829999999998, 279.965, 278.044, 277.9652, 305.0406, 245.9692, 300.0413, 212.9734, 303.0409, 232.9709, 246.048];
	point = rotate_point(face_axis,point,face_shake_degree);
	point = rotate_point(body_axis,point,body_shake_degree);

	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.fill();
	ctx.stroke();
}

function draw_musta(){
	var point = [ 191, 272, 152, 273, 199, 289, 169, 306, 156, 293, 191, 282, 270, 270, 303, 270, 270, 279, 305, 289, 263, 287, 300, 305 ];
	point = rotate_point(face_axis,point,face_shake_degree);
	point = rotate_point(body_axis,point,body_shake_degree);
	
	for ( var i = 0 ; i < point.length ; i+=4 ) {
		ctx.beginPath();
		ctx.moveTo(point[i], point[i+1]);
		ctx.lineTo(point[i+2], point[i+3]);
		ctx.stroke();
	}
}



function draw_leftarm(){
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";

	var point = [144.9819, 346.0355, 157.9802, 379.03139999999996, 219.9725, 389.0301, 230.9711, 392.0298, 220.9724, 400.0288, 236.9704, 405.0281, 220.9724, 411.0274, 232.9709, 415.0269, 216.9729, 422.026, 178.9776, 447.0229, 116.9854, 413.0271];
	point = rotate_point(body_axis,point,body_shake_degree);
	
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.quadraticCurveTo(point[14], point[15], point[16], point[17]);
	ctx.quadraticCurveTo(point[18], point[19], point[20], point[21]);
	ctx.fill();
	ctx.stroke();
	
}

function draw_rightarm(){
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
	
	var point = [306.9616, 346.0355, 285.9642, 382.031, 249.9687, 380.0313, 235.9705, 386.03049999999996, 247.969, 392.0298, 232.9709, 400.0288, 245.9692, 406.028, 235.9705, 413.0271, 247.969, 417.02660000000003, 267.9665, 444.0233, 332.9584, 413.0271];
	point = rotate_point(body_axis,point,body_shake_degree);
	
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.quadraticCurveTo(point[14], point[15], point[16], point[17]);
	ctx.quadraticCurveTo(point[18], point[19], point[20], point[21]);
	ctx.fill();
	ctx.stroke();

}

function draw_shell(){
	var point = [243.9695, 352.0348, 153.9807, 412.02729999999997, 242.9696, 454.022, 263.967, 472.01980000000003, 262.9671, 405.0281, 266.9666, 343.0359, 243.9695, 352.0348];
	point = rotate_point(body_axis,point,body_shake_degree);

	ctx.fillStyle="rgb(215,129,154)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.fill();
	ctx.stroke();
}

function draw_front(){
	time += time_interval;
	iniCanvas();
	get_degree();
	draw_body();
	draw_head();
	draw_eye();
	draw_lip();
	draw_musta();
	draw_nose();
	draw_rightarm();
	draw_shell();
	draw_leftarm();
}
