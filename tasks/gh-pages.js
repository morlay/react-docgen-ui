import gulp from "gulp";
import _ from "lodash";
import path from "path";
import ghPages from "gh-pages"

const defaultConfig = {
  src: "public"
};

let conf;

setOptions(); // init

const TASK_NAME = "gh-pages";

const task = gulp.task(TASK_NAME, (cb)=> {
  ghPages.publish(path.join(process.cwd(), conf.src), cb);
});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}
