import { expect } from 'chai';
import { File } from 'gulp-util'

import getModuleInfoByVinylFile from '../getModuleInfoByVinylFile'

describe(__filename, function () {

  context('getModuleInfoByVinylFile', ()=> {

    it('should get module name by vinylFile object', function () {

      const pathName = 'path/to/file.jsx';
      const vinylFile = new File({
        path: pathName
      });

      expect(getModuleInfoByVinylFile(vinylFile)).to.be.deep.equal({
        'name': 'file',
        'module': 'path/to'
      });
    });

  })

});