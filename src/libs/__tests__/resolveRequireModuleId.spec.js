import { expect } from "chai";
import path from "path";

import resolveRequireModuleId from "../resolveRequireModuleId"

describe(__filename, function () {

  context("resolveRequireModuleId", ()=> {

    it("should get the module id for npm module or absolute module", function () {

      expect(resolveRequireModuleId("var react require('react');"))
        .to.be.equal("react");

      expect(resolveRequireModuleId("import react from 'react';"))
        .to.be.equal("react");

      expect(resolveRequireModuleId("var react require('/react');"))
        .to.be.equal("/react");

      expect(resolveRequireModuleId("import react from '/react';"))
        .to.be.equal("/react");

    });

    it("should get the module id for relative module", function () {

      expect(resolveRequireModuleId("var react require('./react');", {
        basedir: __dirname
      }))
        .to.be.equal(path.join(__dirname, "./react"));

      expect(resolveRequireModuleId("var react require('../react');", {
        basedir: __dirname
      }))
        .to.be.equal(path.join(__dirname, "../react"));

    });

    it("should get the module id for relative module when set cwd", function () {

      expect(resolveRequireModuleId("var react require('./react');", {
        cwd: process.cwd(),
        basedir: __dirname
      }))
        .to.be.equal("src/libs/__tests__/react");

      expect(resolveRequireModuleId("var react require('../react');", {
        cwd: process.cwd(),
        basedir: __dirname
      }))
        .to.be.equal("src/libs/react");

    });

  })

});