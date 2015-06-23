import React from "react"
import _ from "lodash"
import DocHelpers from "../mixins/DocHelpers";

const PropTypes = React.PropTypes;

const ReactDocMenu = React.createClass({

  propTypes: {
    reactDocJson: PropTypes.object.isRequired,
    /**
     * `groupName`, `componentName`
     */
    onItemClick: PropTypes.func
  },

  mixins: [
    DocHelpers
  ],

  getDefaultProps(){
    return {
      onItemClick: ()=> null
    }
  },

  _getGroups(info){

    return _(info)
      .values()
      .map((componentItem)=> {
        return this.props.grouper(componentItem.module);
      })
      .uniq()
      .value();

  },

  _onItemClick(groupName, componentName, evt){
    evt.preventDefault();
    this.props.onItemClick(groupName, componentName)
  },

  renderMenuItem(componentList){
    return _.map(componentList, (componentItem, idx)=> {
      return (
        <li className="react-doc-menu__group-list-item" key={idx}>
          <a href="#"
             onClick={this._onItemClick.bind(this, this.props.grouper(componentItem.module), componentItem.name)}>
            {componentItem.name}
          </a>
        </li>
      )
    })
  },

  renderWrapper(children){
    return (
      <div className="react-doc-menu">
        <h1 className="react-doc-menu__group-heading">
          <a href="#" onClick={this._onItemClick.bind(this, null, null)}>
            All
          </a>
        </h1>
        {children}
      </div>);
  },

  render() {

    const groups = this._getGroups(this.props.reactDocJson);

    if (!_.isEmpty(groups)) {
      return this.renderWrapper(
        _.map(groups, (groupName, idx)=> {
          return (
            <div
              key={idx}
              className="react-doc-menu__group">
              <h1 className="react-doc-menu__group-heading">
                <a href="#" onClick={this._onItemClick.bind(this, groupName, null)}>
                  {groupName}
                </a>
              </h1>
              <ul className="react-doc-menu__group-list">
                {
                  this.renderMenuItem(
                    _(this.props.reactDocJson)
                      .values()
                      .filter((componentItem)=> {
                        return this.props.grouper(componentItem.module) === groupName;
                      })
                      .value()
                  )
                }
              </ul>
            </div>
          )
        })
      )
    }

    return this.renderWrapper(
      this.renderMenuItem(_.values(this.props.reactDocJson))
    );

  }
});

export default ReactDocMenu;
