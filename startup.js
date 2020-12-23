var express = require('express');
var app = express();
const port = 3000; 
 
app.use(express.static(__dirname + '/index.html'));
app.use(express.static(__dirname));

const {spawn} = require('child_process'); 
var dataToSend;
app.get('/loans', (req, res) => {
 
  //var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['loans.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.send(dataToSend)
  console.log("dataToSend work: " + dataToSend); 
 });


function myfunction(){
  console.log("heloooooo");
  console.log(dataToSend);
}
myfunction();
})


console.log(`App listening at http://localhost:${port}`);
app.listen(port);
