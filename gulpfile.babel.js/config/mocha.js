import gutil from 'gulp-util';

export default {
  src: [
    'src/**/__tests__/*.spec.js{,x}'
  ],
  options: {
    r: 'tests/helpers/jsdom.js',
    R: 'dot',
    compilers: '.:babel/register',
    istanbul: gutil.env.cover
  }
}
