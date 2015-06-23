import gulp from "gulp";
import gutil from "gulp-util";

import clean from "./tasks/clean";
import copy from "./tasks/copy";
import docs from "./tasks/docs";
import stylus from "./tasks/stylus";
import lint from "./tasks/lint";
import server from "./tasks/server";
import browserify from "./tasks/browserify";
import ghPages from "./tasks/gh-pages";
import npmBuild from "./tasks/npm-build";

import watcher from "./tasks/libs/watcher";

import build from "./tasks/build";

build.setOptions({
  taskQueue: [
    "clean",
    "copy",
    "stylus",
    "docs",
    "lint",
    "browserify"
  ]
});

if (gutil.env.prod) {
  process.env.NODE_ENV = "production";
}

if (gutil.env.watch) {
  watcher.setWatcher();
}

gulp.task("dev", ()=> {
  watcher.setWatcher();
  gulp.start(["build", "server"]);
});

gulp.task("npm", ()=> {
  gulp.start(["clean", "npm-build"])
});
