import { expect } from 'chai';

import generateDocDependenceListByRequireList from '../generateDocDependenceListByRequireList'

describe(__filename, function () {

  context('generateDocDependenceListByRequireList', ()=> {

    it('should generate doc dependence list contents', function () {

      let dependenceList = [
        'react',
        'components/Components'
      ];

      expect(generateDocDependenceListByRequireList(dependenceList)).to.be.equal([
        'require(\'react\');',
        'require(\'components/Components\');',
        'module.exports = require;'
      ].join('\n'));
    });

  })

});