import React from 'react'

const PropTypes = React.PropTypes;

class Message {
  constructor() {
    this.status = '';
  }
}

/**
 * I am the demo Component
 * @exampleFile ./examples/Component.jsx
 */
export default React.createClass({
  propTypes: {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalNode: PropTypes.node,
    optionalElement: PropTypes.element,
    optionalMessage: PropTypes.instanceOf(Message),
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
    optionalUnion: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message)
    ]),
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    optionalObjectWithShape: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    }),

    requiredFunc: PropTypes.func.isRequired,
    requiredAny: PropTypes.any.isRequired,

    customProp: function (props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  render(){
    return <span> I am a Component </span>;
  }
});
