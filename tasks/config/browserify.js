const vendors = [
  'react',
  'babel'
];
const jsDestFolder = 'public/assets/js'

export default {
  files: [{
    entry: 'example/index.jsx',
    dest: jsDestFolder,
    options: {
      debug: true,
      basename: 'index',
      external: vendors
    }
  }, {
    dest: jsDestFolder,
    options: {
      basename: 'vendor',
      require: vendors
    }
  }],
  options: {
    extensions: ['.jsx']
  }
}