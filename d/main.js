const $ = require('jquery');

$('#reader').html5_qrcode(function(data){
    console.log(data);
   },
   function(error){
      console.log(error);
   }, function(videoError){
      console.log(videoError);
   }
);
