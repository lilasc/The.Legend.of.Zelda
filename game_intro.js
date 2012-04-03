var intro;

function clear_scr(clr) {
	ctx.fillStyle = clr? clr : "#000";
	ctx.fillRect(0, 0, canvas_width, canvas_height);
}

//four main frame, two duplicate frame
var bg_anima_pos = new Array(
	3, 4,
	3 + 256 + 3, 4,
	3, 4 + 240 + 3,
	3 + 256 + 3, 4 + 240 + 3,
	3, 4 + 240 + 3,
	3 + 256 + 3, 4
);
var wf_timer;
var intro_anima = true;
function bg_anima() {
	if (typeof this.counter == "undefined")
		this.counter = 0;
	if (typeof this.cx == "undefined")
		this.cx = 0;
	
	ctx.drawImage(intro, bg_anima_pos[this.counter * 2], bg_anima_pos[this.counter * 2 + 1], canvas_width, canvas_height,
		0, 0, canvas_width, canvas_height);
	this.counter = (++this.counter % 6);
	
	this.cx++;
	wf_spray_anima();
	if (intro_anima)
		wf_timer = setTimeout(bg_anima, 300);
		
	if (cx == 10 * 3) {
		delete this.cx;
		delete this.counter;
		game_intro_text();
	}
}

var wf_bg_src = new Array(346, 513, 32, 64);
var wf_bg_dst = new Array(80, 182, 32, 64);
var wf_water_src = new Array(384, 519, 32, 17);
var wf_water_dst = new Array(80, 177, 32, 17);
var wf_spray_src = new Array(422, 520, 32, 9);
var wf_spray_dst = new Array(80, 170, 32, 9);
function wf_spray_anima() {
	if (typeof this.spc == "undefined") 
		this.spc = 0;
	if (typeof this.wtc == "undefined") 
		this.wtc = 0;
	//bg
	ctx.drawImage(intro, wf_bg_src[0], wf_bg_src[1], wf_bg_src[2], wf_bg_src[3],
		wf_bg_dst[0], wf_bg_dst[1], wf_bg_dst[2], wf_bg_dst[3]);
	//water
	ctx.drawImage(intro, wf_water_src[0], wf_water_src[1], wf_water_src[2], wf_water_src[3],
		wf_water_dst[0], wf_water_dst[1] + (this.wtc % 2) * 1, wf_water_dst[2], wf_water_dst[3]);
	ctx.drawImage(intro, wf_water_src[0], wf_water_src[1] + wf_water_src[3] * 1, wf_water_src[2], wf_water_src[3],
		wf_water_dst[0], wf_water_dst[1] + (10 + this.wtc * 10) % 64, wf_water_dst[2], wf_water_dst[3]);
	ctx.drawImage(intro, wf_water_src[0], wf_water_src[1] + wf_water_src[3] * 2, wf_water_src[2], wf_water_src[3],
		wf_water_dst[0], wf_water_dst[1] + (14 * 2 + this.wtc * 10) % 64, wf_water_dst[2], wf_water_dst[3]);
	ctx.drawImage(intro, wf_water_src[0], wf_water_src[1] + wf_water_src[3] * 2, wf_water_src[2], wf_water_src[3],
		wf_water_dst[0], wf_water_dst[1] + (16 * 3 + this.wtc * 10) % 64, wf_water_dst[2], wf_water_dst[3]);
	//spray
	ctx.drawImage(intro, 
		wf_spray_src[0], wf_spray_src[1] + this.spc * wf_spray_src[3], wf_spray_src[2], wf_spray_src[3],
		wf_spray_dst[0], wf_spray_dst[1], wf_spray_dst[2], wf_spray_dst[3]);

	this.spc = (++this.spc % 4);
	this.wtc = (++this.wtc % 10);
}


function game_intro_anima() {
	clear_scr();
	bg_anima();
}

var clr = new Array("yellow", "green", "gray", "blue");
function text_anima() {
	if (typeof this.text_c == "undefined")
		this.text_c = 0;
	if (typeof this.intro_text_y == "undefined")
		this.intro_text_y = canvas_height;

	if (this.text_c < 11) {
		ctx.globalAlpha = this.text_c / 20;
		ctx.fillStyle = clr[this.text_c % 4];
		ctx.fillRect(0, 0, canvas_width, canvas_height);
		setTimeout(text_anima, 100);
	}
	else if (this.text_c == 11) {
		ctx.globalAlpha = 1;
		clear_scr();		
		setTimeout(text_anima, 500);
	}
	else if (this.text_c > 15) {
		ctx.drawImage(intro, 524, 14, 248, 826,
			4, intro_text_y, 248, 826);
		ctx.drawImage(intro, 655 + 8 * (this.text_c % 2), 959, 8, 8,
			74, intro_text_y + 242, 8, 8);
		ctx.drawImage(intro, 633 + 11 * (this.text_c % 2), 951, 11, 16,
			72, intro_text_y + 284, 11, 16);
		if (this.text_c % 2)
			ctx.drawImage(intro, 697, 337, 8, 16, 73, intro_text_y + 324, 8, 16);
		ctx.drawImage(intro, 600, 840, 80, 110, 80 + 10, intro_text_y + 900, 80, 110);
		if (this.text_c % 2)
			ctx.drawImage(intro, 623, 958, 10, 10, 80 + 10 + 34, intro_text_y + 900 + 2, 10, 10);
		
		intro_text_y -= 1;
		if (intro_text_y == 20)
			setTimeout(text_anima, 3000);
		else if (intro_text_y == -825) {
			delete this.text_c;
			delete this.intro_text_y;
			intro_anima = true;
			setTimeout(game_intro_anima, 3000);
			return;
		}
		else
			setTimeout(text_anima, 50);
	}
	else {
		setTimeout(text_anima, 50);
	}
		
	this.text_c++;
}

function game_intro_text() {
	intro_anima = false;
	clearTimeout(wf_timer);
	text_anima();
}

function game_intro() {
	intro = new Image();
	intro.src = "game_intro.png";
	bg_music = play_sound("game_intro.ogg", true);
	game_intro_anima();
}