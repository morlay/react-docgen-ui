import React from 'react';
import CodeMirror from 'codemirror';

const PropTypes = React.PropTypes;

require('codemirror/mode/javascript/javascript');

const IS_MOBILE = typeof global.navigator !== 'undefined' && (
    global.navigator.userAgent.match(/Android/i)
    || global.navigator.userAgent.match(/webOS/i)
    || global.navigator.userAgent.match(/iPhone/i)
    || global.navigator.userAgent.match(/iPad/i)
    || global.navigator.userAgent.match(/iPod/i)
    || global.navigator.userAgent.match(/BlackBerry/i)
    || global.navigator.userAgent.match(/Windows Phone/i)
  );

const CodeMirrorEditor = React.createClass({

  propTypes: {
    codeText: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    isMobile: PropTypes.bool
  },

  getDefaultProps(){
    return {
      isMobile: IS_MOBILE,
      onChange: function () {
      }
    }
  },

  componentDidMount() {
    if (this._isMobile()) {
      this._removeEditor();
    } else {
      this._initialEditor();
    }
  },

  _initialEditor(){

    this._editor = CodeMirror.fromTextArea(React.findDOMNode(this.refs.editor), {
      mode: 'javascript',
      lineNumbers: true,
      lineWrapping: true,
      matchBrackets: true,
      tabSize: 2,
      theme: 'solarized',
      readOnly: this.props.readOnly
    });

    this._editor.on('change', this._handleChange);

  },

  _removeEditor(){
    this._editor = null;
  },

  _handleChange() {
    if (!this.props.readOnly) {
      this.props.onChange(this._editor.getValue());
    }
  },

  _isMobile(){
    return !!this.props.isMobile;
  },

  render() {
    let editor;

    if (this._isMobile()) {
      editor = (
        <pre style={{overflow: 'scroll'}}>
          {this.props.codeText}
        </pre>
      );
    } else {
      editor = (<textarea ref='editor'
                          defaultValue={this.props.codeText}/>);
    }

    return (
      <div
        {...this.props}
        className='code-mirror-editor'>
        {editor}
      </div>
    );
  }
});

export default CodeMirrorEditor;
