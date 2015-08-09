import React from 'react';
import classNames from 'classnames';
import * as babel from 'babel';

import CodeMirrorEditor from './CodeMirrorEditor';

const PropTypes = React.PropTypes;

const ReactPlayground = React.createClass({

  propTypes: {
    codeText: PropTypes.string.isRequired,
    reactDocGlobalRequire: PropTypes.func
  },

  getInitialState() {
    return {
      codeText: this.props.codeText,
      showCode: false
    };
  },

  componentDidMount() {
    this.executeCode();
  },

  componentWillReceiveProps(nextProps) {
    if (this.state.codeText !== nextProps.codeText) {
      this.setState({
        codeText: nextProps.codeText
      }, ()=> {
        this.executeCode();
      });
    }
  },

  componentDidUpdate() {
    clearTimeout(this.timeoutID);
  },


  componentWillUnmount() {
    try {
      const mountNode = React.findDOMNode(this.refs.preview);
      React.unmountComponentAtNode(mountNode);
    } catch (e) {
      console.log(e)
    }
  },

  setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  executeCode: function () {
    const mountNode = React.findDOMNode(this.refs.preview);

    try {

      React.unmountComponentAtNode(mountNode);

      const compiledCode = babel.transform(this.state.codeText).code;

      let Inst;

      eval(
        'Inst = function(require){\n' + compiledCode + '\n};'
      );

      Inst.call(null, this.props.reactDocGlobalRequire);

    } catch (err) {

      this.setTimeout(()=> {
        console.error(err)
      }, 500);

    }

  },

  _onCodeToggle(evt){
    evt.preventDefault();
    this.setState({
      showCode: !this.state.showCode
    })
  },

  handleCodeChange(value) {
    this.setState({codeText: value});
    this.executeCode();
  },

  render() {
    return (
      <div {...this.props}
        className='react-playground'>
        <div className='react-playground__example'>
          <div className='react-playground__example-inner' ref='preview'/>
        </div>
        { this.state.showCode ? (
          <CodeMirrorEditor
            key='jsx'
            onChange={this.handleCodeChange}
            codeText={this.state.codeText}/>
        ) : null }
        <a href='#'
           onClick={this._onCodeToggle}
           className={classNames('react-playground__code-toggle', {
            'react-playground__code-toggle--open': this.state.showCode
          })}
          >
          {this.state.showCode ? 'hide code' : 'show code'}
        </a>
      </div>
    );
  }
});

export default ReactPlayground;
