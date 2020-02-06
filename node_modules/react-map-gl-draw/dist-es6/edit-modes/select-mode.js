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

var SelectMode =
/*#__PURE__*/
function (_BaseMode) {
  _inherits(SelectMode, _BaseMode);

  function SelectMode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectMode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleDragging", function (event, props) {
      var onEdit = props.onEdit; // nothing clicked

      var isDragging = event.isDragging,
          pointerDownPicks = event.pointerDownPicks,
          screenCoords = event.screenCoords;
      var lastPointerMoveEvent = props.lastPointerMoveEvent;
      var clickedObject = pointerDownPicks && pointerDownPicks[0] && pointerDownPicks[0].object;

      if (!clickedObject || !(0, _utils.isNumeric)(clickedObject.featureIndex)) {
        return;
      } // not dragging


      var updatedData = null;
      var editType = isDragging ? _constants.EDIT_TYPE.MOVE_POSITION : _constants.EDIT_TYPE.FINISH_MOVE_POSITION;

      switch (clickedObject.type) {
        case _constants.ELEMENT_TYPE.FEATURE:
        case _constants.ELEMENT_TYPE.FILL:
        case _constants.ELEMENT_TYPE.SEGMENT:
        case _constants.ELEMENT_TYPE.EDIT_HANDLE:
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getGuides", function (props) {
      var selectedFeature = _this.getSelectedFeature(props);

      var selectedFeatureIndex = props.selectedIndexes && props.selectedIndexes[0];

      if (!selectedFeature || selectedFeature.geometry.type === _constants.GEOJSON_TYPE.POINT) {
        return null;
      } // feature editHandles


      var editHandles = _this.getEditHandlesFromFeature(selectedFeature, selectedFeatureIndex) || [];
      return {
        editHandles: editHandles.length ? editHandles : null
      };
    });

    return _this;
  }

  _createClass(SelectMode, [{
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
  }]);

  return SelectMode;
}(_baseMode.default);

