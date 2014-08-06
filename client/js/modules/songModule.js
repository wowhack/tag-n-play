var SONGMODULE = (function() {
  var my = {};
    my.newSongModule= function(songID, songTitle, artistTitle){
      return ('<li id="'+songID+'"class="tagPageListItem notSelectable" onclick="song_click(this)"><div><span class="tagPageListItemSpan">'+songTitle+
        '</span><span class="tagPageListItemSpan">'+artistTitle+'</span></div></li>');
      //return {songTitle:songTitle, artist:artist};  
    };
    
    return my;
}());