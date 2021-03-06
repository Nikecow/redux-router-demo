(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/components/Player.js":
/*!**********************************!*\
  !*** ./src/components/Player.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _reduxFirstRouterLink = _interopRequireDefault(__webpack_require__(/*! redux-first-router-link */ \"./node_modules/redux-first-router-link/dist/index.js\"));\n\nvar _Video = _interopRequireDefault(__webpack_require__(/*! ../css/Video */ \"./src/css/Video.css\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar Player = function Player(_ref) {\n  var playing = _ref.playing,\n      youtubeId = _ref.youtubeId,\n      slug = _ref.slug,\n      color = _ref.color;\n  return !playing ? _react.default.createElement(\"div\", {\n    className: _Video.default.heroContainer,\n    style: {\n      backgroundImage: youtubeBackground(youtubeId)\n    }\n  }, _react.default.createElement(_reduxFirstRouterLink.default, {\n    to: \"/video/\".concat(slug, \"/play\")\n  }, _react.default.createElement(\"span\", {\n    className: \"ion-play\",\n    style: {\n      backgroundColor: color\n    }\n  }))) : _react.default.createElement(\"iframe\", {\n    className: _Video.default.iframe,\n    frameBorder: \"0\",\n    allowFullScreen: true,\n    src: youtubeIframeSrc(youtubeId)\n  });\n};\n\nvar youtubeBackground = function youtubeBackground(youtubeId) {\n  return \"url(https://img.youtube.com/vi/\".concat(youtubeId, \"/maxresdefault.jpg)\");\n};\n\nvar youtubeIframeSrc = function youtubeIframeSrc(youtubeId) {\n  return \"https://www.youtube.com/embed/\".concat(youtubeId, \"?playlist=\").concat(youtubeId, \"&autoplay=1&rel=0&theme=dark&loop=1&color=white&controls=2&autohide=1&showinfo=0\");\n};\n\nvar _default = (0, _reactRedux.connect)(function (_ref2) {\n  var playing = _ref2.playing;\n  return {\n    playing: playing\n  };\n})(Player);\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Player, \"Player\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Player.js\");\n  reactHotLoader.register(youtubeBackground, \"youtubeBackground\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Player.js\");\n  reactHotLoader.register(youtubeIframeSrc, \"youtubeIframeSrc\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Player.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Player.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/Player.js?");

/***/ }),

/***/ "./src/css/Video.css":
/*!***************************!*\
  !*** ./src/css/Video.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by extract-css-chunks-webpack-plugin\n    if(true) {\n      // 1533502126472\n      var cssReload = __webpack_require__(/*! ../../node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js */ \"./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/css/Video.css?");

/***/ })

}]);