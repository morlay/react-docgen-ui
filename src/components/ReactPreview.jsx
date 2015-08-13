import React from 'react';

const PropTypes = React.PropTypes;

class ReactPreview extends React.Component {

  static propTypes = {
    codeString: PropTypes.string,
    previewConfig: PropTypes.object
  }

  static defaultProps = {
    previewConfig: {}
  }

  componentDidMount() {
    this.refreshIframe(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.codeString !== this.props.codeString) {
      this.refreshIframe(nextProps)
    }
  }

  shouldComponentUpdate() {
    return false
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
        console.log(Component)
        React.render(React.createElement(Component, {}, null), document.getElementById('demo'))
      `

    codeBlocks.push(`<script>${script}</script>`)

    iframeDoc.open();
    iframeDoc.write(`<body><div id="demo">${codeBlocks.join('\n')}</div></body>`)

  }

  render() {
    return <iframe ref='iframe'/>
  }
}

export default ReactPreview;
