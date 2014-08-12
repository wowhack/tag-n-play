
// $.ajax({
//     url: "/rest/tags/add",
//     type: 'post',
//     async: false,
//     dataType: 'json',
//     data: {name:'nu taggar vi',
//           songs: ['spotify:track:12JBx83Kp9rnkpYIXXZuxW','spotify:track:0rfkM4urw8BUanDNytnbyk',
//           'spotify:track:3HW030T8eqPs8wpsgZqCGM']
//     },
//     success: function(data){
//       //console.log('success');
//       //console.log('data: ' + data.user);
//       //alert(data.tags.length);
//     }
// });
// $.ajax({
//     url: "/rest/tags/add",
//     type: 'post',
//     async: false,
//     dataType: 'json',
//     data: {name:'nu taggar vi ännu mer',
//           songs: ['spotify:track:3HW030T8eqPs8wpsgZqCGM','spotify:track:3sWMdsje94ZBzveYISNGHg']
//     },
//     success: function(data){
//       //console.log('success');
//       //console.log('data: ' + data.user);
//       //alert(data.tags.length);
//     }
// });
// $.ajax({
//     url: "/rest/user/create-playlist",
//     type: 'post',
//     async: false,
//     dataType: 'json',
//     data: {
//         combinations:[COMBINATION.newCombination(
//             CRITERIA.newCriteria('nu taggar vi','tag',null),
//             CRITERIA.newCriteria('nu taggar vi ännu mer','tag',null),
//             'or')]
//     },
//     success: function(data){
//       //console.log('success');
//       //console.log('data: ' + data.user);
//       //alert(data.tags.length);
//     }
// });