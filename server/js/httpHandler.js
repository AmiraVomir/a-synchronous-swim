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

  if (req.method === "GET") {
    console.log('URL requested: ', req.url);
    if (req.url === '/spec/missing.jpg') {
      res.writeHead(404, 'file not found', headers);
      res.end();
      next();
    }
    if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (error, data) => {
        if (error) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
          // var readStream = fs.createReadStream(module.exports.backgroundImageFile);
          // readStream.pipe(res);
        }
        res.end();
        next();
      });
    }
    if (req.url === '/') {
      res.writeHead(200, headers);
      var nextMessage = messages.dequeue();
      res.write(nextMessage);
      res.end();
      next();
    }
  }

  if (req.method === "POST") {
    res.writeHead(201, headers);

    res.end();
    next();
  }

  if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
    next();
  }

};