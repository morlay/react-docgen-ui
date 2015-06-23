import gulp from "gulp"
import gutil from "gulp-util"
import path from "path"
import eslint from "gulp-eslint"
import _ from "lodash"
import mergeStream from "merge-stream"

import watcher from "./libs/watcher"

const defaultConfig = {
  "files": [
    {
      "src": [
        "src/{,**/}*.js*",
        "!src/{,**/}__tests__/*.js*"
      ],
      "options": {
        "env": [
          "node"
        ]
      }
    },
    {
      "src": [
        "src/{,**/}__tests__/*.js*"
      ],
      "options": {
        "rules": {
          "no-unused-expressions": 0
        },
        "env": [
          "mocha",
          "node"
        ]
      }
    }
  ],
  "options": {
    "rules": {
      "strict": 0,
      "semi": 0,
      "eol-last": 0,
      "curly": 0,
      "no-underscore-dangle": 0,
      "no-use-before-define": 0,
      "no-eval": 0
    }
  }
};

let conf;

setOptions(); // init

const TASK_NAME = "lint";
const task = gulp.task(TASK_NAME, function () {

  function bundleThis(fileConf = {}) {

    fileConf.options = _.merge({}, conf.options, fileConf.options);

    function bundle(fileConf) {
      return gulp.src(fileConf.src)
        .pipe(eslint(fileConf.options))
        .pipe(eslint.formatEach("compact", process.stderr))
        .pipe(watcher.isWatching() ? gutil.noop() : eslint.failOnError())
        .pipe(watcher.pipeTimer(TASK_NAME));
    }

    if (watcher.isWatching()) {
      gulp.watch(fileConf.src, function (evt) {
        if (evt.type === 'changed') {
          bundle(_.merge({}, fileConf, {
            src: evt.path
          }))
        }
      });
    }

    return bundle(fileConf)
  }

  return mergeStream.apply(gulp, _.map(conf.files, bundleThis));

});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}
