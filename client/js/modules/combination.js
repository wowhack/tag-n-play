var COMBINATION = (function() {
  var my = {};
    my.newCombination = function(c1,c2,typeOfComb){
      return {criterias:[c1,c2],combinationType:typeOfComb};  
    };
    
    return my;
}());