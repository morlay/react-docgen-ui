import { expect } from 'chai';

import getDocDependenceListByResult from '../getDocDependenceListByResult'

describe(__filename, function () {

  context('getDocDependenceListByResult', ()=> {

    it('should get module name by vinylFile object', function () {

      let result = {
        'components/elements/Button.jsx': {
          'examples': [
            {
              'requireList': [
                {
                  'path': 'react'
                },
                {
                  'path': 'components/Component'
                }
              ]
            }
          ],
          'props': {
            'color': {
              'examples': [
                {
                  'requireList': [
                    {
                      'path': 'react'
                    },
                    {
                      'path': 'components/Component2'
                    }
                  ]
                }
              ]
            }
          }
        }
      };

      expect(getDocDependenceListByResult(result)).to.be.deep.equal([
        'react-dom',
        'react',
        'components/Component',
        'components/Component2'
      ]);
    });

  })

});
