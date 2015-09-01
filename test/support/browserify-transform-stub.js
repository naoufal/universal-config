var through = require('through');

module.exports = function(file) {
  return through(function (buf, enc, next) {
    var string = buf.toString('utf8').replace(/..\/..\/..\/config/g, '../test/stubs/config');

    this.push(string);
  });
}
