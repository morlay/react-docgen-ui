import path from 'path';
import _ from 'lodash';
import gulp from 'gulp';
import gutil from 'gulp-util';

import source from 'vinyl-source-stream';
import browserify from 'browserify';
import watchify from 'watchify';
import rename from 'gulp-rename';

import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';

const TASK_NAME = 'browserify';

function whenInProductionDoUglify() {
  if (process.env.NODE_ENV === 'production') {
    return streamify(uglify({
      compress: {
        'pure_funcs': ['console.log']
      }
    }))
  }
  return gutil.noop();
}


function bundle(config) {
  return config.bundler.bundle()
    .on('error', gutil.log.bind(gulp))
    .pipe(source(config.entry))
    .pipe(rename((obj)=> {
      obj.dirname = '';
      obj.basename = config.options.basename || obj.basename;
      obj.extname = '.js';
    }))
    .pipe(whenInProductionDoUglify())
    .pipe(gulp.dest(config.dest));
}

function browserifyOnce(config = {}) {

  if (!config.bundler) {
    config.bundler = browserify(config.options);
  }

  if (config.entry) {
    config.bundler.add(path.join(process.cwd(), config.entry))
  } else {
    config.entry = _.uniqueId('vendor_')
  }

  [
    'plugin',
    'require',
    'external'
  ].forEach((method)=> {
      [].concat(config.options[method])
        .forEach((args)=> {
          if (args) {
            config.bundler[method].apply(config.bundler, [].concat(args));
          }
        });
    });

  return bundle(config);

}

function browserifyTask() {

  return gulp.autoRegister(TASK_NAME, browserifyOnce, (config)=> {

    config.bundler = browserify(_.merge({}, config.options, watchify.args));
    config.bundler = watchify(config.bundler);

    config.bundler.on('update', bundle.bind(null, config));
    config.bundler.on('time', (time)=> {
      gutil.log(gutil.colors.cyan('watchify'),
        're-bundled', 'after', gutil.colors.magenta(time > 1000 ? time / 1000 + ' s' : time + ' ms'));
    });

  });
}

gulp.task(TASK_NAME, browserifyTask);

export default browserifyTask;
