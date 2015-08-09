import React from 'react';
import _ from 'lodash';
import DocHelpers from '../mixins/DocHelpers';

import ReactDocSection from './ReactDocSection';

const PropTypes = React.PropTypes;

const ReactDocMain = React.createClass({

  propTypes: {
    reactDocJson: PropTypes.object,
    previewConfig: PropTypes.object,
    params: PropTypes.object.isRequired,
    grouper: PropTypes.func
  },

  mixins: [
    DocHelpers
  ],

  renderDocMain() {

    const props = this.props;

    return (
      <main elem='doc-main'>
        {_(props.reactDocJson)
          .values()
          .filter((componentItem)=> {
            if (props.params.groupName) {
              if (props.params.componentName) {
                return props.grouper(componentItem.module) === props.params.groupName
                  && componentItem.name === props.params.componentName
              }
              return props.grouper(componentItem.module) === props.params.groupName
            }
            return true;
          })
          .map((componentItem, idx)=> {
            return (
              <ReactDocSection
                key={idx}
                componentItem={componentItem}
                reactDocGlobalRequire={props.reactDocGlobalRequire}
                />
            )
          })
          .value()
        }
      </main>
    )
  },

  render() {
    return (
      <div className='react-doc-main'>
        {this.renderDocMain()}
      </div>
    );
  }

});

export default ReactDocMain;
