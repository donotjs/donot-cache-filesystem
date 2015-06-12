var os = require('os');
var path = require('path');
var expect = require('chai').expect;
var rimraf = require('rimraf');

var cacheDir = path.normalize(os.tmpdir() + '/' + Math.random().toString(36).substr(2) + '/');
var fsCache = require('../')(cacheDir);

describe('cache', function() {

  after(function(done) {
    rimraf(cacheDir, function(err) {
      if (err) throw err;
      done();
    });
  });

  it ('should come back with nothing when cache does not exist', function(done) {
    fsCache.get('test', function(err, data) {
      expect(err).to.be.null;
      expect(data).to.be.undefined;
      done();
    });
  });

  it ('should come back with no error when setting value', function(done) {
    fsCache.set('test', { created: new Date() }, function(err) {
      expect(err).to.be.undefined;
      done();
    });
  });

  it ('should come back with date when getting cache', function(done) {
    fsCache.get('test', function(err, cache) {
      expect(err).to.be.null;
      expect(cache).to.be.an('object');
      expect(cache.created).to.be.instanceof(Date);
      done();
    });
  });

});
