import through from "through";
import gutil from "gulp-util"

let watcher = false;

export default {
  isWatching() {
    return watcher;
  },
  setWatcher() {
    watcher = true;
  },
  pipeTimer(taskname) {
    taskname = taskname || "~~~";
    var startTime = new Date();

    return through(start, end);

    function start() {}

    function end() {
      if (watcher) {
        this.on("end", ()=> {
          var time = new Date() - startTime;
          gutil.log("Watcher:",
            "\"" + gutil.colors.cyan(taskname) + "\"",
            "re-bundle after",
            gutil.colors.magenta(time > 1000 ? time / 1000 + " s" : time + " ms"));
        });
      }
      this.queue(null);
    }
  }
};
