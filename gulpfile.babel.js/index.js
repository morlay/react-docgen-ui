import gulp from 'gulp'
import runSequence from 'run-sequence'
import requireDir from 'require-dir'
import _ from 'lodash'
import gulpTaskConfig from './libs/gulp-task-config'

gulpTaskConfig(gulp)

requireDir('./tasks')

gulp.config('tasks', requireDir('./config'))

gulp.task('build', (callback) => {
  runSequence(
    'clean',
    'copy',
    'docs',
    'browserify',
    'stylus',
    callback
  )
})

gulp.task('dev', ()=> {
  gulp.config(gulp.DEV_MODE, true)
  gulp.start(['build', 'server'])
})

gulp.task('pre-publish', ()=> {
  gulp.start(['clean', 'babel'])
})
