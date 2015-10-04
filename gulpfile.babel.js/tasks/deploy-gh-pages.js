import gulp from 'gulp';
import path from 'path';
import ghPages from 'gh-pages'

const TASK_NAME = 'deploy-gh-pages';

function deployGhPages(callback) {
  gulp.autoRegister(TASK_NAME, (config)=> {
    ghPages.publish(
      path.join(process.cwd(), config.src),
      config.options,
      callback
    );
  });
}

gulp.task(TASK_NAME, deployGhPages);

export default deployGhPages;

