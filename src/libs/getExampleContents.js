import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import resolveRequireModuleId from './resolveRequireModuleId';

function getExampleContents(tagItem = {}, options = {}) {

  options = _.clone(options);

  const basedir = options.basedir || process.cwd();

  let contents;
  let exampleFile = null;

  if (tagItem.title === 'exampleFile') {
    exampleFile = path.resolve(basedir, _.trim(tagItem.description));
    options.basedir = path.dirname(exampleFile);
    options.basename = path.basename(exampleFile);
    contents = String(fs.readFileSync(exampleFile, 'utf-8'));
  } else {
    contents = tagItem.description
  }

  let imports = [];

  const es6Way = contents.match(/import[^'"]+(\S+)/gm);
  const cjsWay = contents.match(/require\((\S+)\)/gm);

  if (es6Way) {
    imports = imports.concat(es6Way);
  }
  if (cjsWay) {
    imports = imports.concat(cjsWay);
  }

  let requireList = _.map(imports, (item)=> {
    const resolvedPathName = resolveRequireModuleId(item, options);
    return {
      path: resolvedPathName,
      src: item,
      dest: item.replace(/['"](\S+)['"]/gm, `'${resolvedPathName}'`)
    }
  });

  return {
    requireList: requireList,
    contents: _.reduce(requireList, function (processedContents, requireItem) {
      return processedContents.replace(requireItem.src, requireItem.dest)
    }, contents)
  };
}

export default getExampleContents;
