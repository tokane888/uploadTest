const http = require('http');
const fs = require('fs');
const MultiStream = require('multistream');

setInterval(() => {
  const used = process.memoryUsage();
  const messages = [];
  for (let key in used) {
    messages.push(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
  }
  console.log(new Date(), messages.join(', '));
}, 1000);

const server = http.createServer((req, res) => {
  var count = 0;
  function factory(cb) {
    if (count > 2) return cb(null, null)
    count++
    setTimeout(function () {
      cb(null, fs.createReadStream(__dirname + '/2GB_' + count + '.txt'))
    }, 100)
  }

  MultiStream(factory).pipe(res)
});
server.listen(3000);