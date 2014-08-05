var snapper = new Snap({
  element: document.getElementById('content')
});

function toggle_click() {
    console.log('clicked');
    if( snapper.state().state=="left" ){
        snapper.close();
    } else {
        snapper.open('left');
    }
}