import React from "react";
import _ from "lodash";
import DocHelpers from "../mixins/DocHelpers";
import ReactPlayground from "./ReactPlayground";

const PropTypes = React.PropTypes;

const ReactDocSection = React.createClass({

  propTypes: {
    componentItem: PropTypes.object.isRequired,
    reactDocGlobalRequire: PropTypes.func
  },

  mixins: [
    DocHelpers
  ],

  renderProps(componentProps) {

    return _(componentProps)
      .keys()
      .map((propKey, idx)=> {
        const propItem = componentProps[propKey];
        return (
          <div className="react-doc-section__prop" key={idx}>
            <h3 className="react-doc-section__prop-title"> Prop: {propKey}
              {propItem.required ? <span> *</span> : null}
            </h3>
            <small className="react-doc-section__prop-sub-title">
              {this.processType(propItem.type)}
            </small>
            <div className="react-doc-section__prop-desc"
                 dangerouslySetInnerHTML={{
                   __html: propItem.description ? propItem.description : ""
                 }}/>
            {this.renderExamples(propItem.examples)}
          </div>
        )
      })
      .value();

  },

  processType(typeObject) {
    if (_.isObject(typeObject)) {
      switch (typeObject.name) {

        case "shape":

          return (
            <div>
              <div>
                {`Type: ${typeObject.name}`}
              </div>
              <table>
                { _(typeObject.value)
                  .keys()
                  .map((key, idx)=> {
                    return (
                      <tr key={idx}>
                        <td>{key}</td>
                        <td>{this.processType(typeObject.value[key])}</td>
                      </tr>)
                  })
                  .value()}
              </table>
            </div>
          );

        case "enum":
        case "union":

          return _(typeObject.value)
            .map((obj)=> {
              return this.processType(obj);
            })
            .join(" | ");

        case "instanceOf":

          return `Type: ${typeObject.name} ${typeObject.value}`;

        default:
          return typeObject.name ? `Type: ${typeObject.name}` : `Value: ${typeObject.value}`;
      }
    }
  },

  renderExamples(examples = []) {
    return _.map(examples, (exampleItem, idx)=> {
      return (
        <ReactPlayground
          key={idx}
          reactDocGlobalRequire={this.props.reactDocGlobalRequire}
          codeText={exampleItem.contents}
          />)
    });
  },

  render(){

    const props = this.props;

    return (
      <section {...props}
        className="react-doc-section">
        <h2 className="react-doc-section__title">{props.componentItem.name}
          <small className="react-doc-section__sub-title">
            {props.grouper(props.componentItem.module)}
          </small>
        </h2>
        <div className="react-doc-section__desc"
             dangerouslySetInnerHTML={{
               __html: props.componentItem.description
             }}/>
        {this.renderExamples(props.componentItem.examples)}
        {this.renderProps(props.componentItem.props)}
      </section>
    )

  }
});

export default ReactDocSection;