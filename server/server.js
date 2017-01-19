/* dependencies */
var express = require('express'),
    fs = require('fs'),
    readline = require('readline'),
    ip = require('ip');
    app = express();

/* vars */
var port = 8080,
    setFileName = false,
    newFile,
    stream;

function init() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('[ALERT] New CSV filename: ', (fileName) => {
    newFile = fileName + ".csv";
    stream = fs.createWriteStream("data/" + newFile);
    console.log("[INFO] " + newFile + " will store all incoming scouting data.");
    rl.close();
  });
}

// huh? idk what to http request to do yet. and how to log it.
app.post('/', function (req, res) {
  writeToCSV(req.body);
  res.send('you sent a post request!');
})

function writeToCSV(csvData) {
  //console.log("write to csv called!");
  stream.once('open', function(fd) {
    stream.write(csvData);
    stream.end();
  });
}

app.listen(port, function () {
  console.log("[INFO] " + ip.address() + ":" + port + " server started!");
  init();
});
