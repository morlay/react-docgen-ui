import { expect } from "chai";
import { File } from "gulp-util"
import path from "path";

import getModulePathByVinylFile from "../getModulePathByVinylFile"

describe(__filename, function () {

  context("getModulePathByVinylFile", ()=> {

    it("should get module name by vinylFile object", function () {

      const pathName = "path/to/file.jsx";
      const vinylFile = new File({
        path: pathName
      });

      expect(getModulePathByVinylFile(vinylFile)).to.be.equal(pathName);

    });

    it("should get module name by vinylFile object when set some cwd", function () {

      const cwd = "path/to";
      const pathName = "path/to/file.jsx";
      const vinylFile = new File({
        cwd: cwd,
        path: pathName
      });

      expect(getModulePathByVinylFile(vinylFile)).to.be.equal(path.relative(cwd, pathName));

    });

  })

});