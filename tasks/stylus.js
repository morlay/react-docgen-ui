import gulp from "gulp"
import _ from "lodash"
import gutil from "gulp-util"
import path from "path"
import stylus from "gulp-stylus"
import autoprefixer from "autoprefixer-stylus"

import watcher from "./libs/watcher"

const defaultConfig = {
  "entry": [
    "example/index.styl"
  ],
  "src": [
    "example/{,**/}*.styl"
  ],
  "dest": "public/assets/css",
  "options": {
    use: [
      autoprefixer({browsers: ["> 1%", "last 2 version", "ie 10", "Firefox ESR"]}),
      includeCss(),
      components()
    ]
    //compress: true
  }
};

let conf;

setOptions(); // init

const TASK_NAME = "stylus";

const task = gulp.task(TASK_NAME, (cb)=> {

  function bundle() {
    return gulp.src(conf.entry)
      .pipe(stylus(conf.options))
      .pipe(gulp.dest(conf.dest))
      .pipe(watcher.pipeTimer(TASK_NAME))
  }

  if (watcher.isWatching()) {
    gulp.watch([].concat(conf.src), function (evt) {
      gutil.log(evt.path, evt.type);
      bundle();
    });
  }

  return bundle();
});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}


function includeCss() {
  return function (stylus) {
    stylus.set("include css", true);
  }
}

function components() {
  return function (stylus) {
    stylus.include(path.join(process.cwd(), "node_modules"));
    stylus.include(process.cwd());
  }
}