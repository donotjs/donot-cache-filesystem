/*jshint expr: true*/

'use strict';

var os = require('os');
var path = require('path');
var expect = require('chai').expect;
var rimraf = require('rimraf');
var FileSystemCache = require('../');

var cacheDir = path.normalize(os.tmpdir() + '/' + Math.random().toString(36).substr(2) + '/');
var fsCache = new FileSystemCache(cacheDir, {
  createDirectory: true
});

describe('cache', function() {

  after((done) => {
    rimraf(cacheDir, (err) => {
      if (err) throw err;
      done();
    });
  });

  it ('should throw an error if createDirectory is false and directory does not exist', function() {
    expect(() => {
      fsCache(__dirname + '/non-exist');
    }).to.throw(Error);
  });

  it ('should come back with nothing when cache does not exist', function() {
    return fsCache.get('test').then((data) => {
			expect(data).to.be.undefined;
		});
  });

  it ('should come back with no error when setting value', function() {
    expect(fsCache.set('test', { modified: new Date() })).to.be.fulfilled;
  });

  it ('should come back with date when getting cache', function() {
    return fsCache.get('test').then((cache) => {
			expect(cache).to.be.an('object');
      expect(cache.modified).to.be.instanceof(Date);
		});
  });

});
