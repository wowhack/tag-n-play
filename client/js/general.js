window.onload = load;
window.onresize = position;

function load() {
    /*
    $.ajax({
        url: "/rest/spotify/playlists",
        type: 'get',
        async: false,
        dataType: 'json',
        success: function(data){
            //console.log('success');
            //console.log('data: ' + data.user);
            alert(data.length);
        }
    })
    */
    //  $.ajax({
    //     url: "/rest/tags/add",
    //     type: 'post',
    //     async: false,
    //     dataType: 'json',
    //     data: {name:'nyIgenTAggs',
    //             songs: ['spotify:track:12JBx83Kp9rnkpYIXXZuxW','spotify:track:0rfkM4urw8BUanDNytnbyk']
    //     },
    //     success: function(data){
    //         //console.log('success');
    //         //console.log('data: ' + data.user);
    //         alert(data.tags.length);
    //     }
    // })
    
    /*
    $.ajax({
        url: "/rest/user",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            //console.log('success');
            //console.log('data: ' + data.user);
            alert(data.username);
        }
    })*/
    
    position();
    mode_click(0);
    tag_browse_click(0);
    tag_search_unfocused();
}

function position() {
    var header = document.getElementById('header');
    var tagContainer = document.getElementById('tagContainer');
    var playContainer = document.getElementById('playContainer');
    var leftPanelCenter = document.getElementById('leftPanelCenter');
    var tagBrowseContent = document.getElementById("tagBrowseContent");
    var tagBrowseHeader = document.getElementById("tagBrowseHeader");
    var tagBrowseFooter = document.getElementById("tagBrowseFooter");
    var playContent = document.getElementById("playContent");
    
    if(window.innerHeight > 100){
        tagContainer.style.height = (window.innerHeight - header.offsetHeight) + "px";
        playContainer.style.height = (window.innerHeight - header.offsetHeight) + "px";
        leftPanelCenter.style.height = (window.innerHeight - header.offsetHeight) + "px";
        tagBrowseContent.style.height = (window.innerHeight - header.offsetHeight - tagBrowseFooter.offsetHeight - tagBrowseHeader.offsetHeight) + "px";
        playContent.style.height = (window.innerHeight - header.offsetHeight) + "px";
    }else{
        tagContainer.style.height = 0;
        playContainer.style.height = 0;
        leftPanelCenter.style.height = 0;
        tagBrowseContent.style.height = 0;
        playContent.style.height = 0;
    }
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
        document.getElementById("tagContainer").style.display = "block";
        document.getElementById("playContainer").style.display = "none";
    } else if(e == '1') {
        document.getElementById("tagMenuItem").style.fontSize = SMALL_FONT_SIZE;
        document.getElementById("playMenuItem").style.fontSize = LARGE_FONT_SIZE;
        document.getElementById("tagMenuItem").style.color = "#AF0900";
        document.getElementById("playMenuItem").style.color = "#FF5900";
        document.getElementById("tagContainer").style.display = "none";
        document.getElementById("playContainer").style.display = "block";
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

