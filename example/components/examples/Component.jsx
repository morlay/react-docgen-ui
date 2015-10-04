import React from 'react';
import Component from '../Component.jsx'

class ComponentDemo extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  someFunc() {

  }

  render() {
    return (
      <Component
        requiredFunc={this.someFunc}
        requiredAny={1}/>
    )
  }
}

export default ComponentDemo;



