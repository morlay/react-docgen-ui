import path from 'path'
import autoprefixer from 'autoprefixer-stylus'

export default {
  files: [{
    'entry': [
      'example/index.styl'
    ],
    'src': [
      'example/**/*.styl'
    ],
    'dest': 'public/assets/css'
  }],
  'options': {
    use: [
      autoprefixer({
        browsers: [
          'ie >= 8',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 7',
          'android >= 2.3',
          'bb >= 10'
        ]
      }),
      includeCss(),
      nodeModules()
    ],
    compress: process.env.NODE_ENV === 'production'
  }
};


function includeCss() {
  return function (stylus) {
    stylus.set('include css', true);
  }
}

function nodeModules() {
  return function (stylus) {
    stylus.include(path.join(process.cwd(), 'node_modules'));
  }
}