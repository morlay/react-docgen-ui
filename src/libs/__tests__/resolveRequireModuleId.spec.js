import { expect } from 'chai';
import path from 'path';
import fs from 'fs';

import resolveRequireModuleId from '../resolveRequireModuleId'

describe(__filename, function () {

  context('resolveRequireModuleId', ()=> {

    it('should get the module id for npm module or absolute module', function () {

      expect(resolveRequireModuleId('let react require(\'react\');'))
        .to.be.equal('react');

      expect(resolveRequireModuleId('import react from \'react\';'))
        .to.be.equal('react');

      expect(resolveRequireModuleId('let react require(\'/react\');'))
        .to.be.equal('/react');

      expect(resolveRequireModuleId('import react from \'/react\';'))
        .to.be.equal('/react');

    });

    context('relative files', ()=> {

      beforeEach(()=> {
        createComponentFile('./react')
        createComponentFile('../react')
      })

      afterEach(()=> {
        cleanComponentFile('./react')
        cleanComponentFile('../react')
      })

      it('should get the module id for relative module', function () {

        expect(resolveRequireModuleId('let react require(\'./react\');', {
          basedir: __dirname
        }))
          .to.be.equal(path.join(__dirname, './react'));

        expect(resolveRequireModuleId('let react require(\'../react\');', {
          basedir: __dirname
        }))
          .to.be.equal(path.join(__dirname, '../react'));

      });

      it('should get the module id for relative module when set cwd', function () {

        expect(resolveRequireModuleId('let react require(\'./react\');', {
          cwd: process.cwd(),
          basedir: __dirname
        }))
          .to.be.equal('src/libs/__tests__/react');

        expect(resolveRequireModuleId('let react require(\'../react\');', {
          cwd: process.cwd(),
          basedir: __dirname
        }))
          .to.be.equal('src/libs/react');

      });
    });

  })

});


function createComponentFile(filename) {
  fs.writeFileSync(path.join(__dirname, filename), '')
}

function cleanComponentFile(filename) {
  fs.unlinkSync(path.join(__dirname, filename));
}
