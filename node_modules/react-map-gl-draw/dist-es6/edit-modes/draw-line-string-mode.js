"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v1"));

var _constants = require("../constants");

var _baseMode = _interopRequireDefault(require("./base-mode"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawLineStringMode =
/*#__PURE__*/
function (_BaseMode) {
  _inherits(DrawLineStringMode, _BaseMode);

  function DrawLineStringMode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DrawLineStringMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DrawLineStringMode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (event, props) {
      var data = props.data,
          selectedIndexes = props.selectedIndexes;

      var selectedFeature = _this.getSelectedFeature(props);

      var tentativeFeature = _this.getTentativeFeature(); // add position to a selectedFeature


      if (selectedFeature) {
        var selectedFeatureIndex = selectedIndexes[0];
        var positionIndexes = [selectedFeature.geometry.coordinates.length];
        var updatedData = data.addPosition(selectedFeatureIndex, positionIndexes, event.mapCoords).getObject();
        props.onEdit({
          editType: _constants.EDIT_TYPE.ADD_POSITION,
          updatedData: updatedData,
          editContext: [{
            featureIndex: selectedFeatureIndex,
            editHandleIndex: positionIndexes[0],
            screenCoords: event.screenCoords,
            mapCoords: event.mapCoords
          }]
        }); // commit tentativeFeature to featureCollection
      } else if (tentativeFeature) {
        _this.setTentativeFeature(null);

        var feature = {
          type: 'Feature',
          properties: {
            id: tentativeFeature.properties.id,
            // todo deprecate renderType
            renderType: _constants.RENDER_TYPE.LINE_STRING
          },
          geometry: {
            type: _constants.GEOJSON_TYPE.LINE_STRING,
            coordinates: [tentativeFeature.geometry.coordinates[0], event.mapCoords]
          }
        };

        var _updatedData = data.addFeature(feature).getObject();

        props.onEdit({
          editType: _constants.EDIT_TYPE.ADD_FEATURE,
          updatedData: _updatedData,
          editContext: null
        });
      } else {
        tentativeFeature = {
          type: 'Feature',
          properties: {
            // TODO deprecate id & renderType
            id: (0, _v.default)(),
            renderType: _constants.RENDER_TYPE.LINE_STRING,
            guideType: _constants.GUIDE_TYPE.TENTATIVE
          },
          geometry: {
            type: _constants.GEOJSON_TYPE.POINT,
            coordinates: [event.mapCoords]
          }
        };

        _this.setTentativeFeature(tentativeFeature);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getGuides", function (props) {
      var selectedFeature = _this.getSelectedFeature(props);

      var tentativeFeature = _this.getTentativeFeature();

      var feature = selectedFeature || tentativeFeature;
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates) {
        return null;
      }

      var event = props.lastPointerMoveEvent; // existing editHandles + cursorEditHandle

      var editHandles = _this.getEditHandlesFromFeature(feature) || [];
      var cursorEditHandle = {
        type: 'Feature',
        properties: {
          guideType: _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE,
          // TODO remove renderType
          renderType: _constants.RENDER_TYPE.LINE_STRING,
          positionIndexes: [editHandles.length]
        },
        geometry: {
          type: _constants.GEOJSON_TYPE.POINT,
          coordinates: [event.mapCoords]
        }
      };
      editHandles.push(cursorEditHandle); // tentativeFeature

      tentativeFeature = {
        type: 'Feature',
        properties: {
          // TODO deprecate id and renderType
          id: (0, _v.default)(),
          guideType: _constants.GUIDE_TYPE.TENTATIVE,
          renderType: _constants.RENDER_TYPE.LINE_STRING
        },
        geometry: {
          type: _constants.GEOJSON_TYPE.LINE_STRING,
          coordinates: [coordinates[coordinates.length - 1], event.mapCoords]
        }
      };
      return {
        tentativeFeature: tentativeFeature,
        editHandles: editHandles
      };
    });

    return _this;
  }

  return DrawLineStringMode;
}(_baseMode.default);

