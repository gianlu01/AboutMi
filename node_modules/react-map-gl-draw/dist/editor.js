"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

var _modeHandler = _interopRequireDefault(require("./mode-handler"));

var _utils = require("./edit-modes/utils");

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = _objectSpread({}, _modeHandler.default.defaultProps, {
  clickRadius: 0,
  featureShape: 'circle',
  editHandleShape: 'rect',
  editHandleStyle: _style.editHandleStyle,
  featureStyle: _style.featureStyle
});

var Editor =
/*#__PURE__*/
function (_ModeHandler) {
  _inherits(Editor, _ModeHandler);

  function Editor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Editor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Editor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getEditHandleState", function (editHandle, renderState) {
      var _this$state = _this.state,
          pointerDownPicks = _this$state.pointerDownPicks,
          hovered = _this$state.hovered;

      if (renderState) {
        return renderState;
      }

      var editHandleIndex = editHandle.properties.positionIndexes[0];
      var draggingEditHandleIndex = null;
      var pickedObject = pointerDownPicks && pointerDownPicks[0] && pointerDownPicks[0].object;

      if (pickedObject && pickedObject.guideType === _constants.GUIDE_TYPE.EDIT_HANDLE) {
        draggingEditHandleIndex = pickedObject.index;
      }

      if (editHandleIndex === draggingEditHandleIndex) {
        return _constants.RENDER_STATE.SELECTED;
      }

      if (hovered && hovered.type === _constants.ELEMENT_TYPE.EDIT_HANDLE) {
        if (hovered.index === editHandleIndex) {
          return _constants.RENDER_STATE.HOVERED;
        } // cursor hovered on first vertex when drawing polygon


        if (hovered.index === 0 && editHandle.properties.guideType === _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE) {
          return _constants.RENDER_STATE.CLOSING;
        }
      }

      return _constants.RENDER_STATE.INACTIVE;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getFeatureRenderState", function (index, renderState) {
      var hovered = _this.state.hovered;

      var selectedFeatureIndex = _this._getSelectedFeatureIndex();

      if (renderState) {
        return renderState;
      }

      if (index === selectedFeatureIndex) {
        return _constants.RENDER_STATE.SELECTED;
      }

      if (hovered && hovered.type === _constants.ELEMENT_TYPE.FEATURE && hovered.featureIndex === index) {
        return _constants.RENDER_STATE.HOVERED;
      }

      return _constants.RENDER_STATE.INACTIVE;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getStyleProp", function (styleProp, params) {
      return typeof styleProp === 'function' ? styleProp(params) : styleProp;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderEditHandle", function (editHandle, feature) {
      /* eslint-enable max-params */
      var coordinates = (0, _utils.getFeatureCoordinates)(editHandle);

      var p = _this.project(coordinates && coordinates[0]);

      if (!p) {
        return null;
      }

      var _editHandle$propertie = editHandle.properties,
          featureIndex = _editHandle$propertie.featureIndex,
          positionIndexes = _editHandle$propertie.positionIndexes;
      var _this$props = _this.props,
          clickRadius = _this$props.clickRadius,
          editHandleShape = _this$props.editHandleShape,
          editHandleStyle = _this$props.editHandleStyle;
      var index = positionIndexes[0];

      var shape = _this._getStyleProp(editHandleShape, {
        feature: feature || editHandle,
        index: index,
        featureIndex: featureIndex,
        state: _this._getEditHandleState(editHandle)
      });

      var style = _this._getStyleProp(editHandleStyle, {
        feature: feature || editHandle,
        index: index,
        featureIndex: featureIndex,
        shape: shape,
        state: _this._getEditHandleState(editHandle)
      }); // disable events for cursor editHandle


      if (editHandle.properties.guideType === _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE) {
        style = _objectSpread({}, style, {
          // disable pointer events for cursor
          pointerEvents: 'none'
        });
      }

      var elemKey = "".concat(_constants.ELEMENT_TYPE.EDIT_HANDLE, ".").concat(featureIndex, ".").concat(index); // first <circle|rect> is to make path easily interacted with

      switch (shape) {
        case 'circle':
          return _react.default.createElement("g", {
            key: elemKey,
            transform: "translate(".concat(p[0], ", ").concat(p[1], ")")
          }, _react.default.createElement("circle", {
            "data-type": _constants.ELEMENT_TYPE.EDIT_HANDLE,
            "data-index": index,
            "data-feature-index": featureIndex,
            key: "".concat(elemKey, ".hidden"),
            style: _objectSpread({}, style, {
              stroke: 'none',
              fill: '#000',
              fillOpacity: 0
            }),
            cx: 0,
            cy: 0,
            r: clickRadius
          }), _react.default.createElement("circle", {
            "data-type": _constants.ELEMENT_TYPE.EDIT_HANDLE,
            "data-index": index,
            "data-feature-index": featureIndex,
            key: elemKey,
            style: style,
            cx: 0,
            cy: 0
          }));

        case 'rect':
          return _react.default.createElement("g", {
            key: elemKey,
            transform: "translate(".concat(p[0], ", ").concat(p[1], ")")
          }, _react.default.createElement("rect", {
            "data-type": _constants.ELEMENT_TYPE.EDIT_HANDLE,
            "data-index": index,
            "data-feature-index": featureIndex,
            key: "".concat(elemKey, ".hidden"),
            style: _objectSpread({}, style, {
              height: clickRadius,
              width: clickRadius,
              fill: '#000',
              fillOpacity: 0
            }),
            r: clickRadius
          }), _react.default.createElement("rect", {
            "data-type": _constants.ELEMENT_TYPE.EDIT_HANDLE,
            "data-index": index,
            "data-feature-index": featureIndex,
            key: "".concat(elemKey),
            style: style
          }));

        default:
          return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderSegment", function (featureIndex, index, coordinates, style) {
      var path = _this._getPathInScreenCoords(coordinates, _constants.GEOJSON_TYPE.LINE_STRING);

      var radius = style.radius,
          others = _objectWithoutProperties(style, ["radius"]);

      var clickRadius = _this.props.clickRadius;
      var elemKey = "".concat(_constants.ELEMENT_TYPE.SEGMENT, ".").concat(featureIndex, ".").concat(index);
      return _react.default.createElement("g", {
        key: elemKey
      }, _react.default.createElement("path", {
        key: "".concat(elemKey, ".hidden"),
        "data-type": _constants.ELEMENT_TYPE.SEGMENT,
        "data-index": index,
        "data-feature-index": featureIndex,
        style: _objectSpread({}, others, {
          strokeWidth: clickRadius || radius,
          opacity: 0
        }),
        d: path
      }), _react.default.createElement("path", {
        key: elemKey,
        "data-type": _constants.ELEMENT_TYPE.SEGMENT,
        "data-index": index,
        "data-feature-index": featureIndex,
        style: others,
        d: path
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderSegments", function (featureIndex, coordinates, style) {
      var segments = [];

      for (var i = 0; i < coordinates.length - 1; i++) {
        segments.push(_this._renderSegment(featureIndex, i, [coordinates[i], coordinates[i + 1]], style));
      }

      return segments;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderFill", function (featureIndex, coordinates, style) {
      var path = _this._getPathInScreenCoords(coordinates, _constants.GEOJSON_TYPE.POLYGON);

      return _react.default.createElement("path", {
        key: "".concat(_constants.ELEMENT_TYPE.FILL, ".").concat(featureIndex),
        "data-type": _constants.ELEMENT_TYPE.FILL,
        "data-feature-index": featureIndex,
        style: _objectSpread({}, style, {
          stroke: 'none'
        }),
        d: path
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderTentativeFeature", function (feature, cursorEditHandle) {
      var featureStyle = _this.props.featureStyle;
      var coordinates = feature.geometry.coordinates,
          renderType = feature.properties.renderType;

      if (!coordinates || coordinates.length < 2) {
        return null;
      } // >= 2 coordinates


      var firstCoords = coordinates[0];
      var lastCoords = coordinates[coordinates.length - 1];

      var uncommittedStyle = _this._getStyleProp(featureStyle, {
        feature: feature,
        index: null,
        state: _constants.RENDER_STATE.UNCOMMITTED
      });

      var committedPath;
      var uncommittedPath;
      var closingPath;

      var fill = _this._renderFill('tentative', coordinates, uncommittedStyle);

      switch (renderType) {
        case _constants.RENDER_TYPE.LINE_STRING:
        case _constants.RENDER_TYPE.POLYGON:
          var committedStyle = _this._getStyleProp(featureStyle, {
            feature: feature,
            state: _constants.RENDER_STATE.SELECTED
          });

          if (cursorEditHandle) {
            var cursorCoords = coordinates[coordinates.length - 2];
            committedPath = _this._renderSegments('tentative', coordinates.slice(0, coordinates.length - 1), committedStyle);
            uncommittedPath = _this._renderSegment('tentative-uncommitted', coordinates.length - 2, [cursorCoords, lastCoords], uncommittedStyle);
          } else {
            committedPath = _this._renderSegments('tentative', coordinates, committedStyle);
          }

          if (renderType === _constants.RENDER_TYPE.POLYGON) {
            var closingStyle = _this._getStyleProp(featureStyle, {
              feature: feature,
              index: null,
              state: _constants.RENDER_STATE.CLOSING
            });

            closingPath = _this._renderSegment('tentative-closing', coordinates.length - 1, [lastCoords, firstCoords], closingStyle);
          }

          break;

        case _constants.RENDER_TYPE.RECTANGLE:
          uncommittedPath = _this._renderSegments('tentative', _toConsumableArray(coordinates).concat([firstCoords]), uncommittedStyle);
          break;

        default:
      }

      return [fill, committedPath, uncommittedPath, closingPath].filter(Boolean);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderGuides", function (_ref) {
      var tentativeFeature = _ref.tentativeFeature,
          editHandles = _ref.editHandles;

      var features = _this.getFeatures();

      var cursorEditHandle = editHandles.find(function (f) {
        return f.properties.guideType === _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE;
      });
      return _react.default.createElement("g", {
        key: "feature-guides"
      }, tentativeFeature && _this._renderTentativeFeature(tentativeFeature, cursorEditHandle), editHandles && editHandles.map(function (editHandle) {
        var feature = features && features[editHandle.properties.featureIndex] || tentativeFeature;
        return _this._renderEditHandle(editHandle, feature);
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderPoint", function (feature, index, path) {
      var renderState = _this._getFeatureRenderState(index);

      var _this$props2 = _this.props,
          featureStyle = _this$props2.featureStyle,
          featureShape = _this$props2.featureShape,
          clickRadius = _this$props2.clickRadius;

      var shape = _this._getStyleProp(featureShape, {
        feature: feature,
        index: index,
        state: renderState
      });

      var style = _this._getStyleProp(featureStyle, {
        feature: feature,
        index: index,
        state: renderState
      });

      var elemKey = "feature.".concat(index);

      if (shape === 'rect') {
        return _react.default.createElement("g", {
          key: elemKey,
          transform: "translate(".concat(path[0][0], ", ").concat(path[0][1], ")")
        }, _react.default.createElement("rect", {
          "data-type": _constants.ELEMENT_TYPE.FEATURE,
          "data-feature-index": index,
          key: "".concat(elemKey, ".hidden"),
          style: _objectSpread({}, style, {
            width: clickRadius,
            height: clickRadius,
            fill: '#000',
            fillOpacity: 0
          })
        }), _react.default.createElement("rect", {
          "data-type": _constants.ELEMENT_TYPE.FEATURE,
          "data-feature-index": index,
          key: elemKey,
          style: style
        }));
      }

      return _react.default.createElement("g", {
        key: "feature.".concat(index),
        transform: "translate(".concat(path[0][0], ", ").concat(path[0][1], ")")
      }, _react.default.createElement("circle", {
        "data-type": _constants.ELEMENT_TYPE.FEATURE,
        "data-feature-index": index,
        key: "".concat(elemKey, ".hidden"),
        style: _objectSpread({}, style, {
          opacity: 0
        }),
        cx: 0,
        cy: 0,
        r: clickRadius
      }), _react.default.createElement("circle", {
        "data-type": _constants.ELEMENT_TYPE.FEATURE,
        "data-feature-index": index,
        key: elemKey,
        style: style,
        cx: 0,
        cy: 0
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderPath", function (feature, index, path) {
      var _this$props3 = _this.props,
          featureStyle = _this$props3.featureStyle,
          clickRadius = _this$props3.clickRadius;

      var selectedFeatureIndex = _this._getSelectedFeatureIndex();

      var selected = index === selectedFeatureIndex;

      var renderState = _this._getFeatureRenderState(index);

      var style = _this._getStyleProp(featureStyle, {
        feature: feature,
        index: index,
        state: renderState
      });

      var elemKey = "feature.".concat(index);

      if (selected) {
        return _react.default.createElement("g", {
          key: elemKey
        }, _this._renderSegments(index, feature.geometry.coordinates, style));
      } // first <path> is to make path easily interacted with


      return _react.default.createElement("g", {
        key: elemKey
      }, _react.default.createElement("path", {
        "data-type": _constants.ELEMENT_TYPE.FEATURE,
        "data-feature-index": index,
        key: "".concat(elemKey, ".hidden"),
        style: _objectSpread({}, style, {
          strokeWidth: clickRadius,
          opacity: 0
        }),
        d: path
      }), _react.default.createElement("path", {
        "data-type": _constants.ELEMENT_TYPE.FEATURE,
        "data-feature-index": index,
        key: elemKey,
        style: style,
        d: path
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderPolygon", function (feature, index, path) {
      var featureStyle = _this.props.featureStyle;

      var selectedFeatureIndex = _this._getSelectedFeatureIndex();

      var selected = index === selectedFeatureIndex;

      var renderState = _this._getFeatureRenderState(index);

      var style = _this._getStyleProp(featureStyle, {
        feature: feature,
        index: index,
        state: renderState
      });

      var elemKey = "feature.".concat(index);

      if (selected) {
        var coordinates = (0, _utils.getFeatureCoordinates)(feature);

        if (!coordinates) {
          return null;
        }

        return _react.default.createElement("g", {
          key: elemKey
        }, _this._renderFill(index, coordinates, style), _this._renderSegments(index, coordinates, style));
      }

      return _react.default.createElement("path", {
        "data-type": _constants.ELEMENT_TYPE.FEATURE,
        "data-feature-index": index,
        key: elemKey,
        style: style,
        d: path
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderFeature", function (feature, index) {
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates || !coordinates.length) {
        return null;
      }

      var renderType = feature.properties.renderType,
          type = feature.geometry.type;

      var path = _this._getPathInScreenCoords(coordinates, type);

      if (!path) {
        return null;
      }

      switch (renderType) {
        case _constants.RENDER_TYPE.POINT:
          return _this._renderPoint(feature, index, path);

        case _constants.RENDER_TYPE.LINE_STRING:
          return _this._renderPath(feature, index, path);

        case _constants.RENDER_TYPE.POLYGON:
        case _constants.RENDER_TYPE.RECTANGLE:
          return _this._renderPolygon(feature, index, path);

        default:
          return null;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderCanvas", function () {
      var features = _this.getFeatures();

      var guides = _this._modeHandler && _this._modeHandler.getGuides(_this.getModeProps());

      return _react.default.createElement("svg", {
        key: "draw-canvas",
        width: "100%",
        height: "100%"
      }, features && features.length > 0 && _react.default.createElement("g", {
        key: "feature-group"
      }, features.map(_this._renderFeature)), guides && _react.default.createElement("g", {
        key: "feature-guides"
      }, _this._renderGuides(guides)));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderEditor", function () {
      var viewport = _this._context && _this._context.viewport || {};
      var style = _this.props.style;
      var width = viewport.width,
          height = viewport.height;
      return _react.default.createElement("div", {
        id: "editor",
        style: _objectSpread({
          width: width,
          height: height
        }, style),
        ref: function ref(_) {
          _this._containerRef = _;
        }
      }, _this._renderCanvas());
    });

    return _this;
  }

  _createClass(Editor, [{
    key: "_getPathInScreenCoords",

    /* HELPERS */
    value: function _getPathInScreenCoords(coordinates, type) {
      var _this2 = this;

      if (coordinates.length === 0) {
        return '';
      }

      var screenCoords = coordinates.map(function (p) {
        return _this2.project(p);
      });
      var pathString = '';

      switch (type) {
        case _constants.GEOJSON_TYPE.POINT:
          return screenCoords;

        case _constants.GEOJSON_TYPE.LINE_STRING:
          pathString = screenCoords.map(function (p) {
            return "".concat(p[0], ",").concat(p[1]);
          }).join('L');
          return "M ".concat(pathString);

        case _constants.GEOJSON_TYPE.POLYGON:
          pathString = screenCoords.map(function (p) {
            return "".concat(p[0], ",").concat(p[1]);
          }).join('L');
          return "M ".concat(pathString, " z");

        default:
          return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(Editor.prototype), "render", this).call(this, this._renderEditor());
    }
  }]);

  return Editor;
}(_modeHandler.default);

exports.default = Editor;

_defineProperty(Editor, "defaultProps", defaultProps);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lZGl0b3IuanMiXSwibmFtZXMiOlsiZGVmYXVsdFByb3BzIiwiTW9kZUhhbmRsZXIiLCJjbGlja1JhZGl1cyIsImZlYXR1cmVTaGFwZSIsImVkaXRIYW5kbGVTaGFwZSIsImVkaXRIYW5kbGVTdHlsZSIsImRlZmF1bHRFZGl0SGFuZGxlU3R5bGUiLCJmZWF0dXJlU3R5bGUiLCJkZWZhdWx0RmVhdHVyZVN0eWxlIiwiRWRpdG9yIiwiZWRpdEhhbmRsZSIsInJlbmRlclN0YXRlIiwic3RhdGUiLCJwb2ludGVyRG93blBpY2tzIiwiaG92ZXJlZCIsImVkaXRIYW5kbGVJbmRleCIsInByb3BlcnRpZXMiLCJwb3NpdGlvbkluZGV4ZXMiLCJkcmFnZ2luZ0VkaXRIYW5kbGVJbmRleCIsInBpY2tlZE9iamVjdCIsIm9iamVjdCIsImd1aWRlVHlwZSIsIkdVSURFX1RZUEUiLCJFRElUX0hBTkRMRSIsImluZGV4IiwiUkVOREVSX1NUQVRFIiwiU0VMRUNURUQiLCJ0eXBlIiwiRUxFTUVOVF9UWVBFIiwiSE9WRVJFRCIsIkNVUlNPUl9FRElUX0hBTkRMRSIsIkNMT1NJTkciLCJJTkFDVElWRSIsInNlbGVjdGVkRmVhdHVyZUluZGV4IiwiX2dldFNlbGVjdGVkRmVhdHVyZUluZGV4IiwiRkVBVFVSRSIsImZlYXR1cmVJbmRleCIsInN0eWxlUHJvcCIsInBhcmFtcyIsImZlYXR1cmUiLCJjb29yZGluYXRlcyIsInAiLCJwcm9qZWN0IiwicHJvcHMiLCJzaGFwZSIsIl9nZXRTdHlsZVByb3AiLCJfZ2V0RWRpdEhhbmRsZVN0YXRlIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwiZWxlbUtleSIsInN0cm9rZSIsImZpbGwiLCJmaWxsT3BhY2l0eSIsImhlaWdodCIsIndpZHRoIiwicGF0aCIsIl9nZXRQYXRoSW5TY3JlZW5Db29yZHMiLCJHRU9KU09OX1RZUEUiLCJMSU5FX1NUUklORyIsInJhZGl1cyIsIm90aGVycyIsIlNFR01FTlQiLCJzdHJva2VXaWR0aCIsIm9wYWNpdHkiLCJzZWdtZW50cyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiX3JlbmRlclNlZ21lbnQiLCJQT0xZR09OIiwiRklMTCIsImN1cnNvckVkaXRIYW5kbGUiLCJnZW9tZXRyeSIsInJlbmRlclR5cGUiLCJmaXJzdENvb3JkcyIsImxhc3RDb29yZHMiLCJ1bmNvbW1pdHRlZFN0eWxlIiwiVU5DT01NSVRURUQiLCJjb21taXR0ZWRQYXRoIiwidW5jb21taXR0ZWRQYXRoIiwiY2xvc2luZ1BhdGgiLCJfcmVuZGVyRmlsbCIsIlJFTkRFUl9UWVBFIiwiY29tbWl0dGVkU3R5bGUiLCJjdXJzb3JDb29yZHMiLCJfcmVuZGVyU2VnbWVudHMiLCJzbGljZSIsImNsb3NpbmdTdHlsZSIsIlJFQ1RBTkdMRSIsImZpbHRlciIsIkJvb2xlYW4iLCJ0ZW50YXRpdmVGZWF0dXJlIiwiZWRpdEhhbmRsZXMiLCJmZWF0dXJlcyIsImdldEZlYXR1cmVzIiwiZmluZCIsImYiLCJfcmVuZGVyVGVudGF0aXZlRmVhdHVyZSIsIm1hcCIsIl9yZW5kZXJFZGl0SGFuZGxlIiwiX2dldEZlYXR1cmVSZW5kZXJTdGF0ZSIsInNlbGVjdGVkIiwiUE9JTlQiLCJfcmVuZGVyUG9pbnQiLCJfcmVuZGVyUGF0aCIsIl9yZW5kZXJQb2x5Z29uIiwiZ3VpZGVzIiwiX21vZGVIYW5kbGVyIiwiZ2V0R3VpZGVzIiwiZ2V0TW9kZVByb3BzIiwiX3JlbmRlckZlYXR1cmUiLCJfcmVuZGVyR3VpZGVzIiwidmlld3BvcnQiLCJfY29udGV4dCIsIl8iLCJfY29udGFpbmVyUmVmIiwiX3JlbmRlckNhbnZhcyIsInNjcmVlbkNvb3JkcyIsInBhdGhTdHJpbmciLCJqb2luIiwiX3JlbmRlckVkaXRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUtBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFNQSxZQUFZLHFCQUNiQyxxQkFBWUQsWUFEQztBQUVoQkUsRUFBQUEsV0FBVyxFQUFFLENBRkc7QUFHaEJDLEVBQUFBLFlBQVksRUFBRSxRQUhFO0FBSWhCQyxFQUFBQSxlQUFlLEVBQUUsTUFKRDtBQUtoQkMsRUFBQUEsZUFBZSxFQUFFQyxzQkFMRDtBQU1oQkMsRUFBQUEsWUFBWSxFQUFFQztBQU5FLEVBQWxCOztJQVNxQkMsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tHQTZCRyxVQUFDQyxVQUFELEVBQXNCQyxXQUF0QixFQUErQztBQUFBLHdCQUM3QixNQUFLQyxLQUR3QjtBQUFBLFVBQzNEQyxnQkFEMkQsZUFDM0RBLGdCQUQyRDtBQUFBLFVBQ3pDQyxPQUR5QyxlQUN6Q0EsT0FEeUM7O0FBR25FLFVBQUlILFdBQUosRUFBaUI7QUFDZixlQUFPQSxXQUFQO0FBQ0Q7O0FBRUQsVUFBTUksZUFBZSxHQUFHTCxVQUFVLENBQUNNLFVBQVgsQ0FBc0JDLGVBQXRCLENBQXNDLENBQXRDLENBQXhCO0FBQ0EsVUFBSUMsdUJBQXVCLEdBQUcsSUFBOUI7QUFDQSxVQUFNQyxZQUFZLEdBQUdOLGdCQUFnQixJQUFJQSxnQkFBZ0IsQ0FBQyxDQUFELENBQXBDLElBQTJDQSxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CTyxNQUFwRjs7QUFDQSxVQUFJRCxZQUFZLElBQUlBLFlBQVksQ0FBQ0UsU0FBYixLQUEyQkMsc0JBQVdDLFdBQTFELEVBQXVFO0FBQ3JFTCxRQUFBQSx1QkFBdUIsR0FBR0MsWUFBWSxDQUFDSyxLQUF2QztBQUNEOztBQUVELFVBQUlULGVBQWUsS0FBS0csdUJBQXhCLEVBQWlEO0FBQy9DLGVBQU9PLHdCQUFhQyxRQUFwQjtBQUNEOztBQUVELFVBQUlaLE9BQU8sSUFBSUEsT0FBTyxDQUFDYSxJQUFSLEtBQWlCQyx3QkFBYUwsV0FBN0MsRUFBMEQ7QUFDeEQsWUFBSVQsT0FBTyxDQUFDVSxLQUFSLEtBQWtCVCxlQUF0QixFQUF1QztBQUNyQyxpQkFBT1Usd0JBQWFJLE9BQXBCO0FBQ0QsU0FIdUQsQ0FLeEQ7OztBQUNBLFlBQ0VmLE9BQU8sQ0FBQ1UsS0FBUixLQUFrQixDQUFsQixJQUNBZCxVQUFVLENBQUNNLFVBQVgsQ0FBc0JLLFNBQXRCLEtBQW9DQyxzQkFBV1Esa0JBRmpELEVBR0U7QUFDQSxpQkFBT0wsd0JBQWFNLE9BQXBCO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPTix3QkFBYU8sUUFBcEI7QUFDRCxLOztxR0FFd0IsVUFBQ1IsS0FBRCxFQUFnQmIsV0FBaEIsRUFBOEM7QUFBQSxVQUM3REcsT0FENkQsR0FDakQsTUFBS0YsS0FENEMsQ0FDN0RFLE9BRDZEOztBQUVyRSxVQUFNbUIsb0JBQW9CLEdBQUcsTUFBS0Msd0JBQUwsRUFBN0I7O0FBQ0EsVUFBSXZCLFdBQUosRUFBaUI7QUFDZixlQUFPQSxXQUFQO0FBQ0Q7O0FBRUQsVUFBSWEsS0FBSyxLQUFLUyxvQkFBZCxFQUFvQztBQUNsQyxlQUFPUix3QkFBYUMsUUFBcEI7QUFDRDs7QUFFRCxVQUFJWixPQUFPLElBQUlBLE9BQU8sQ0FBQ2EsSUFBUixLQUFpQkMsd0JBQWFPLE9BQXpDLElBQW9EckIsT0FBTyxDQUFDc0IsWUFBUixLQUF5QlosS0FBakYsRUFBd0Y7QUFDdEYsZUFBT0Msd0JBQWFJLE9BQXBCO0FBQ0Q7O0FBRUQsYUFBT0osd0JBQWFPLFFBQXBCO0FBQ0QsSzs7NEZBRWUsVUFBQ0ssU0FBRCxFQUFpQkMsTUFBakIsRUFBaUM7QUFDL0MsYUFBTyxPQUFPRCxTQUFQLEtBQXFCLFVBQXJCLEdBQWtDQSxTQUFTLENBQUNDLE1BQUQsQ0FBM0MsR0FBc0RELFNBQTdEO0FBQ0QsSzs7Z0dBSW1CLFVBQUMzQixVQUFELEVBQXNCNkIsT0FBdEIsRUFBMkM7QUFDN0Q7QUFDQSxVQUFNQyxXQUFXLEdBQUcsa0NBQXNCOUIsVUFBdEIsQ0FBcEI7O0FBQ0EsVUFBTStCLENBQUMsR0FBRyxNQUFLQyxPQUFMLENBQWFGLFdBQVcsSUFBSUEsV0FBVyxDQUFDLENBQUQsQ0FBdkMsQ0FBVjs7QUFDQSxVQUFJLENBQUNDLENBQUwsRUFBUTtBQUNOLGVBQU8sSUFBUDtBQUNEOztBQU40RCxrQ0FVekQvQixVQVZ5RCxDQVMzRE0sVUFUMkQ7QUFBQSxVQVM3Q29CLFlBVDZDLHlCQVM3Q0EsWUFUNkM7QUFBQSxVQVMvQm5CLGVBVCtCLHlCQVMvQkEsZUFUK0I7QUFBQSx3QkFXSCxNQUFLMEIsS0FYRjtBQUFBLFVBV3JEekMsV0FYcUQsZUFXckRBLFdBWHFEO0FBQUEsVUFXeENFLGVBWHdDLGVBV3hDQSxlQVh3QztBQUFBLFVBV3ZCQyxlQVh1QixlQVd2QkEsZUFYdUI7QUFhN0QsVUFBTW1CLEtBQUssR0FBR1AsZUFBZSxDQUFDLENBQUQsQ0FBN0I7O0FBRUEsVUFBTTJCLEtBQUssR0FBRyxNQUFLQyxhQUFMLENBQW1CekMsZUFBbkIsRUFBb0M7QUFDaERtQyxRQUFBQSxPQUFPLEVBQUVBLE9BQU8sSUFBSTdCLFVBRDRCO0FBRWhEYyxRQUFBQSxLQUFLLEVBQUxBLEtBRmdEO0FBR2hEWSxRQUFBQSxZQUFZLEVBQVpBLFlBSGdEO0FBSWhEeEIsUUFBQUEsS0FBSyxFQUFFLE1BQUtrQyxtQkFBTCxDQUF5QnBDLFVBQXpCO0FBSnlDLE9BQXBDLENBQWQ7O0FBT0EsVUFBSXFDLEtBQUssR0FBRyxNQUFLRixhQUFMLENBQW1CeEMsZUFBbkIsRUFBb0M7QUFDOUNrQyxRQUFBQSxPQUFPLEVBQUVBLE9BQU8sSUFBSTdCLFVBRDBCO0FBRTlDYyxRQUFBQSxLQUFLLEVBQUxBLEtBRjhDO0FBRzlDWSxRQUFBQSxZQUFZLEVBQVpBLFlBSDhDO0FBSTlDUSxRQUFBQSxLQUFLLEVBQUxBLEtBSjhDO0FBSzlDaEMsUUFBQUEsS0FBSyxFQUFFLE1BQUtrQyxtQkFBTCxDQUF5QnBDLFVBQXpCO0FBTHVDLE9BQXBDLENBQVosQ0F0QjZELENBOEI3RDs7O0FBQ0EsVUFBSUEsVUFBVSxDQUFDTSxVQUFYLENBQXNCSyxTQUF0QixLQUFvQ0Msc0JBQVdRLGtCQUFuRCxFQUF1RTtBQUNyRWlCLFFBQUFBLEtBQUsscUJBQ0FBLEtBREE7QUFFSDtBQUNBQyxVQUFBQSxhQUFhLEVBQUU7QUFIWixVQUFMO0FBS0Q7O0FBRUQsVUFBTUMsT0FBTyxhQUFNckIsd0JBQWFMLFdBQW5CLGNBQWtDYSxZQUFsQyxjQUFrRFosS0FBbEQsQ0FBYixDQXZDNkQsQ0F3QzdEOztBQUNBLGNBQVFvQixLQUFSO0FBQ0UsYUFBSyxRQUFMO0FBQ0UsaUJBQ0U7QUFBRyxZQUFBLEdBQUcsRUFBRUssT0FBUjtBQUFpQixZQUFBLFNBQVMsc0JBQWVSLENBQUMsQ0FBQyxDQUFELENBQWhCLGVBQXdCQSxDQUFDLENBQUMsQ0FBRCxDQUF6QjtBQUExQixhQUNFO0FBQ0UseUJBQVdiLHdCQUFhTCxXQUQxQjtBQUVFLDBCQUFZQyxLQUZkO0FBR0Usa0NBQW9CWSxZQUh0QjtBQUlFLFlBQUEsR0FBRyxZQUFLYSxPQUFMLFlBSkw7QUFLRSxZQUFBLEtBQUssb0JBQU9GLEtBQVA7QUFBY0csY0FBQUEsTUFBTSxFQUFFLE1BQXRCO0FBQThCQyxjQUFBQSxJQUFJLEVBQUUsTUFBcEM7QUFBNENDLGNBQUFBLFdBQVcsRUFBRTtBQUF6RCxjQUxQO0FBTUUsWUFBQSxFQUFFLEVBQUUsQ0FOTjtBQU9FLFlBQUEsRUFBRSxFQUFFLENBUE47QUFRRSxZQUFBLENBQUMsRUFBRWxEO0FBUkwsWUFERixFQVdFO0FBQ0UseUJBQVcwQix3QkFBYUwsV0FEMUI7QUFFRSwwQkFBWUMsS0FGZDtBQUdFLGtDQUFvQlksWUFIdEI7QUFJRSxZQUFBLEdBQUcsRUFBRWEsT0FKUDtBQUtFLFlBQUEsS0FBSyxFQUFFRixLQUxUO0FBTUUsWUFBQSxFQUFFLEVBQUUsQ0FOTjtBQU9FLFlBQUEsRUFBRSxFQUFFO0FBUE4sWUFYRixDQURGOztBQXVCRixhQUFLLE1BQUw7QUFDRSxpQkFDRTtBQUFHLFlBQUEsR0FBRyxFQUFFRSxPQUFSO0FBQWlCLFlBQUEsU0FBUyxzQkFBZVIsQ0FBQyxDQUFDLENBQUQsQ0FBaEIsZUFBd0JBLENBQUMsQ0FBQyxDQUFELENBQXpCO0FBQTFCLGFBQ0U7QUFDRSx5QkFBV2Isd0JBQWFMLFdBRDFCO0FBRUUsMEJBQVlDLEtBRmQ7QUFHRSxrQ0FBb0JZLFlBSHRCO0FBSUUsWUFBQSxHQUFHLFlBQUthLE9BQUwsWUFKTDtBQUtFLFlBQUEsS0FBSyxvQkFDQUYsS0FEQTtBQUVITSxjQUFBQSxNQUFNLEVBQUVuRCxXQUZMO0FBR0hvRCxjQUFBQSxLQUFLLEVBQUVwRCxXQUhKO0FBSUhpRCxjQUFBQSxJQUFJLEVBQUUsTUFKSDtBQUtIQyxjQUFBQSxXQUFXLEVBQUU7QUFMVixjQUxQO0FBWUUsWUFBQSxDQUFDLEVBQUVsRDtBQVpMLFlBREYsRUFlRTtBQUNFLHlCQUFXMEIsd0JBQWFMLFdBRDFCO0FBRUUsMEJBQVlDLEtBRmQ7QUFHRSxrQ0FBb0JZLFlBSHRCO0FBSUUsWUFBQSxHQUFHLFlBQUthLE9BQUwsQ0FKTDtBQUtFLFlBQUEsS0FBSyxFQUFFRjtBQUxULFlBZkYsQ0FERjs7QUEwQkY7QUFDRSxpQkFBTyxJQUFQO0FBckRKO0FBdURELEs7OzZGQUVnQixVQUFDWCxZQUFELEVBQW1CWixLQUFuQixFQUFrQ2dCLFdBQWxDLEVBQXlETyxLQUF6RCxFQUEyRTtBQUMxRixVQUFNUSxJQUFJLEdBQUcsTUFBS0Msc0JBQUwsQ0FBNEJoQixXQUE1QixFQUF5Q2lCLHdCQUFhQyxXQUF0RCxDQUFiOztBQUQwRixVQUVsRkMsTUFGa0YsR0FFNURaLEtBRjRELENBRWxGWSxNQUZrRjtBQUFBLFVBRXZFQyxNQUZ1RSw0QkFFNURiLEtBRjREOztBQUFBLFVBR2xGN0MsV0FIa0YsR0FHbEUsTUFBS3lDLEtBSDZELENBR2xGekMsV0FIa0Y7QUFLMUYsVUFBTStDLE9BQU8sYUFBTXJCLHdCQUFhaUMsT0FBbkIsY0FBOEJ6QixZQUE5QixjQUE4Q1osS0FBOUMsQ0FBYjtBQUNBLGFBQ0U7QUFBRyxRQUFBLEdBQUcsRUFBRXlCO0FBQVIsU0FDRTtBQUNFLFFBQUEsR0FBRyxZQUFLQSxPQUFMLFlBREw7QUFFRSxxQkFBV3JCLHdCQUFhaUMsT0FGMUI7QUFHRSxzQkFBWXJDLEtBSGQ7QUFJRSw4QkFBb0JZLFlBSnRCO0FBS0UsUUFBQSxLQUFLLG9CQUNBd0IsTUFEQTtBQUVIRSxVQUFBQSxXQUFXLEVBQUU1RCxXQUFXLElBQUl5RCxNQUZ6QjtBQUdISSxVQUFBQSxPQUFPLEVBQUU7QUFITixVQUxQO0FBVUUsUUFBQSxDQUFDLEVBQUVSO0FBVkwsUUFERixFQWFFO0FBQ0UsUUFBQSxHQUFHLEVBQUVOLE9BRFA7QUFFRSxxQkFBV3JCLHdCQUFhaUMsT0FGMUI7QUFHRSxzQkFBWXJDLEtBSGQ7QUFJRSw4QkFBb0JZLFlBSnRCO0FBS0UsUUFBQSxLQUFLLEVBQUV3QixNQUxUO0FBTUUsUUFBQSxDQUFDLEVBQUVMO0FBTkwsUUFiRixDQURGO0FBd0JELEs7OzhGQUVpQixVQUFDbkIsWUFBRCxFQUFtQkksV0FBbkIsRUFBMENPLEtBQTFDLEVBQTREO0FBQzVFLFVBQU1pQixRQUFRLEdBQUcsRUFBakI7O0FBQ0EsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHekIsV0FBVyxDQUFDMEIsTUFBWixHQUFxQixDQUF6QyxFQUE0Q0QsQ0FBQyxFQUE3QyxFQUFpRDtBQUMvQ0QsUUFBQUEsUUFBUSxDQUFDRyxJQUFULENBQ0UsTUFBS0MsY0FBTCxDQUFvQmhDLFlBQXBCLEVBQWtDNkIsQ0FBbEMsRUFBcUMsQ0FBQ3pCLFdBQVcsQ0FBQ3lCLENBQUQsQ0FBWixFQUFpQnpCLFdBQVcsQ0FBQ3lCLENBQUMsR0FBRyxDQUFMLENBQTVCLENBQXJDLEVBQTJFbEIsS0FBM0UsQ0FERjtBQUdEOztBQUNELGFBQU9pQixRQUFQO0FBQ0QsSzs7MEZBRWEsVUFBQzVCLFlBQUQsRUFBbUJJLFdBQW5CLEVBQTBDTyxLQUExQyxFQUE0RDtBQUN4RSxVQUFNUSxJQUFJLEdBQUcsTUFBS0Msc0JBQUwsQ0FBNEJoQixXQUE1QixFQUF5Q2lCLHdCQUFhWSxPQUF0RCxDQUFiOztBQUNBLGFBQ0U7QUFDRSxRQUFBLEdBQUcsWUFBS3pDLHdCQUFhMEMsSUFBbEIsY0FBMEJsQyxZQUExQixDQURMO0FBRUUscUJBQVdSLHdCQUFhMEMsSUFGMUI7QUFHRSw4QkFBb0JsQyxZQUh0QjtBQUlFLFFBQUEsS0FBSyxvQkFBT1csS0FBUDtBQUFjRyxVQUFBQSxNQUFNLEVBQUU7QUFBdEIsVUFKUDtBQUtFLFFBQUEsQ0FBQyxFQUFFSztBQUxMLFFBREY7QUFTRCxLOztzR0FFeUIsVUFBQ2hCLE9BQUQsRUFBbUJnQyxnQkFBbkIsRUFBaUQ7QUFBQSxVQUNqRWhFLFlBRGlFLEdBQ2hELE1BQUtvQyxLQUQyQyxDQUNqRXBDLFlBRGlFO0FBQUEsVUFHM0RpQyxXQUgyRCxHQUtyRUQsT0FMcUUsQ0FHdkVpQyxRQUh1RSxDQUczRGhDLFdBSDJEO0FBQUEsVUFJekRpQyxVQUp5RCxHQUtyRWxDLE9BTHFFLENBSXZFdkIsVUFKdUUsQ0FJekR5RCxVQUp5RDs7QUFPekUsVUFBSSxDQUFDakMsV0FBRCxJQUFnQkEsV0FBVyxDQUFDMEIsTUFBWixHQUFxQixDQUF6QyxFQUE0QztBQUMxQyxlQUFPLElBQVA7QUFDRCxPQVR3RSxDQVd6RTs7O0FBQ0EsVUFBTVEsV0FBVyxHQUFHbEMsV0FBVyxDQUFDLENBQUQsQ0FBL0I7QUFDQSxVQUFNbUMsVUFBVSxHQUFHbkMsV0FBVyxDQUFDQSxXQUFXLENBQUMwQixNQUFaLEdBQXFCLENBQXRCLENBQTlCOztBQUNBLFVBQU1VLGdCQUFnQixHQUFHLE1BQUsvQixhQUFMLENBQW1CdEMsWUFBbkIsRUFBaUM7QUFDeERnQyxRQUFBQSxPQUFPLEVBQVBBLE9BRHdEO0FBRXhEZixRQUFBQSxLQUFLLEVBQUUsSUFGaUQ7QUFHeERaLFFBQUFBLEtBQUssRUFBRWEsd0JBQWFvRDtBQUhvQyxPQUFqQyxDQUF6Qjs7QUFNQSxVQUFJQyxhQUFKO0FBQ0EsVUFBSUMsZUFBSjtBQUNBLFVBQUlDLFdBQUo7O0FBQ0EsVUFBTTdCLElBQUksR0FBRyxNQUFLOEIsV0FBTCxDQUFpQixXQUFqQixFQUE4QnpDLFdBQTlCLEVBQTJDb0MsZ0JBQTNDLENBQWI7O0FBRUEsY0FBUUgsVUFBUjtBQUNFLGFBQUtTLHVCQUFZeEIsV0FBakI7QUFDQSxhQUFLd0IsdUJBQVliLE9BQWpCO0FBQ0UsY0FBTWMsY0FBYyxHQUFHLE1BQUt0QyxhQUFMLENBQW1CdEMsWUFBbkIsRUFBaUM7QUFDdERnQyxZQUFBQSxPQUFPLEVBQVBBLE9BRHNEO0FBRXREM0IsWUFBQUEsS0FBSyxFQUFFYSx3QkFBYUM7QUFGa0MsV0FBakMsQ0FBdkI7O0FBS0EsY0FBSTZDLGdCQUFKLEVBQXNCO0FBQ3BCLGdCQUFNYSxZQUFZLEdBQUc1QyxXQUFXLENBQUNBLFdBQVcsQ0FBQzBCLE1BQVosR0FBcUIsQ0FBdEIsQ0FBaEM7QUFDQVksWUFBQUEsYUFBYSxHQUFHLE1BQUtPLGVBQUwsQ0FDZCxXQURjLEVBRWQ3QyxXQUFXLENBQUM4QyxLQUFaLENBQWtCLENBQWxCLEVBQXFCOUMsV0FBVyxDQUFDMEIsTUFBWixHQUFxQixDQUExQyxDQUZjLEVBR2RpQixjQUhjLENBQWhCO0FBS0FKLFlBQUFBLGVBQWUsR0FBRyxNQUFLWCxjQUFMLENBQ2hCLHVCQURnQixFQUVoQjVCLFdBQVcsQ0FBQzBCLE1BQVosR0FBcUIsQ0FGTCxFQUdoQixDQUFDa0IsWUFBRCxFQUFlVCxVQUFmLENBSGdCLEVBSWhCQyxnQkFKZ0IsQ0FBbEI7QUFNRCxXQWJELE1BYU87QUFDTEUsWUFBQUEsYUFBYSxHQUFHLE1BQUtPLGVBQUwsQ0FBcUIsV0FBckIsRUFBa0M3QyxXQUFsQyxFQUErQzJDLGNBQS9DLENBQWhCO0FBQ0Q7O0FBRUQsY0FBSVYsVUFBVSxLQUFLUyx1QkFBWWIsT0FBL0IsRUFBd0M7QUFDdEMsZ0JBQU1rQixZQUFZLEdBQUcsTUFBSzFDLGFBQUwsQ0FBbUJ0QyxZQUFuQixFQUFpQztBQUNwRGdDLGNBQUFBLE9BQU8sRUFBUEEsT0FEb0Q7QUFFcERmLGNBQUFBLEtBQUssRUFBRSxJQUY2QztBQUdwRFosY0FBQUEsS0FBSyxFQUFFYSx3QkFBYU07QUFIZ0MsYUFBakMsQ0FBckI7O0FBTUFpRCxZQUFBQSxXQUFXLEdBQUcsTUFBS1osY0FBTCxDQUNaLG1CQURZLEVBRVo1QixXQUFXLENBQUMwQixNQUFaLEdBQXFCLENBRlQsRUFHWixDQUFDUyxVQUFELEVBQWFELFdBQWIsQ0FIWSxFQUlaYSxZQUpZLENBQWQ7QUFNRDs7QUFFRDs7QUFFRixhQUFLTCx1QkFBWU0sU0FBakI7QUFDRVQsVUFBQUEsZUFBZSxHQUFHLE1BQUtNLGVBQUwsQ0FDaEIsV0FEZ0IscUJBRVo3QyxXQUZZLFVBRUNrQyxXQUZELElBR2hCRSxnQkFIZ0IsQ0FBbEI7QUFLQTs7QUFFRjtBQWxERjs7QUFxREEsYUFBTyxDQUFDekIsSUFBRCxFQUFPMkIsYUFBUCxFQUFzQkMsZUFBdEIsRUFBdUNDLFdBQXZDLEVBQW9EUyxNQUFwRCxDQUEyREMsT0FBM0QsQ0FBUDtBQUNELEs7OzRGQUVlLGdCQUErQztBQUFBLFVBQTVDQyxnQkFBNEMsUUFBNUNBLGdCQUE0QztBQUFBLFVBQTFCQyxXQUEwQixRQUExQkEsV0FBMEI7O0FBQzdELFVBQU1DLFFBQVEsR0FBRyxNQUFLQyxXQUFMLEVBQWpCOztBQUNBLFVBQU12QixnQkFBZ0IsR0FBR3FCLFdBQVcsQ0FBQ0csSUFBWixDQUN2QixVQUFBQyxDQUFDO0FBQUEsZUFBSUEsQ0FBQyxDQUFDaEYsVUFBRixDQUFhSyxTQUFiLEtBQTJCQyxzQkFBV1Esa0JBQTFDO0FBQUEsT0FEc0IsQ0FBekI7QUFHQSxhQUNFO0FBQUcsUUFBQSxHQUFHLEVBQUM7QUFBUCxTQUNHNkQsZ0JBQWdCLElBQUksTUFBS00sdUJBQUwsQ0FBNkJOLGdCQUE3QixFQUErQ3BCLGdCQUEvQyxDQUR2QixFQUVHcUIsV0FBVyxJQUNWQSxXQUFXLENBQUNNLEdBQVosQ0FBZ0IsVUFBQXhGLFVBQVUsRUFBSTtBQUM1QixZQUFNNkIsT0FBTyxHQUNWc0QsUUFBUSxJQUFJQSxRQUFRLENBQUNuRixVQUFVLENBQUNNLFVBQVgsQ0FBc0JvQixZQUF2QixDQUFyQixJQUE4RHVELGdCQURoRTtBQUVBLGVBQU8sTUFBS1EsaUJBQUwsQ0FBdUJ6RixVQUF2QixFQUFtQzZCLE9BQW5DLENBQVA7QUFDRCxPQUpELENBSEosQ0FERjtBQVdELEs7OzJGQUVjLFVBQUNBLE9BQUQsRUFBbUJmLEtBQW5CLEVBQWtDK0IsSUFBbEMsRUFBbUQ7QUFDaEUsVUFBTTVDLFdBQVcsR0FBRyxNQUFLeUYsc0JBQUwsQ0FBNEI1RSxLQUE1QixDQUFwQjs7QUFEZ0UseUJBRVosTUFBS21CLEtBRk87QUFBQSxVQUV4RHBDLFlBRndELGdCQUV4REEsWUFGd0Q7QUFBQSxVQUUxQ0osWUFGMEMsZ0JBRTFDQSxZQUYwQztBQUFBLFVBRTVCRCxXQUY0QixnQkFFNUJBLFdBRjRCOztBQUdoRSxVQUFNMEMsS0FBSyxHQUFHLE1BQUtDLGFBQUwsQ0FBbUIxQyxZQUFuQixFQUFpQztBQUFFb0MsUUFBQUEsT0FBTyxFQUFQQSxPQUFGO0FBQVdmLFFBQUFBLEtBQUssRUFBTEEsS0FBWDtBQUFrQlosUUFBQUEsS0FBSyxFQUFFRDtBQUF6QixPQUFqQyxDQUFkOztBQUNBLFVBQU1vQyxLQUFLLEdBQUcsTUFBS0YsYUFBTCxDQUFtQnRDLFlBQW5CLEVBQWlDO0FBQUVnQyxRQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV2YsUUFBQUEsS0FBSyxFQUFMQSxLQUFYO0FBQWtCWixRQUFBQSxLQUFLLEVBQUVEO0FBQXpCLE9BQWpDLENBQWQ7O0FBRUEsVUFBTXNDLE9BQU8scUJBQWN6QixLQUFkLENBQWI7O0FBQ0EsVUFBSW9CLEtBQUssS0FBSyxNQUFkLEVBQXNCO0FBQ3BCLGVBQ0U7QUFBRyxVQUFBLEdBQUcsRUFBRUssT0FBUjtBQUFpQixVQUFBLFNBQVMsc0JBQWVNLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxDQUFSLENBQWYsZUFBOEJBLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxDQUFSLENBQTlCO0FBQTFCLFdBQ0U7QUFDRSx1QkFBVzNCLHdCQUFhTyxPQUQxQjtBQUVFLGdDQUFvQlgsS0FGdEI7QUFHRSxVQUFBLEdBQUcsWUFBS3lCLE9BQUwsWUFITDtBQUlFLFVBQUEsS0FBSyxvQkFDQUYsS0FEQTtBQUVITyxZQUFBQSxLQUFLLEVBQUVwRCxXQUZKO0FBR0htRCxZQUFBQSxNQUFNLEVBQUVuRCxXQUhMO0FBSUhpRCxZQUFBQSxJQUFJLEVBQUUsTUFKSDtBQUtIQyxZQUFBQSxXQUFXLEVBQUU7QUFMVjtBQUpQLFVBREYsRUFhRTtBQUNFLHVCQUFXeEIsd0JBQWFPLE9BRDFCO0FBRUUsZ0NBQW9CWCxLQUZ0QjtBQUdFLFVBQUEsR0FBRyxFQUFFeUIsT0FIUDtBQUlFLFVBQUEsS0FBSyxFQUFFRjtBQUpULFVBYkYsQ0FERjtBQXNCRDs7QUFFRCxhQUNFO0FBQUcsUUFBQSxHQUFHLG9CQUFhdkIsS0FBYixDQUFOO0FBQTRCLFFBQUEsU0FBUyxzQkFBZStCLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxDQUFSLENBQWYsZUFBOEJBLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxDQUFSLENBQTlCO0FBQXJDLFNBQ0U7QUFDRSxxQkFBVzNCLHdCQUFhTyxPQUQxQjtBQUVFLDhCQUFvQlgsS0FGdEI7QUFHRSxRQUFBLEdBQUcsWUFBS3lCLE9BQUwsWUFITDtBQUlFLFFBQUEsS0FBSyxvQkFDQUYsS0FEQTtBQUVIZ0IsVUFBQUEsT0FBTyxFQUFFO0FBRk4sVUFKUDtBQVFFLFFBQUEsRUFBRSxFQUFFLENBUk47QUFTRSxRQUFBLEVBQUUsRUFBRSxDQVROO0FBVUUsUUFBQSxDQUFDLEVBQUU3RDtBQVZMLFFBREYsRUFhRTtBQUNFLHFCQUFXMEIsd0JBQWFPLE9BRDFCO0FBRUUsOEJBQW9CWCxLQUZ0QjtBQUdFLFFBQUEsR0FBRyxFQUFFeUIsT0FIUDtBQUlFLFFBQUEsS0FBSyxFQUFFRixLQUpUO0FBS0UsUUFBQSxFQUFFLEVBQUUsQ0FMTjtBQU1FLFFBQUEsRUFBRSxFQUFFO0FBTk4sUUFiRixDQURGO0FBd0JELEs7OzBGQUVhLFVBQUNSLE9BQUQsRUFBbUJmLEtBQW5CLEVBQWtDK0IsSUFBbEMsRUFBbUQ7QUFBQSx5QkFDekIsTUFBS1osS0FEb0I7QUFBQSxVQUN2RHBDLFlBRHVELGdCQUN2REEsWUFEdUQ7QUFBQSxVQUN6Q0wsV0FEeUMsZ0JBQ3pDQSxXQUR5Qzs7QUFFL0QsVUFBTStCLG9CQUFvQixHQUFHLE1BQUtDLHdCQUFMLEVBQTdCOztBQUNBLFVBQU1tRSxRQUFRLEdBQUc3RSxLQUFLLEtBQUtTLG9CQUEzQjs7QUFDQSxVQUFNdEIsV0FBVyxHQUFHLE1BQUt5RixzQkFBTCxDQUE0QjVFLEtBQTVCLENBQXBCOztBQUNBLFVBQU11QixLQUFLLEdBQUcsTUFBS0YsYUFBTCxDQUFtQnRDLFlBQW5CLEVBQWlDO0FBQUVnQyxRQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV2YsUUFBQUEsS0FBSyxFQUFMQSxLQUFYO0FBQWtCWixRQUFBQSxLQUFLLEVBQUVEO0FBQXpCLE9BQWpDLENBQWQ7O0FBRUEsVUFBTXNDLE9BQU8scUJBQWN6QixLQUFkLENBQWI7O0FBQ0EsVUFBSTZFLFFBQUosRUFBYztBQUNaLGVBQ0U7QUFBRyxVQUFBLEdBQUcsRUFBRXBEO0FBQVIsV0FBa0IsTUFBS29DLGVBQUwsQ0FBcUI3RCxLQUFyQixFQUE0QmUsT0FBTyxDQUFDaUMsUUFBUixDQUFpQmhDLFdBQTdDLEVBQTBETyxLQUExRCxDQUFsQixDQURGO0FBR0QsT0FaOEQsQ0FjL0Q7OztBQUNBLGFBQ0U7QUFBRyxRQUFBLEdBQUcsRUFBRUU7QUFBUixTQUNFO0FBQ0UscUJBQVdyQix3QkFBYU8sT0FEMUI7QUFFRSw4QkFBb0JYLEtBRnRCO0FBR0UsUUFBQSxHQUFHLFlBQUt5QixPQUFMLFlBSEw7QUFJRSxRQUFBLEtBQUssb0JBQ0FGLEtBREE7QUFFSGUsVUFBQUEsV0FBVyxFQUFFNUQsV0FGVjtBQUdINkQsVUFBQUEsT0FBTyxFQUFFO0FBSE4sVUFKUDtBQVNFLFFBQUEsQ0FBQyxFQUFFUjtBQVRMLFFBREYsRUFZRTtBQUNFLHFCQUFXM0Isd0JBQWFPLE9BRDFCO0FBRUUsOEJBQW9CWCxLQUZ0QjtBQUdFLFFBQUEsR0FBRyxFQUFFeUIsT0FIUDtBQUlFLFFBQUEsS0FBSyxFQUFFRixLQUpUO0FBS0UsUUFBQSxDQUFDLEVBQUVRO0FBTEwsUUFaRixDQURGO0FBc0JELEs7OzZGQUVnQixVQUFDaEIsT0FBRCxFQUFtQmYsS0FBbkIsRUFBa0MrQixJQUFsQyxFQUFtRDtBQUFBLFVBQzFEaEQsWUFEMEQsR0FDekMsTUFBS29DLEtBRG9DLENBQzFEcEMsWUFEMEQ7O0FBRWxFLFVBQU0wQixvQkFBb0IsR0FBRyxNQUFLQyx3QkFBTCxFQUE3Qjs7QUFDQSxVQUFNbUUsUUFBUSxHQUFHN0UsS0FBSyxLQUFLUyxvQkFBM0I7O0FBRUEsVUFBTXRCLFdBQVcsR0FBRyxNQUFLeUYsc0JBQUwsQ0FBNEI1RSxLQUE1QixDQUFwQjs7QUFDQSxVQUFNdUIsS0FBSyxHQUFHLE1BQUtGLGFBQUwsQ0FBbUJ0QyxZQUFuQixFQUFpQztBQUFFZ0MsUUFBQUEsT0FBTyxFQUFQQSxPQUFGO0FBQVdmLFFBQUFBLEtBQUssRUFBTEEsS0FBWDtBQUFrQlosUUFBQUEsS0FBSyxFQUFFRDtBQUF6QixPQUFqQyxDQUFkOztBQUVBLFVBQU1zQyxPQUFPLHFCQUFjekIsS0FBZCxDQUFiOztBQUNBLFVBQUk2RSxRQUFKLEVBQWM7QUFDWixZQUFNN0QsV0FBVyxHQUFHLGtDQUFzQkQsT0FBdEIsQ0FBcEI7O0FBQ0EsWUFBSSxDQUFDQyxXQUFMLEVBQWtCO0FBQ2hCLGlCQUFPLElBQVA7QUFDRDs7QUFDRCxlQUNFO0FBQUcsVUFBQSxHQUFHLEVBQUVTO0FBQVIsV0FDRyxNQUFLZ0MsV0FBTCxDQUFpQnpELEtBQWpCLEVBQXdCZ0IsV0FBeEIsRUFBcUNPLEtBQXJDLENBREgsRUFFRyxNQUFLc0MsZUFBTCxDQUFxQjdELEtBQXJCLEVBQTRCZ0IsV0FBNUIsRUFBeUNPLEtBQXpDLENBRkgsQ0FERjtBQU1EOztBQUVELGFBQ0U7QUFDRSxxQkFBV25CLHdCQUFhTyxPQUQxQjtBQUVFLDhCQUFvQlgsS0FGdEI7QUFHRSxRQUFBLEdBQUcsRUFBRXlCLE9BSFA7QUFJRSxRQUFBLEtBQUssRUFBRUYsS0FKVDtBQUtFLFFBQUEsQ0FBQyxFQUFFUTtBQUxMLFFBREY7QUFTRCxLOzs2RkFFZ0IsVUFBQ2hCLE9BQUQsRUFBbUJmLEtBQW5CLEVBQXFDO0FBQ3BELFVBQU1nQixXQUFXLEdBQUcsa0NBQXNCRCxPQUF0QixDQUFwQjs7QUFDQSxVQUFJLENBQUNDLFdBQUQsSUFBZ0IsQ0FBQ0EsV0FBVyxDQUFDMEIsTUFBakMsRUFBeUM7QUFDdkMsZUFBTyxJQUFQO0FBQ0Q7O0FBSm1ELFVBT3BDTyxVQVBvQyxHQVNoRGxDLE9BVGdELENBT2xEdkIsVUFQa0QsQ0FPcEN5RCxVQVBvQztBQUFBLFVBUXRDOUMsSUFSc0MsR0FTaERZLE9BVGdELENBUWxEaUMsUUFSa0QsQ0FRdEM3QyxJQVJzQzs7QUFVcEQsVUFBTTRCLElBQUksR0FBRyxNQUFLQyxzQkFBTCxDQUE0QmhCLFdBQTVCLEVBQXlDYixJQUF6QyxDQUFiOztBQUNBLFVBQUksQ0FBQzRCLElBQUwsRUFBVztBQUNULGVBQU8sSUFBUDtBQUNEOztBQUVELGNBQVFrQixVQUFSO0FBQ0UsYUFBS1MsdUJBQVlvQixLQUFqQjtBQUNFLGlCQUFPLE1BQUtDLFlBQUwsQ0FBa0JoRSxPQUFsQixFQUEyQmYsS0FBM0IsRUFBa0MrQixJQUFsQyxDQUFQOztBQUNGLGFBQUsyQix1QkFBWXhCLFdBQWpCO0FBQ0UsaUJBQU8sTUFBSzhDLFdBQUwsQ0FBaUJqRSxPQUFqQixFQUEwQmYsS0FBMUIsRUFBaUMrQixJQUFqQyxDQUFQOztBQUVGLGFBQUsyQix1QkFBWWIsT0FBakI7QUFDQSxhQUFLYSx1QkFBWU0sU0FBakI7QUFDRSxpQkFBTyxNQUFLaUIsY0FBTCxDQUFvQmxFLE9BQXBCLEVBQTZCZixLQUE3QixFQUFvQytCLElBQXBDLENBQVA7O0FBRUY7QUFDRSxpQkFBTyxJQUFQO0FBWEo7QUFhRCxLOzs0RkFFZSxZQUFNO0FBQ3BCLFVBQU1zQyxRQUFRLEdBQUcsTUFBS0MsV0FBTCxFQUFqQjs7QUFDQSxVQUFNWSxNQUFNLEdBQUcsTUFBS0MsWUFBTCxJQUFxQixNQUFLQSxZQUFMLENBQWtCQyxTQUFsQixDQUE0QixNQUFLQyxZQUFMLEVBQTVCLENBQXBDOztBQUVBLGFBQ0U7QUFBSyxRQUFBLEdBQUcsRUFBQyxhQUFUO0FBQXVCLFFBQUEsS0FBSyxFQUFDLE1BQTdCO0FBQW9DLFFBQUEsTUFBTSxFQUFDO0FBQTNDLFNBQ0doQixRQUFRLElBQ1BBLFFBQVEsQ0FBQzNCLE1BQVQsR0FBa0IsQ0FEbkIsSUFDd0I7QUFBRyxRQUFBLEdBQUcsRUFBQztBQUFQLFNBQXdCMkIsUUFBUSxDQUFDSyxHQUFULENBQWEsTUFBS1ksY0FBbEIsQ0FBeEIsQ0FGM0IsRUFHR0osTUFBTSxJQUFJO0FBQUcsUUFBQSxHQUFHLEVBQUM7QUFBUCxTQUF5QixNQUFLSyxhQUFMLENBQW1CTCxNQUFuQixDQUF6QixDQUhiLENBREY7QUFPRCxLOzs0RkFFZSxZQUFNO0FBQ3BCLFVBQU1NLFFBQVEsR0FBSSxNQUFLQyxRQUFMLElBQWlCLE1BQUtBLFFBQUwsQ0FBY0QsUUFBaEMsSUFBNkMsRUFBOUQ7QUFEb0IsVUFFWmpFLEtBRlksR0FFRixNQUFLSixLQUZILENBRVpJLEtBRlk7QUFBQSxVQUdaTyxLQUhZLEdBR00wRCxRQUhOLENBR1oxRCxLQUhZO0FBQUEsVUFHTEQsTUFISyxHQUdNMkQsUUFITixDQUdMM0QsTUFISztBQUtwQixhQUNFO0FBQ0UsUUFBQSxFQUFFLEVBQUMsUUFETDtBQUVFLFFBQUEsS0FBSztBQUNIQyxVQUFBQSxLQUFLLEVBQUxBLEtBREc7QUFFSEQsVUFBQUEsTUFBTSxFQUFOQTtBQUZHLFdBR0FOLEtBSEEsQ0FGUDtBQU9FLFFBQUEsR0FBRyxFQUFFLGFBQUFtRSxDQUFDLEVBQUk7QUFDUixnQkFBS0MsYUFBTCxHQUFxQkQsQ0FBckI7QUFDRDtBQVRILFNBV0csTUFBS0UsYUFBTCxFQVhILENBREY7QUFlRCxLOzs7Ozs7OztBQWxoQkQ7MkNBQ3VCNUUsVyxFQUFrQmIsSSxFQUFtQjtBQUFBOztBQUMxRCxVQUFJYSxXQUFXLENBQUMwQixNQUFaLEtBQXVCLENBQTNCLEVBQThCO0FBQzVCLGVBQU8sRUFBUDtBQUNEOztBQUVELFVBQU1tRCxZQUFZLEdBQUc3RSxXQUFXLENBQUMwRCxHQUFaLENBQWdCLFVBQUF6RCxDQUFDO0FBQUEsZUFBSSxNQUFJLENBQUNDLE9BQUwsQ0FBYUQsQ0FBYixDQUFKO0FBQUEsT0FBakIsQ0FBckI7QUFFQSxVQUFJNkUsVUFBVSxHQUFHLEVBQWpCOztBQUNBLGNBQVEzRixJQUFSO0FBQ0UsYUFBSzhCLHdCQUFhNkMsS0FBbEI7QUFDRSxpQkFBT2UsWUFBUDs7QUFFRixhQUFLNUQsd0JBQWFDLFdBQWxCO0FBQ0U0RCxVQUFBQSxVQUFVLEdBQUdELFlBQVksQ0FBQ25CLEdBQWIsQ0FBaUIsVUFBQXpELENBQUM7QUFBQSw2QkFBT0EsQ0FBQyxDQUFDLENBQUQsQ0FBUixjQUFlQSxDQUFDLENBQUMsQ0FBRCxDQUFoQjtBQUFBLFdBQWxCLEVBQXlDOEUsSUFBekMsQ0FBOEMsR0FBOUMsQ0FBYjtBQUNBLDZCQUFZRCxVQUFaOztBQUVGLGFBQUs3RCx3QkFBYVksT0FBbEI7QUFDRWlELFVBQUFBLFVBQVUsR0FBR0QsWUFBWSxDQUFDbkIsR0FBYixDQUFpQixVQUFBekQsQ0FBQztBQUFBLDZCQUFPQSxDQUFDLENBQUMsQ0FBRCxDQUFSLGNBQWVBLENBQUMsQ0FBQyxDQUFELENBQWhCO0FBQUEsV0FBbEIsRUFBeUM4RSxJQUF6QyxDQUE4QyxHQUE5QyxDQUFiO0FBQ0EsNkJBQVlELFVBQVo7O0FBRUY7QUFDRSxpQkFBTyxJQUFQO0FBYko7QUFlRDs7OzZCQTRmUTtBQUNQLGdGQUFvQixLQUFLRSxhQUFMLEVBQXBCO0FBQ0Q7Ozs7RUF6aEJpQ3ZILG9COzs7O2dCQUFmUSxNLGtCQUNHVCxZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBGZWF0dXJlIH0gZnJvbSAnQG5lYnVsYS5nbC9lZGl0LW1vZGVzJztcbmltcG9ydCB0eXBlIHsgR2VvSnNvblR5cGUsIFJlbmRlclN0YXRlLCBJZCB9IGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQgeyBSRU5ERVJfU1RBVEUsIFJFTkRFUl9UWVBFLCBHRU9KU09OX1RZUEUsIEdVSURFX1RZUEUsIEVMRU1FTlRfVFlQRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBNb2RlSGFuZGxlciBmcm9tICcuL21vZGUtaGFuZGxlcic7XG5pbXBvcnQgeyBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMgfSBmcm9tICcuL2VkaXQtbW9kZXMvdXRpbHMnO1xuXG5pbXBvcnQge1xuICBlZGl0SGFuZGxlU3R5bGUgYXMgZGVmYXVsdEVkaXRIYW5kbGVTdHlsZSxcbiAgZmVhdHVyZVN0eWxlIGFzIGRlZmF1bHRGZWF0dXJlU3R5bGVcbn0gZnJvbSAnLi9zdHlsZSc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uTW9kZUhhbmRsZXIuZGVmYXVsdFByb3BzLFxuICBjbGlja1JhZGl1czogMCxcbiAgZmVhdHVyZVNoYXBlOiAnY2lyY2xlJyxcbiAgZWRpdEhhbmRsZVNoYXBlOiAncmVjdCcsXG4gIGVkaXRIYW5kbGVTdHlsZTogZGVmYXVsdEVkaXRIYW5kbGVTdHlsZSxcbiAgZmVhdHVyZVN0eWxlOiBkZWZhdWx0RmVhdHVyZVN0eWxlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3IgZXh0ZW5kcyBNb2RlSGFuZGxlciB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbiAgLyogSEVMUEVSUyAqL1xuICBfZ2V0UGF0aEluU2NyZWVuQ29vcmRzKGNvb3JkaW5hdGVzOiBhbnksIHR5cGU6IEdlb0pzb25UeXBlKSB7XG4gICAgaWYgKGNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcmVlbkNvb3JkcyA9IGNvb3JkaW5hdGVzLm1hcChwID0+IHRoaXMucHJvamVjdChwKSk7XG5cbiAgICBsZXQgcGF0aFN0cmluZyA9ICcnO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBHRU9KU09OX1RZUEUuUE9JTlQ6XG4gICAgICAgIHJldHVybiBzY3JlZW5Db29yZHM7XG5cbiAgICAgIGNhc2UgR0VPSlNPTl9UWVBFLkxJTkVfU1RSSU5HOlxuICAgICAgICBwYXRoU3RyaW5nID0gc2NyZWVuQ29vcmRzLm1hcChwID0+IGAke3BbMF19LCR7cFsxXX1gKS5qb2luKCdMJyk7XG4gICAgICAgIHJldHVybiBgTSAke3BhdGhTdHJpbmd9YDtcblxuICAgICAgY2FzZSBHRU9KU09OX1RZUEUuUE9MWUdPTjpcbiAgICAgICAgcGF0aFN0cmluZyA9IHNjcmVlbkNvb3Jkcy5tYXAocCA9PiBgJHtwWzBdfSwke3BbMV19YCkuam9pbignTCcpO1xuICAgICAgICByZXR1cm4gYE0gJHtwYXRoU3RyaW5nfSB6YDtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgX2dldEVkaXRIYW5kbGVTdGF0ZSA9IChlZGl0SGFuZGxlOiBGZWF0dXJlLCByZW5kZXJTdGF0ZTogP3N0cmluZykgPT4ge1xuICAgIGNvbnN0IHsgcG9pbnRlckRvd25QaWNrcywgaG92ZXJlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChyZW5kZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIHJlbmRlclN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGVkaXRIYW5kbGVJbmRleCA9IGVkaXRIYW5kbGUucHJvcGVydGllcy5wb3NpdGlvbkluZGV4ZXNbMF07XG4gICAgbGV0IGRyYWdnaW5nRWRpdEhhbmRsZUluZGV4ID0gbnVsbDtcbiAgICBjb25zdCBwaWNrZWRPYmplY3QgPSBwb2ludGVyRG93blBpY2tzICYmIHBvaW50ZXJEb3duUGlja3NbMF0gJiYgcG9pbnRlckRvd25QaWNrc1swXS5vYmplY3Q7XG4gICAgaWYgKHBpY2tlZE9iamVjdCAmJiBwaWNrZWRPYmplY3QuZ3VpZGVUeXBlID09PSBHVUlERV9UWVBFLkVESVRfSEFORExFKSB7XG4gICAgICBkcmFnZ2luZ0VkaXRIYW5kbGVJbmRleCA9IHBpY2tlZE9iamVjdC5pbmRleDtcbiAgICB9XG5cbiAgICBpZiAoZWRpdEhhbmRsZUluZGV4ID09PSBkcmFnZ2luZ0VkaXRIYW5kbGVJbmRleCkge1xuICAgICAgcmV0dXJuIFJFTkRFUl9TVEFURS5TRUxFQ1RFRDtcbiAgICB9XG5cbiAgICBpZiAoaG92ZXJlZCAmJiBob3ZlcmVkLnR5cGUgPT09IEVMRU1FTlRfVFlQRS5FRElUX0hBTkRMRSkge1xuICAgICAgaWYgKGhvdmVyZWQuaW5kZXggPT09IGVkaXRIYW5kbGVJbmRleCkge1xuICAgICAgICByZXR1cm4gUkVOREVSX1NUQVRFLkhPVkVSRUQ7XG4gICAgICB9XG5cbiAgICAgIC8vIGN1cnNvciBob3ZlcmVkIG9uIGZpcnN0IHZlcnRleCB3aGVuIGRyYXdpbmcgcG9seWdvblxuICAgICAgaWYgKFxuICAgICAgICBob3ZlcmVkLmluZGV4ID09PSAwICYmXG4gICAgICAgIGVkaXRIYW5kbGUucHJvcGVydGllcy5ndWlkZVR5cGUgPT09IEdVSURFX1RZUEUuQ1VSU09SX0VESVRfSEFORExFXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIFJFTkRFUl9TVEFURS5DTE9TSU5HO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBSRU5ERVJfU1RBVEUuSU5BQ1RJVkU7XG4gIH07XG5cbiAgX2dldEZlYXR1cmVSZW5kZXJTdGF0ZSA9IChpbmRleDogbnVtYmVyLCByZW5kZXJTdGF0ZTogP1JlbmRlclN0YXRlKSA9PiB7XG4gICAgY29uc3QgeyBob3ZlcmVkIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZUluZGV4ID0gdGhpcy5fZ2V0U2VsZWN0ZWRGZWF0dXJlSW5kZXgoKTtcbiAgICBpZiAocmVuZGVyU3RhdGUpIHtcbiAgICAgIHJldHVybiByZW5kZXJTdGF0ZTtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPT09IHNlbGVjdGVkRmVhdHVyZUluZGV4KSB7XG4gICAgICByZXR1cm4gUkVOREVSX1NUQVRFLlNFTEVDVEVEO1xuICAgIH1cblxuICAgIGlmIChob3ZlcmVkICYmIGhvdmVyZWQudHlwZSA9PT0gRUxFTUVOVF9UWVBFLkZFQVRVUkUgJiYgaG92ZXJlZC5mZWF0dXJlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICByZXR1cm4gUkVOREVSX1NUQVRFLkhPVkVSRUQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIFJFTkRFUl9TVEFURS5JTkFDVElWRTtcbiAgfTtcblxuICBfZ2V0U3R5bGVQcm9wID0gKHN0eWxlUHJvcDogYW55LCBwYXJhbXM6IGFueSkgPT4ge1xuICAgIHJldHVybiB0eXBlb2Ygc3R5bGVQcm9wID09PSAnZnVuY3Rpb24nID8gc3R5bGVQcm9wKHBhcmFtcykgOiBzdHlsZVByb3A7XG4gIH07XG5cbiAgLyogUkVOREVSICovXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1wYXJhbXMgKi9cbiAgX3JlbmRlckVkaXRIYW5kbGUgPSAoZWRpdEhhbmRsZTogRmVhdHVyZSwgZmVhdHVyZTogRmVhdHVyZSkgPT4ge1xuICAgIC8qIGVzbGludC1lbmFibGUgbWF4LXBhcmFtcyAqL1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0RmVhdHVyZUNvb3JkaW5hdGVzKGVkaXRIYW5kbGUpO1xuICAgIGNvbnN0IHAgPSB0aGlzLnByb2plY3QoY29vcmRpbmF0ZXMgJiYgY29vcmRpbmF0ZXNbMF0pO1xuICAgIGlmICghcCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgcHJvcGVydGllczogeyBmZWF0dXJlSW5kZXgsIHBvc2l0aW9uSW5kZXhlcyB9XG4gICAgfSA9IGVkaXRIYW5kbGU7XG4gICAgY29uc3QgeyBjbGlja1JhZGl1cywgZWRpdEhhbmRsZVNoYXBlLCBlZGl0SGFuZGxlU3R5bGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBpbmRleCA9IHBvc2l0aW9uSW5kZXhlc1swXTtcblxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5fZ2V0U3R5bGVQcm9wKGVkaXRIYW5kbGVTaGFwZSwge1xuICAgICAgZmVhdHVyZTogZmVhdHVyZSB8fCBlZGl0SGFuZGxlLFxuICAgICAgaW5kZXgsXG4gICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICBzdGF0ZTogdGhpcy5fZ2V0RWRpdEhhbmRsZVN0YXRlKGVkaXRIYW5kbGUpXG4gICAgfSk7XG5cbiAgICBsZXQgc3R5bGUgPSB0aGlzLl9nZXRTdHlsZVByb3AoZWRpdEhhbmRsZVN0eWxlLCB7XG4gICAgICBmZWF0dXJlOiBmZWF0dXJlIHx8IGVkaXRIYW5kbGUsXG4gICAgICBpbmRleCxcbiAgICAgIGZlYXR1cmVJbmRleCxcbiAgICAgIHNoYXBlLFxuICAgICAgc3RhdGU6IHRoaXMuX2dldEVkaXRIYW5kbGVTdGF0ZShlZGl0SGFuZGxlKVxuICAgIH0pO1xuXG4gICAgLy8gZGlzYWJsZSBldmVudHMgZm9yIGN1cnNvciBlZGl0SGFuZGxlXG4gICAgaWYgKGVkaXRIYW5kbGUucHJvcGVydGllcy5ndWlkZVR5cGUgPT09IEdVSURFX1RZUEUuQ1VSU09SX0VESVRfSEFORExFKSB7XG4gICAgICBzdHlsZSA9IHtcbiAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgIC8vIGRpc2FibGUgcG9pbnRlciBldmVudHMgZm9yIGN1cnNvclxuICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZSdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbUtleSA9IGAke0VMRU1FTlRfVFlQRS5FRElUX0hBTkRMRX0uJHtmZWF0dXJlSW5kZXh9LiR7aW5kZXh9YDtcbiAgICAvLyBmaXJzdCA8Y2lyY2xlfHJlY3Q+IGlzIHRvIG1ha2UgcGF0aCBlYXNpbHkgaW50ZXJhY3RlZCB3aXRoXG4gICAgc3dpdGNoIChzaGFwZSkge1xuICAgICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZyBrZXk9e2VsZW1LZXl9IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3BbMF19LCAke3BbMV19KWB9PlxuICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICBkYXRhLXR5cGU9e0VMRU1FTlRfVFlQRS5FRElUX0hBTkRMRX1cbiAgICAgICAgICAgICAgZGF0YS1pbmRleD17aW5kZXh9XG4gICAgICAgICAgICAgIGRhdGEtZmVhdHVyZS1pbmRleD17ZmVhdHVyZUluZGV4fVxuICAgICAgICAgICAgICBrZXk9e2Ake2VsZW1LZXl9LmhpZGRlbmB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnN0eWxlLCBzdHJva2U6ICdub25lJywgZmlsbDogJyMwMDAnLCBmaWxsT3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBjeD17MH1cbiAgICAgICAgICAgICAgY3k9ezB9XG4gICAgICAgICAgICAgIHI9e2NsaWNrUmFkaXVzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgZGF0YS10eXBlPXtFTEVNRU5UX1RZUEUuRURJVF9IQU5ETEV9XG4gICAgICAgICAgICAgIGRhdGEtaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBkYXRhLWZlYXR1cmUtaW5kZXg9e2ZlYXR1cmVJbmRleH1cbiAgICAgICAgICAgICAga2V5PXtlbGVtS2V5fVxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgIGN4PXswfVxuICAgICAgICAgICAgICBjeT17MH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICApO1xuICAgICAgY2FzZSAncmVjdCc6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGcga2V5PXtlbGVtS2V5fSB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtwWzBdfSwgJHtwWzFdfSlgfT5cbiAgICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICAgIGRhdGEtdHlwZT17RUxFTUVOVF9UWVBFLkVESVRfSEFORExFfVxuICAgICAgICAgICAgICBkYXRhLWluZGV4PXtpbmRleH1cbiAgICAgICAgICAgICAgZGF0YS1mZWF0dXJlLWluZGV4PXtmZWF0dXJlSW5kZXh9XG4gICAgICAgICAgICAgIGtleT17YCR7ZWxlbUtleX0uaGlkZGVuYH1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAuLi5zdHlsZSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGNsaWNrUmFkaXVzLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBjbGlja1JhZGl1cyxcbiAgICAgICAgICAgICAgICBmaWxsOiAnIzAwMCcsXG4gICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgcj17Y2xpY2tSYWRpdXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgZGF0YS10eXBlPXtFTEVNRU5UX1RZUEUuRURJVF9IQU5ETEV9XG4gICAgICAgICAgICAgIGRhdGEtaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICBkYXRhLWZlYXR1cmUtaW5kZXg9e2ZlYXR1cmVJbmRleH1cbiAgICAgICAgICAgICAga2V5PXtgJHtlbGVtS2V5fWB9XG4gICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICApO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgX3JlbmRlclNlZ21lbnQgPSAoZmVhdHVyZUluZGV4OiBJZCwgaW5kZXg6IG51bWJlciwgY29vcmRpbmF0ZXM6IG51bWJlcltdLCBzdHlsZTogT2JqZWN0KSA9PiB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuX2dldFBhdGhJblNjcmVlbkNvb3Jkcyhjb29yZGluYXRlcywgR0VPSlNPTl9UWVBFLkxJTkVfU1RSSU5HKTtcbiAgICBjb25zdCB7IHJhZGl1cywgLi4ub3RoZXJzIH0gPSBzdHlsZTtcbiAgICBjb25zdCB7IGNsaWNrUmFkaXVzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZWxlbUtleSA9IGAke0VMRU1FTlRfVFlQRS5TRUdNRU5UfS4ke2ZlYXR1cmVJbmRleH0uJHtpbmRleH1gO1xuICAgIHJldHVybiAoXG4gICAgICA8ZyBrZXk9e2VsZW1LZXl9PlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGtleT17YCR7ZWxlbUtleX0uaGlkZGVuYH1cbiAgICAgICAgICBkYXRhLXR5cGU9e0VMRU1FTlRfVFlQRS5TRUdNRU5UfVxuICAgICAgICAgIGRhdGEtaW5kZXg9e2luZGV4fVxuICAgICAgICAgIGRhdGEtZmVhdHVyZS1pbmRleD17ZmVhdHVyZUluZGV4fVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5vdGhlcnMsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogY2xpY2tSYWRpdXMgfHwgcmFkaXVzLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH19XG4gICAgICAgICAgZD17cGF0aH1cbiAgICAgICAgLz5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBrZXk9e2VsZW1LZXl9XG4gICAgICAgICAgZGF0YS10eXBlPXtFTEVNRU5UX1RZUEUuU0VHTUVOVH1cbiAgICAgICAgICBkYXRhLWluZGV4PXtpbmRleH1cbiAgICAgICAgICBkYXRhLWZlYXR1cmUtaW5kZXg9e2ZlYXR1cmVJbmRleH1cbiAgICAgICAgICBzdHlsZT17b3RoZXJzfVxuICAgICAgICAgIGQ9e3BhdGh9XG4gICAgICAgIC8+XG4gICAgICA8L2c+XG4gICAgKTtcbiAgfTtcblxuICBfcmVuZGVyU2VnbWVudHMgPSAoZmVhdHVyZUluZGV4OiBJZCwgY29vcmRpbmF0ZXM6IG51bWJlcltdLCBzdHlsZTogT2JqZWN0KSA9PiB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgc2VnbWVudHMucHVzaChcbiAgICAgICAgdGhpcy5fcmVuZGVyU2VnbWVudChmZWF0dXJlSW5kZXgsIGksIFtjb29yZGluYXRlc1tpXSwgY29vcmRpbmF0ZXNbaSArIDFdXSwgc3R5bGUpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHM7XG4gIH07XG5cbiAgX3JlbmRlckZpbGwgPSAoZmVhdHVyZUluZGV4OiBJZCwgY29vcmRpbmF0ZXM6IG51bWJlcltdLCBzdHlsZTogT2JqZWN0KSA9PiB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuX2dldFBhdGhJblNjcmVlbkNvb3Jkcyhjb29yZGluYXRlcywgR0VPSlNPTl9UWVBFLlBPTFlHT04pO1xuICAgIHJldHVybiAoXG4gICAgICA8cGF0aFxuICAgICAgICBrZXk9e2Ake0VMRU1FTlRfVFlQRS5GSUxMfS4ke2ZlYXR1cmVJbmRleH1gfVxuICAgICAgICBkYXRhLXR5cGU9e0VMRU1FTlRfVFlQRS5GSUxMfVxuICAgICAgICBkYXRhLWZlYXR1cmUtaW5kZXg9e2ZlYXR1cmVJbmRleH1cbiAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGUsIHN0cm9rZTogJ25vbmUnIH19XG4gICAgICAgIGQ9e3BhdGh9XG4gICAgICAvPlxuICAgICk7XG4gIH07XG5cbiAgX3JlbmRlclRlbnRhdGl2ZUZlYXR1cmUgPSAoZmVhdHVyZTogRmVhdHVyZSwgY3Vyc29yRWRpdEhhbmRsZTogRmVhdHVyZSkgPT4ge1xuICAgIGNvbnN0IHsgZmVhdHVyZVN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGdlb21ldHJ5OiB7IGNvb3JkaW5hdGVzIH0sXG4gICAgICBwcm9wZXJ0aWVzOiB7IHJlbmRlclR5cGUgfVxuICAgIH0gPSBmZWF0dXJlO1xuXG4gICAgaWYgKCFjb29yZGluYXRlcyB8fCBjb29yZGluYXRlcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyA+PSAyIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgZmlyc3RDb29yZHMgPSBjb29yZGluYXRlc1swXTtcbiAgICBjb25zdCBsYXN0Q29vcmRzID0gY29vcmRpbmF0ZXNbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgdW5jb21taXR0ZWRTdHlsZSA9IHRoaXMuX2dldFN0eWxlUHJvcChmZWF0dXJlU3R5bGUsIHtcbiAgICAgIGZlYXR1cmUsXG4gICAgICBpbmRleDogbnVsbCxcbiAgICAgIHN0YXRlOiBSRU5ERVJfU1RBVEUuVU5DT01NSVRURURcbiAgICB9KTtcblxuICAgIGxldCBjb21taXR0ZWRQYXRoO1xuICAgIGxldCB1bmNvbW1pdHRlZFBhdGg7XG4gICAgbGV0IGNsb3NpbmdQYXRoO1xuICAgIGNvbnN0IGZpbGwgPSB0aGlzLl9yZW5kZXJGaWxsKCd0ZW50YXRpdmUnLCBjb29yZGluYXRlcywgdW5jb21taXR0ZWRTdHlsZSk7XG5cbiAgICBzd2l0Y2ggKHJlbmRlclR5cGUpIHtcbiAgICAgIGNhc2UgUkVOREVSX1RZUEUuTElORV9TVFJJTkc6XG4gICAgICBjYXNlIFJFTkRFUl9UWVBFLlBPTFlHT046XG4gICAgICAgIGNvbnN0IGNvbW1pdHRlZFN0eWxlID0gdGhpcy5fZ2V0U3R5bGVQcm9wKGZlYXR1cmVTdHlsZSwge1xuICAgICAgICAgIGZlYXR1cmUsXG4gICAgICAgICAgc3RhdGU6IFJFTkRFUl9TVEFURS5TRUxFQ1RFRFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY3Vyc29yRWRpdEhhbmRsZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvckNvb3JkcyA9IGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDJdO1xuICAgICAgICAgIGNvbW1pdHRlZFBhdGggPSB0aGlzLl9yZW5kZXJTZWdtZW50cyhcbiAgICAgICAgICAgICd0ZW50YXRpdmUnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXMuc2xpY2UoMCwgY29vcmRpbmF0ZXMubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICBjb21taXR0ZWRTdHlsZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdW5jb21taXR0ZWRQYXRoID0gdGhpcy5fcmVuZGVyU2VnbWVudChcbiAgICAgICAgICAgICd0ZW50YXRpdmUtdW5jb21taXR0ZWQnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVuZ3RoIC0gMixcbiAgICAgICAgICAgIFtjdXJzb3JDb29yZHMsIGxhc3RDb29yZHNdLFxuICAgICAgICAgICAgdW5jb21taXR0ZWRTdHlsZVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbWl0dGVkUGF0aCA9IHRoaXMuX3JlbmRlclNlZ21lbnRzKCd0ZW50YXRpdmUnLCBjb29yZGluYXRlcywgY29tbWl0dGVkU3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbmRlclR5cGUgPT09IFJFTkRFUl9UWVBFLlBPTFlHT04pIHtcbiAgICAgICAgICBjb25zdCBjbG9zaW5nU3R5bGUgPSB0aGlzLl9nZXRTdHlsZVByb3AoZmVhdHVyZVN0eWxlLCB7XG4gICAgICAgICAgICBmZWF0dXJlLFxuICAgICAgICAgICAgaW5kZXg6IG51bGwsXG4gICAgICAgICAgICBzdGF0ZTogUkVOREVSX1NUQVRFLkNMT1NJTkdcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNsb3NpbmdQYXRoID0gdGhpcy5fcmVuZGVyU2VnbWVudChcbiAgICAgICAgICAgICd0ZW50YXRpdmUtY2xvc2luZycsXG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgW2xhc3RDb29yZHMsIGZpcnN0Q29vcmRzXSxcbiAgICAgICAgICAgIGNsb3NpbmdTdHlsZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBSRU5ERVJfVFlQRS5SRUNUQU5HTEU6XG4gICAgICAgIHVuY29tbWl0dGVkUGF0aCA9IHRoaXMuX3JlbmRlclNlZ21lbnRzKFxuICAgICAgICAgICd0ZW50YXRpdmUnLFxuICAgICAgICAgIFsuLi5jb29yZGluYXRlcywgZmlyc3RDb29yZHNdLFxuICAgICAgICAgIHVuY29tbWl0dGVkU3R5bGVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgcmV0dXJuIFtmaWxsLCBjb21taXR0ZWRQYXRoLCB1bmNvbW1pdHRlZFBhdGgsIGNsb3NpbmdQYXRoXS5maWx0ZXIoQm9vbGVhbik7XG4gIH07XG5cbiAgX3JlbmRlckd1aWRlcyA9ICh7IHRlbnRhdGl2ZUZlYXR1cmUsIGVkaXRIYW5kbGVzIH06IE9iamVjdCkgPT4ge1xuICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5nZXRGZWF0dXJlcygpO1xuICAgIGNvbnN0IGN1cnNvckVkaXRIYW5kbGUgPSBlZGl0SGFuZGxlcy5maW5kKFxuICAgICAgZiA9PiBmLnByb3BlcnRpZXMuZ3VpZGVUeXBlID09PSBHVUlERV9UWVBFLkNVUlNPUl9FRElUX0hBTkRMRVxuICAgICk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxnIGtleT1cImZlYXR1cmUtZ3VpZGVzXCI+XG4gICAgICAgIHt0ZW50YXRpdmVGZWF0dXJlICYmIHRoaXMuX3JlbmRlclRlbnRhdGl2ZUZlYXR1cmUodGVudGF0aXZlRmVhdHVyZSwgY3Vyc29yRWRpdEhhbmRsZSl9XG4gICAgICAgIHtlZGl0SGFuZGxlcyAmJlxuICAgICAgICAgIGVkaXRIYW5kbGVzLm1hcChlZGl0SGFuZGxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZlYXR1cmUgPVxuICAgICAgICAgICAgICAoZmVhdHVyZXMgJiYgZmVhdHVyZXNbZWRpdEhhbmRsZS5wcm9wZXJ0aWVzLmZlYXR1cmVJbmRleF0pIHx8IHRlbnRhdGl2ZUZlYXR1cmU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRWRpdEhhbmRsZShlZGl0SGFuZGxlLCBmZWF0dXJlKTtcbiAgICAgICAgICB9KX1cbiAgICAgIDwvZz5cbiAgICApO1xuICB9O1xuXG4gIF9yZW5kZXJQb2ludCA9IChmZWF0dXJlOiBGZWF0dXJlLCBpbmRleDogbnVtYmVyLCBwYXRoOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCByZW5kZXJTdGF0ZSA9IHRoaXMuX2dldEZlYXR1cmVSZW5kZXJTdGF0ZShpbmRleCk7XG4gICAgY29uc3QgeyBmZWF0dXJlU3R5bGUsIGZlYXR1cmVTaGFwZSwgY2xpY2tSYWRpdXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLl9nZXRTdHlsZVByb3AoZmVhdHVyZVNoYXBlLCB7IGZlYXR1cmUsIGluZGV4LCBzdGF0ZTogcmVuZGVyU3RhdGUgfSk7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLl9nZXRTdHlsZVByb3AoZmVhdHVyZVN0eWxlLCB7IGZlYXR1cmUsIGluZGV4LCBzdGF0ZTogcmVuZGVyU3RhdGUgfSk7XG5cbiAgICBjb25zdCBlbGVtS2V5ID0gYGZlYXR1cmUuJHtpbmRleH1gO1xuICAgIGlmIChzaGFwZSA9PT0gJ3JlY3QnKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZyBrZXk9e2VsZW1LZXl9IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3BhdGhbMF1bMF19LCAke3BhdGhbMF1bMV19KWB9PlxuICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICBkYXRhLXR5cGU9e0VMRU1FTlRfVFlQRS5GRUFUVVJFfVxuICAgICAgICAgICAgZGF0YS1mZWF0dXJlLWluZGV4PXtpbmRleH1cbiAgICAgICAgICAgIGtleT17YCR7ZWxlbUtleX0uaGlkZGVuYH1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIC4uLnN0eWxlLFxuICAgICAgICAgICAgICB3aWR0aDogY2xpY2tSYWRpdXMsXG4gICAgICAgICAgICAgIGhlaWdodDogY2xpY2tSYWRpdXMsXG4gICAgICAgICAgICAgIGZpbGw6ICcjMDAwJyxcbiAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgZGF0YS10eXBlPXtFTEVNRU5UX1RZUEUuRkVBVFVSRX1cbiAgICAgICAgICAgIGRhdGEtZmVhdHVyZS1pbmRleD17aW5kZXh9XG4gICAgICAgICAgICBrZXk9e2VsZW1LZXl9XG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9nPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGcga2V5PXtgZmVhdHVyZS4ke2luZGV4fWB9IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3BhdGhbMF1bMF19LCAke3BhdGhbMF1bMV19KWB9PlxuICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgZGF0YS10eXBlPXtFTEVNRU5UX1RZUEUuRkVBVFVSRX1cbiAgICAgICAgICBkYXRhLWZlYXR1cmUtaW5kZXg9e2luZGV4fVxuICAgICAgICAgIGtleT17YCR7ZWxlbUtleX0uaGlkZGVuYH1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjeD17MH1cbiAgICAgICAgICBjeT17MH1cbiAgICAgICAgICByPXtjbGlja1JhZGl1c31cbiAgICAgICAgLz5cbiAgICAgICAgPGNpcmNsZVxuICAgICAgICAgIGRhdGEtdHlwZT17RUxFTUVOVF9UWVBFLkZFQVRVUkV9XG4gICAgICAgICAgZGF0YS1mZWF0dXJlLWluZGV4PXtpbmRleH1cbiAgICAgICAgICBrZXk9e2VsZW1LZXl9XG4gICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgIGN4PXswfVxuICAgICAgICAgIGN5PXswfVxuICAgICAgICAvPlxuICAgICAgPC9nPlxuICAgICk7XG4gIH07XG5cbiAgX3JlbmRlclBhdGggPSAoZmVhdHVyZTogRmVhdHVyZSwgaW5kZXg6IG51bWJlciwgcGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgeyBmZWF0dXJlU3R5bGUsIGNsaWNrUmFkaXVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZUluZGV4ID0gdGhpcy5fZ2V0U2VsZWN0ZWRGZWF0dXJlSW5kZXgoKTtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGluZGV4ID09PSBzZWxlY3RlZEZlYXR1cmVJbmRleDtcbiAgICBjb25zdCByZW5kZXJTdGF0ZSA9IHRoaXMuX2dldEZlYXR1cmVSZW5kZXJTdGF0ZShpbmRleCk7XG4gICAgY29uc3Qgc3R5bGUgPSB0aGlzLl9nZXRTdHlsZVByb3AoZmVhdHVyZVN0eWxlLCB7IGZlYXR1cmUsIGluZGV4LCBzdGF0ZTogcmVuZGVyU3RhdGUgfSk7XG5cbiAgICBjb25zdCBlbGVtS2V5ID0gYGZlYXR1cmUuJHtpbmRleH1gO1xuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGcga2V5PXtlbGVtS2V5fT57dGhpcy5fcmVuZGVyU2VnbWVudHMoaW5kZXgsIGZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIHN0eWxlKX08L2c+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGZpcnN0IDxwYXRoPiBpcyB0byBtYWtlIHBhdGggZWFzaWx5IGludGVyYWN0ZWQgd2l0aFxuICAgIHJldHVybiAoXG4gICAgICA8ZyBrZXk9e2VsZW1LZXl9PlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGRhdGEtdHlwZT17RUxFTUVOVF9UWVBFLkZFQVRVUkV9XG4gICAgICAgICAgZGF0YS1mZWF0dXJlLWluZGV4PXtpbmRleH1cbiAgICAgICAgICBrZXk9e2Ake2VsZW1LZXl9LmhpZGRlbmB9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnN0eWxlLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IGNsaWNrUmFkaXVzLFxuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH19XG4gICAgICAgICAgZD17cGF0aH1cbiAgICAgICAgLz5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkYXRhLXR5cGU9e0VMRU1FTlRfVFlQRS5GRUFUVVJFfVxuICAgICAgICAgIGRhdGEtZmVhdHVyZS1pbmRleD17aW5kZXh9XG4gICAgICAgICAga2V5PXtlbGVtS2V5fVxuICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICBkPXtwYXRofVxuICAgICAgICAvPlxuICAgICAgPC9nPlxuICAgICk7XG4gIH07XG5cbiAgX3JlbmRlclBvbHlnb24gPSAoZmVhdHVyZTogRmVhdHVyZSwgaW5kZXg6IG51bWJlciwgcGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgeyBmZWF0dXJlU3R5bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlSW5kZXggPSB0aGlzLl9nZXRTZWxlY3RlZEZlYXR1cmVJbmRleCgpO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaW5kZXggPT09IHNlbGVjdGVkRmVhdHVyZUluZGV4O1xuXG4gICAgY29uc3QgcmVuZGVyU3RhdGUgPSB0aGlzLl9nZXRGZWF0dXJlUmVuZGVyU3RhdGUoaW5kZXgpO1xuICAgIGNvbnN0IHN0eWxlID0gdGhpcy5fZ2V0U3R5bGVQcm9wKGZlYXR1cmVTdHlsZSwgeyBmZWF0dXJlLCBpbmRleCwgc3RhdGU6IHJlbmRlclN0YXRlIH0pO1xuXG4gICAgY29uc3QgZWxlbUtleSA9IGBmZWF0dXJlLiR7aW5kZXh9YDtcbiAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0RmVhdHVyZUNvb3JkaW5hdGVzKGZlYXR1cmUpO1xuICAgICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxnIGtleT17ZWxlbUtleX0+XG4gICAgICAgICAge3RoaXMuX3JlbmRlckZpbGwoaW5kZXgsIGNvb3JkaW5hdGVzLCBzdHlsZSl9XG4gICAgICAgICAge3RoaXMuX3JlbmRlclNlZ21lbnRzKGluZGV4LCBjb29yZGluYXRlcywgc3R5bGUpfVxuICAgICAgICA8L2c+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8cGF0aFxuICAgICAgICBkYXRhLXR5cGU9e0VMRU1FTlRfVFlQRS5GRUFUVVJFfVxuICAgICAgICBkYXRhLWZlYXR1cmUtaW5kZXg9e2luZGV4fVxuICAgICAgICBrZXk9e2VsZW1LZXl9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgZD17cGF0aH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBfcmVuZGVyRmVhdHVyZSA9IChmZWF0dXJlOiBGZWF0dXJlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMoZmVhdHVyZSk7XG4gICAgaWYgKCFjb29yZGluYXRlcyB8fCAhY29vcmRpbmF0ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBwcm9wZXJ0aWVzOiB7IHJlbmRlclR5cGUgfSxcbiAgICAgIGdlb21ldHJ5OiB7IHR5cGUgfVxuICAgIH0gPSBmZWF0dXJlO1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLl9nZXRQYXRoSW5TY3JlZW5Db29yZHMoY29vcmRpbmF0ZXMsIHR5cGUpO1xuICAgIGlmICghcGF0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc3dpdGNoIChyZW5kZXJUeXBlKSB7XG4gICAgICBjYXNlIFJFTkRFUl9UWVBFLlBPSU5UOlxuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyUG9pbnQoZmVhdHVyZSwgaW5kZXgsIHBhdGgpO1xuICAgICAgY2FzZSBSRU5ERVJfVFlQRS5MSU5FX1NUUklORzpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclBhdGgoZmVhdHVyZSwgaW5kZXgsIHBhdGgpO1xuXG4gICAgICBjYXNlIFJFTkRFUl9UWVBFLlBPTFlHT046XG4gICAgICBjYXNlIFJFTkRFUl9UWVBFLlJFQ1RBTkdMRTpcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclBvbHlnb24oZmVhdHVyZSwgaW5kZXgsIHBhdGgpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgX3JlbmRlckNhbnZhcyA9ICgpID0+IHtcbiAgICBjb25zdCBmZWF0dXJlcyA9IHRoaXMuZ2V0RmVhdHVyZXMoKTtcbiAgICBjb25zdCBndWlkZXMgPSB0aGlzLl9tb2RlSGFuZGxlciAmJiB0aGlzLl9tb2RlSGFuZGxlci5nZXRHdWlkZXModGhpcy5nZXRNb2RlUHJvcHMoKSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyBrZXk9XCJkcmF3LWNhbnZhc1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAge2ZlYXR1cmVzICYmXG4gICAgICAgICAgZmVhdHVyZXMubGVuZ3RoID4gMCAmJiA8ZyBrZXk9XCJmZWF0dXJlLWdyb3VwXCI+e2ZlYXR1cmVzLm1hcCh0aGlzLl9yZW5kZXJGZWF0dXJlKX08L2c+fVxuICAgICAgICB7Z3VpZGVzICYmIDxnIGtleT1cImZlYXR1cmUtZ3VpZGVzXCI+e3RoaXMuX3JlbmRlckd1aWRlcyhndWlkZXMpfTwvZz59XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9O1xuXG4gIF9yZW5kZXJFZGl0b3IgPSAoKSA9PiB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSAodGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0LnZpZXdwb3J0KSB8fCB7fTtcbiAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdmlld3BvcnQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImVkaXRvclwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIC4uLnN0eWxlXG4gICAgICAgIH19XG4gICAgICAgIHJlZj17XyA9PiB7XG4gICAgICAgICAgdGhpcy5fY29udGFpbmVyUmVmID0gXztcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3RoaXMuX3JlbmRlckNhbnZhcygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHN1cGVyLnJlbmRlcih0aGlzLl9yZW5kZXJFZGl0b3IoKSk7XG4gIH1cbn1cbiJdfQ==