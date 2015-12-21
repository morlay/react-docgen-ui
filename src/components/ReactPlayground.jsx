import React from 'react';
import classNames from 'classnames';
import * as babel from 'babel-core/lib/api/browser';

import babelPresetEs2015 from 'babel-preset-es2015';
import babelPresetStage0 from 'babel-preset-stage-0';
import babelPresetReact from 'babel-preset-react';

import CodeMirrorEditor from './CodeMirrorEditor';
import ReactPreview from './ReactPreview';

const PropTypes = React.PropTypes;

class ReactPlayground extends React.Component {

  static propTypes = {
    codeText: PropTypes.string.isRequired,
    previewConfig: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      codeText: props.codeText,
      showCode: false
    };
  }

  componentDidMount() {
    this.executeCode();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.codeText !== nextProps.codeText) {
      this.setState({
        codeText: nextProps.codeText
      }, ()=> {
        this.executeCode();
      });
    }
  }

  componentDidUpdate() {
    clearTimeout(this.timeoutID);
  }

  setTimeout() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  }

  executeCode() {

    try {

      const compiledCodeText = babel.transform(this.state.codeText, {
        sourceMaps: 'inline',
        presets: [
          babelPresetEs2015,
          babelPresetStage0,
          babelPresetReact
        ]
      }).code;

      if (compiledCodeText) {
        this.setState({
          compiledCodeText: compiledCodeText
        })
      }

    } catch (err) {
      this.setTimeout(()=> {
        console.error(err)
      }, 500);
    }

  }

  _onCodeToggle(evt) {
    evt.preventDefault();
    this.setState({
      showCode: !this.state.showCode
    })
  }

  handleCodeChange(value) {
    this.setState({codeText: value});
    this.executeCode();
  }

  renderPreview(component) {
    return component
  }

  render() {
    return (
      <div {...this.props}
        className='react-playground'>
        <div className='react-playground__example'>
          <div className='react-playground__example-inner'>
            <ReactPreview
              previewConfig={this.props.previewConfig}
              codeString={this.state.compiledCodeText}/>
          </div>
        </div>
        {this.state.showCode ? (
          <CodeMirrorEditor
            key='jsx'
            onChange={(e)=>this.handleCodeChange(e)}
            codeText={this.state.codeText}/>
        ) : null}
        <a href='#'
           onClick={(e)=>this._onCodeToggle(e)}
           className={classNames('react-playground__code-toggle', {
            'react-playground__code-toggle--open': this.state.showCode
          })}
          >
          {this.state.showCode ? 'hide code' : 'show code'}
        </a>
      </div>
    );
  }
}


export default ReactPlayground;
