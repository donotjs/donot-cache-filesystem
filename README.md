smart-static-fs-cache
=====================

[![Build Status](https://travis-ci.org/trenskow/smart-static-fs-cache.svg?branch=master)](https://travis-ci.org/trenskow/smart-static-fs-cache)

File system cache engine for [smart-static](https://github.com/trenskow/smart-static.js).

# How to Use

Usage: `fsCache(cacheDir, options)`

## Example

    var http = require('http');
    
    var smartStatic = require('smart-static');
    var fsCache = require('smart-static-fs-cache');
    
    var server = http.createServer(smartStatic(serveDir, {
        cache: fsCache(yourCacheDir, {
            createDirectory: false
        })
    ));
    
    server.listen(8000);

> Remark. It does not make sense to use caching without template engine plug-ins - as only template renderings are cached. See [smart-static](https://github.com/trenskow/smart-static) for available template plug-ins.

# Options

There is only one available option for this plug-in.

| Name                | Type    | Default | Description |
|:--------------------|:--------|:--------|:------------|
| **createDirectory** | Boolean | `false` | Create directory if it does not exist. |

# License

MIT
