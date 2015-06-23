import _ from "lodash";
import gulp from "gulp";
import gutil from "gulp-util";
import babel from "gulp-babel";

const defaultConfig = {
  src: [
    "src/{,**/}/*.js{,x}",
    "!src/{,**/}__tests__/*.js{,x}",
    "!src/{,**/}examples/*.js{,x}"
  ],
  dest: "dist/",
  options: {
    "stage": 0,
    "optional": [
      "runtime"
    ]
  }
};

const TASK_NAME = "npm-build";

let conf;

setOptions(); // init

const task = gulp.task(TASK_NAME, function () {
  return gulp.src(conf.src)
    .pipe(babel(conf.options))
    .pipe(gulp.dest(conf.dest));
});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}
