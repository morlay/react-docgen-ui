import _ from "lodash";

function getDocDependenceListByResult(result) {

  var requireList = {};

  findExample(result);

  function findExample(obj) {
    _.forEach(_.keys(obj), (key)=> {
      if (_.isPlainObject(obj[key])) {
        findExample(obj[key])
      } else if (key === "examples") {
        _.forEach(obj[key], (exampleItem)=> {
          _.forEach(exampleItem.requireList, (requireItem)=> {
            requireList[requireItem.path] = true;
          })
        })
      }
    })
  }

  return _.keys(requireList);
}


export default getDocDependenceListByResult;