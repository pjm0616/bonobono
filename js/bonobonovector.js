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
var face_axis = new Array();
var face_shake_degree;
var face_red;
var face_mouse_speed;

var body_axis = new Array();
var body_arm_left_axis = new Array();
var body_arm_right_axis = new Array();
var body_shake_degree, body_arm_degree;



function iniCanvas(){
	canvas=document.getElementById("test");
	ctx=canvas.getContext("2d");
	ctx.font = "20px Arial";
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
}

function resize_point(point){
	for( var i = 0 ; i < point.length ; i++ ) {
//		point[i] *= 0.8;
		point[i] += 50;
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
	draw_ddam();
	draw_redface();
	draw_mouse();
}
