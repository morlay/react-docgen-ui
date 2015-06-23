## React DocGen UI 

[![Build Status](https://travis-ci.org/morlay/react-docgen-ui.svg?branch=develop)](https://travis-ci.org/morlay/react-docgen-ui)
[![Dependencies](https://david-dm.org/morlay/react-docgen-ui.svg)](https://david-dm.org/morlay/react-docgen-ui)

## How to use

use gulp to generate `react-doc.json` (react-doc infos with examples) and `react-doc.js` (requires in all example) 

```js

    gulp.src([
      'path/to/components/which/need/to/generate/docs'
    ])
      .pipe(gulpDocGenUi({
        cwd: gutil.env.cwd ? process.cwd() : null
      }))
      .on("error", gutil.log.bind(gulp))
      .pipe(gulp.dest('path/to/dist`))
    
```

then see the example to config and create the doc pages.