exports.default = DrawLineStringMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2RyYXctbGluZS1zdHJpbmctbW9kZS5qcyJdLCJuYW1lcyI6WyJEcmF3TGluZVN0cmluZ01vZGUiLCJldmVudCIsInByb3BzIiwiZGF0YSIsInNlbGVjdGVkSW5kZXhlcyIsInNlbGVjdGVkRmVhdHVyZSIsImdldFNlbGVjdGVkRmVhdHVyZSIsInRlbnRhdGl2ZUZlYXR1cmUiLCJnZXRUZW50YXRpdmVGZWF0dXJlIiwic2VsZWN0ZWRGZWF0dXJlSW5kZXgiLCJwb3NpdGlvbkluZGV4ZXMiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwibGVuZ3RoIiwidXBkYXRlZERhdGEiLCJhZGRQb3NpdGlvbiIsIm1hcENvb3JkcyIsImdldE9iamVjdCIsIm9uRWRpdCIsImVkaXRUeXBlIiwiRURJVF9UWVBFIiwiQUREX1BPU0lUSU9OIiwiZWRpdENvbnRleHQiLCJmZWF0dXJlSW5kZXgiLCJlZGl0SGFuZGxlSW5kZXgiLCJzY3JlZW5Db29yZHMiLCJzZXRUZW50YXRpdmVGZWF0dXJlIiwiZmVhdHVyZSIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiaWQiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEUiLCJMSU5FX1NUUklORyIsIkdFT0pTT05fVFlQRSIsImFkZEZlYXR1cmUiLCJBRERfRkVBVFVSRSIsImd1aWRlVHlwZSIsIkdVSURFX1RZUEUiLCJURU5UQVRJVkUiLCJQT0lOVCIsImxhc3RQb2ludGVyTW92ZUV2ZW50IiwiZWRpdEhhbmRsZXMiLCJnZXRFZGl0SGFuZGxlc0Zyb21GZWF0dXJlIiwiY3Vyc29yRWRpdEhhbmRsZSIsIkNVUlNPUl9FRElUX0hBTkRMRSIsInB1c2giLCJCYXNlTW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUtBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7OzswRkFDTCxVQUFDQyxLQUFELEVBQW9CQyxLQUFwQixFQUE0RDtBQUFBLFVB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O0FBQ1JpQixVQUFBQSxJQUFJLEVBQUVNLHdCQUFhRCxXQURYO0FBRVJyQixVQUFBQSxXQUFXLEVBQUUsQ0FBQ0EsV0FBVyxDQUFDQSxXQUFXLENBQUNDLE1BQVosR0FBcUIsQ0FBdEIsQ0FBWixFQUFzQ1osS0FBSyxDQUFDZSxTQUE1QztBQUZMO0FBUk8sT0FBbkI7QUFjQSxhQUFPO0FBQ0xULFFBQUFBLGdCQUFnQixFQUFoQkEsZ0JBREs7QUFFTG1DLFFBQUFBLFdBQVcsRUFBWEE7QUFGSyxPQUFQO0FBSUQsSzs7Ozs7O0VBekg2Q0ssaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkL3YxJztcblxuaW1wb3J0IHR5cGUgeyBDbGlja0V2ZW50LCBGZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJ0BuZWJ1bGEuZ2wvZWRpdC1tb2Rlcyc7XG5pbXBvcnQgdHlwZSB7IE1vZGVQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcblxuaW1wb3J0IHsgRURJVF9UWVBFLCBHRU9KU09OX1RZUEUsIEdVSURFX1RZUEUsIFJFTkRFUl9UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBCYXNlTW9kZSBmcm9tICcuL2Jhc2UtbW9kZSc7XG5pbXBvcnQgeyBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd0xpbmVTdHJpbmdNb2RlIGV4dGVuZHMgQmFzZU1vZGUge1xuICBoYW5kbGVDbGljayA9IChldmVudDogQ2xpY2tFdmVudCwgcHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pID0+IHtcbiAgICBjb25zdCB7IGRhdGEsIHNlbGVjdGVkSW5kZXhlcyB9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBzZWxlY3RlZEZlYXR1cmUgPSB0aGlzLmdldFNlbGVjdGVkRmVhdHVyZShwcm9wcyk7XG4gICAgbGV0IHRlbnRhdGl2ZUZlYXR1cmUgPSB0aGlzLmdldFRlbnRhdGl2ZUZlYXR1cmUoKTtcblxuICAgIC8vIGFkZCBwb3NpdGlvbiB0byBhIHNlbGVjdGVkRmVhdHVyZVxuICAgIGlmIChzZWxlY3RlZEZlYXR1cmUpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZUluZGV4ID0gc2VsZWN0ZWRJbmRleGVzWzBdO1xuICAgICAgY29uc3QgcG9zaXRpb25JbmRleGVzID0gW3NlbGVjdGVkRmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGhdO1xuXG4gICAgICBjb25zdCB1cGRhdGVkRGF0YSA9IGRhdGFcbiAgICAgICAgLmFkZFBvc2l0aW9uKHNlbGVjdGVkRmVhdHVyZUluZGV4LCBwb3NpdGlvbkluZGV4ZXMsIGV2ZW50Lm1hcENvb3JkcylcbiAgICAgICAgLmdldE9iamVjdCgpO1xuXG4gICAgICBwcm9wcy5vbkVkaXQoe1xuICAgICAgICBlZGl0VHlwZTogRURJVF9UWVBFLkFERF9QT1NJVElPTixcbiAgICAgICAgdXBkYXRlZERhdGEsXG4gICAgICAgIGVkaXRDb250ZXh0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmVhdHVyZUluZGV4OiBzZWxlY3RlZEZlYXR1cmVJbmRleCxcbiAgICAgICAgICAgIGVkaXRIYW5kbGVJbmRleDogcG9zaXRpb25JbmRleGVzWzBdLFxuICAgICAgICAgICAgc2NyZWVuQ29vcmRzOiBldmVudC5zY3JlZW5Db29yZHMsXG4gICAgICAgICAgICBtYXBDb29yZHM6IGV2ZW50Lm1hcENvb3Jkc1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGNvbW1pdCB0ZW50YXRpdmVGZWF0dXJlIHRvIGZlYXR1cmVDb2xsZWN0aW9uXG4gICAgfSBlbHNlIGlmICh0ZW50YXRpdmVGZWF0dXJlKSB7XG4gICAgICB0aGlzLnNldFRlbnRhdGl2ZUZlYXR1cmUobnVsbCk7XG5cbiAgICAgIGNvbnN0IGZlYXR1cmUgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGlkOiB0ZW50YXRpdmVGZWF0dXJlLnByb3BlcnRpZXMuaWQsXG4gICAgICAgICAgLy8gdG9kbyBkZXByZWNhdGUgcmVuZGVyVHlwZVxuICAgICAgICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLkxJTkVfU1RSSU5HXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgdHlwZTogR0VPSlNPTl9UWVBFLkxJTkVfU1RSSU5HLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbdGVudGF0aXZlRmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlc1swXSwgZXZlbnQubWFwQ29vcmRzXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1cGRhdGVkRGF0YSA9IGRhdGEuYWRkRmVhdHVyZShmZWF0dXJlKS5nZXRPYmplY3QoKTtcblxuICAgICAgcHJvcHMub25FZGl0KHtcbiAgICAgICAgZWRpdFR5cGU6IEVESVRfVFlQRS5BRERfRkVBVFVSRSxcbiAgICAgICAgdXBkYXRlZERhdGEsXG4gICAgICAgIGVkaXRDb250ZXh0OiBudWxsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVudGF0aXZlRmVhdHVyZSA9IHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgLy8gVE9ETyBkZXByZWNhdGUgaWQgJiByZW5kZXJUeXBlXG4gICAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5MSU5FX1NUUklORyxcbiAgICAgICAgICBndWlkZVR5cGU6IEdVSURFX1RZUEUuVEVOVEFUSVZFXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgdHlwZTogR0VPSlNPTl9UWVBFLlBPSU5ULFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbZXZlbnQubWFwQ29vcmRzXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNldFRlbnRhdGl2ZUZlYXR1cmUodGVudGF0aXZlRmVhdHVyZSk7XG4gICAgfVxuICB9O1xuXG4gIGdldEd1aWRlcyA9IChwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkRmVhdHVyZSA9IHRoaXMuZ2V0U2VsZWN0ZWRGZWF0dXJlKHByb3BzKTtcbiAgICBsZXQgdGVudGF0aXZlRmVhdHVyZSA9IHRoaXMuZ2V0VGVudGF0aXZlRmVhdHVyZSgpO1xuXG4gICAgY29uc3QgZmVhdHVyZSA9IHNlbGVjdGVkRmVhdHVyZSB8fCB0ZW50YXRpdmVGZWF0dXJlO1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0RmVhdHVyZUNvb3JkaW5hdGVzKGZlYXR1cmUpO1xuXG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnQgPSBwcm9wcy5sYXN0UG9pbnRlck1vdmVFdmVudDtcblxuICAgIC8vIGV4aXN0aW5nIGVkaXRIYW5kbGVzICsgY3Vyc29yRWRpdEhhbmRsZVxuICAgIGNvbnN0IGVkaXRIYW5kbGVzID0gdGhpcy5nZXRFZGl0SGFuZGxlc0Zyb21GZWF0dXJlKGZlYXR1cmUpIHx8IFtdO1xuICAgIGNvbnN0IGN1cnNvckVkaXRIYW5kbGUgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGd1aWRlVHlwZTogR1VJREVfVFlQRS5DVVJTT1JfRURJVF9IQU5ETEUsXG4gICAgICAgIC8vIFRPRE8gcmVtb3ZlIHJlbmRlclR5cGVcbiAgICAgICAgcmVuZGVyVHlwZTogUkVOREVSX1RZUEUuTElORV9TVFJJTkcsXG4gICAgICAgIHBvc2l0aW9uSW5kZXhlczogW2VkaXRIYW5kbGVzLmxlbmd0aF1cbiAgICAgIH0sXG4gICAgICBnZW9tZXRyeToge1xuICAgICAgICB0eXBlOiBHRU9KU09OX1RZUEUuUE9JTlQsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbZXZlbnQubWFwQ29vcmRzXVxuICAgICAgfVxuICAgIH07XG4gICAgZWRpdEhhbmRsZXMucHVzaChjdXJzb3JFZGl0SGFuZGxlKTtcblxuICAgIC8vIHRlbnRhdGl2ZUZlYXR1cmVcbiAgICB0ZW50YXRpdmVGZWF0dXJlID0ge1xuICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBUT0RPIGRlcHJlY2F0ZSBpZCBhbmQgcmVuZGVyVHlwZVxuICAgICAgICBpZDogdXVpZCgpLFxuICAgICAgICBndWlkZVR5cGU6IEdVSURFX1RZUEUuVEVOVEFUSVZFLFxuICAgICAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5MSU5FX1NUUklOR1xuICAgICAgfSxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5MSU5FX1NUUklORyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXSwgZXZlbnQubWFwQ29vcmRzXVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGVudGF0aXZlRmVhdHVyZSxcbiAgICAgIGVkaXRIYW5kbGVzXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==