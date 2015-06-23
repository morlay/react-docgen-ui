import React from "react";

const PropTypes = React.PropTypes;

export default {

  propTypes: {
    grouper: PropTypes.func
  },

  getDefaultProps(){
    return {
      grouper: (moduleName)=> {
        var result = moduleName.match(/[^\/]+\/[^\/]+$/);
        if (result) {
          return encodeGroupName(result[0]);
        }
        return null;
      }
    }
  }
}

function encodeGroupName(string) {
  return string.replace("/", ".");
}