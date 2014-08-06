var tags = [];
$.ajax({
    url: "/rest/user",
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function(data){
        console.log('success tags');
        console.log('');
        //console.log('data: ' + data.user);
        //alert(data.username);
        data.tags.forEach(function(tag){
            tags.push(tag);
        })
        appendToPanel(tags);
        addPlayer(data);
    }
})
function addPlayer(data){
    var playerString = '<iframe src="https://embed.spotify.com/?uri=spotify:user:'+data.spotifyID+
        ':playlist:'+ data.playlistID+'" width="266" height="700" frameborder="0" allowtransparency="true"></iframe>';
    $('#playlistPreview').append(playerString);
}
function addTagToList() {
    var newTag = [];
    var tag = {name:''};
    
    tag.name = document.getElementById('leftPanelSearchbar').value;
    console.log('add '+ tag.name +' to list');
    if(tag.name.length >= 1){
        newTag.push(tag);
        appendToPanel(newTag);
    }
    document.getElementById('leftPanelSearchbar').value = '';
}


function appendToPanel(list){
    var currentListOfTags = [];
    var ul = document.getElementById("leftPanelList");    
    
    $(".leftPanelListItem").each(function(index) {
        //console.log( index + ": " + $( this ).text() );
        currentListOfTags.push( $(this).text());
    });
    
   
    var found = false;
    list.forEach(function(tag){
        currentListOfTags.forEach(function(currentTag){
            if(tag == currentTag){
                found = true;
            }
        })
        
        if(!found){
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(tag.name));
            li.setAttribute('class', 'leftPanelListItem');
            // draggable="true" ondragstart="drag(event)"
            // <li id="" dragable="" ondrag....="">
            li.setAttribute('draggable', 'true');
            li.setAttribute('ondragstart', 'drag(event)');
            li.setAttribute('onclick', 'tag_click(this)');
            ul.appendChild(li);
        }
        found = false;
    });
    /*
    $(function() {
        $(".leftPanelListItem").on("click",function(square) {
            console.log('clicked on ' + $(square));
        });
    });
    */
}

var selectedTag;
var tagSource;

function tag_click(e) {
    if(tagSource == e) {
        deselect_tag();
    } else {
        select_tag(e);
    }
}

function select_tag(tagsrc) {
    deselect_tag();
    tagSource = tagsrc;
    selectedTag = tagsrc.innerHTML;
    tagsrc.style.border="5px solid #88A818";
    //tagsrc.style.backgroundColor="#88A818";
    document.getElementById("tagInfoWrapper").innerHTML = "Click on an element to add it to the tag <span style='color: #88A818'>'" + selectedTag + "'";
    update_tag_visuals();
}

function deselect_tag() {
    if(tagSource !== "" && tagSource !== undefined)
        tagSource.style.border = "";
        //tagSource.style.backgroundColor = "";
    tagSource = "";
    selectedTag = "";
    document.getElementById("tagInfoWrapper").innerHTML = "";
    deselect_playlists();
    deselect_songs();
}