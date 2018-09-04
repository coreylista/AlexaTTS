'use strict';

const browserify = require('browserify');
const path = require('path');
const fs = require('fs');
const minify = require('minify-stream')
/*const uglifyify = require('uglifyify');

const result = Terser.minify(fs.readFileSync("input.js", "utf8"), {
  compress: {
    dead_code: true,
    global_defs: {
      DEBUG: false
    }
  }
});

*/


browserify()
    //.transform('uglifyify', { global: true })
    .add(path.join(__dirname, 'index.js'))
    .bundle()
    //.pipe(minify({ sourceMap: false }))
    .pipe(fs.createWriteStream('bundle.js'));
