import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import { expect } from 'chai';

import ReactDocMenu from '../ReactDocMenu';

describe(__filename, ()=> {

  describe('#props.grouper', ()=> {

    let reactDocMenu;

    beforeEach(()=> {
      reactDocMenu = TestUtils
        .renderIntoDocument(<ReactDocMenu reactDocJson={{}}/>);
    });

    it('should get a base group name from module name', function () {

      let result = reactDocMenu.props.grouper('path/to/src/components');

      expect(result).to.be.equal('src.components');

    });

  });

});

