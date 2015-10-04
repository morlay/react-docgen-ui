import React from 'react';

import createHistory from 'history/lib/createHashHistory'

import reactDocJson from './data/react-doc.json';

import ReactDocMain from '../src/components/ReactDocMain';
import ReactDocMenu from '../src/components/ReactDocMenu';

import {
  Router,
  Route,
  IndexRoute
} from 'react-router';

const siteUrlBase = window.location.origin + window.location.pathname;

const previewConfig = {
  styles: [],
  scripts: [
    `${siteUrlBase}assets/js/vendor.js`,
    `${siteUrlBase}assets/js/components.js`
  ]
}

class ReactDoc extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  static contextTypes = {
    history: React.PropTypes.object
  }

  _onMenuItemClick(groupName, componentName) {

    const history = this.context.history;

    if (componentName) {
      history.pushState(null, `/${groupName}/${componentName}`)
    } else if (groupName) {
      history.pushState(null, `/${groupName}`)
    } else {
      history.pushState(null, `/`)
    }
  }

  render() {
    return (
      <div className='react-doc'>
        <ReactDocMenu onItemClick={this._onMenuItemClick.bind(this)}
                      reactDocJson={reactDocJson}/>
        {React.cloneElement(this.props.children, {
          previewConfig: previewConfig,
          reactDocJson: reactDocJson
        })}
      </div>
    );
  }

}

React.render(
  (<Router history={createHistory()}>
    <Route path='/'
           component={ReactDoc}>
      <IndexRoute component={ReactDocMain}/>
      <Route path='/:groupName'
             component={ReactDocMain}/>
      <Route path='/:groupName/:componentName'
             component={ReactDocMain}/>
    </Route>
  </Router>),
  global.document.getElementById('root')
);
