var CRITERIA = (function() {
  var my = {};
    my.newCriteria = function(critName,critType,critCombination){
      return {name:critName,type:critType,combination:critCombination};  
    };
    
    return my;
}());