function getModuleName(vinylFile) {
  if (vinylFile.cwd) {
    return vinylFile.path.replace(vinylFile.cwd + "/", "")
  }
  return vinylFile.path;
}

export default getModuleName;