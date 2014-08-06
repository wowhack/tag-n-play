var PLAYLISTMODULE = (function() {
    var my = {};
    my.newPlaylistModule = function(playlistID, title){
      return ('<li id="'+playlistID+'"class="tagPageListItem"><span class="tagPageListItemSpan">'+title+'</span></li>');
    };
    
    return my;
}());