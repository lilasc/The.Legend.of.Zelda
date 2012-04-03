//global values
var bg_music;
var canvas;
var ctx;
var canvas_width;
var canvas_height;

function play_sound(title, loop, volume) {
	var sound = new Audio(title);

	sound.loop = loop? loop : false;
	sound.volume = volume? volume : 1;
	sound.play();
	
	return sound;
}

function pause_sound(sound) {
	sound.pause();
}

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");  
	canvas_width = canvas.width;
	canvas_height = canvas.height;
	game_intro();
}

window.onload = init;