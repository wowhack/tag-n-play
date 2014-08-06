var snapper = new Snap({
  element: document.getElementById('content')
});

function toggle_click_left() {
    if( snapper.state().state=="left" ){
        snapper.close();
    } else {
        snapper.open('left');
    }
}

function toggle_click_right() {
    if( snapper.state().state=="right" ){
        snapper.close();
    } else {
        snapper.open('right');
    }
}