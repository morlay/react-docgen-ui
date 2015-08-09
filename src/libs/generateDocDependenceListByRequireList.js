import _ from 'lodash';

function generateDocDependenceListByRequireList(dependenceList = []) {
  return _(dependenceList)
    .map((item)=> {
      return `require('${item}');`
    })
    .push('module.exports = require;')
    .join('\n');
}

export default generateDocDependenceListByRequireList;