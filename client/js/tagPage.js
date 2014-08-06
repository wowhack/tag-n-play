
function appendSongsToDisplayArea(list) {
    var ul = document.getElementById("tagPageList");    
    var listItems = $('#tagPageList li');
    for(var i = 0; i<listItems.length;i++){
        listItems[i].remove();
    }
      
    if(list !== null){
        list.forEach(function(obj){
        
            var module = SONGMODULE.newSongModule(obj.id, obj.name, obj.artists[0].name);
        
            $('#tagPageList').append(module);
        })
    }
    
    $(function() {
        $(".tagPageListItem").on("click",function(square) {
            console.log('clicked on ' + $(square));
        });
    });
}

function appendPlaylistsToDisplayArea(list) {
    var ul = document.getElementById("tagPageList");    
    var listItems = $('#tagPageList li');
    for(var i = 0; i<listItems.length;i++){
        listItems[i].remove();
    }
      
    if(list !== null){
        list.forEach(function(obj){
        
            var module = PLAYLISTMODULE.newPlaylistModule(obj.id, obj.name);
        
            $('#tagPageList').append(module);
        })
    }
    
    $(function() {
        $(".tagPageListItem").on("click",function(square) {
            console.log('clicked on ' + $(square));
        });
    });
}



var SELECTED_COLOR = "#373937";//"#188A88";
var DESELECTED_COLOR = "#202220";
var clicked = '0';

function tag_browse_click(e) {
    clicked = e;
    if(e == '0') {
        document.getElementById("tagBrowseYourMusic").style.backgroundColor = SELECTED_COLOR;
        document.getElementById("tagBrowseYourPlaylists").style.backgroundColor = DESELECTED_COLOR;
        document.getElementById("tagBrowseAllMusic").style.backgroundColor = DESELECTED_COLOR;
        document.getElementById("tagBrowseYourMusic").style.textDecoration = "underline";
        document.getElementById("tagBrowseYourPlaylists").style.textDecoration = "none";
        document.getElementById("tagBrowseAllMusic").style.textDecoration = "none";
        getYourSongs();
        
    } else if(e == '1') {
        document.getElementById("tagBrowseYourMusic").style.backgroundColor = DESELECTED_COLOR;
        document.getElementById("tagBrowseYourPlaylists").style.backgroundColor = SELECTED_COLOR;
        document.getElementById("tagBrowseAllMusic").style.backgroundColor = DESELECTED_COLOR;
        document.getElementById("tagBrowseYourMusic").style.textDecoration = "none";
        document.getElementById("tagBrowseYourPlaylists").style.textDecoration = "underline";
        document.getElementById("tagBrowseAllMusic").style.textDecoration = "none";
        console.log('playlists selected');
        getYourPlaylists();
        
    } else if(e == '2') {
        document.getElementById("tagBrowseYourMusic").style.backgroundColor = DESELECTED_COLOR;
        document.getElementById("tagBrowseYourPlaylists").style.backgroundColor = DESELECTED_COLOR;
        document.getElementById("tagBrowseAllMusic").style.backgroundColor = SELECTED_COLOR;
        document.getElementById("tagBrowseYourMusic").style.textDecoration = "none";
        document.getElementById("tagBrowseYourPlaylists").style.textDecoration = "none";
        document.getElementById("tagBrowseAllMusic").style.textDecoration = "underline";
    }
}

function tag_browse_mouse_enter(e) {
    if(e == '0')
        document.getElementById("tagBrowseYourMusic").style.backgroundColor = SELECTED_COLOR;
    else if(e == '1')
        document.getElementById("tagBrowseYourPlaylists").style.backgroundColor = SELECTED_COLOR;
    else if(e == '2')
        document.getElementById("tagBrowseAllMusic").style.backgroundColor = SELECTED_COLOR;
}

function tag_browse_mouse_leave(e) {
    if(e == '0' && e != clicked)
        document.getElementById("tagBrowseYourMusic").style.backgroundColor = DESELECTED_COLOR;
    else if(e == '1' && e != clicked)
        document.getElementById("tagBrowseYourPlaylists").style.backgroundColor = DESELECTED_COLOR;
    else if(e == '2' && e != clicked)
        document.getElementById("tagBrowseAllMusic").style.backgroundColor = DESELECTED_COLOR;
}

var DESCRIPTION_TEXT = "Enter search text here...";
var UNFOCUSED_FOREGROUND = "rgb(170, 170, 170)";

function tag_search_focused() {
    if(document.getElementById("tagSearch").value == DESCRIPTION_TEXT && document.getElementById("tagSearch").style.color == UNFOCUSED_FOREGROUND) {
        document.getElementById("tagSearch").value = "";
        document.getElementById("tagSearch").style.color = "#FFFFFF";
    }
}

function tag_search_unfocused() {
    if(document.getElementById("tagSearch").value == "") {
        document.getElementById("tagSearch").value = DESCRIPTION_TEXT;
        document.getElementById("tagSearch").style.color = UNFOCUSED_FOREGROUND;
    }
}

function getYourSongs(){
    var list = [];
    $.ajax({
        url: "/rest/spotify/your-music",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            //console.log('success');
            //console.log('data: ' + data.user);
            console.log('success getYourSongs()');
            data.items.forEach(function(obj){
                list.push(obj.track);
            });
        }
    });
    appendSongsToDisplayArea(list);
}

function getYourPlaylists(){
    var list = [];
    $.ajax({
        url: "/rest/spotify/playlists",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            //console.log('success');
            //console.log('data: ' + data.user);
            console.log('success getYourPlaylists()');
            data.items.forEach(function(obj){
                list.push(obj);
            });
        }
    });
    appendPlaylistsToDisplayArea(list);
}