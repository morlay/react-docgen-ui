import gulp from "gulp";
import _ from "lodash";
import path from "path";
import runSequence from "run-sequence";

const defaultConfig = {
  taskQueue: []
};

let conf;

setOptions(); // init

const TASK_NAME = "build";

const task = gulp.task(TASK_NAME, (cb)=> {
  runSequence.apply(gulp, [].concat(conf.taskQueue).concat(cb));
});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}
