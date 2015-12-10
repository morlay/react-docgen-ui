## React DocGen UI

[![Build Status](https://img.shields.io/travis/morlay/react-docgen-ui.svg?style=flat-square)](https://travis-ci.org/morlay/react-docgen-ui)
[![NPM](https://img.shields.io/npm/v/react-docgen-ui.svg?style=flat-square)](https://npmjs.org/package/react-docgen-ui)
[![Dependencies](https://img.shields.io/david/morlay/react-docgen-ui.svg?style=flat-square)](https://david-dm.org/morlay/react-docgen-ui)
[![License](https://img.shields.io/npm/l/react-docgen-ui.svg?style=flat-square)](https://npmjs.org/package/react-docgen-ui)

## How to use

use gulp to generate `react-doc.json` (react-doc infos with examples) and `react-doc.js` (requires in all example)

```js

    gulp.src([
      'path/to/components/which/need/to/generate/docs'
    ])
      .pipe(gulpDocGenUi({
        cwd: gutil.env.cwd ? process.cwd() : null
      }))
      .on('error', gutil.log.bind(gulp))
      .pipe(gulp.dest(`path/to/dist`))

```

then see the example to config and create the doc pages.

## Options

### noMarkedDescription

Pass `noMarkedDescription: true` to prevent running the `marked` compiler on `description` keys in the exported object. This is useful if you want to process the docs further yourself, for example building full markdown documentation pages.

## Change logs

* 0.4.x updated to babel6, if use commonjs, notice the `default` issue
