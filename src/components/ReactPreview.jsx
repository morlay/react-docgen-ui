import React from 'react'

import Resizable from './Resizable'

const PropTypes = React.PropTypes

export default class ReactPreview extends React.Component {

  static propTypes = {
    codeString: PropTypes.string,
    previewConfig: PropTypes.object
  }

  static defaultProps = {
    previewConfig: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      width: 320,
      height: 500
    }
  }

  componentDidMount() {
    this.refreshIframe(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.codeString !== this.props.codeString) {
      this.refreshIframe(nextProps)
    }
  }

  refreshIframe(props) {

    const iframe = React.findDOMNode(this.refs.iframe);
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document

    iframeDoc.close();

    const styles = props.previewConfig.styles || []
    const scripts = props.previewConfig.scripts || []

    const codeBlocks = [];

    styles.forEach((link)=> {
      codeBlocks.push(`<link rel='stylesheet' href='${link}'/> `)
    })

    scripts.forEach((link)=> {
      codeBlocks.push(`<script src='${link}'></script>`)
    })

    let script = `
        var React = require('react');
        var componentModule = {};
        (function(require, module, exports){
            ${props.codeString}
        })(components.require, componentModule, {});
        var Component = componentModule.exports;
        React.render(React.createElement(Component, {}, null), document.body)
      `

    codeBlocks.push(`<script>${script}</script>`)

    iframeDoc.open();
    iframeDoc.write(`<body>${codeBlocks.join('\n')}</body>`)

  }

  onResize(evt, {size}) {
    this.setState(size);
  }

  resizeWidth(evt) {
    this.setState({
      width: parseInt(evt.target.value)
    });
  }

  resizeHeight(evt) {
    this.setState({
      height: parseInt(evt.target.value)
    });
  }

  render() {

    const state = this.state

    const styles = {
      width: state.width + 'px', height: state.height + 'px'
    }

    return (<div className='react-preview'>
      <div className='react-preview__size-input'>
        <label>
          <span> width:</span>
          <input name='width'
                 type='number'
                 value={state.width}
                 onChange={this.resizeWidth.bind(this)}/>
        </label>
        <label>
          <span> height:</span>
          <input name='height'
                 type='number'
                 value={state.height}
                 onChange={this.resizeHeight.bind(this)}/>
        </label>
      </div>
      <Resizable
        width={state.width}
        height={state.height}
        className='react-preview__resize--container'
        onResize={this.onResize.bind(this)}>
        <iframe ref='iframe'
                style={styles}/>
      </Resizable>
    </div>)
  }
}
