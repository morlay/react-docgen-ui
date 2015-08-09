import { expect } from 'chai';
import path from 'path';
import gulp from 'gulp';
import fs from 'fs';
import mapStream from 'map-stream';

import gulpReactDocGenUI from '../index'

function assertResult(cb) {
  return mapStream((file, callback)=> {
    cb(file);
    callback(null, file)
  })
}

function createComponentFile(componentString) {
  componentString = componentString || `
    import React from 'react'
    export default React.createClass({})
  `;
  fs.writeFileSync(path.join(__dirname, '/Component.jsx'), componentString)
}

function cleanComponentFile() {
  fs.unlinkSync(path.join(__dirname, '/Component.jsx'));
}

function gulpStartWithReactDocGenUI(options = {}) {
  return gulp.src(path.join(__dirname, '/Component.jsx'))
    .pipe(gulpReactDocGenUI(options))
}

describe(__filename, function () {

  afterEach(function () {
    cleanComponentFile();
  });

  context('options', ()=> {

    beforeEach(()=> {
      createComponentFile();
    });

    context('cwd', ()=> {

      it('when empty, key of result will start with absolute path', function (done) {
        gulpStartWithReactDocGenUI()
          .pipe(assertResult((file)=> {
            switch (path.extname(file.path)) {
              case '.json':
                let json = JSON.parse(String(file.contents));
                expect(json).to.have.property(path.join(__dirname, 'Component.jsx'));
                break;
            }
          }))
          .on('end', done)
      });

      it('when be set, key of result will start with new cwd', function (done) {
        gulpStartWithReactDocGenUI({
          cwd: __dirname
        })
          .pipe(assertResult((file)=> {
            switch (path.extname(file.path)) {
              case '.json':
                let json = JSON.parse(String(file.contents));
                expect(json).to.have.property('Component.jsx');
                break;
            }
          }))
          .on('end', done)
      });
    });

    context('filename', ()=> {

      it('when empty, the output file will be named react-doc', function (done) {
        gulpStartWithReactDocGenUI()
          .pipe(assertResult((file)=> {
            expect(path.basename(file.path, path.extname(file.path)))
              .to.be.equal('react-doc');
          }))
          .on('end', done)
      });

      it('when be set, the output file will be named the filename', function (done) {
        gulpStartWithReactDocGenUI({
          filename: 'doc'
        })
          .pipe(assertResult((file)=> {
            expect(path.basename(file.path, path.extname(file.path)))
              .to.be.equal('doc');
          }))
          .on('end', done)
      });

    });


  });

});