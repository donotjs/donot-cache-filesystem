smart-static-mem-cache
====================

File system cache engine for [smart-static](https://github.com/trenskow/smart-static.js).

----

# Usage

    var smartStatic = require('smart-static');
    var fsCache = require('smart-static-fs-cache');

    // app is an http, connect or express app
    app.use(smartStatic(serveDir, {
        cache: fsCache(cacheDir)
    ));
