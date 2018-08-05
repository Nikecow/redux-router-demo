(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!********************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.object.assign.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(244);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.object.assign.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.split.js":
/*!*******************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.regexp.split.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(338);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.regexp.split.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./src/components/List.js":
/*!********************************!*\
  !*** ./src/components/List.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/es6.object.assign */ \"./node_modules/core-js/modules/es6.object.assign.js\");\n\n__webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _reduxFirstRouterLink = _interopRequireDefault(__webpack_require__(/*! redux-first-router-link */ \"./node_modules/redux-first-router-link/dist/index.js\"));\n\nvar _List = _interopRequireDefault(__webpack_require__(/*! ../css/List */ \"./src/css/List.css\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nvar List = function List(_ref) {\n  var videos = _ref.videos;\n  return _react.default.createElement(\"div\", {\n    className: _List.default.list\n  }, videos.map(function (video, key) {\n    return _react.default.createElement(Row, _extends({}, video, {\n      key: key\n    }));\n  }));\n};\n\nvar Row = function Row(_ref2) {\n  var slug = _ref2.slug,\n      title = _ref2.title,\n      youtubeId = _ref2.youtubeId,\n      by = _ref2.by,\n      color = _ref2.color;\n  return _react.default.createElement(_reduxFirstRouterLink.default, {\n    className: _List.default.row,\n    to: \"/video/\".concat(slug),\n    style: {\n      backgroundImage: youtubeBackground(youtubeId)\n    }\n  }, _react.default.createElement(\"div\", {\n    className: _List.default.avatar,\n    style: {\n      backgroundColor: color\n    }\n  }, initials(by)), _react.default.createElement(\"span\", {\n    className: _List.default.title\n  }, title), _react.default.createElement(\"div\", {\n    className: _List.default.gradient\n  }), _react.default.createElement(\"span\", {\n    className: _List.default.by\n  }, \"by: \", by));\n};\n\nvar youtubeBackground = function youtubeBackground(youtubeId) {\n  return \"url(https://img.youtube.com/vi/\".concat(youtubeId, \"/maxresdefault.jpg)\");\n};\n\nvar initials = function initials(by) {\n  return by.split(' ').map(function (name) {\n    return name[0];\n  }).join('');\n};\n\nvar mapState = function mapState(_ref3) {\n  var category = _ref3.category,\n      videosByCategory = _ref3.videosByCategory,\n      videosHash = _ref3.videosHash;\n  var slugs = videosByCategory[category] || [];\n  var videos = slugs.map(function (slug) {\n    return videosHash[slug];\n  });\n  return {\n    videos: videos\n  };\n};\n\nvar _default = (0, _reactRedux.connect)(mapState)(List);\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(List, \"List\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\List.js\");\n  reactHotLoader.register(Row, \"Row\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\List.js\");\n  reactHotLoader.register(youtubeBackground, \"youtubeBackground\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\List.js\");\n  reactHotLoader.register(initials, \"initials\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\List.js\");\n  reactHotLoader.register(mapState, \"mapState\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\List.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\List.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/List.js?");

/***/ }),

/***/ "./src/css/List.css":
/*!**************************!*\
  !*** ./src/css/List.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by extract-css-chunks-webpack-plugin\n    if(true) {\n      // 1533502126461\n      var cssReload = __webpack_require__(/*! ../../node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js */ \"./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/css/List.css?");

/***/ })

}]);