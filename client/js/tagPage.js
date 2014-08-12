var playlistElements = [];
var songElements = [];

function appendSongsToDisplayArea(list) {
    songElements = [];
    
    var ul = document.getElementById("tagPageList");    
    var listItems = $('#tagPageList li');
    for(var i = 0; i<listItems.length;i++){
        listItems[i].remove();
    }
      
    if(list !== null){
        list.forEach(function(obj){
        
            var module = SONGMODULE.newSongModule(obj.id, obj.name, obj.artists[0].name);
        
            $('#tagPageList').append(module);
            var search = '#'+obj.id;
            
            songElements.push($(search)[0]);
        })
    }
    
    update_tag_visuals();
}

function appendPlaylistsToDisplayArea(list) {
    playlistElements = [];
    
    var ul = document.getElementById("tagPageList");    
    var listItems = $('#tagPageList li');
    for(var i = 0; i<listItems.length;i++){
        listItems[i].remove();
    }
      
    if(list !== null){
        list.forEach(function(obj){
        
            var module = PLAYLISTMODULE.newPlaylistModule(obj.id, obj.name);
        
            $('#tagPageList').append(module);
            
            //playlistElements.push(module);
        })
    }
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

function deselect_playlists() {
    playlistElements.forEach(function(obj) {
        obj.style.border = "";
        obj.style.borderBottom = "5px solid #FF5900";
    });
}

function deselect_songs() {
    songElements.forEach(function(obj) {
        obj.style.border = "";
        obj.style.borderBottom = "5px solid #FF5900";
    });
}

function select_playlists(elements) {
    playlistElements.forEach(function(obj) {
        elements.forEach(function(obj2) {
           if(obj.id == obj2)
                obj.style.border = "5px solid #88A818";
        });
    });
}

function select_songs(elements) {
    songElements.forEach(function(obj) {
        elements.forEach(function(obj2) {
            //alert("obj: " + obj.id + "    obj2: " + obj2);
           if("spotify:track:" + obj.id == obj2)
                obj.style.border = "5px solid #88A818";
        });
    });
}

function song_click(song) {
    if(selectedTag !== undefined && selectedTag !== '') {
        var urlstring = "/rest/tags/add";
        tags.forEach(function(obj){
            if(obj.name == selectedTag) {
                obj.songs.forEach(function(s){
                if(s == "spotify:track:" + song.id) {
                    urlstring = "/rest/tags/remove";
                }
            });   
            }
        });
        $.ajax({
            url: urlstring,
            type: 'post',
            async: false,
            dataType: 'json',
            data: {name: selectedTag,
                   songs: ["spotify:track:" + song.id]
            },
            success: function(data){
               //song.style.border = "2px solid #88A818";
               update_tag_visuals();
            }
        });
    }
}

function playlist_click(playlist) {
    if(selectedTag !== undefined && selectedTag !== ''){
        $.ajax({
            url: "/rest/tags/add-playlists",
            type: 'post',
            async: false,
            dataType: 'json',
            data: {name: selectedTag,
                   songs: [playlist.id]
            },
            success: function(data){
               //console.log('success');
               //console.log('data: ' + data.user);
               //alert(data.tags.length);
            }
        });
    }
}

function update_tag_visuals() {
    deselect_songs();
    deselect_playlists();
    
    $.ajax({
        url: "/rest/user",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(data){
            console.log('success tags');
            //console.log('data: ' + data.user);
            //alert(data.username);
            tags = [];
            data.tags.forEach(function(tag){
                tags.push(tag);
            })
            if(selectedTag !== undefined && selectedTag !== ''){
                tags.forEach(function(obj){
                    if(obj.name == selectedTag) {
                        select_songs(obj.songs);
                    }
                });
            }
            //appendToPanel(tags);
        }
    });
}