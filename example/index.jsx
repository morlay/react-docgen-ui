import React from 'react';

import reactDocJson from './data/react-doc.json';

import ReactDocMain from '../src/components/ReactDocMain';
import ReactDocMenu from '../src/components/ReactDocMenu';

import { run, Route, DefaultRoute, RouteHandler, Navigation } from 'react-router';

const siteUrlBase = window.location.origin + window.location.pathname;

const previewConfig = {
  styles: [],
  scripts: [
    `${siteUrlBase}assets/js/vendor.js`,
    `${siteUrlBase}assets/js/components.js`
  ]
}

const ReactDoc = React.createClass({

  mixins: [
    Navigation
  ],

  _onMenuItemClick(groupName, componentName){

    if (componentName) {
      this.transitionTo('react-doc-component', {
        groupName: groupName,
        componentName: componentName
      })
    } else if (groupName) {
      this.transitionTo('react-doc-group', {
        groupName: groupName
      })
    } else {
      this.transitionTo('react-doc')
    }
  },

  render() {
    return (
      <div className='react-doc'>
        <ReactDocMenu
          onItemClick={this._onMenuItemClick}
          reactDocJson={reactDocJson}/>
        <RouteHandler
          previewConfig={previewConfig}
          reactDocJson={reactDocJson}/>
      </div>
    );
  }
});

const rootRoutes = (
  <Route name='react-doc' path='/' handler={ ReactDoc }>
    <DefaultRoute handler={ ReactDocMain }/>
    <Route name='react-doc-group' path='/:groupName' handler={ ReactDocMain }/>
    <Route name='react-doc-component' path='/:groupName/:componentName' handler={ ReactDocMain }/>
  </Route>
);

run(rootRoutes, function (Handler) {
  React.render(<Handler />, global.document.body);
});