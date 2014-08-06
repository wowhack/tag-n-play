function allowDrop(ev) {
    ev.preventDefault();
}

var source;

function drag(ev) {
    source = ev.target;
}

var column1 = [];
var column2 = [];
var column3 = [];

function drop(ev) {
    ev.preventDefault();
    //ev.target.innerHTML = source.innerHTML;
    
    var div = document.createElement("div");
    div.setAttribute('class', 'trackBlock contentBlock notSelectable');
    div.innerHTML = source.innerHTML;
    
    var verticalTrack = ev.target.parentNode;
    
    if(verticalTrack.id == "vt1")
        column1.push(source.innerHTML);
    else if(verticalTrack.id == "vt2")
        column2.push(source.innerHTML);
    else if(verticalTrack.id == "vt3")
        column3.push(source.innerHTML);
    
    verticalTrack.removeChild(ev.target);
    verticalTrack.appendChild(div);
    verticalTrack.appendChild(ev.target);
}