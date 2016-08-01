import _ from 'lodash';
import path from 'path';
import gUtil from 'gulp-util';
import through from 'through2';
import * as reactDocGen from 'react-docgen';

import getModulePathByVinylFile from './libs/getModulePathByVinylFile';
import getModuleInfoByVinylFile from './libs/getModuleInfoByVinylFile';
import descriptionProcess from './libs/descriptionProcess';
import getDocDependenceListByResult from './libs/getDocDependenceListByResult';
import generateDocDependenceListByRequireList from './libs/generateDocDependenceListByRequireList';

const PLUGIN_NAME = 'react-doc';

function gulpPlugin(options = {}) {

  let result = {};

  function docJson(file, enc, cb) {

    file.cwd = options.cwd;

    try {

      const moduleInfo = reactDocGen.parse(String(file.contents));

      if (!_.isEmpty(moduleInfo)) {
        result[getModulePathByVinylFile(file)] = _.merge(
          descriptionProcess(moduleInfo, _.merge({}, options, {
            basedir: path.dirname(file.path)
          })),
          getModuleInfoByVinylFile(file)
        );
      }

    } catch (err) {
      err.name = `Error on handle file ${file.path}`;
      this.emit('error', new gUtil.PluginError(PLUGIN_NAME, err));
    }

    return cb();

  }

  function endStream(cb) {

    const filename = options.filename || PLUGIN_NAME;

    const jsonFile = new gUtil.File({
      path: filename + '.json',
      contents: new Buffer(JSON.stringify(result, null, 2))
    });

    const requireListFile = new gUtil.File({
      path: filename + '.js',
      contents: new Buffer(
        generateDocDependenceListByRequireList(
          getDocDependenceListByResult(result)
        )
      )
    });

    this.push(jsonFile);
    this.push(requireListFile);

    cb();

  }

  return through.obj(docJson, endStream);

}

export default gulpPlugin;