exports.default = SelectMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL3NlbGVjdC1tb2RlLmpzIl0sIm5hbWVzIjpbIlNlbGVjdE1vZGUiLCJldmVudCIsInByb3BzIiwib25FZGl0IiwiaXNEcmFnZ2luZyIsInBvaW50ZXJEb3duUGlja3MiLCJzY3JlZW5Db29yZHMiLCJsYXN0UG9pbnRlck1vdmVFdmVudCIsImNsaWNrZWRPYmplY3QiLCJvYmplY3QiLCJmZWF0dXJlSW5kZXgiLCJ1cGRhdGVkRGF0YSIsImVkaXRUeXBlIiwiRURJVF9UWVBFIiwiTU9WRV9QT1NJVElPTiIsIkZJTklTSF9NT1ZFX1BPU0lUSU9OIiwidHlwZSIsIkVMRU1FTlRfVFlQRSIsIkZFQVRVUkUiLCJGSUxMIiwiU0VHTUVOVCIsIkVESVRfSEFORExFIiwiZHgiLCJkeSIsIl91cGRhdGVGZWF0dXJlIiwiZWRpdENvbnRleHQiLCJzZWxlY3RlZEZlYXR1cmUiLCJnZXRTZWxlY3RlZEZlYXR1cmUiLCJfaGFuZGxlRHJhZ2dpbmciLCJvcHRpb25zIiwiZGF0YSIsInNlbGVjdGVkSW5kZXhlcyIsInZpZXdwb3J0IiwiZmVhdHVyZSIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJuZXdDb29yZGluYXRlcyIsIm1hcCIsIm1hcENvb3JkcyIsInBpeGVscyIsInByb2plY3QiLCJ1bnByb2plY3QiLCJmaWx0ZXIiLCJCb29sZWFuIiwiR0VPSlNPTl9UWVBFIiwiUE9MWUdPTiIsInJlcGxhY2VHZW9tZXRyeSIsImdldE9iamVjdCIsImVkaXRIYW5kbGVJbmRleCIsInNlbGVjdGVkRmVhdHVyZUluZGV4IiwiUE9JTlQiLCJlZGl0SGFuZGxlcyIsImdldEVkaXRIYW5kbGVzRnJvbUZlYXR1cmUiLCJsZW5ndGgiLCJwaWNrZWRPYmplY3QiLCJwaWNrcyIsIkJhc2VNb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7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LFlBQXZCLENBQXRCLEVBQTREO0FBQzFEO0FBQ0Q7O0FBRUQsY0FBUTRDLFlBQVksQ0FBQ3RDLElBQXJCO0FBQ0UsYUFBS0Msd0JBQWFDLE9BQWxCO0FBQ0EsYUFBS0Qsd0JBQWFJLFdBQWxCO0FBQ0UsZUFBS08sZUFBTCxDQUFxQjNCLEtBQXJCLEVBQTRCQyxLQUE1Qjs7QUFDQTs7QUFDRjtBQUxGO0FBT0Q7Ozs7RUFmcUNzRCxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgRmVhdHVyZUNvbGxlY3Rpb24sIFN0b3BEcmFnZ2luZ0V2ZW50LCBQb2ludGVyTW92ZUV2ZW50IH0gZnJvbSAnQG5lYnVsYS5nbC9lZGl0LW1vZGVzJztcbmltcG9ydCB0eXBlIHsgTW9kZVByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgeyBFRElUX1RZUEUsIEVMRU1FTlRfVFlQRSwgR0VPSlNPTl9UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBCYXNlTW9kZSBmcm9tICcuL2Jhc2UtbW9kZSc7XG5pbXBvcnQgeyBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMsIGlzTnVtZXJpYywgdXBkYXRlUmVjdGFuZ2xlUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0TW9kZSBleHRlbmRzIEJhc2VNb2RlIHtcbiAgaGFuZGxlU3RvcERyYWdnaW5nKGV2ZW50OiBTdG9wRHJhZ2dpbmdFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pIHtcbiAgICAvLyByZXBsYWNlIHBvaW50XG4gICAgY29uc3QgcGlja2VkT2JqZWN0ID0gZXZlbnQucGlja3MgJiYgZXZlbnQucGlja3NbMF0gJiYgZXZlbnQucGlja3NbMF0ub2JqZWN0O1xuICAgIGlmICghcGlja2VkT2JqZWN0IHx8ICFpc051bWVyaWMocGlja2VkT2JqZWN0LmZlYXR1cmVJbmRleCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHBpY2tlZE9iamVjdC50eXBlKSB7XG4gICAgICBjYXNlIEVMRU1FTlRfVFlQRS5GRUFUVVJFOlxuICAgICAgY2FzZSBFTEVNRU5UX1RZUEUuRURJVF9IQU5ETEU6XG4gICAgICAgIHRoaXMuX2hhbmRsZURyYWdnaW5nKGV2ZW50LCBwcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlRHJhZ2dpbmcgPSAoXG4gICAgZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQgfCBTdG9wRHJhZ2dpbmdFdmVudCxcbiAgICBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPlxuICApID0+IHtcbiAgICBjb25zdCB7IG9uRWRpdCB9ID0gcHJvcHM7XG4gICAgLy8gbm90aGluZyBjbGlja2VkXG4gICAgY29uc3QgeyBpc0RyYWdnaW5nLCBwb2ludGVyRG93blBpY2tzLCBzY3JlZW5Db29yZHMgfSA9IGV2ZW50O1xuICAgIGNvbnN0IHsgbGFzdFBvaW50ZXJNb3ZlRXZlbnQgfSA9IHByb3BzO1xuXG4gICAgY29uc3QgY2xpY2tlZE9iamVjdCA9IHBvaW50ZXJEb3duUGlja3MgJiYgcG9pbnRlckRvd25QaWNrc1swXSAmJiBwb2ludGVyRG93blBpY2tzWzBdLm9iamVjdDtcbiAgICBpZiAoIWNsaWNrZWRPYmplY3QgfHwgIWlzTnVtZXJpYyhjbGlja2VkT2JqZWN0LmZlYXR1cmVJbmRleCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBub3QgZHJhZ2dpbmdcbiAgICBsZXQgdXBkYXRlZERhdGEgPSBudWxsO1xuICAgIGNvbnN0IGVkaXRUeXBlID0gaXNEcmFnZ2luZyA/IEVESVRfVFlQRS5NT1ZFX1BPU0lUSU9OIDogRURJVF9UWVBFLkZJTklTSF9NT1ZFX1BPU0lUSU9OO1xuXG4gICAgc3dpdGNoIChjbGlja2VkT2JqZWN0LnR5cGUpIHtcbiAgICAgIGNhc2UgRUxFTUVOVF9UWVBFLkZFQVRVUkU6XG4gICAgICBjYXNlIEVMRU1FTlRfVFlQRS5GSUxMOlxuICAgICAgY2FzZSBFTEVNRU5UX1RZUEUuU0VHTUVOVDpcbiAgICAgIGNhc2UgRUxFTUVOVF9UWVBFLkVESVRfSEFORExFOlxuICAgICAgICAvLyBkcmFnZ2luZyBmZWF0dXJlXG4gICAgICAgIGNvbnN0IGR4ID0gc2NyZWVuQ29vcmRzWzBdIC0gbGFzdFBvaW50ZXJNb3ZlRXZlbnQuc2NyZWVuQ29vcmRzWzBdO1xuICAgICAgICBjb25zdCBkeSA9IHNjcmVlbkNvb3Jkc1sxXSAtIGxhc3RQb2ludGVyTW92ZUV2ZW50LnNjcmVlbkNvb3Jkc1sxXTtcbiAgICAgICAgdXBkYXRlZERhdGEgPSB0aGlzLl91cGRhdGVGZWF0dXJlKHByb3BzLCAnZmVhdHVyZScsIHsgZHgsIGR5IH0pO1xuICAgICAgICBvbkVkaXQoe1xuICAgICAgICAgIGVkaXRUeXBlLFxuICAgICAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgICAgIGVkaXRDb250ZXh0OiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlUG9pbnRlck1vdmUgPSAoZXZlbnQ6IFBvaW50ZXJNb3ZlRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSA9PiB7XG4gICAgLy8gbm8gc2VsZWN0ZWQgZmVhdHVyZVxuICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZSA9IHRoaXMuZ2V0U2VsZWN0ZWRGZWF0dXJlKHByb3BzKTtcbiAgICBpZiAoIXNlbGVjdGVkRmVhdHVyZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZXZlbnQuaXNEcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hhbmRsZURyYWdnaW5nKGV2ZW50LCBwcm9wcyk7XG4gIH07XG5cbiAgLy8gVE9ETyAtIHJlZmFjdG9yXG4gIF91cGRhdGVGZWF0dXJlID0gKHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+LCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IGFueSA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBzZWxlY3RlZEluZGV4ZXMsIHZpZXdwb3J0IH0gPSBwcm9wcztcblxuICAgIGNvbnN0IGZlYXR1cmVJbmRleCA9IHNlbGVjdGVkSW5kZXhlcyAmJiBzZWxlY3RlZEluZGV4ZXNbMF07XG4gICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuZ2V0U2VsZWN0ZWRGZWF0dXJlKHByb3BzLCBmZWF0dXJlSW5kZXgpO1xuXG4gICAgbGV0IGdlb21ldHJ5ID0gbnVsbDtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldEZlYXR1cmVDb29yZGluYXRlcyhmZWF0dXJlKTtcbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgbmV3Q29vcmRpbmF0ZXMgPSBbLi4uY29vcmRpbmF0ZXNdO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdmZWF0dXJlJzpcbiAgICAgICAgY29uc3QgeyBkeCwgZHkgfSA9IG9wdGlvbnM7XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzID0gbmV3Q29vcmRpbmF0ZXNcbiAgICAgICAgICAubWFwKG1hcENvb3JkcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBwaXhlbHMgPSB2aWV3cG9ydCAmJiB2aWV3cG9ydC5wcm9qZWN0KG1hcENvb3Jkcyk7XG4gICAgICAgICAgICBpZiAocGl4ZWxzKSB7XG4gICAgICAgICAgICAgIHBpeGVsc1swXSArPSBkeDtcbiAgICAgICAgICAgICAgcGl4ZWxzWzFdICs9IGR5O1xuICAgICAgICAgICAgICByZXR1cm4gdmlld3BvcnQgJiYgdmlld3BvcnQudW5wcm9qZWN0KHBpeGVscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICAgICAgZ2VvbWV0cnkgPSB7XG4gICAgICAgICAgdHlwZTogZmVhdHVyZS5nZW9tZXRyeS50eXBlLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOlxuICAgICAgICAgICAgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSBHRU9KU09OX1RZUEUuUE9MWUdPTiA/IFtuZXdDb29yZGluYXRlc10gOiBuZXdDb29yZGluYXRlc1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBkYXRhLnJlcGxhY2VHZW9tZXRyeShmZWF0dXJlSW5kZXgsIGdlb21ldHJ5KS5nZXRPYmplY3QoKTtcblxuICAgICAgY2FzZSAncmVjdGFuZ2xlJzpcbiAgICAgICAgLy8gbW92ZWQgZWRpdEhhbmRsZUluZGV4IGFuZCBkZXN0aW5hdGlvbiBtYXBDb29yZHNcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXMgPSB1cGRhdGVSZWN0YW5nbGVQb3NpdGlvbihcbiAgICAgICAgICBmZWF0dXJlLFxuICAgICAgICAgIG9wdGlvbnMuZWRpdEhhbmRsZUluZGV4LFxuICAgICAgICAgIG9wdGlvbnMubWFwQ29vcmRzXG4gICAgICAgICk7XG5cbiAgICAgICAgZ2VvbWV0cnkgPSB7XG4gICAgICAgICAgdHlwZTogR0VPSlNPTl9UWVBFLlBPTFlHT04sXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IG5ld0Nvb3JkaW5hdGVzXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGRhdGEucmVwbGFjZUdlb21ldHJ5KGZlYXR1cmVJbmRleCwgZ2VvbWV0cnkpLmdldE9iamVjdCgpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0YSAmJiBkYXRhLmdldE9iamVjdCgpO1xuICAgIH1cbiAgfTtcblxuICBnZXRHdWlkZXMgPSAocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcyk7XG4gICAgY29uc3Qgc2VsZWN0ZWRGZWF0dXJlSW5kZXggPSBwcm9wcy5zZWxlY3RlZEluZGV4ZXMgJiYgcHJvcHMuc2VsZWN0ZWRJbmRleGVzWzBdO1xuXG4gICAgaWYgKCFzZWxlY3RlZEZlYXR1cmUgfHwgc2VsZWN0ZWRGZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09IEdFT0pTT05fVFlQRS5QT0lOVCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gZmVhdHVyZSBlZGl0SGFuZGxlc1xuICAgIGNvbnN0IGVkaXRIYW5kbGVzID0gdGhpcy5nZXRFZGl0SGFuZGxlc0Zyb21GZWF0dXJlKHNlbGVjdGVkRmVhdHVyZSwgc2VsZWN0ZWRGZWF0dXJlSW5kZXgpIHx8IFtdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRIYW5kbGVzOiBlZGl0SGFuZGxlcy5sZW5ndGggPyBlZGl0SGFuZGxlcyA6IG51bGxcbiAgICB9O1xuICB9O1xufVxuIl19