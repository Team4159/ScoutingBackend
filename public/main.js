const $ = require('jquery');
const fs = require('fs');
var csvData = [];

$('#reader').html5_qrcode(function(data){
    if(csvData.length == 0 || data != csvData[csvData.length-1]) {
      csvData.push(data);
      $('#logs').prepend("<li>" + data + "</li>");
    }
    $('#message').html("<p style='color:green'>Scanned: " + data + "</p>");
  },
  function(error){
    $('#message').html("<p style='color:red'>" + error + "</p>");
  }, function(videoError){
    $('#message').html("<p style='color:red'>" + videoError + "</p>");
  }
);

$('#saveManual').click( () => {
  var manualData = $('#manualCSVData').val();
  if(manualData != "") {
    csvData.push(manualData);
    $('#logs').prepend("<li>" + manualData + "</li>");
    $('#manualCSVData').val("");
  }
});

$('#saveFile').click( () => {
  var file = $('#fileName').val() + ".csv";
  if(file != ".csv") {
    var stream = fs.createWriteStream("./data/" + file);
    stream.once('open', function(fd) {
      for(var i = 0; i < csvData.length; i++) {
        stream.write(csvData[i] + "\n");
      }
      stream.end();
      alert("Saved to " + file);
      csvData = [];
      $('#logs').html('');
      $('#fileName').val('');
    });
  }
});

$('body').keypress( (event) => {
  if (event.keyCode === 10 || event.keyCode === 13)
    event.preventDefault();
});
