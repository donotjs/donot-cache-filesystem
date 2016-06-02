donot-cache-filesystem
======================

[![Build Status](https://travis-ci.org/donotjs/donot-cache-filesystem.svg?branch=master)](https://travis-ci.org/donotjs/donot-cache-filesystem)

File system cache engine for [donot](https://github.com/donotjs/donot).

# How to Use

Usage: `new FileSystemCache(cacheDir, options)`

## Example

		var http = require('http'),
		    donot = require('donot'),
		    FileSystemCache = require('donot-cache-filesystem');

		var server = http.createServer(donot(__dirname + '/public', {
			cache: new FileSystemCache(yourCacheDir, {
				createDirectory: false
			})
		));

		server.listen(8000);

> Remark. It does not make sense to use caching without one or more engine plug-ins - as only an engine's output is cached. See [donot](https://github.com/donotjs/donot) for available engine plug-ins.

# Options

There is only one available option for this plug-in.

| Name                | Type    | Default | Description |
|:--------------------|:--------|:--------|:------------|
| **createDirectory** | Boolean | `false` | Create directory if it does not exist. |

# License

MIT
