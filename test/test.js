/*jshint expr: true*/

'use strict';

const os = require('os');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const rimraf = require('rimraf');

chai.should();
chai.use(chaiAsPromised);

const FileSystemCache = require('../');

const cacheDir = path.normalize(os.tmpdir() + '/' + Math.random().toString(36).substr(2) + '/');
const fsCache = new FileSystemCache(cacheDir, {
  createDirectory: true
});

describe('cache', () => {

  after((done) => {
    rimraf(cacheDir, (err) => {
      if (err) throw err;
      done();
    });
  });

  it ('should throw an error if createDirectory is false and directory does not exist', () => {
    expect(() => {
      fsCache(__dirname + '/non-exist');
    }).to.throw(Error);
  });

  it ('should come back with nothing when cache does not exist', () => {
    return fsCache.get('test').then((data) => {
			expect(data).to.be.undefined;
		}).should.eventually.be.fulfilled;
  });

  it ('should come back with no error when setting value', () => {
    return fsCache.set('test', { modificationDate: new Date() }).should.eventually.be.fulfilled;
  });

  it ('should come back with date when getting cache', () => {
    return fsCache.get('test').then((cache) => {
			expect(cache).to.be.an('object');
      expect(cache.modificationDate).to.be.instanceof(Date);
		}).should.eventually.be.fulfilled;
  });

});
