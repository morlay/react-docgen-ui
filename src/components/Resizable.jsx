import React, { PropTypes } from 'react';
import { Resizable as OldResizable } from 'react-resizable';

export default class Resizable extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onResize: PropTypes.func
  }

  static defaultProps = {
    onResize: ()=> null
  }

  constructor(props) {
    super(props)
    this.state = {
      width: props.width,
      height: props.height
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.state.width || nextProps.height !== this.state.height) {
      this.setState({
        width: nextProps.width,
        height: nextProps.height
      })
    }
  }

  onResize(evt, {size}) {
    this.setState(size)
    this.props.onResize(evt, {
      size: size
    })
  }

  onResizeStop() {
    React.findDOMNode(this.refs.mask).classList.remove('show')
  }

  onResizeStart() {
    React.findDOMNode(this.refs.mask).classList.add('show')
  }

  render() {
    const props = this.props
    const state = this.state

    const styles = {
      width: state.width + 'px', height: state.height + 'px'
    }

    return (
      <OldResizable
        width={props.width}
        height={props.height}
        className={props.className}
        minConstraints={[320, 320]}
        onResizeStop={this.onResizeStop.bind(this)}
        onResizeStart={this.onResizeStart.bind(this)}
        onResize={this.onResize.bind(this)}>
        <div style={styles}>
          {props.children}
          <div ref='mask'
               className='react-resizable__mask'/>
        </div>
      </OldResizable>
    )
  }
}
