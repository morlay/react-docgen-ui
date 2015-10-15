import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import EXTENSIONS from '../constants/extensions';

function resolveRequireModuleId(originRequireString, options = {}) {

  const extensions = options.extensions ? [].concat(options.extensions) : EXTENSIONS;
  const basedir = options.basedir || process.cwd();
  const filePath = path.join(basedir, options.basename || '');
  const pathName = originRequireString.match(/['"](\S+)['"]/)[1];

  let resolvedPathName;


  if (_.startsWith(pathName, './') || _.startsWith(pathName, '../')) {
    resolvedPathName = path.resolve(basedir, pathName);
    if (!existsFileWithExtensions(resolvedPathName)) {
      throw new Error(`${resolvedPathName} is not exists, please check file in ${filePath}`)
    }
    if (filePath === resolvedPathName) {
      throw new Error(`should not require self`)
    }
    if (options.cwd) {
      resolvedPathName = path.relative(options.cwd, resolvedPathName)
    }
  } else {
    resolvedPathName = pathName;
  }

  if (_.contains(extensions, path.extname(resolvedPathName))) {
    return resolvedPathName.slice(0, -path.extname(resolvedPathName).length);
  }

  return resolvedPathName;
}

function existsFileWithExtensions(resolvedPathName) {
  return [null].concat(EXTENSIONS).reduce((result, ext) => {
    return result || fs.existsSync(resolvedPathName + (ext || ''))
  }, false)
}

export default resolveRequireModuleId;
