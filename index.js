var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

exports = module.exports = function(cacheDir, opt) {

  var cacheFile = path.normalize(cacheDir + '/cache.json');

  if ((opt || {}).createDirectory === true) {
    mkdirp.sync(cacheDir);
  }

  if (!fs.existsSync(cacheDir)) {
    throw new Error('Cache directory does not exist.');
  }

  function readCache(cb) {
    // First check if file exists
    fs.exists(cacheFile, function(exists) {
      if (!exists) return cb();

      // Read file content.
      fs.readFile(cacheFile, { encoding: 'utf8' }, function(err, data) {
        if (err) return cb(err);

        // Parse JSON
        var cache;
        try {
          cache = JSON.parse(data);
        } catch (err) {
          return cb(err);
        }

        cb(null, cache);

      });
    });
  }

  return {
    get: function(file, cb) {

      readCache(function(err, cache) {
        if (err) return cb(err);

        // Default if non-existing
        cache = cache || {};

        // Convert date string to Date.
        if (cache[file] && cache[file].modified) {
          cache[file].modified = new Date(cache[file].modified);
        }

        // Return content
        cb(null, cache[file]);

      });

    },
    set: function(file, data, cb) {

      // Read file
      readCache(function(err, cache) {
        if (err) return cb(err);

        // Create cache if non-existing
        cache = cache || {};

        // Add data
        cache[file] = data;

        // To JSON
        var json;
        try {
          json = JSON.stringify(cache);
        } catch(err) {
          return cb(err);
        }

        // Write JSON to file
        fs.writeFile(cacheFile, json, { encoding: 'utf8' }, function(err) {
          if (err) return cb(err);

          // Return
          cb();
        });

      });

    }
  };

};
