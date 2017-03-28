const $ = require('jquery');
const fs = require('fs');
const app = require('electron').remote;
const dialog = app.dialog;
const prependFile = require('prepend-file');

var csvTemplate = "match,team,autonGears,autonBallsLow,autonBallsHigh,cross,teleopGears,teleopBallsHigh,teleopBallsLow,touchpad,climb,deadtime,comments\n";
var fileName = "";
var tempCSV = [];

$('#reader').html5_qrcode(
  (data) => {
    if(data != tempCSV[tempCSV.length-1] && fileName != "") {
      tempCSV.push(data);
      save(data);
      $('#logs').prepend("<li>" + data + "</li>");
      infoMessage("Scanned: " + data);
    }
  }, (error) => {
    errorMessage(error);
  }, (videoError) => {
    errorMessage(videoError);
  }
);

$('#saveManual').click( () => {
  var manualData = $('#manualCSVData').val();
  if(manualData != "" && manualData != tempCSV[tempCSV.length-1] && fileName != "") {
    tempCSV.push(manualData);
    save(manualData);
    $('#logs').prepend("<li>" + manualData + "</li>");
    $('#manualCSVData').val("");
  }
});

$('#chooseFile').click( () => {
  dialog.showOpenDialog(
    {filters:[{name:'csv',extensions:['csv']}]},
    (fileNames) => {
    // fileNames is an array that contains all the selected
   if(fileNames === undefined) errorMessage("Did not select a new file");
   else {
     fileName = fileNames[0];
     const fd = fs.openSync(fileName, 'r+')
     fs.writeSync(fd, csvTemplate, 0, csvTemplate.length, 0)
     fs.close(fd)
     $('#currentFileName').html("<p>Saving to: " + fileName + "</p>");
   };
  });
});

$('body').keypress( (event) => {
  if (event.keyCode === 10 || event.keyCode === 13)
    event.preventDefault();
});

const save = (data) => {
  if(fileName == "") {
    errorMessage("Select a file first.");
  } else {
    fs.appendFile(fileName, data+"\n", (err) => {
      if (err) errorMessage(err);
    });
  }
}

const infoMessage = (m) => {
  $('#message').html("<p style='color:green'>" + m + "</p>");
}

const errorMessage = (e) => {
  $('#message').html("<p style='color:red'>" + e + "</p>");
}
