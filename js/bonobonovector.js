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
var body_walk_dir, body_walk_speed;


var time, time_interval;

var face_eye_time, face_sweat_time;
var face_axis = new Array();
var face_shake_degree;
var face_red;
var face_mouse_speed;

var body_axis = new Array();
var body_arm_left_axis = new Array();
var body_arm_right_axis = new Array();
var body_shake_degree, body_arm_degree;

var body_side_leftleg_axis = new Array();
var body_side_rightleg_axis = new Array();
var body_side_tail_axis = new Array();



function iniCanvas(){
	canvas=document.getElementById("screen");
	ctx=canvas.getContext("2d");
	ctx.font = "20px coding";
	ctx.lineWidth = 3;
	ctx.clearRect(0,0,1000,1000);
}

function init_data(){

	face_shake_speed = 0;
	face_shake_A = 0;
	face_sweat_len = 0;
	face_eye_state = 0;
	face_eye_sec = 0;
	face_red = 0;
	face_mouse_speed = 0;
		
	body_shake_speed = 0;
	body_shake_A = 0;
	body_arm_speed = 0;
	body_arm_A = 0;
	body_walk_dir = 0;
	body_walk_speed = 0;
		
	time = 0;
	time_interval = 10;
		
	face_eye_time = 0;
	face_sweat_time = 0;
	face_axis = [ 227, 200 ];
	face_axis = resize_point(face_axis);
	face_shake_degree = 0;
		
	body_axis = [ 227, 600 ];
	body_arm_left_axis = [ 150, 390 ];
	body_arm_left_axis = resize_point(body_arm_left_axis);
	body_arm_right_axis = [ 300, 390 ];
	body_arm_right_axis = resize_point(body_arm_right_axis);
	body_shake_degree = 0;
	body_arm_degree = 0;
	
	
	body_side_leftleg_axis = [ 195, 507 ];
	point = resize_point(body_side_leftleg_axis);
	body_side_rightleg_axis = [ 240, 507 ];
	point = resize_point(body_side_rightleg_axis);
	body_side_tail_axis = [ 305, 470 ];
	point = resize_point(body_side_tail_axis);
	
}

function resize_point(point){
	for( var i = 0 ; i < point.length ; i+=2 ) {
		point[i] += 150;
	}
	return point
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
	ctx.lineWidth = 6;
	var point = new Array();
	point = resize_point(point);
	point = rotate_point(body_axis,face_axis,body_shake_degree);
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.arc(point[0], point[1], 134, pi*2/3 + face_shake_degree + body_shake_degree, pi/3 + face_shake_degree + body_shake_degree, false);
	ctx.stroke();
	ctx.arc(point[0], point[1], 134, 0, pi * 2, false);
	ctx.fill();
	ctx.lineWidth = 3;
}

