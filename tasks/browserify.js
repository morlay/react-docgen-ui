import path from "path"
import _ from "lodash"
import gulp from "gulp"

import source from "vinyl-source-stream"
import rename from "gulp-rename"
import browserify from "browserify"
import watchify from "watchify"

import mergeSteam from "merge-stream"

import gutil from "gulp-util"

import streamify from "gulp-streamify"
import uglify from "gulp-uglify"

import watcher from "./libs/watcher"

const defaultConfig = {
  "files": [
    {
      "entry": "example/index.jsx",
      "dest": "public/assets/js"
    }
  ],
  options: {
    "extensions": [".jsx"]
  }
};

let conf;

setOptions(); // init

const TASK_NAME = "browserify";

const task = gulp.task(TASK_NAME, function () {

  function bundleThis(fileConf = {}) {

    fileConf.entry = path.join(process.cwd(), fileConf.entry);
    fileConf.options = _.merge({}, conf.options, fileConf.options);

    const isVendor = /vendor\.js$/.exec(fileConf.entry);

    let bundler;

    if (watcher.isWatching()) {
      bundler = browserify(_.merge({}, fileConf.options, watchify.args));
    } else {
      bundler = browserify(fileConf.options)
    }

    if (!isVendor) {
      bundler.add(fileConf.entry);
    }

    [
      "require",
      "external"
    ].forEach((method)=> {
        [].concat(fileConf.options[method])
          .forEach((moduleName)=> {
            if (moduleName) {
              bundler[method](moduleName)
            }
          })
      });


    if (watcher.isWatching()) {
      bundler = watchify(bundler);
      bundler.on("update", bundle);
      bundler.on("time", (time)=> {
        gutil.log(gutil.colors.cyan("watchify"),
          "re-bundled", "after", gutil.colors.magenta(time > 1000 ? time / 1000 + " s" : time + " ms"))
      });
    }


    function bundle() {
      return bundler.bundle()
        .on("error", function (e) {
          gutil.log("Browserify Error", wrapWithPluginError(e));
        })
        .pipe(source(fileConf.entry))
        .pipe(rename(function (pathObj) {
          pathObj.dirname = path.relative("example", pathObj.dirname);
          pathObj.extname = ".js";
        }))
        .pipe(whenInProductionDoUglify())
        .pipe(gulp.dest(fileConf.dest))
    }

    return bundle();
  }

  return mergeSteam.apply(gulp, _.map(conf.files, bundleThis));

});

task.setOptions = setOptions;

export default task;

function setOptions(opts) {
  conf = _.merge({}, defaultConfig, opts)
}

function wrapWithPluginError(originalError) {
  var message, opts;
  if ("string" === typeof originalError) {
    message = originalError;
  } else {
    message = originalError.message.toString();
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(message);
  }
  return new gutil.PluginError("watchify", message);
}

function whenInProductionDoUglify() {
  return process.env.NODE_ENV === "production" || gutil.env.debug ? streamify(uglify({
    compress: {
      pure_funcs: ["console.log"]
    }
  })) : gutil.noop()
}
