import React from "react/addons"
import { expect } from "chai";

import ReactDocMenu from "../ReactDocMenu";

const TestUtils = React.addons.TestUtils;

describe(__filename, ()=> {

  describe("#props.grouper", ()=> {

    var reactDocMenu;

    beforeEach(()=> {
      reactDocMenu = TestUtils
        .renderIntoDocument(<ReactDocMenu reactDocJson={{}}/>);
    });

    it("should get a base group name from module name", function () {

      var result = reactDocMenu.props.grouper("path/to/src/components");

      expect(result).to.be.equal("src.components");

    });

  });

});

