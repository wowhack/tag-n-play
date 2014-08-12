function generatePlaylist(){
    for(index = 1; index < 4; index++) {
        var column;
        if(index == 1)
            column = column1;
        else if(index == 2)
            column = column2;
        else if(index == 3)
        column = column3;
        
        if(column.length > 0) {
            var combinationsToSend = [];

            var prev;
            var combination;
            if(column.length > 1) {
                for(i = 0; i < column.length; i++) {
                    if(i > 0 && prev === undefined) {
                        var criteria1 = CRITERIA.newCriteria(column[i-1], 'tag', null);
                        var criteria2 = CRITERIA.newCriteria(column[i], 'tag', null);
                        combination = COMBINATION.newCombination(criteria1, criteria2, 'or');
                        prev = combination;
                    } else if(i > 0) {
                        var criteria1 = CRITERIA.newCriteria("", 'combination', prev);
                        var criteria2 = CRITERIA.newCriteria(column[i], 'tag', null);
                        combination = COMBINATION.newCombination(criteria1, criteria2, 'or');
                        prev = combination;
                    }
                }
            } else {
                var criteria1 = CRITERIA.newCriteria(column[0], 'tag', null);
                var criteria2 = CRITERIA.newCriteria("", 'single', null);
                combination = COMBINATION.newCombination(criteria1, criteria2, 'single');
            }
            
            combinationsToSend.push(combination);
            //alert("BOM: "+ combinationsToSend.length);
            $.ajax({
                url: "/rest/user/create-playlist",
                type: 'post',
                async: false,
                dataType: 'json',
                data: {
                    combinations:combinationsToSend
                },
                success: function(data){
                  alert("Playlist created.");
                }
            });
        }
    }
}