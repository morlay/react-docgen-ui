import _ from "lodash";
import gulp from "gulp";
import gutil from "gulp-util";
import gulpDocGenUi from "../src";

import watcher from "./libs/watcher"

const defaultConfig = {
  entry: [
    "example/components/*.jsx",
    "src/components/*.jsx"
  ],
  src: [
    "example/components/{,**/}*.jsx",
    "src/components/{,**/}*.jsx"
  ],
  dest: "example/data"
};

const TASK_NAME = "docs";

let conf;

setOptions(); // init

const task = gulp.task(TASK_NAME, function () {

  function bundle() {
    return gulp.src(conf.entry)
      .pipe(gulpDocGenUi({
        cwd: gutil.env.cwd ? process.cwd() : null
      }))
      .on("error", gutil.log.bind(gulp))
      .pipe(gulp.dest(conf.dest))
      .pipe(watcher.pipeTimer(TASK_NAME))
  }

  if (watcher.isWatching()) {
    gulp.watch(conf.src, function (evt) {
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
