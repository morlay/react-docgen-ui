import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import getExampleContents from '../getExampleContents'

describe(__filename, function () {

  context('getExampleContents', ()=> {

    it('should get example contents from example tag', function () {

      let tags = {
        'title': 'example',
        'description': [
          'let react = require(\'react\')',
          'import _ from \'lodash\''
        ].join('\n')
      };

      expect(getExampleContents(tags))
        .to.be.deep.equal({
          requireList: [
            {
              path: 'lodash',
              src: 'import _ from \'lodash\'',
              dest: 'import _ from \'lodash\''
            },
            {
              path: 'react',
              src: 'require(\'react\')',
              dest: 'require(\'react\')'
            }
          ],
          contents: tags.description
        });

    });

    context('should get example file path from exampleFile tag', ()=> {
      let tags;

      beforeEach(()=> {
        tags = {
          'title': 'exampleFile',
          'description': './Component.jsx'
        };

        createComponentFile('./Component.jsx', [
          'let react = require(\'react\');',
          'import Component from \'../__tests__/ComponentRequired.jsx\';'
        ].join('\n'));

        createComponentFile('./ComponentRequired.jsx', [
          'let react = require(\'react\');'
        ].join('\n'));

      });

      afterEach(()=> {
        cleanComponentFile('./Component.jsx');
        cleanComponentFile('./ComponentRequired.jsx');
      });

      it('and should get contents from this file path', function () {
        expect(
          getExampleContents(tags, {
            basedir: __dirname
          }).contents
        ).to.be.contain(path.join(__dirname, './Component'))
      });


      it('and should get contents from this file path but replace', function () {
        expect(getExampleContents(tags, {
            basedir: __dirname,
            cwd: process.cwd()
          }).contents
        ).to.be.contain(path.relative(
            process.cwd(),
            path.join(__dirname, './Component')
          ));
      });


    });

    context('require self', ()=> {

      beforeEach(()=> {
        createComponentFile('./ComponentSelf.jsx', [
          'let react = require(\'react\');',
          'import Component from \'../__tests__/ComponentSelf.jsx\';'
        ].join('\n'));
      })

      afterEach(()=> {
        cleanComponentFile('./ComponentSelf.jsx');
      })


      it('and should throw error when require self in example contents through file', function () {

        const tags = {
          'title': 'exampleFile',
          'description': './ComponentSelf.jsx'
        };

        expect(function () {
          getExampleContents(tags, {
            basedir: __dirname,
            cwd: process.cwd()
          }).contents
        }).to.throw('should not require self')

      });

    })

  })

});


function createComponentFile(filename, componentString) {
  componentString = componentString || `
    import React from \'react\'
    export default React.createClass({})
  `;
  fs.writeFileSync(path.join(__dirname, filename), componentString)
}

function cleanComponentFile(filename) {
  fs.unlinkSync(path.join(__dirname, filename));
}
