import gulp from "gulp";
import _ from "lodash";
import path from "path";
import del from "del"

const defaultConfig = {
  src: [
    "dist",
    "public"
  ]
};

let conf;

setOptions(); // init

const TASK_NAME = "clean";

const task =  gulp.task(TASK_NAME, (cb)=> {
  del(conf.src, cb);
});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}
