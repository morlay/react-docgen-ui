import { expect } from 'chai';
import descriptionExtract from '../descriptionExtract'

describe(__filename, function () {

  context('descriptionExtract', ()=> {

    it('should get tags from description string', function () {

      let descriptionString = `
         description.
         @exampleFile ./test.js
         @example
           console.log(1);
      `;

      expect(descriptionExtract(descriptionString)).to.be.deep.equal({
        description: 'description.',
        tags: [{
          'title': 'exampleFile',
          'description': './test.js'
        }, {
          'title': 'example',
          'description': 'console.log(1);'
        }]
      });
    });

  })

});