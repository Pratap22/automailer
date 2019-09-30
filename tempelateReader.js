var fs = require('fs');

module.exports = function(tempelatePath, callback) {
  fs.readFile(tempelatePath, 'utf8', callback);
};
