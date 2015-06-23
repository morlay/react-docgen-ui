import _ from "lodash";
import path from "path";
import EXTENSIONS from "../constants/extensions";

function resolveExamplePathName(originRequireString, options = {}) {

  const extensions = options.extensions ? [].concat(options.extensions) : EXTENSIONS;
  const basedir = options.basedir || process.cwd();
  const pathName = originRequireString.match(/["'](\S+)["']/)[1];

  let resolvedPathName;

  if (_.startsWith(pathName, "./") || _.startsWith(pathName, "../")) {
    resolvedPathName = path.resolve(basedir, pathName);
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

export default resolveExamplePathName;