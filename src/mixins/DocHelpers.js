export default {
  getDefaultProps(){
    return {
      grouper: (moduleName)=> {
        let result = moduleName.match(/[^\/]+\/[^\/]+$/);
        if (result) {
          return encodeGroupName(result[0]);
        }
        return null;
      }
    }
  }
}

function encodeGroupName(string) {
  return string.replace('/', '.');
}