"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../constants");

var _baseMode = _interopRequireDefault(require("./base-mode"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditingMode =
/*#__PURE__*/
function (_BaseMode) {
  _inherits(EditingMode, _BaseMode);

  function EditingMode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditingMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditingMode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (event, props) {
      var pickedObject = event.picks && event.picks[0] && event.picks[0].object;
      var selectedFeatureIndex = props.selectedIndexes && props.selectedIndexes[0];

      if (!pickedObject || pickedObject.featureIndex !== selectedFeatureIndex) {
        return;
      }

      var featureIndex = pickedObject.featureIndex,
          index = pickedObject.index;

      var feature = _this.getSelectedFeature(props, featureIndex);

      if (feature && (feature.geometry.type === _constants.RENDER_TYPE.POLYGON || feature.geometry.type === _constants.RENDER_TYPE.LINE_STRING) && pickedObject.type === _constants.ELEMENT_TYPE.SEGMENT) {
        var coordinates = (0, _utils.getFeatureCoordinates)(feature);

        if (!coordinates) {
          return;
        }

        var insertIndex = (index + 1) % coordinates.length;
        var positionIndexes = feature.geometry.type === _constants.RENDER_TYPE.POLYGON ? [0, insertIndex] : [insertIndex];

        var insertMapCoords = _this._getPointOnSegment(feature, pickedObject, event.mapCoords);

        var updatedData = props.data.addPosition(featureIndex, positionIndexes, insertMapCoords).getObject();
        props.onEdit({
          editType: _constants.EDIT_TYPE.ADD_POSITION,
          updatedData: updatedData,
          editContext: [{
            featureIndex: featureIndex,
            editHandleIndex: insertIndex,
            screenCoords: props.viewport && props.viewport.project(insertMapCoords),
            mapCoords: insertMapCoords
          }]
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragging", function (event, props) {
      var onEdit = props.onEdit;

      var selectedFeature = _this.getSelectedFeature(props); // nothing clicked


      var isDragging = event.isDragging,
          pointerDownPicks = event.pointerDownPicks,
          screenCoords = event.screenCoords;
      var lastPointerMoveEvent = props.lastPointerMoveEvent;
      var clickedObject = pointerDownPicks && pointerDownPicks[0] && pointerDownPicks[0].object;

      if (!clickedObject || !(0, _utils.isNumeric)(clickedObject.featureIndex)) {
        return;
      }

      var editHandleIndex = clickedObject.index; // not dragging

      var updatedData = null;
      var editType = isDragging ? _constants.EDIT_TYPE.MOVE_POSITION : _constants.EDIT_TYPE.FINISH_MOVE_POSITION;

      switch (clickedObject.type) {
        case _constants.ELEMENT_TYPE.FEATURE:
        case _constants.ELEMENT_TYPE.FILL:
        case _constants.ELEMENT_TYPE.SEGMENT:
          // dragging feature
          var dx = screenCoords[0] - lastPointerMoveEvent.screenCoords[0];
          var dy = screenCoords[1] - lastPointerMoveEvent.screenCoords[1];
          updatedData = _this._updateFeature(props, 'feature', {
            dx: dx,
            dy: dy
          });
          onEdit({
            editType: editType,
            updatedData: updatedData,
            editContext: null
          });
          break;

        case _constants.ELEMENT_TYPE.EDIT_HANDLE:
          // dragging editHandle
          // dragging rectangle or other shapes
          var updateType = selectedFeature.properties.renderType === _constants.RENDER_TYPE.RECTANGLE ? 'rectangle' : 'editHandle';
          updatedData = _this._updateFeature(props, updateType, {
            editHandleIndex: editHandleIndex,
            mapCoords: event.mapCoords
          });
          onEdit({
            editType: editType,
            updatedData: updatedData,
            editContext: null
          });
          break;

        default:
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePointerMove", function (event, props) {
      // no selected feature
      var selectedFeature = _this.getSelectedFeature(props);

      if (!selectedFeature) {
        return;
      }

      if (!event.isDragging) {
        return;
      }

      _this._handleDragging(event, props);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_updateFeature", function (props, type) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var data = props.data,
          selectedIndexes = props.selectedIndexes,
          viewport = props.viewport;
      var featureIndex = selectedIndexes && selectedIndexes[0];

      var feature = _this.getSelectedFeature(props, featureIndex);

      var geometry = null;
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates) {
        return null;
      }

      var newCoordinates = _toConsumableArray(coordinates);

      switch (type) {
        case 'editHandle':
          var positionIndexes = feature.geometry.type === _constants.GEOJSON_TYPE.POLYGON ? [0, options.editHandleIndex] : [options.editHandleIndex];
          return data.replacePosition(featureIndex, positionIndexes, options.mapCoords).getObject();

        case 'feature':
          var dx = options.dx,
              dy = options.dy;
          newCoordinates = newCoordinates.map(function (mapCoords) {
            var pixels = viewport && viewport.project(mapCoords);

            if (pixels) {
              pixels[0] += dx;
              pixels[1] += dy;
              return viewport && viewport.unproject(pixels);
            }

            return null;
          }).filter(Boolean);
          geometry = {
            type: feature.geometry.type,
            coordinates: feature.geometry.type === _constants.GEOJSON_TYPE.POLYGON ? [newCoordinates] : newCoordinates
          };
          return data.replaceGeometry(featureIndex, geometry).getObject();

        case 'rectangle':
          // moved editHandleIndex and destination mapCoords
          newCoordinates = (0, _utils.updateRectanglePosition)(feature, options.editHandleIndex, options.mapCoords);
          geometry = {
            type: _constants.GEOJSON_TYPE.POLYGON,
            coordinates: newCoordinates
          };
          return data.replaceGeometry(featureIndex, geometry).getObject();

        default:
          return data && data.getObject();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_getCursorEditHandle", function (event, feature) {
      var isDragging = event.isDragging,
          picks = event.picks; // if not pick segment

      var pickedObject = picks && picks[0] && picks[0].object;

      if (!pickedObject || !(0, _utils.isNumeric)(pickedObject.featureIndex) || pickedObject.type !== _constants.ELEMENT_TYPE.SEGMENT) {
        return null;
      } // if dragging or feature is neither polygon nor line string


      if (isDragging || feature.properties.renderType !== _constants.GEOJSON_TYPE.POLYGON && feature.properties.renderType !== _constants.GEOJSON_TYPE.LINE_STRING) {
        return null;
      }

      var insertMapCoords = _this._getPointOnSegment(feature, pickedObject, event.mapCoords);

      if (!insertMapCoords) {
        return null;
      }

      return {
        type: 'Feature',
        properties: {
          guideType: _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE,
          renderType: feature.properties.renderType,
          positionIndexes: [null]
        },
        geometry: {
          type: _constants.GEOJSON_TYPE.POINT,
          coordinates: [insertMapCoords]
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getGuides", function (props) {
      var selectedFeature = _this.getSelectedFeature(props);

      var selectedFeatureIndex = props.selectedIndexes && props.selectedIndexes[0];

      if (!selectedFeature || selectedFeature.geometry.type === _constants.GEOJSON_TYPE.POINT) {
        return null;
      }

      var event = props.lastPointerMoveEvent; // feature editHandles

      var editHandles = _this.getEditHandlesFromFeature(selectedFeature, selectedFeatureIndex) || []; // cursor editHandle

      var cursorEditHandle = _this._getCursorEditHandle(event, selectedFeature);

      if (cursorEditHandle) {
        editHandles.push(_this._getCursorEditHandle(event, selectedFeature));
      }

      return {
        editHandles: editHandles.length ? editHandles : null
      };
    });

    return _this;
  }

  _createClass(EditingMode, [{
    key: "handleStopDragging",
    value: function handleStopDragging(event, props) {
      // replace point
      var pickedObject = event.picks && event.picks[0] && event.picks[0].object;

      if (!pickedObject || !(0, _utils.isNumeric)(pickedObject.featureIndex)) {
        return;
      }

      switch (pickedObject.type) {
        case _constants.ELEMENT_TYPE.FEATURE:
        case _constants.ELEMENT_TYPE.EDIT_HANDLE:
          this._handleDragging(event, props);

          break;

        default:
      }
    }
  }, {
    key: "_getPointOnSegment",
    value: function _getPointOnSegment(feature, pickedObject, pickedMapCoords) {
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates) {
        return null;
      }

      var srcVertexIndex = pickedObject.index;
      var targetVertexIndex = pickedObject.index + 1;
      return (0, _utils.findClosestPointOnLineSegment)(coordinates[srcVertexIndex], coordinates[targetVertexIndex], pickedMapCoords);
    }
  }]);

  return EditingMode;
}(_baseMode.default);

exports.default = EditingMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2VkaXRpbmctbW9kZS5qcyJdLCJuYW1lcyI6WyJFZGl0aW5nTW9kZSIsImV2ZW50IiwicHJvcHMiLCJwaWNrZWRPYmplY3QiLCJwaWNrcyIsIm9iamVjdCIsInNlbGVjdGVkRmVhdHVyZUluZGV4Iiwic2VsZWN0ZWRJbmRleGVzIiwiZmVhdHVyZUluZGV4IiwiaW5kZXgiLCJmZWF0dXJlIiwiZ2V0U2VsZWN0ZWRGZWF0dXJlIiwiZ2VvbWV0cnkiLCJ0eXBlIiwiUkVOREVSX1RZUEUiLCJQT0xZR09OIiwiTElORV9TVFJJTkciLCJFTEVNRU5UX1RZUEUiLCJTRUdNRU5UIiwiY29vcmRpbmF0ZXMiLCJpbnNlcnRJbmRleCIsImxlbmd0aCIsInBvc2l0aW9uSW5kZXhlcyIsImluc2VydE1hcENvb3JkcyIsIl9nZXRQb2ludE9uU2VnbWVudCIsIm1hcENvb3JkcyIsInVwZGF0ZWREYXRhIiwiZGF0YSIsImFkZFBvc2l0aW9uIiwiZ2V0T2JqZWN0Iiwib25FZGl0IiwiZWRpdFR5cGUiLCJFRElUX1RZUEUiLCJBRERfUE9TSVRJT04iLCJlZGl0Q29udGV4dCIsImVkaXRIYW5kbGVJbmRleCIsInNjcmVlbkNvb3JkcyIsInZpZXdwb3J0IiwicHJvamVjdCIsInNlbGVjdGVkRmVhdHVyZSIsImlzRHJhZ2dpbmciLCJwb2ludGVyRG93blBpY2tzIiwibGFzdFBvaW50ZXJNb3ZlRXZlbnQiLCJjbGlja2VkT2JqZWN0IiwiTU9WRV9QT1NJVElPTiIsIkZJTklTSF9NT1ZFX1BPU0lUSU9OIiwiRkVBVFVSRSIsIkZJTEwiLCJkeCIsImR5IiwiX3VwZGF0ZUZlYXR1cmUiLCJFRElUX0hBTkRMRSIsInVwZGF0ZVR5cGUiLCJwcm9wZXJ0aWVzIiwicmVuZGVyVHlwZSIsIlJFQ1RBTkdMRSIsIl9oYW5kbGVEcmFnZ2luZyIsIm9wdGlvbnMiLCJuZXdDb29yZGluYXRlcyIsIkdFT0pTT05fVFlQRSIsInJlcGxhY2VQb3NpdGlvbiIsIm1hcCIsInBpeGVscyIsInVucHJvamVjdCIsImZpbHRlciIsIkJvb2xlYW4iLCJyZXBsYWNlR2VvbWV0cnkiLCJndWlkZVR5cGUiLCJHVUlERV9UWVBFIiwiQ1VSU09SX0VESVRfSEFORExFIiwiUE9JTlQiLCJlZGl0SGFuZGxlcyIsImdldEVkaXRIYW5kbGVzRnJvbUZlYXR1cmUiLCJjdXJzb3JFZGl0SGFuZGxlIiwiX2dldEN1cnNvckVkaXRIYW5kbGUiLCJwdXNoIiwicGlja2VkTWFwQ29vcmRzIiwic3JjVmVydGV4SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsIkJhc2VNb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBWUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT3FCQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MEZBQ0wsVUFBQ0MsS0FBRCxFQUFvQkMsS0FBcEIsRUFBNEQ7QUFDeEUsVUFBTUMsWUFBWSxHQUFHRixLQUFLLENBQUNHLEtBQU4sSUFBZUgsS0FBSyxDQUFDRyxLQUFOLENBQVksQ0FBWixDQUFmLElBQWlDSCxLQUFLLENBQUNHLEtBQU4sQ0FBWSxDQUFaLEVBQWVDLE1BQXJFO0FBQ0EsVUFBTUMsb0JBQW9CLEdBQUdKLEtBQUssQ0FBQ0ssZUFBTixJQUF5QkwsS0FBSyxDQUFDSyxlQUFOLENBQXNCLENBQXRCLENBQXREOztBQUNBLFVBQUksQ0FBQ0osWUFBRCxJQUFpQkEsWUFBWSxDQUFDSyxZQUFiLEtBQThCRixvQkFBbkQsRUFBeUU7QUFDdkU7QUFDRDs7QUFMdUUsVUFPaEVFLFlBUGdFLEdBT3hDTCxZQVB3QyxDQU9oRUssWUFQZ0U7QUFBQSxVQU9sREMsS0FQa0QsR0FPeENOLFlBUHdDLENBT2xETSxLQVBrRDs7QUFReEUsVUFBTUMsT0FBTyxHQUFHLE1BQUtDLGtCQUFMLENBQXdCVCxLQUF4QixFQUErQk0sWUFBL0IsQ0FBaEI7O0FBQ0EsVUFDRUUsT0FBTyxLQUNOQSxPQUFPLENBQUNFLFFBQVIsQ0FBaUJDLElBQWpCLEtBQTBCQyx1QkFBWUMs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Q0F4T2tCdEUsSyxFQUEwQkMsSyxFQUFxQztBQUNoRjtBQUNBLFVBQU1DLFlBQVksR0FBR0YsS0FBSyxDQUFDRyxLQUFOLElBQWVILEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosQ0FBZixJQUFpQ0gsS0FBSyxDQUFDRyxLQUFOLENBQVksQ0FBWixFQUFlQyxNQUFyRTs7QUFDQSxVQUFJLENBQUNGLFlBQUQsSUFBaUIsQ0FBQyxzQkFBVUEsWUFBWSxDQUFDSyxZQUF2QixDQUF0QixFQUE0RDtBQUMxRDtBQUNEOztBQUVELGNBQVFMLFlBQVksQ0FBQ1UsSUFBckI7QUFDRSxhQUFLSSx3QkFBYTZCLE9BQWxCO0FBQ0EsYUFBSzdCLHdCQUFha0MsV0FBbEI7QUFDRSxlQUFLSyxlQUFMLENBQXFCdkQsS0FBckIsRUFBNEJDLEtBQTVCOztBQUNBOztBQUNGO0FBTEY7QUFPRDs7O3VDQTZJa0JRLE8sRUFBa0JQLFksRUFBbUJ5RSxlLEVBQTJCO0FBQ2pGLFVBQU16RCxXQUFXLEdBQUcsa0NBQXNCVCxPQUF0QixDQUFwQjs7QUFDQSxVQUFJLENBQUNTLFdBQUwsRUFBa0I7QUFDaEIsZUFBTyxJQUFQO0FBQ0Q7O0FBQ0QsVUFBTTBELGNBQWMsR0FBRzFFLFlBQVksQ0FBQ00sS0FBcEM7QUFDQSxVQUFNcUUsaUJBQWlCLEdBQUczRSxZQUFZLENBQUNNLEtBQWIsR0FBcUIsQ0FBL0M7QUFDQSxhQUFPLDBDQUNMVSxXQUFXLENBQUMwRCxjQUFELENBRE4sRUFFTDFELFdBQVcsQ0FBQzJELGlCQUFELENBRk4sRUFHTEYsZUFISyxDQUFQO0FBS0Q7Ozs7RUFuTnNDRyxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHtcbiAgRmVhdHVyZSxcbiAgRmVhdHVyZUNvbGxlY3Rpb24sXG4gIENsaWNrRXZlbnQsXG4gIFN0b3BEcmFnZ2luZ0V2ZW50LFxuICBQb2ludGVyTW92ZUV2ZW50LFxuICBQb3NpdGlvblxufSBmcm9tICdAbmVidWxhLmdsL2VkaXQtbW9kZXMnO1xuaW1wb3J0IHR5cGUgeyBNb2RlUHJvcHMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCB7IFJFTkRFUl9UWVBFLCBFRElUX1RZUEUsIEVMRU1FTlRfVFlQRSwgR0VPSlNPTl9UWVBFLCBHVUlERV9UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBCYXNlTW9kZSBmcm9tICcuL2Jhc2UtbW9kZSc7XG5pbXBvcnQge1xuICBmaW5kQ2xvc2VzdFBvaW50T25MaW5lU2VnbWVudCxcbiAgZ2V0RmVhdHVyZUNvb3JkaW5hdGVzLFxuICBpc051bWVyaWMsXG4gIHVwZGF0ZVJlY3RhbmdsZVBvc2l0aW9uXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0aW5nTW9kZSBleHRlbmRzIEJhc2VNb2RlIHtcbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQ6IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSA9PiB7XG4gICAgY29uc3QgcGlja2VkT2JqZWN0ID0gZXZlbnQucGlja3MgJiYgZXZlbnQucGlja3NbMF0gJiYgZXZlbnQucGlja3NbMF0ub2JqZWN0O1xuICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZUluZGV4ID0gcHJvcHMuc2VsZWN0ZWRJbmRleGVzICYmIHByb3BzLnNlbGVjdGVkSW5kZXhlc1swXTtcbiAgICBpZiAoIXBpY2tlZE9iamVjdCB8fCBwaWNrZWRPYmplY3QuZmVhdHVyZUluZGV4ICE9PSBzZWxlY3RlZEZlYXR1cmVJbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZmVhdHVyZUluZGV4LCBpbmRleCB9ID0gcGlja2VkT2JqZWN0O1xuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcywgZmVhdHVyZUluZGV4KTtcbiAgICBpZiAoXG4gICAgICBmZWF0dXJlICYmXG4gICAgICAoZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSBSRU5ERVJfVFlQRS5QT0xZR09OIHx8XG4gICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gUkVOREVSX1RZUEUuTElORV9TVFJJTkcpICYmXG4gICAgICBwaWNrZWRPYmplY3QudHlwZSA9PT0gRUxFTUVOVF9UWVBFLlNFR01FTlRcbiAgICApIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0RmVhdHVyZUNvb3JkaW5hdGVzKGZlYXR1cmUpO1xuICAgICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBpbnNlcnRJbmRleCA9IChpbmRleCArIDEpICUgY29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgICAgY29uc3QgcG9zaXRpb25JbmRleGVzID1cbiAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSBSRU5ERVJfVFlQRS5QT0xZR09OID8gWzAsIGluc2VydEluZGV4XSA6IFtpbnNlcnRJbmRleF07XG4gICAgICBjb25zdCBpbnNlcnRNYXBDb29yZHMgPSB0aGlzLl9nZXRQb2ludE9uU2VnbWVudChmZWF0dXJlLCBwaWNrZWRPYmplY3QsIGV2ZW50Lm1hcENvb3Jkcyk7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWREYXRhID0gcHJvcHMuZGF0YVxuICAgICAgICAuYWRkUG9zaXRpb24oZmVhdHVyZUluZGV4LCBwb3NpdGlvbkluZGV4ZXMsIGluc2VydE1hcENvb3JkcylcbiAgICAgICAgLmdldE9iamVjdCgpO1xuXG4gICAgICBwcm9wcy5vbkVkaXQoe1xuICAgICAgICBlZGl0VHlwZTogRURJVF9UWVBFLkFERF9QT1NJVElPTixcbiAgICAgICAgdXBkYXRlZERhdGEsXG4gICAgICAgIGVkaXRDb250ZXh0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmVhdHVyZUluZGV4LFxuICAgICAgICAgICAgZWRpdEhhbmRsZUluZGV4OiBpbnNlcnRJbmRleCxcbiAgICAgICAgICAgIHNjcmVlbkNvb3JkczogcHJvcHMudmlld3BvcnQgJiYgcHJvcHMudmlld3BvcnQucHJvamVjdChpbnNlcnRNYXBDb29yZHMpLFxuICAgICAgICAgICAgbWFwQ29vcmRzOiBpbnNlcnRNYXBDb29yZHNcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTdG9wRHJhZ2dpbmcoZXZlbnQ6IFN0b3BEcmFnZ2luZ0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge1xuICAgIC8vIHJlcGxhY2UgcG9pbnRcbiAgICBjb25zdCBwaWNrZWRPYmplY3QgPSBldmVudC5waWNrcyAmJiBldmVudC5waWNrc1swXSAmJiBldmVudC5waWNrc1swXS5vYmplY3Q7XG4gICAgaWYgKCFwaWNrZWRPYmplY3QgfHwgIWlzTnVtZXJpYyhwaWNrZWRPYmplY3QuZmVhdHVyZUluZGV4KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAocGlja2VkT2JqZWN0LnR5cGUpIHtcbiAgICAgIGNhc2UgRUxFTUVOVF9UWVBFLkZFQVRVUkU6XG4gICAgICBjYXNlIEVMRU1FTlRfVFlQRS5FRElUX0hBTkRMRTpcbiAgICAgICAgdGhpcy5faGFuZGxlRHJhZ2dpbmcoZXZlbnQsIHByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVEcmFnZ2luZyA9IChcbiAgICBldmVudDogUG9pbnRlck1vdmVFdmVudCB8IFN0b3BEcmFnZ2luZ0V2ZW50LFxuICAgIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+XG4gICkgPT4ge1xuICAgIGNvbnN0IHsgb25FZGl0IH0gPSBwcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcyk7XG4gICAgLy8gbm90aGluZyBjbGlja2VkXG4gICAgY29uc3QgeyBpc0RyYWdnaW5nLCBwb2ludGVyRG93blBpY2tzLCBzY3JlZW5Db29yZHMgfSA9IGV2ZW50O1xuICAgIGNvbnN0IHsgbGFzdFBvaW50ZXJNb3ZlRXZlbnQgfSA9IHByb3BzO1xuXG4gICAgY29uc3QgY2xpY2tlZE9iamVjdCA9IHBvaW50ZXJEb3duUGlja3MgJiYgcG9pbnRlckRvd25QaWNrc1swXSAmJiBwb2ludGVyRG93blBpY2tzWzBdLm9iamVjdDtcbiAgICBpZiAoIWNsaWNrZWRPYmplY3QgfHwgIWlzTnVtZXJpYyhjbGlja2VkT2JqZWN0LmZlYXR1cmVJbmRleCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlZGl0SGFuZGxlSW5kZXggPSBjbGlja2VkT2JqZWN0LmluZGV4O1xuXG4gICAgLy8gbm90IGRyYWdnaW5nXG4gICAgbGV0IHVwZGF0ZWREYXRhID0gbnVsbDtcbiAgICBjb25zdCBlZGl0VHlwZSA9IGlzRHJhZ2dpbmcgPyBFRElUX1RZUEUuTU9WRV9QT1NJVElPTiA6IEVESVRfVFlQRS5GSU5JU0hfTU9WRV9QT1NJVElPTjtcblxuICAgIHN3aXRjaCAoY2xpY2tlZE9iamVjdC50eXBlKSB7XG4gICAgICBjYXNlIEVMRU1FTlRfVFlQRS5GRUFUVVJFOlxuICAgICAgY2FzZSBFTEVNRU5UX1RZUEUuRklMTDpcbiAgICAgIGNhc2UgRUxFTUVOVF9UWVBFLlNFR01FTlQ6XG4gICAgICAgIC8vIGRyYWdnaW5nIGZlYXR1cmVcbiAgICAgICAgY29uc3QgZHggPSBzY3JlZW5Db29yZHNbMF0gLSBsYXN0UG9pbnRlck1vdmVFdmVudC5zY3JlZW5Db29yZHNbMF07XG4gICAgICAgIGNvbnN0IGR5ID0gc2NyZWVuQ29vcmRzWzFdIC0gbGFzdFBvaW50ZXJNb3ZlRXZlbnQuc2NyZWVuQ29vcmRzWzFdO1xuICAgICAgICB1cGRhdGVkRGF0YSA9IHRoaXMuX3VwZGF0ZUZlYXR1cmUocHJvcHMsICdmZWF0dXJlJywgeyBkeCwgZHkgfSk7XG4gICAgICAgIG9uRWRpdCh7XG4gICAgICAgICAgZWRpdFR5cGUsXG4gICAgICAgICAgdXBkYXRlZERhdGEsXG4gICAgICAgICAgZWRpdENvbnRleHQ6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVMRU1FTlRfVFlQRS5FRElUX0hBTkRMRTpcbiAgICAgICAgLy8gZHJhZ2dpbmcgZWRpdEhhbmRsZVxuICAgICAgICAvLyBkcmFnZ2luZyByZWN0YW5nbGUgb3Igb3RoZXIgc2hhcGVzXG4gICAgICAgIGNvbnN0IHVwZGF0ZVR5cGUgPVxuICAgICAgICAgIHNlbGVjdGVkRmVhdHVyZS5wcm9wZXJ0aWVzLnJlbmRlclR5cGUgPT09IFJFTkRFUl9UWVBFLlJFQ1RBTkdMRVxuICAgICAgICAgICAgPyAncmVjdGFuZ2xlJ1xuICAgICAgICAgICAgOiAnZWRpdEhhbmRsZSc7XG4gICAgICAgIHVwZGF0ZWREYXRhID0gdGhpcy5fdXBkYXRlRmVhdHVyZShwcm9wcywgdXBkYXRlVHlwZSwge1xuICAgICAgICAgIGVkaXRIYW5kbGVJbmRleCxcbiAgICAgICAgICBtYXBDb29yZHM6IGV2ZW50Lm1hcENvb3Jkc1xuICAgICAgICB9KTtcblxuICAgICAgICBvbkVkaXQoe1xuICAgICAgICAgIGVkaXRUeXBlLFxuICAgICAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgICAgIGVkaXRDb250ZXh0OiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlUG9pbnRlck1vdmUgPSAoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSA9PiB7XG4gICAgLy8gbm8gc2VsZWN0ZWQgZmVhdHVyZVxuICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZSA9IHRoaXMuZ2V0U2VsZWN0ZWRGZWF0dXJlKHByb3BzKTtcbiAgICBpZiAoIXNlbGVjdGVkRmVhdHVyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZXZlbnQuaXNEcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hhbmRsZURyYWdnaW5nKGV2ZW50LCBwcm9wcyk7XG4gIH07XG5cbiAgLy8gVE9ETyAtIHJlZmFjdG9yXG4gIF91cGRhdGVGZWF0dXJlID0gKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+LCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBzZWxlY3RlZEluZGV4ZXMsIHZpZXdwb3J0IH0gPSBwcm9wcztcblxuICAgIGNvbnN0IGZlYXR1cmVJbmRleCA9IHNlbGVjdGVkSW5kZXhlcyAmJiBzZWxlY3RlZEluZGV4ZXNbMF07XG4gICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuZ2V0U2VsZWN0ZWRGZWF0dXJlKHByb3BzLCBmZWF0dXJlSW5kZXgpO1xuXG4gICAgbGV0IGdlb21ldHJ5ID0gbnVsbDtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldEZlYXR1cmVDb29yZGluYXRlcyhmZWF0dXJlKTtcbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgbmV3Q29vcmRpbmF0ZXMgPSBbLi4uY29vcmRpbmF0ZXNdO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdlZGl0SGFuZGxlJzpcbiAgICAgICAgY29uc3QgcG9zaXRpb25JbmRleGVzID1cbiAgICAgICAgICBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09IEdFT0pTT05fVFlQRS5QT0xZR09OXG4gICAgICAgICAgICA/IFswLCBvcHRpb25zLmVkaXRIYW5kbGVJbmRleF1cbiAgICAgICAgICAgIDogW29wdGlvbnMuZWRpdEhhbmRsZUluZGV4XTtcblxuICAgICAgICByZXR1cm4gZGF0YS5yZXBsYWNlUG9zaXRpb24oZmVhdHVyZUluZGV4LCBwb3NpdGlvbkluZGV4ZXMsIG9wdGlvbnMubWFwQ29vcmRzKS5nZXRPYmplY3QoKTtcblxuICAgICAgY2FzZSAnZmVhdHVyZSc6XG4gICAgICAgIGNvbnN0IHsgZHgsIGR5IH0gPSBvcHRpb25zO1xuICAgICAgICBuZXdDb29yZGluYXRlcyA9IG5ld0Nvb3JkaW5hdGVzXG4gICAgICAgICAgLm1hcChtYXBDb29yZHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGl4ZWxzID0gdmlld3BvcnQgJiYgdmlld3BvcnQucHJvamVjdChtYXBDb29yZHMpO1xuICAgICAgICAgICAgaWYgKHBpeGVscykge1xuICAgICAgICAgICAgICBwaXhlbHNbMF0gKz0gZHg7XG4gICAgICAgICAgICAgIHBpeGVsc1sxXSArPSBkeTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZpZXdwb3J0ICYmIHZpZXdwb3J0LnVucHJvamVjdChwaXhlbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICAgIGdlb21ldHJ5ID0ge1xuICAgICAgICAgIHR5cGU6IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSxcbiAgICAgICAgICBjb29yZGluYXRlczpcbiAgICAgICAgICAgIGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gR0VPSlNPTl9UWVBFLlBPTFlHT04gPyBbbmV3Q29vcmRpbmF0ZXNdIDogbmV3Q29vcmRpbmF0ZXNcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZGF0YS5yZXBsYWNlR2VvbWV0cnkoZmVhdHVyZUluZGV4LCBnZW9tZXRyeSkuZ2V0T2JqZWN0KCk7XG5cbiAgICAgIGNhc2UgJ3JlY3RhbmdsZSc6XG4gICAgICAgIC8vIG1vdmVkIGVkaXRIYW5kbGVJbmRleCBhbmQgZGVzdGluYXRpb24gbWFwQ29vcmRzXG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzID0gdXBkYXRlUmVjdGFuZ2xlUG9zaXRpb24oXG4gICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICBvcHRpb25zLmVkaXRIYW5kbGVJbmRleCxcbiAgICAgICAgICBvcHRpb25zLm1hcENvb3Jkc1xuICAgICAgICApO1xuXG4gICAgICAgIGdlb21ldHJ5ID0ge1xuICAgICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5QT0xZR09OLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBuZXdDb29yZGluYXRlc1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBkYXRhLnJlcGxhY2VHZW9tZXRyeShmZWF0dXJlSW5kZXgsIGdlb21ldHJ5KS5nZXRPYmplY3QoKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGRhdGEgJiYgZGF0YS5nZXRPYmplY3QoKTtcbiAgICB9XG4gIH07XG5cbiAgX2dldFBvaW50T25TZWdtZW50KGZlYXR1cmU6IEZlYXR1cmUsIHBpY2tlZE9iamVjdDogYW55LCBwaWNrZWRNYXBDb29yZHM6IFBvc2l0aW9uKSB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMoZmVhdHVyZSk7XG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHNyY1ZlcnRleEluZGV4ID0gcGlja2VkT2JqZWN0LmluZGV4O1xuICAgIGNvbnN0IHRhcmdldFZlcnRleEluZGV4ID0gcGlja2VkT2JqZWN0LmluZGV4ICsgMTtcbiAgICByZXR1cm4gZmluZENsb3Nlc3RQb2ludE9uTGluZVNlZ21lbnQoXG4gICAgICBjb29yZGluYXRlc1tzcmNWZXJ0ZXhJbmRleF0sXG4gICAgICBjb29yZGluYXRlc1t0YXJnZXRWZXJ0ZXhJbmRleF0sXG4gICAgICBwaWNrZWRNYXBDb29yZHNcbiAgICApO1xuICB9XG5cbiAgX2dldEN1cnNvckVkaXRIYW5kbGUgPSAoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIGZlYXR1cmU6IEZlYXR1cmUpID0+IHtcbiAgICBjb25zdCB7IGlzRHJhZ2dpbmcsIHBpY2tzIH0gPSBldmVudDtcbiAgICAvLyBpZiBub3QgcGljayBzZWdtZW50XG4gICAgY29uc3QgcGlja2VkT2JqZWN0ID0gcGlja3MgJiYgcGlja3NbMF0gJiYgcGlja3NbMF0ub2JqZWN0O1xuICAgIGlmIChcbiAgICAgICFwaWNrZWRPYmplY3QgfHxcbiAgICAgICFpc051bWVyaWMocGlja2VkT2JqZWN0LmZlYXR1cmVJbmRleCkgfHxcbiAgICAgIHBpY2tlZE9iamVjdC50eXBlICE9PSBFTEVNRU5UX1RZUEUuU0VHTUVOVFxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gaWYgZHJhZ2dpbmcgb3IgZmVhdHVyZSBpcyBuZWl0aGVyIHBvbHlnb24gbm9yIGxpbmUgc3RyaW5nXG4gICAgaWYgKFxuICAgICAgaXNEcmFnZ2luZyB8fFxuICAgICAgKGZlYXR1cmUucHJvcGVydGllcy5yZW5kZXJUeXBlICE9PSBHRU9KU09OX1RZUEUuUE9MWUdPTiAmJlxuICAgICAgICBmZWF0dXJlLnByb3BlcnRpZXMucmVuZGVyVHlwZSAhPT0gR0VPSlNPTl9UWVBFLkxJTkVfU1RSSU5HKVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zZXJ0TWFwQ29vcmRzID0gdGhpcy5fZ2V0UG9pbnRPblNlZ21lbnQoZmVhdHVyZSwgcGlja2VkT2JqZWN0LCBldmVudC5tYXBDb29yZHMpO1xuXG4gICAgaWYgKCFpbnNlcnRNYXBDb29yZHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGd1aWRlVHlwZTogR1VJREVfVFlQRS5DVVJTT1JfRURJVF9IQU5ETEUsXG4gICAgICAgIHJlbmRlclR5cGU6IGZlYXR1cmUucHJvcGVydGllcy5yZW5kZXJUeXBlLFxuICAgICAgICBwb3NpdGlvbkluZGV4ZXM6IFtudWxsXVxuICAgICAgfSxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5QT0lOVCxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtpbnNlcnRNYXBDb29yZHNdXG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBnZXRHdWlkZXMgPSAocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcyk7XG4gICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlSW5kZXggPSBwcm9wcy5zZWxlY3RlZEluZGV4ZXMgJiYgcHJvcHMuc2VsZWN0ZWRJbmRleGVzWzBdO1xuXG4gICAgaWYgKCFzZWxlY3RlZEZlYXR1cmUgfHwgc2VsZWN0ZWRGZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09IEdFT0pTT05fVFlQRS5QT0lOVCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnQgPSBwcm9wcy5sYXN0UG9pbnRlck1vdmVFdmVudDtcblxuICAgIC8vIGZlYXR1cmUgZWRpdEhhbmRsZXNcbiAgICBjb25zdCBlZGl0SGFuZGxlcyA9IHRoaXMuZ2V0RWRpdEhhbmRsZXNGcm9tRmVhdHVyZShzZWxlY3RlZEZlYXR1cmUsIHNlbGVjdGVkRmVhdHVyZUluZGV4KSB8fCBbXTtcblxuICAgIC8vIGN1cnNvciBlZGl0SGFuZGxlXG4gICAgY29uc3QgY3Vyc29yRWRpdEhhbmRsZSA9IHRoaXMuX2dldEN1cnNvckVkaXRIYW5kbGUoZXZlbnQsIHNlbGVjdGVkRmVhdHVyZSk7XG4gICAgaWYgKGN1cnNvckVkaXRIYW5kbGUpIHtcbiAgICAgIGVkaXRIYW5kbGVzLnB1c2godGhpcy5fZ2V0Q3Vyc29yRWRpdEhhbmRsZShldmVudCwgc2VsZWN0ZWRGZWF0dXJlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRIYW5kbGVzOiBlZGl0SGFuZGxlcy5sZW5ndGggPyBlZGl0SGFuZGxlcyA6IG51bGxcbiAgICB9O1xuICB9O1xufVxuIl19