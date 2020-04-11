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
    res.writeHead(200, headers);
    var nextMessage = messages.dequeue();
    console.log(nextMessage);
    res.write(nextMessage);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  }

  if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  }

};