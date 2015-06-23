import path from "path";
import getModulePathByVinylFile from "./getModulePathByVinylFile";

function getModuleInfoByVinylFile(vinylFile) {
  return {
    "name": path.basename(vinylFile.path, path.extname(vinylFile.path)),
    "module": path.dirname(getModulePathByVinylFile(vinylFile))
  }
}

export default getModuleInfoByVinylFile;