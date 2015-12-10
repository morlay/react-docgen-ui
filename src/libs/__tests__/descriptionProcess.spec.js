import { expect } from 'chai';
import marked from 'marked';

import descriptionProcess from '../descriptionProcess'

describe(__filename, function () {

  context('descriptionProcess', ()=> {

    it('should process description', function () {

      let targetObj = {
        'description': [
          'description.',
          '@example console.log(1);'
        ].join('\n')
      };

      expect(descriptionProcess(targetObj, {
        basedir: __dirname
      }))
        .to.to.deep.equal({
          description: marked('description.'),
          examples: [{
            requireList: [],
            contents: 'console.log(1);'
          }]
        });

    });

    it('should process description in props', function () {

      let targetObj = {
        'description': [
          'description.',
          '@example console.log(1);'
        ].join('\n'),
        'props': {
          'color': {
            'description': [
              'description.',
              '@example console.log(1);'
            ].join('\n')
          }
        }
      };

      expect(descriptionProcess(targetObj, {
        basedir: __dirname
      }))
        .to.to.deep.equal({
          description: marked('description.'),
          examples: [{
            requireList: [],
            contents: 'console.log(1);'
          }],
          props: {
            'color': {
              description: marked('description.'),
              examples: [{
                requireList: [],
                contents: 'console.log(1);'
              }]
            }
          }
        });

    });

    it('should not process description in props if noMarkedDescription is set', function () {

      let targetObj = {
        'description': [
          '# description.',
          '@example console.log(1);'
        ].join('\n'),
        'props': {
          'color': {
            'description': [
              '# description.',
              '@example console.log(1);'
            ].join('\n')
          }
        }
      };

      expect(descriptionProcess(targetObj, {
        basedir: __dirname,
        noMarkedDescription: true
      }))
        .to.to.deep.equal({
          description: '# description.',
          examples: [{
            requireList: [],
            contents: 'console.log(1);'
          }],
          props: {
            'color': {
              description: '# description.',
              examples: [{
                requireList: [],
                contents: 'console.log(1);'
              }]
            }
          }
        });

    });

  })

});