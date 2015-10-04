(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

global.components = global.components || {};
global.components.require = require('./data/react-doc');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./data/react-doc":3}],2:[function(require,module,exports){
'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PropTypes = _react2['default'].PropTypes;

var Message = function Message() {
  _classCallCheck(this, Message);

  this.status = '';
}

/**
 * I am the demo Component
 * @exampleFile ./examples/Component.jsx
 */
;

exports['default'] = _react2['default'].createClass({
  displayName: 'Component',

  propTypes: {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalNode: PropTypes.node,
    optionalElement: PropTypes.element,
    optionalMessage: PropTypes.instanceOf(Message),
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
    optionalUnion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Message)]),
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    optionalObjectWithShape: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    }),

    requiredFunc: PropTypes.func.isRequired,
    requiredAny: PropTypes.any.isRequired,

    customProp: function customProp(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!', componentName);
      }
    }

  },

  render: function render() {
    return _react2['default'].createElement(
      'span',
      null,
      ' I am a Component ',
      this.props.requiredAny,
      ' '
    );
  }

});
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":4,"babel-runtime/helpers/interop-require-default":5,"react":"react"}],3:[function(require,module,exports){
'use strict';

require('react');
require('/Users/morlay/GitRepo/react-docgen-ui/example/components/Component');
module.exports = require;

},{"/Users/morlay/GitRepo/react-docgen-ui/example/components/Component":2,"react":"react"}],4:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],5:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbW9ybGF5L0dpdFJlcG8vcmVhY3QtZG9jZ2VuLXVpL2V4YW1wbGUvY29tcG9uZW50cy5qc3giLCIvVXNlcnMvbW9ybGF5L0dpdFJlcG8vcmVhY3QtZG9jZ2VuLXVpL2V4YW1wbGUvY29tcG9uZW50cy9Db21wb25lbnQuanN4IiwiL1VzZXJzL21vcmxheS9HaXRSZXBvL3JlYWN0LWRvY2dlbi11aS9leGFtcGxlL2RhdGEvcmVhY3QtZG9jLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzcy1jYWxsLWNoZWNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUE7QUFDM0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7Ozs7Ozs7Ozs7Ozs7OztxQkNEckMsT0FBTzs7OztBQUV6QixJQUFNLFNBQVMsR0FBRyxtQkFBTSxTQUFTLENBQUM7O0lBRTVCLE9BQU8sR0FDQSxTQURQLE9BQU8sR0FDRzt3QkFEVixPQUFPOztBQUVULE1BQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0NBQ2xCOzs7Ozs7OztxQkFPWSxtQkFBTSxXQUFXLENBQUM7OztBQUUvQixXQUFTLEVBQUU7QUFDVCxpQkFBYSxFQUFFLFNBQVMsQ0FBQyxLQUFLO0FBQzlCLGdCQUFZLEVBQUUsU0FBUyxDQUFDLElBQUk7QUFDNUIsZ0JBQVksRUFBRSxTQUFTLENBQUMsSUFBSTtBQUM1QixrQkFBYyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQ2hDLGtCQUFjLEVBQUUsU0FBUyxDQUFDLE1BQU07QUFDaEMsa0JBQWMsRUFBRSxTQUFTLENBQUMsTUFBTTtBQUNoQyxnQkFBWSxFQUFFLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLG1CQUFlLEVBQUUsU0FBUyxDQUFDLE9BQU87QUFDbEMsbUJBQWUsRUFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztBQUM5QyxnQkFBWSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDakQsaUJBQWEsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQ2pDLFNBQVMsQ0FBQyxNQUFNLEVBQ2hCLFNBQVMsQ0FBQyxNQUFNLEVBQ2hCLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQzlCLENBQUM7QUFDRixtQkFBZSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNwRCxvQkFBZ0IsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O0FBRXRELDJCQUF1QixFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDdkMsV0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQ3ZCLGNBQVEsRUFBRSxTQUFTLENBQUMsTUFBTTtLQUMzQixDQUFDOztBQUVGLGdCQUFZLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0FBQ3ZDLGVBQVcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVU7O0FBRXJDLGNBQVUsRUFBRSxvQkFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTtBQUNwRCxVQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUNwQyxlQUFPLElBQUksS0FBSyxDQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxDQUFDO09BQ3ZEO0tBQ0Y7O0dBRUY7O0FBRUQsUUFBTSxFQUFBLGtCQUFFO0FBQ04sV0FBTzs7OztNQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7O0tBQVMsQ0FBQztHQUNqRTs7Q0FFRixDQUFDOzs7Ozs7QUN2REYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLE9BQU8sQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO0FBQzlFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7QUNGekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJnbG9iYWwuY29tcG9uZW50cyA9IGdsb2JhbC5jb21wb25lbnRzIHx8IHt9XG5nbG9iYWwuY29tcG9uZW50cy5yZXF1aXJlID0gcmVxdWlyZSgnLi9kYXRhL3JlYWN0LWRvYycpIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBQcm9wVHlwZXMgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbmNsYXNzIE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN0YXR1cyA9ICcnO1xuICB9XG59XG5cbi8qKlxuICogSSBhbSB0aGUgZGVtbyBDb21wb25lbnRcbiAqIEBleGFtcGxlRmlsZSAuL2V4YW1wbGVzL0NvbXBvbmVudC5qc3hcbiAqL1xuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIG9wdGlvbmFsQXJyYXk6IFByb3BUeXBlcy5hcnJheSxcbiAgICBvcHRpb25hbEJvb2w6IFByb3BUeXBlcy5ib29sLFxuICAgIG9wdGlvbmFsRnVuYzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3B0aW9uYWxOdW1iZXI6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb3B0aW9uYWxPYmplY3Q6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb3B0aW9uYWxTdHJpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3B0aW9uYWxOb2RlOiBQcm9wVHlwZXMubm9kZSxcbiAgICBvcHRpb25hbEVsZW1lbnQ6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIG9wdGlvbmFsTWVzc2FnZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoTWVzc2FnZSksXG4gICAgb3B0aW9uYWxFbnVtOiBQcm9wVHlwZXMub25lT2YoWydOZXdzJywgJ1Bob3RvcyddKSxcbiAgICBvcHRpb25hbFVuaW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoTWVzc2FnZSlcbiAgICBdKSxcbiAgICBvcHRpb25hbEFycmF5T2Y6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuICAgIG9wdGlvbmFsT2JqZWN0T2Y6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMubnVtYmVyKSxcblxuICAgIG9wdGlvbmFsT2JqZWN0V2l0aFNoYXBlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgY29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBmb250U2l6ZTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgcmVxdWlyZWRGdW5jOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHJlcXVpcmVkQW55OiBQcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG5cbiAgICBjdXN0b21Qcm9wOiBmdW5jdGlvbiAocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgICBpZiAoIS9tYXRjaG1lLy50ZXN0KHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVmFsaWRhdGlvbiBmYWlsZWQhJywgY29tcG9uZW50TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgcmVuZGVyKCl7XG4gICAgcmV0dXJuIDxzcGFuPiBJIGFtIGEgQ29tcG9uZW50IHt0aGlzLnByb3BzLnJlcXVpcmVkQW55fSA8L3NwYW4+O1xuICB9XG5cbn0pO1xuIiwicmVxdWlyZSgncmVhY3QnKTtcbnJlcXVpcmUoJy9Vc2Vycy9tb3JsYXkvR2l0UmVwby9yZWFjdC1kb2NnZW4tdWkvZXhhbXBsZS9jb21wb25lbnRzL0NvbXBvbmVudCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyJdfQ==
