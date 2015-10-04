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

  setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  executeCode: function () {

    try {

      const compiledCode = babel.transform(this.state.codeText, {
        sourceMaps: 'inline'
      }).code;

      let Component;

      eval(`
        const componentModule = {};
        (function(require, module, exports){
          ${compiledCode}
        })(this.props.reactDocGlobalRequire, componentModule, {});
        Component = componentModule.exports;
      `);

      this.setState({
        component: <Component/>
      });

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

  renderPreview(component){
    return component
  },

  render() {
    return (
      <div {...this.props}
        className='react-playground'>
        <div className='react-playground__example'>
          <div className='react-playground__example-inner'>
            {this.renderPreview(this.state.component)}
          </div>
        </div>
        {this.state.showCode ? (
          <CodeMirrorEditor
            key='jsx'
            onChange={this.handleCodeChange}
            codeText={this.state.codeText}/>
        ) : null}
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
