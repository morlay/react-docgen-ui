import path from "path"
import _ from "lodash"
import gulp from "gulp"
import mergeSteam from "merge-stream"
import browserSync from "browser-sync"

import compress from "compression"

import gutil from "gulp-util"

import watcher from "./libs/watcher"

const defaultConfig = {
  "src": [
    "./public/{,**/}*.*"
  ],
  "options": {
    server: {
      baseDir: "./public",
      directory: true,
      middleware: [
        (process.env.NODE_ENV === "production" || gutil.env.debug) ? compress() : middlewareNope()
      ]
    },
    ui: {
      port: 9999
    }

  }
};

let conf;

setOptions(); // init

const TASK_NAME = "server";

const task = gulp.task(TASK_NAME, function () {

  browserSync(conf.options);

  if (watcher.isWatching()) {
    gulp.watch(conf.src).on("change", browserSync.reload)
  }

});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}

function middlewareNope() {
  return (req, res, next)=> {
    return next()
  }
}