function draw_body(){

	var point = [184.9769, 224.05079999999998, 87.989, 302.041, 87.989, 437.0241, 86.9891, 511.0149, 130.9836, 578.0065, 81.8095, 590.1088, 99.2936, 617.701, 103.9378, 639.283, 146.2822, 621.7988, 191.6317, 613.8763, 176.3331, 587.3769, 170.323, 587.9233, 188.3535, 559.5116, 243.5379, 571.8051, 269.7641, 551.0426, 271.4032, 565.5217, 278.7794, 575.3566, 261.8416, 590.382, 271.13, 600.7632, 312.9281, 627.2627, 328.7731, 625.3503, 342.4326, 625.3503, 345.1645, 619.3401, 355.8189, 616.335, 347.0768, 599.9436, 342.7059, 587.9233, 317.5724, 577.5421, 354.9556, 519.0139, 358.9551, 443.02340000000004, 385.9517, 363.0334, 272.9659, 233.0496, 246.9691, 200.05380000000002, 184.9769, 224.05079999999998] ;
	point = resize_point(point);
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
	
	if( face_eye_state == 0 ) {
		var point = [ 124, 185, 335 , 185 ];
		point = resize_point(point);
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
	else if( face_eye_state == 1 ) {
		var point = [122.9846, 167.05790000000002, 146.9816, 180.05630000000002, 118.9851, 183.0559, 145.9817, 181.05610000000001, 129.9837, 196.0543, 339.9575, 188.0553, 314.9606, 183.0559, 334.9581, 170.0575, 315.9605, 183.0559, 325.9592, 195.0544];
		point = resize_point(point);
		point = rotate_point(face_axis,point,face_shake_degree);
		point = rotate_point(body_axis,point,body_shake_degree);
		
		ctx.beginPath();
		ctx.moveTo(point[0], point[1]);
		ctx.lineTo(point[2], point[3]);
		ctx.lineTo(point[4], point[5]);
		ctx.moveTo(point[6], point[7]);
		ctx.lineTo(point[8], point[9]);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(point[10], point[11]);
		ctx.lineTo(point[12], point[13]);
		ctx.lineTo(point[14], point[15]);
		ctx.moveTo(point[16], point[17]);
		ctx.lineTo(point[18], point[19]);
		ctx.stroke();
	}
	else if( face_eye_state == 2 ) {
		var point = [114.9856, 174.05700000000002, 127.984, 218.05149999999998, 132.9834, 172.0573, 321.9597, 176.0568, 335.958, 220.05130000000003, 337.9577, 174.05700000000002];
		point = resize_point(point);
		point = rotate_point(face_axis,point,face_shake_degree);
		point = rotate_point(body_axis,point,body_shake_degree);
		
		ctx.beginPath();
		ctx.moveTo(point[0], point[1]);
		ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(point[6], point[7]);
		ctx.quadraticCurveTo(point[8], point[9], point[10], point[11]);
		ctx.stroke();

	}
}

function draw_nose(){
	var point = [227, 244];
	point = resize_point(point);
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
	point = resize_point(point);
	point = rotate_point(face_axis,point,face_shake_degree);
	point = rotate_point(body_axis,point,body_shake_degree);
	
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle="rgb(215,191,205)";
	ctx.strokeStyle="rgb(0,0,0)";
	
	point = [232.9709, 246.048, 271.966, 244.04829999999998, 279.965, 278.044, 277.9652, 305.0406, 245.9692, 300.0413, 212.9734, 303.0409, 232.9709, 246.048];
	point = resize_point(point);
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
	point = resize_point(point);
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

	if( body_arm_A == 0 ) {
		var point = [144.9819, 346.0355, 157.9802, 379.03139999999996, 219.9725, 389.0301, 230.9711, 392.0298, 220.9724, 400.0288, 236.9704, 405.0281, 220.9724, 411.0274, 232.9709, 415.0269, 216.9729, 422.026, 178.9776, 447.0229, 116.9854, 413.0271];
		point = resize_point(point);
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
	else {
		var left_axis = new Array();
		left_axis = rotate_point(body_axis, body_arm_left_axis, body_shake_degree);
		var point = [130.9824, 328.0353, 76.9891, 317.0366, 34.9944, 280.0413, 16.9966, 277.0416, 28.9951, 290.04, 12.9971, 285.0406, 22.9959, 299.0389, 7.997699999999998, 297.0391, 17.9965, 307.0379, 22.9959, 331.0349, 107.9852, 392.02729999999997];
		point = resize_point(point);
		point = rotate_point(body_axis, point, body_shake_degree );
		point = rotate_point(left_axis, point, body_arm_degree*-1 );
		
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
	
}

function draw_rightarm(){
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
	
	if ( body_arm_A == 0 ) {
		var point = [306.9616, 346.0355, 285.9642, 382.031, 249.9687, 380.0313, 235.9705, 386.03049999999996, 247.969, 392.0298, 232.9709, 400.0288, 245.9692, 406.028, 235.9705, 413.0271, 247.969, 417.02660000000003, 267.9665, 444.0233, 332.9584, 413.0271];
		point = resize_point(point);
		point = rotate_point(body_axis, point, body_shake_degree);
		
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
	else {	
		var right_axis = new Array();
		right_axis = rotate_point(body_axis, body_arm_right_axis, body_shake_degree);
		var point = [318.9614, 326.0355, 394.9519, 325.0356, 419.9487, 294.0395, 434.9469, 290.04, 428.9476, 300.0388, 442.9459, 299.0389, 434.9469, 307.0379, 447.0467, 303.181, 442.9235, 312.8018, 435.129, 335.4364, 345.6848, 392.17330000000004];
		point = resize_point(point);
		point = rotate_point(body_axis, point, body_shake_degree);
		point = rotate_point(right_axis, point, body_arm_degree);
		
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
}

function draw_shell(){
	ctx.fillStyle="rgb(215,129,154)";

	if ( body_arm_A == 0 ) {
		var point = [243.9695, 352.0348, 153.9807, 412.02729999999997, 242.9696, 454.022, 263.967, 472.01980000000003, 262.9671, 405.0281, 266.9666, 343.0359, 243.9695, 352.0348];
		point = resize_point(point);
		point = rotate_point(body_axis,point,body_shake_degree);
	
		ctx.beginPath();
		ctx.moveTo(point[0], point[1]);
		ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
		ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
		ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
		ctx.fill();
		ctx.stroke();
	}
	else {
		var point = [243.9695, 352.0348, 153.9807, 412.02729999999997, 242.9696, 454.022, 263.967, 472.01980000000003, 262.9671, 405.0281, 266.9666, 343.0359, 243.9695, 352.0348];
		point = resize_point(point);
		for( var i = 0 ; i < point.length ; i+=2 ) {
			point[i] += 190;
			point[i+1] -= 70;
		}
		point = rotate_point(body_axis,point,body_shake_degree);
		
		var right_axis = new Array();
		right_axis = rotate_point(body_axis, body_arm_right_axis, body_shake_degree);
		point = rotate_point(right_axis, point, body_arm_degree);
	
		ctx.beginPath();
		ctx.moveTo(point[0], point[1]);
		ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
		ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
		ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
		ctx.fill();
		ctx.stroke();
	}
}

function draw_ddam(){
	ctx.fillStyle="rgb(255,255,255)";
	ctx.strokeStyle="rgb(0,0,0)";
	var point = [87.989, 117.06410000000005, 62.9921, 88.06780000000003, 97.9877, 102.06600000000003, 104.9869, 93.06709999999998, 79.99, 62.071000000000026, 115.9855, 81.06859999999995, 121.9847, 71.06989999999996, 101.9872, 43.07339999999999, 132.9834, 61.0711];
	point = resize_point(point);
	point = rotate_point(body_axis,point,body_shake_degree);

	var speed = 1/15;
	var hei = 25;
	var ver = [ hei, hei ];
	
	for( var i = 0 ; i < face_sweat_len ; i++ ) {
		ver[0] = Math.abs( hei * i + ( time * speed ) ) % ( hei * face_sweat_len ) * -1 ;
		ver[1] = Math.abs( hei * i + ( time * speed ) ) % ( hei * face_sweat_len ) * -1 ;

		ctx.beginPath();
		ctx.moveTo(point[0] + ver[0], point[1] + ver[1]);
		ctx.quadraticCurveTo(point[2] + ver[0], point[3] + ver[1], point[4] + ver[0], point[5] + ver[1]);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.moveTo(point[6] + ver[0], point[7] + ver[1]);
		ctx.quadraticCurveTo(point[8] + ver[0], point[9] + ver[1], point[10] + ver[0], point[11] + ver[1]);
		ctx.stroke();
		ctx.fill();
		
		ctx.beginPath();
		ctx.moveTo(point[12] + ver[0], point[13] + ver[1]);
		ctx.quadraticCurveTo(point[14] + ver[0], point[15] + ver[1], point[16] + ver[0], point[17] + ver[1]);
		ctx.stroke();
		ctx.fill();
	}
}

function draw_redface(){
	if( face_red == 1 ) {
		var point = [143.982, 222.051, 127.984, 183.0559, 219.9725, 183.0559, 309.9612, 181.05610000000001, 310.9611, 226.0505, 311.961, 240.04880000000003, 286.9641, 242.0485, 279.965, 236.04930000000002, 267.9665, 222.051, 242.9696, 212.0523, 226.9716, 210.0525, 196.9754, 216.05180000000001, 188.9764, 222.051, 177.9777, 237.0491, 162.9796, 238.04899999999998, 142.9821, 233.0496, 143.982, 222.051];
		point = resize_point(point);
		point = rotate_point(face_axis,point,face_shake_degree);
		point = rotate_point(body_axis,point,body_shake_degree);
		ctx.fillStyle="rgba(235,129,154,0.4)";
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
		ctx.closePath();
		ctx.fill();
	}
}

function draw_mouse(){
	
	if( face_mouse_speed > 0 ) {
		var point = [217.4728, 274.5444, 246.4692, 282.5434, 248.4689, 302.5409, 249.4688, 321.5386, 222.4722, 317.5391, 204.4744, 315.5393, 216.4729, 295.5418, 223.4708, 277.5441, 217.4728, 274.5444] ;
		var org_y = 300;
		for ( var i = 0 ; i < point.length ; i++ ) {
			if ( i %2 == 1 ) {
//				point[i] = Math.abs( time / 1000 % face_mouse_speed - face_mouse_speed / 2 ) * 2 / face_mouse_speed * ( point[i] - org_y ) + org_y ;
				point[i] = Math.abs(Math.cos( time / 500 * face_mouse_speed )) * ( point[i] - org_y ) + org_y ;
			}
		}
		point = resize_point(point);
		point = rotate_point(face_axis,point,face_shake_degree);
		point = rotate_point(body_axis,point,body_shake_degree);
		
		ctx.fillStyle="rgb(219,62,86)";
		
		ctx.beginPath();
		ctx.moveTo(point[0], point[1]);
		ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
		ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
		ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
		ctx.quadraticCurveTo(point[14], point[15], point[16], point[17]);
		ctx.fill();
		ctx.stroke();
	}
}

function side_fix(point){
	for( var i = 0 ; i < point.length ; i+=2 ) {
		point[i] = 800 - point[i];
	}
	return point;
}

function side_move_round(point){
	var roundspeed = 3;
	var a = 40 , b = 25 ;
	if( body_walk_dir == 1 ) roundspeed *= -1;
	var x_diff, y_diff;
	x_diff = a * Math.cos(time/1000*pi*roundspeed);
	y_diff = b * Math.sin(time/1000*pi*roundspeed);
	for( var i = 0 ; i < point.length ; i+=2 ) {
		point[i] += x_diff;
		point[i+1] += y_diff;
	}
	return point;
}

function draw_side_body(){
	var point = new Array();

	point = [351.4561, 185.55560000000003, 359.4551, 47.57280000000003, 212.4734, 79.56880000000001, 159.4801, 84.56820000000005, 97.4878, 182.5559, 46.4942, 256.5467, 176.4779, 284.5432, 81.4898, 409.5276, 177.4778, 527.5128, 229.4713, 583.5058, 298.4627, 532.5122, 393.4508, 409.5276, 295.4631, 280.5437, 333.4583, 270.5449, 351.4561, 185.55560000000003];
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	
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
	ctx.fill();
	ctx.stroke();
	
	point = [88.4889, 195.5543, 58.4927, 244.5482, 106.4867, 251.5473, 123.4846, 221.55110000000002, 88.4889, 195.5543];
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	
	ctx.fillStyle="rgb(215,191,205)";
	ctx.strokeStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.fill();
	ctx.stroke();
	
	
	point =  [86.9891, 197.0541, 145.9817, 204.05329999999998, 124.9844, 251.04739999999998, 85.9892, 266.0455, 86.9891, 197.0541] ;
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	ctx.fillStyle="rgb(215,191,205)";
	ctx.strokeStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.fill();
	ctx.stroke();

	point =  [104.9869, 216.55169999999998, 134.9831, 200.5537, 110.9861, 224.5507, 145.9817, 222.5509, 109.9862, 234.5494, 146.9816, 240.5487] ;
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.lineTo(point[2], point[3]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[4], point[5]);
	ctx.lineTo(point[6], point[7]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[8], point[9]);
	ctx.lineTo(point[10], point[11]);
	ctx.stroke();

	
	point = [ 89.9887, 200 ];
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	ctx.fillStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.arc(point[0], point[1], 20, 0, pi*2, 1);
	ctx.fill();
	

}


function draw_side_eye(){
	if( face_eye_state == 0 ) {
		var point = [ 275 , 137 ];
		point = resize_point(point);
		if( body_walk_dir == 2 ) point = side_fix(point);
		point = side_move_round(point);
		ctx.fillStyle="rgb(0,0,0)";
		ctx.beginPath();
		ctx.arc(point[0], point[1], 5, 0, Math.PI*2, 1);
		ctx.closePath();
		ctx.fill();
	}
	else if( face_eye_state == 1 ) {
		var point =  [297.9627, 122.06349999999998, 275.9655, 137.0616, 299.9625, 136.0618, 276.9654, 138.06150000000002, 293.9632, 148.06029999999998] ;
		point = resize_point(point);
		if( body_walk_dir == 2 ) point = side_fix(point);
		point = side_move_round(point);

		ctx.beginPath();
		ctx.moveTo(point[0], point[1]);
		ctx.lineTo(point[2], point[3]);
		ctx.lineTo(point[4], point[5]);
		ctx.moveTo(point[6], point[7]);
		ctx.lineTo(point[8], point[9]);
		ctx.stroke();

	}
	else if( face_eye_state == 2 ) {
		var point =  [275.9655, 127.06290000000001, 290.9636, 160.05880000000002, 296.9629, 124.06330000000003] ;
		point = resize_point(point);
		if( body_walk_dir == 2 ) point = side_fix(point);
		point = side_move_round(point);

		ctx.beginPath();
		ctx.moveTo(point[0], point[1]);
		ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
		ctx.stroke();

	}
}



function draw_side_leftarm(){
	var point =  [183.977, 280.5437, 123.9845, 334.5369, 99.9875, 332.5372, 86.9891, 340.5362, 96.9879, 343.5358, 86.9891, 351.5348, 96.9879, 352.5347, 86.9891, 359.5338, 95.988, 361.5336, 150.9811, 366.5329, 189.9762, 342.5359] ;
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);

	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
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

function draw_side_rightarm(){
	var point =  [182.9771, 310.04, 143.982, 342.036, 96.9879, 337.0366, 81.9897, 343.0359, 94.9881, 349.0351, 82.9896, 355.0344, 93.9882, 360.0338, 81.9897, 366.033, 96.9879, 370.0325, 153.9807, 389.0301, 200.9749, 370.0325] ;
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);

	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
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

function draw_side_shell(){
	var point =  [92.4884, 287.0429, 170.4787, 338.0365, 84.4894, 387.0304, 59.4926, 390.03, 66.4917, 338.0365, 68.4914, 279.0439, 92.4884, 287.0429] ;
	point = resize_point(point);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);

	ctx.fillStyle="rgb(215,129,154)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.fill();
	ctx.stroke();
}

function draw_side_tail(){
	var tail_degree = Math.sin(time/1000*pi*2) * pi * 15 / 360 ;
	var point =  [310.4612, 442.52340000000004, 376.4529, 442.52340000000004, 385.4518, 426.5254, 416.4479, 431.5248, 391.4511, 450.5224, 357.4553, 478.51890000000003, 310.4612, 468.5202] ;
	point = resize_point(point);
	point = rotate_point(body_side_tail_axis,point,tail_degree);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.quadraticCurveTo(point[6], point[7], point[8], point[9]);
	ctx.quadraticCurveTo(point[10], point[11], point[12], point[13]);
	ctx.fill();
	ctx.stroke();
}

function draw_side_leftleg(){
	var leftleg_degree = Math.sin(time/1000*pi*4) * pi * 30 / 360 ;
	var point =  [170.9792, 513.5146, 187.9771, 540.5112, 201.9754, 546.5104, 174.9787, 550.5099, 171.9791, 570.5074, 179.9781, 585.5056, 219.9731, 576.5067, 276.966, 575.5068, 237.9709, 549.5101, 249.9694, 539.5113, 259.9681, 515.5143] ;
	point = resize_point(point);
	point = rotate_point(body_side_leftleg_axis,point,leftleg_degree);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";
	
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

function draw_side_rightleg(){
	var rightleg_degree = Math.sin(time/1000*pi*4) * pi * -30 / 360 ;
	var point =  [205.4743, 500.0163, 224.4719, 534.012, 243.4696, 546.0105, 201.4748, 554.0095, 203.4746, 574.007, 204.4744, 591.0049, 285.4643, 578.0065, 318.4602, 576.0068, 293.4633, 548.0103, 311.4611, 522.0135, 309.4613, 494.0158] ;
	point = resize_point(point);
	point = rotate_point(body_side_rightleg_axis,point,rightleg_degree);
	if( body_walk_dir == 2 ) point = side_fix(point);
	point = side_move_round(point);
	ctx.fillStyle="rgb(143,208,240)";
	ctx.strokeStyle="rgb(0,0,0)";

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


function draw_back_shift_point(point,val){
	for ( var i = 0 ; i < point.length ; i+=2 ) {
		point[i] += val;
	}
	return point
}

function draw_back_dup(shiftval){
	
	var point = new Array();
	
	// floor fill
	point =  [0.0, 386.03049999999996, 800, 386.03049999999996, 800, 680, 0, 680, 0.0, 386.03049999999996] ;
	point = draw_back_shift_point(point,shiftval);
	ctx.fillStyle="rgb(204,119,41)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.lineTo(point[2], point[3]);
	ctx.lineTo(point[4], point[5]);
	ctx.lineTo(point[6], point[7]);
	ctx.lineTo(point[8], point[9]);
	ctx.fill();
	
	
	// back grass fill
	point =  [0.0, 161.0586, 22.9971, 153.0596, 18.9976, 164.05829999999997, 42.9946, 154.0595, 39.995, 165.05810000000002, 60.9924, 152.0598, 58.9926, 163.0584, 87.989, 141.0611, 88.9889, 158.05900000000003, 115.9855, 150.06, 108.9864, 161.0586, 125.9842, 149.06009999999998, 134.9831, 162.05849999999998, 159.98, 149.06009999999998, 152.9809, 163.0584, 166.9791, 154.0595, 162.9796, 162.05849999999998, 179.9775, 153.0596, 175.978, 167.05790000000002, 182.9771, 163.0584, 186.9766, 169.05759999999998, 198.9751, 161.0586, 195.9755, 169.05759999999998, 213.9732, 160.05880000000002, 210.9736, 172.0573, 233.9707, 157.0591, 227.9715, 172.0573, 242.9696, 155.05939999999998, 245.9692, 171.05739999999997, 264.9669, 153.0596, 260.9674, 170.0575, 273.9657, 157.0591, 271.966, 169.05759999999998, 301.9622, 153.0596, 297.9627, 166.058, 322.9596, 157.0591, 314.9606, 171.05739999999997, 336.9579, 163.0584, 333.9582, 170.0575, 350.9561, 151.05990000000003, 351.956, 162.05849999999998, 393.9507, 146.0605, 378.9526, 175.05689999999998, 401.9497, 161.0586, 395.9505, 180.05630000000002, 420.9474, 164.05829999999997, 415.948, 179.0564, 434.9456, 165.05810000000002, 437.9452, 175.05689999999998, 463.942, 149.06009999999998, 463.942, 164.05829999999997, 483.9395, 151.05990000000003, 478.9401, 168.0578, 499.9375, 163.0584, 496.9379, 176.0568, 503.937, 157.0591, 516.9354, 172.0573, 531.9335, 164.05829999999997, 526.9341, 176.0568, 535.933, 160.05880000000002, 536.9329, 171.05739999999997, 565.9292, 147.06040000000002, 562.9296, 162.05849999999998, 588.9264, 146.0605, 583.927, 162.05849999999998, 617.9227, 153.0596, 613.9232, 163.0584, 632.9209, 147.06040000000002, 633.9207, 162.05849999999998, 649.9187, 155.05939999999998, 646.9191, 167.05790000000002, 666.9166, 149.06009999999998, 670.9161, 161.0586, 700.9124, 145.06060000000002, 695.913, 158.05900000000003, 720.9099, 145.06060000000002, 725.9092, 157.0591, 741.9072, 146.0605, 738.9076, 158.05900000000003, 759.905, 141.0611, 759.905, 153.0596, 766.9041, 141.0611, 776.9029, 150.06, 805.8992, 133.0621, 800, 151.05990000000003, 800, 411.0274, 776.9029, 417.02660000000003, 744.9069, 417.02660000000003, 619.9225, 411.0274, 604.9244, 417.02660000000003, 553.9307, 422.026, 504.9369, 413.0271, 433.9457, 413.0271, 397.9502, 415.0269, 316.9604, 425.0256, 285.9642, 416.0268, 198.9751, 414.027, 172.9784, 416.0268, 88.9889, 421.02610000000004, 53.9932, 414.027, 3.9995, 417.02660000000003, 0, 420.0263, 0.0, 161.0586] ;
	point = draw_back_shift_point(point,shiftval);
	ctx.fillStyle="rgb(171,170,62)";
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
	ctx.quadraticCurveTo(point[66], point[67], point[68], point[69]);
	ctx.quadraticCurveTo(point[70], point[71], point[72], point[73]);
	ctx.quadraticCurveTo(point[74], point[75], point[76], point[77]);
	ctx.quadraticCurveTo(point[78], point[79], point[80], point[81]);
	ctx.quadraticCurveTo(point[82], point[83], point[84], point[85]);
	ctx.quadraticCurveTo(point[86], point[87], point[88], point[89]);
	ctx.quadraticCurveTo(point[90], point[91], point[92], point[93]);
	ctx.quadraticCurveTo(point[94], point[95], point[96], point[97]);
	ctx.quadraticCurveTo(point[98], point[99], point[100], point[101]);
	ctx.quadraticCurveTo(point[102], point[103], point[104], point[105]);
	ctx.quadraticCurveTo(point[106], point[107], point[108], point[109]);
	ctx.quadraticCurveTo(point[110], point[111], point[112], point[113]);
	ctx.quadraticCurveTo(point[114], point[115], point[116], point[117]);
	ctx.quadraticCurveTo(point[118], point[119], point[120], point[121]);
	ctx.quadraticCurveTo(point[122], point[123], point[124], point[125]);
	ctx.quadraticCurveTo(point[126], point[127], point[128], point[129]);
	ctx.quadraticCurveTo(point[130], point[131], point[132], point[133]);
	ctx.quadraticCurveTo(point[134], point[135], point[136], point[137]);
	ctx.quadraticCurveTo(point[138], point[139], point[140], point[141]);
	ctx.quadraticCurveTo(point[142], point[143], point[144], point[145]);
	ctx.quadraticCurveTo(point[146], point[147], point[148], point[149]);
	ctx.quadraticCurveTo(point[150], point[151], point[152], point[153]);
	ctx.quadraticCurveTo(point[154], point[155], point[156], point[157]);
	ctx.quadraticCurveTo(point[158], point[159], point[160], point[161]);
	ctx.quadraticCurveTo(point[162], point[163], point[164], point[165]);
	ctx.quadraticCurveTo(point[166], point[167], point[168], point[169]);
	ctx.lineTo(point[170], point[171]);
	ctx.quadraticCurveTo(point[172], point[173], point[174], point[175]);
	ctx.quadraticCurveTo(point[176], point[177], point[178], point[179]);
	ctx.quadraticCurveTo(point[180], point[181], point[182], point[183]);
	ctx.quadraticCurveTo(point[184], point[185], point[186], point[187]);
	ctx.quadraticCurveTo(point[188], point[189], point[190], point[191]);
	ctx.quadraticCurveTo(point[192], point[193], point[194], point[195]);
	ctx.quadraticCurveTo(point[196], point[197], point[198], point[199]);
	ctx.quadraticCurveTo(point[200], point[201], point[202], point[203]);
	ctx.lineTo(point[204], point[205]);
	ctx.closePath();
	ctx.fill();


	//front grass fill
	point =  [0.0, 206, 14.9981, 162.05849999999998, 25.9967, 204.05329999999998, 41.9947, 190.055, 42.9946, 204.05329999999998, 59.9925, 193.0546, 59.9925, 206.053, 75.9905, 197.0541, 75.9905, 208.0528, 95.988, 177.0566, 98.9876, 213.0521, 115.9855, 212.0523, 109.9862, 224.05079999999998, 120.9849, 216.05180000000001, 120.9849, 230.05, 146.9816, 233.0496, 132.9834, 251.04739999999998, 149.9812, 255.0469, 141.9822, 264.0458, 154.9806, 268.0453, 146.9816, 274.0445, 154.9806, 270.045, 155.9805, 279.0439, 174.9781, 256.0468, 173.9782, 281.0436, 178.9776, 257.0466, 187.9765, 271.0449, 208.9739, 245.04809999999998, 218.9726, 268.0453, 228.9714, 256.0468, 230.9711, 271.0449, 238.9701, 257.0466, 241.9697, 270.045, 239.97, 240.04880000000003, 254.9681, 256.0468, 267.9665, 221.05110000000002, 280.9649, 249.0476, 289.9637, 236.04930000000002, 295.963, 247.04790000000003, 303.962, 226.0505, 312.9609, 240.04880000000003, 322.9596, 210.0525, 332.9584, 227.05040000000002, 360.9549, 198.05399999999997, 359.955, 236.04930000000002, 383.952, 216.05180000000001, 376.9529, 238.04899999999998, 394.9506, 233.0496, 387.9515, 249.0476, 404.9494, 238.04899999999998, 404.9494, 252.0473, 419.9475, 255.0469, 415.948, 265.0456, 425.9467, 256.0468, 427.9465, 267.0454, 461.9422, 247.04790000000003, 448.9439, 280.0438, 452.9434, 274.0445, 457.9427, 278.044, 447.944, 241.04860000000002, 474.9406, 268.0453, 478.9401, 250.0475, 487.939, 262.046, 491.9385, 235.0494, 506.9366, 248.0478, 510.9361, 209.05259999999998, 521.9347, 232.0498, 545.9317, 206.053, 547.9315, 233.0496, 571.9285, 208.0528, 573.9282, 231.04989999999998, 594.9256, 222.051, 587.9265, 243.04840000000002, 603.9245, 245.04809999999998, 597.9252, 253.0471, 609.9237, 247.04790000000003, 609.9237, 255.0469, 609.9237, 263.0459, 613.9232, 226.0505, 623.922, 249.0476, 631.921, 224.05079999999998, 640.9199, 243.04840000000002, 649.9187, 204.05329999999998, 665.9167, 235.0494, 677.9152, 218.05149999999998, 681.9147, 234.04950000000002, 693.9132, 225.05059999999997, 697.9127, 236.04930000000002, 699.9125, 214.05200000000002, 705.9117, 229.0501, 718.9101, 209.05259999999998, 720.9099, 225.05059999999997, 735.908, 220.05130000000003, 730.9086, 231.04989999999998, 740.9074, 226.0505, 744.9069, 238.04899999999998, 750.9061, 217.0516, 757.9052, 230.05, 777.9027, 211.05239999999998, 778.9026, 229.0501, 803.8995, 217.0516, 800, 238.04899999999998, 800, 415, 0.0, 415, 0.0, 206] ;
	point = draw_back_shift_point(point,shiftval);
	ctx.fillStyle="rgb(129,171,96)";
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
	ctx.quadraticCurveTo(point[66], point[67], point[68], point[69]);
	ctx.quadraticCurveTo(point[70], point[71], point[72], point[73]);
	ctx.quadraticCurveTo(point[74], point[75], point[76], point[77]);
	ctx.quadraticCurveTo(point[78], point[79], point[80], point[81]);
	ctx.quadraticCurveTo(point[82], point[83], point[84], point[85]);
	ctx.quadraticCurveTo(point[86], point[87], point[88], point[89]);
	ctx.quadraticCurveTo(point[90], point[91], point[92], point[93]);
	ctx.quadraticCurveTo(point[94], point[95], point[96], point[97]);
	ctx.quadraticCurveTo(point[98], point[99], point[100], point[101]);
	ctx.quadraticCurveTo(point[102], point[103], point[104], point[105]);
	ctx.quadraticCurveTo(point[106], point[107], point[108], point[109]);
	ctx.quadraticCurveTo(point[110], point[111], point[112], point[113]);
	ctx.quadraticCurveTo(point[114], point[115], point[116], point[117]);
	ctx.quadraticCurveTo(point[118], point[119], point[120], point[121]);
	ctx.quadraticCurveTo(point[122], point[123], point[124], point[125]);
	ctx.quadraticCurveTo(point[126], point[127], point[128], point[129]);
	ctx.quadraticCurveTo(point[130], point[131], point[132], point[133]);
	ctx.quadraticCurveTo(point[134], point[135], point[136], point[137]);
	ctx.quadraticCurveTo(point[138], point[139], point[140], point[141]);
	ctx.quadraticCurveTo(point[142], point[143], point[144], point[145]);
	ctx.quadraticCurveTo(point[146], point[147], point[148], point[149]);
	ctx.quadraticCurveTo(point[150], point[151], point[152], point[153]);
	ctx.bezierCurveTo(point[154], point[155], point[156], point[157], point[158], point[159]);
	ctx.quadraticCurveTo(point[160], point[161], point[162], point[163]);
	ctx.quadraticCurveTo(point[164], point[165], point[166], point[167]);
	ctx.quadraticCurveTo(point[168], point[169], point[170], point[171]);
	ctx.quadraticCurveTo(point[172], point[173], point[174], point[175]);
	ctx.quadraticCurveTo(point[176], point[177], point[178], point[179]);
	ctx.quadraticCurveTo(point[180], point[181], point[182], point[183]);
	ctx.quadraticCurveTo(point[184], point[185], point[186], point[187]);
	ctx.quadraticCurveTo(point[188], point[189], point[190], point[191]);
	ctx.quadraticCurveTo(point[192], point[193], point[194], point[195]);
	ctx.quadraticCurveTo(point[196], point[197], point[198], point[199]);
	ctx.quadraticCurveTo(point[200], point[201], point[202], point[203]);
	ctx.lineTo(point[204], point[205]);
	ctx.lineTo(point[206], point[207]);
	ctx.lineTo(point[208], point[209]);
	ctx.fill();
	
	
	// back grass stroke
	point =  [0.0, 161.0586, 22.9971, 153.0596, 18.9976, 164.05829999999997, 42.9946, 154.0595, 39.995, 165.05810000000002, 60.9924, 152.0598, 58.9926, 163.0584, 87.989, 141.0611, 88.9889, 158.05900000000003, 115.9855, 150.06, 108.9864, 161.0586, 125.9842, 149.06009999999998, 134.9831, 162.05849999999998, 159.98, 149.06009999999998, 152.9809, 163.0584, 166.9791, 154.0595, 162.9796, 162.05849999999998, 179.9775, 153.0596, 175.978, 167.05790000000002, 182.9771, 163.0584, 186.9766, 169.05759999999998, 198.9751, 161.0586, 195.9755, 169.05759999999998, 213.9732, 160.05880000000002, 210.9736, 172.0573, 233.9707, 157.0591, 227.9715, 172.0573, 242.9696, 155.05939999999998, 245.9692, 171.05739999999997, 264.9669, 153.0596, 260.9674, 170.0575, 273.9657, 157.0591, 271.966, 169.05759999999998, 301.9622, 153.0596, 297.9627, 166.058, 322.9596, 157.0591, 314.9606, 171.05739999999997, 336.9579, 163.0584, 333.9582, 170.0575, 350.9561, 151.05990000000003, 351.956, 162.05849999999998, 393.9507, 146.0605, 378.9526, 175.05689999999998, 401.9497, 161.0586, 395.9505, 180.05630000000002, 420.9474, 164.05829999999997, 415.948, 179.0564, 434.9456, 165.05810000000002, 437.9452, 175.05689999999998, 463.942, 149.06009999999998, 463.942, 164.05829999999997, 483.9395, 151.05990000000003, 478.9401, 168.0578, 499.9375, 163.0584, 496.9379, 176.0568, 503.937, 157.0591, 516.9354, 172.0573, 531.9335, 164.05829999999997, 526.9341, 176.0568, 535.933, 160.05880000000002, 536.9329, 171.05739999999997, 565.9292, 147.06040000000002, 562.9296, 162.05849999999998, 588.9264, 146.0605, 583.927, 162.05849999999998, 617.9227, 153.0596, 613.9232, 163.0584, 632.9209, 147.06040000000002, 633.9207, 162.05849999999998, 649.9187, 155.05939999999998, 646.9191, 167.05790000000002, 666.9166, 149.06009999999998, 670.9161, 161.0586, 700.9124, 145.06060000000002, 695.913, 158.05900000000003, 720.9099, 145.06060000000002, 725.9092, 157.0591, 741.9072, 146.0605, 738.9076, 158.05900000000003, 759.905, 141.0611, 759.905, 153.0596, 766.9041, 141.0611, 776.9029, 150.06, 805.8992, 133.0621, 800, 161.0586, 800, 420.0274, 776.9029, 417.02660000000003, 744.9069, 417.02660000000003, 619.9225, 411.0274, 604.9244, 417.02660000000003, 553.9307, 422.026, 504.9369, 413.0271, 433.9457, 413.0271, 397.9502, 415.0269, 316.9604, 425.0256, 285.9642, 416.0268, 198.9751, 414.027, 172.9784, 416.0268, 88.9889, 421.02610000000004, 53.9932, 414.027, 3.9995, 417.02660000000003, 0, 420.0263, 0.0, 156.0586] ;
	point = draw_back_shift_point(point,shiftval);
	ctx.fillStyle="rgb(171,170,62)";
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
	ctx.quadraticCurveTo(point[66], point[67], point[68], point[69]);
	ctx.quadraticCurveTo(point[70], point[71], point[72], point[73]);
	ctx.quadraticCurveTo(point[74], point[75], point[76], point[77]);
	ctx.quadraticCurveTo(point[78], point[79], point[80], point[81]);
	ctx.quadraticCurveTo(point[82], point[83], point[84], point[85]);
	ctx.quadraticCurveTo(point[86], point[87], point[88], point[89]);
	ctx.quadraticCurveTo(point[90], point[91], point[92], point[93]);
	ctx.quadraticCurveTo(point[94], point[95], point[96], point[97]);
	ctx.quadraticCurveTo(point[98], point[99], point[100], point[101]);
	ctx.quadraticCurveTo(point[102], point[103], point[104], point[105]);
	ctx.quadraticCurveTo(point[106], point[107], point[108], point[109]);
	ctx.quadraticCurveTo(point[110], point[111], point[112], point[113]);
	ctx.quadraticCurveTo(point[114], point[115], point[116], point[117]);
	ctx.quadraticCurveTo(point[118], point[119], point[120], point[121]);
	ctx.quadraticCurveTo(point[122], point[123], point[124], point[125]);
	ctx.quadraticCurveTo(point[126], point[127], point[128], point[129]);
	ctx.quadraticCurveTo(point[130], point[131], point[132], point[133]);
	ctx.quadraticCurveTo(point[134], point[135], point[136], point[137]);
	ctx.quadraticCurveTo(point[138], point[139], point[140], point[141]);
	ctx.quadraticCurveTo(point[142], point[143], point[144], point[145]);
	ctx.quadraticCurveTo(point[146], point[147], point[148], point[149]);
	ctx.quadraticCurveTo(point[150], point[151], point[152], point[153]);
	ctx.quadraticCurveTo(point[154], point[155], point[156], point[157]);
	ctx.quadraticCurveTo(point[158], point[159], point[160], point[161]);
	ctx.quadraticCurveTo(point[162], point[163], point[164], point[165]);
	ctx.quadraticCurveTo(point[166], point[167], point[168], point[169]);
	ctx.moveTo(point[170], point[171]);
	ctx.quadraticCurveTo(point[172], point[173], point[174], point[175]);
	ctx.quadraticCurveTo(point[176], point[177], point[178], point[179]);
	ctx.quadraticCurveTo(point[180], point[181], point[182], point[183]);
	ctx.quadraticCurveTo(point[184], point[185], point[186], point[187]);
	ctx.quadraticCurveTo(point[188], point[189], point[190], point[191]);
	ctx.quadraticCurveTo(point[192], point[193], point[194], point[195]);
	ctx.quadraticCurveTo(point[196], point[197], point[198], point[199]);
	ctx.quadraticCurveTo(point[200], point[201], point[202], point[203]);
	ctx.stroke();

	// floor shape stroke
	point =  [37.9952, 554.0095, 70.9911, 543.0109, 88.9889, 553.0096, 134.9831, 516.0143, 158.9801, 511.0149, 160.9799, 516.0143, 196.9754, 558.009, 244.9694, 555.0094, 251.9685, 566.008, 275.9655, 595.0044, 401.9497, 600.0038, 409.9487, 602.0035, 403.9495, 538.0115, 424.9469, 544.0108, 502.9371, 540.0113, 540.9324, 554.0095, 580.9274, 553.0096, 585.9267, 558.009, 711.911, 494.017, 736.9079, 485.0181, 741.9072, 494.017] ;
	point = draw_back_shift_point(point,shiftval);
	ctx.strokeStyle="rgb(0,0,0)";
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[6], point[7]);
	ctx.quadraticCurveTo(point[8], point[9], point[10], point[11]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[12], point[13]);
	ctx.quadraticCurveTo(point[14], point[15], point[16], point[17]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[18], point[19]);
	ctx.quadraticCurveTo(point[20], point[21], point[22], point[23]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[24], point[25]);
	ctx.quadraticCurveTo(point[26], point[27], point[28], point[29]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[30], point[31]);
	ctx.quadraticCurveTo(point[32], point[33], point[34], point[35]);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(point[36], point[37]);
	ctx.quadraticCurveTo(point[38], point[39], point[40], point[41]);
	ctx.stroke();


	point =  [1.9997, 237.05329999999998, 9.9987, 156.0593, 26.9966, 204.05329999999998, 36.9954, 191.05489999999998, 43.9945, 203.0534, 59.9925, 191.05489999999998, 61.9922, 208.0528, 72.9909, 194.05450000000002, 75.9905, 208.0528, 92.9884, 179.0564, 97.9877, 212.0523, 112.9859, 206.053, 108.9864, 223.0509, 125.9842, 215.0519, 119.985, 232.0498, 139.9825, 231.04989999999998, 133.9832, 249.0476, 145.9817, 251.04739999999998, 140.9824, 265.0456, 151.981, 265.0456, 141.9822, 274.0445, 149.9812, 267.0454, 152.9809, 275.0444, 177.9777, 260.0463, 172.9784, 283.0434, 196.9754, 283.0434, 181.9772, 301.0411, 193.9757, 300.0413, 187.9765, 308.0403, 217.9727, 305.0406, 203.9745, 323.0384, 217.9727, 318.039, 219.9725, 328.0378] ;
	point = draw_back_shift_point(point,shiftval);
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
	ctx.stroke();
	
	point =  [177.9777, 284.0433, 179.9775, 254.04700000000003, 191.976, 274.0445, 201.9747, 242.0485, 214.9731, 268.0453, 232.9709, 256.0468, 231.971, 275.0444, 234.9706, 263.0459, 242.9696, 272.0448, 239.97, 235.0494, 255.968, 260.0463, 264.9669, 219.0514, 279.965, 252.0473, 290.9636, 239.0489, 296.9629, 249.0476, 296.9629, 231.04989999999998, 309.9612, 243.04840000000002, 327.959, 206.053, 331.9585, 229.0501, 353.9557, 195.0544, 360.9549, 234.04950000000002, 384.9519, 217.0516, 379.9525, 238.04899999999998, 394.9506, 232.0498, 389.9512, 249.0476, 404.9494, 243.04840000000002, 404.9494, 255.0469, 418.9476, 252.0473, 414.9481, 264.0458, 427.9465, 257.0466, 427.9465, 268.0453, 457.9427, 250.0475, 446.9441, 282.0435, 473.9407, 278.044, 458.9426, 296.0418, 469.9412, 303.0409, 459.9425, 313.0396] ;
	point = draw_back_shift_point(point,shiftval);
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
	ctx.quadraticCurveTo(point[66], point[67], point[68], point[69]);
	ctx.quadraticCurveTo(point[70], point[71], point[72], point[73]);
	ctx.stroke();


	point =  [455.943, 280.0438, 449.9437, 235.0494, 474.9406, 266.0455, 477.9402, 249.0476, 489.9387, 262.046, 490.9386, 234.04950000000002, 505.9367, 247.04790000000003, 507.9365, 211.05239999999998, 524.9344, 236.04930000000002, 545.9317, 206.053, 547.9315, 231.04989999999998, 570.9286, 209.05259999999998, 571.9285, 232.0498, 600.9249, 222.051, 588.9264, 247.04790000000003, 604.9244, 241.04860000000002, 597.9252, 254.04700000000003, 616.9229, 256.0468, 608.9239, 269.0451, 617.9227, 265.0456, 617.9227, 279.0439, 640.9199, 269.0451, 634.9206, 281.0436, 656.9179, 264.0458, 648.9189, 299.0414, 656.9179, 292.0423, 658.9176, 310.04, 669.9162, 308.0403, 665.9167, 319.0389, 676.9154, 309.0401, 678.9151, 318.039] ;
	point = draw_back_shift_point(point,shiftval);
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
	ctx.stroke();
	

	point =  [608.9239, 256.0468, 612.9234, 229.0501, 625.9217, 246.048, 627.9215, 228.0503, 639.92, 243.04840000000002, 643.9195, 200.05380000000002, 665.9167, 235.0494, 681.9147, 219.0514, 680.9149, 236.04930000000002, 685.9142, 222.051, 692.9134, 233.0496, 699.9125, 210.0525, 706.9116, 225.05059999999997, 719.91, 215.0519, 718.9101, 225.05059999999997, 732.9084, 216.05180000000001, 728.9089, 230.05, 742.9071, 222.051, 744.9069, 236.04930000000002, 748.9064, 211.05239999999998, 758.9051, 228.0503, 779.9025, 208.0528, 782.9021, 228.0503, 808.8989, 216.05180000000001, 796.9004, 235.0494] ;
	point = draw_back_shift_point(point,shiftval);
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
	ctx.stroke();
}


function draw_background(){
	
	var gradient = ctx.createLinearGradient(0,0,0,300);
	gradient.addColorStop(0,"rgba(108,140,232,1.0)");
	gradient.addColorStop(1,"rgba(108,140,232,0)");
	ctx.fillStyle=gradient;
	ctx.fillRect(0,0,800,300);
	
	var shift = ( time / 1000 * 0.5 * 800 ) % 800;
	
	if ( body_walk_dir == 0 ) {
		draw_back_dup(0);
	}
	else if ( body_walk_dir == 1 ) {
		draw_back_dup(shift-800);
		draw_back_dup(shift);
	}
	else if ( body_walk_dir == 2 ) {
		draw_back_dup(800-shift);
		draw_back_dup(-shift);
	}
}

function draw_front(){
	time += time_interval;
	iniCanvas();
	draw_background();
	if ( body_walk_dir == 0 ) {
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
		draw_ddam();
		draw_redface();
		draw_mouse();
	}
	else {
		draw_side_tail();
		draw_side_leftarm();
		draw_side_leftleg();
		draw_side_body();
		draw_side_eye();
		draw_side_shell();
		draw_side_rightarm();
		draw_side_rightleg();
	}
}
