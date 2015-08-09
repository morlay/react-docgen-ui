import compress from 'compression'

export default {
  'src': [
    './public/{,**/}*.*'
  ],
  'options': {
    server: {
      notify: false,
      baseDir: './public',
      middleware: [
        (process.env.NODE_ENV === 'production') ? compress() : middlewareNope()
      ]
    },
    ui: {
      port: 9999
    }
  }
};

function middlewareNope() {
  return (req, res, next)=> {
    return next()
  }
}
