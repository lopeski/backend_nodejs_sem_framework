const http = require('http');
const fs = require('fs');

const hostname = 'localhost';

const port = 3030 || process.env.PORT;

const MIMETypes = require('./mymeTypes');

http.createServer((req, res) => {
  console.log(req.url);
  let reqPath = '/home.html';
  if (req.method === 'GET') {
    if (req.url !== '/') {
      reqPath = req.url;
    }
    const splReq = reqPath.split('.');
    if (splReq.length <= 2) {
      fs.readFile(`Frontend${reqPath}`, 'utf8', (err, message) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Error: Not found');
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': splReq[1] in MIMETypes ? MIMETypes[splReq[1]] : MIMETypes.default });
          res.write(message);
          res.end();
        }
      });
    } else {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.write('403 ERROR: FORBIDDEN.');
      res.end();
    }
  }
}).listen(port, hostname, () => {
  console.log(`Listening on ${hostname}:${port}`);
});
