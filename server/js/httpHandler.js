const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // let randomDir = () => {
  //   let arrows = ['up', 'right', 'down', 'left'];
  //   let i = Math.floor(Math.random() * 4);
  //   return arrows[i];
  // }

  if (req.method === "GET") {
    console.log('URL requested: ', req.url);
    if (req.url === '/spec/missing.jpg') {
      res.writeHead(404, 'file not found', headers);
      res.end();
      next();
    }
    if (req.url === '/background.jpg') { //sending a request for an image
      var stats = fileSystem.statSync('/background.jpg');
      res.setHeader('Content-Length', stats.size);
      res.writeHead(200, headers);
      var readStream = fileSystem.createReadStream('/background.jpg');
      readStream.pipe(response);
      res.end();
      next();
    }
    res.writeHead(200, headers);
    var nextMessage = messages.dequeue();
    res.write(nextMessage);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  }

  if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  }

};