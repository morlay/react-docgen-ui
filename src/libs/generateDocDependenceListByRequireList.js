import _ from 'lodash';

function generateDocDependenceListByRequireList(dependenceList = []) {
  return _(dependenceList)
    .map((item)=> {
      return `exports['${item}'] = require('${item}');`
    })
    .join('\n')
}

export default generateDocDependenceListByRequireList;
