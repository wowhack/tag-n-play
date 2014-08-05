window.onload = load;

function load() {
    mode_click(0);
}

var SMALL_FONT_SIZE = "18px";
var MEDIUM_FONT_SIZE = "26px";
var LARGE_FONT_SIZE = "35px";

function mode_click(e) {
    if(e == '0') {
        document.getElementById("tagMenuItem").style.fontSize = LARGE_FONT_SIZE;
        document.getElementById("playMenuItem").style.fontSize = SMALL_FONT_SIZE;
        document.getElementById("tagMenuItem").style.color = "#FF5900";
        document.getElementById("playMenuItem").style.color = "#AF0900";
    } else if(e == '1') {
        document.getElementById("tagMenuItem").style.fontSize = SMALL_FONT_SIZE;
        document.getElementById("playMenuItem").style.fontSize = LARGE_FONT_SIZE;
        document.getElementById("tagMenuItem").style.color = "#AF0900";
        document.getElementById("playMenuItem").style.color = "#FF5900";
    }
}

function mode_mouse_enter(e) {
    if(e == '0' && document.getElementById("tagMenuItem").style.fontSize == SMALL_FONT_SIZE)
        document.getElementById("tagMenuItem").style.fontSize = MEDIUM_FONT_SIZE;
    else if(e == '1' && document.getElementById("playMenuItem").style.fontSize == SMALL_FONT_SIZE)
        document.getElementById("playMenuItem").style.fontSize = MEDIUM_FONT_SIZE;
}

function mode_mouse_leave(e) {
    if(e == '0' && document.getElementById("tagMenuItem").style.fontSize == MEDIUM_FONT_SIZE)
        document.getElementById("tagMenuItem").style.fontSize = SMALL_FONT_SIZE;
    else if(e == '1' && document.getElementById("playMenuItem").style.fontSize == MEDIUM_FONT_SIZE)
        document.getElementById("playMenuItem").style.fontSize = SMALL_FONT_SIZE;
}