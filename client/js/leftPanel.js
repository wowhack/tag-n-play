var tags = [];

$.ajax({
    url: "/rest/user",
    type: 'GET',
    async: false,
    dataType: 'json',
    success: function(data){
        console.log('success tags');
        //console.log('data: ' + data.user);
        //alert(data.username);
        data.tags.forEach(function(tag){
            tags.push(tag);
        })
    }
})


console.log(tags);

var ul = document.getElementById("leftPanelList");    
    
tags.forEach(function(tag){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(tag));
    li.setAttribute('class', 'leftPanelListItem');
    ul.appendChild(li);
})

$(function() {
    $(".leftPanelListItem").on("click",function(square) {
        console.log('clicked on ' + $(square));
    });
});