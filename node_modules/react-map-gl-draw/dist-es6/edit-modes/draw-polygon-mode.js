"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v1"));

var _constants = require("../constants");

var _utils = require("./utils");

var _baseMode = _interopRequireDefault(require("./base-mode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawPolygonMode =
/*#__PURE__*/
function (_BaseMode) {
  _inherits(DrawPolygonMode, _BaseMode);

  function DrawPolygonMode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DrawPolygonMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DrawPolygonMode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (event, props) {
      var picked = event.picks && event.picks[0];
      var data = props.data; // update tentative feature

      var tentativeFeature = _this.getTentativeFeature(); // add position to tentativeFeature
      // if click the first editHandle, commit tentativeFeature to featureCollection


      if (tentativeFeature) {
        var pickedObject = picked && picked.object; // clicked an editHandle of a tentative feature

        if (pickedObject && pickedObject.index === 0) {
          _this.setTentativeFeature(null); // append point to the tail, close the polygon


          var coordinates = (0, _utils.getFeatureCoordinates)(tentativeFeature);

          if (!coordinates) {
            return;
          }

          coordinates.push(coordinates[0]);
          tentativeFeature = {
            type: 'Feature',
            properties: {
              // TODO deprecate id
              id: tentativeFeature.properties.id,
              renderType: _constants.RENDER_TYPE.POLYGON
            },
            geometry: {
              type: _constants.GEOJSON_TYPE.POLYGON,
              coordinates: [coordinates]
            }
          };
          var updatedData = data.addFeature(tentativeFeature).getObject();
          props.onEdit({
            editType: _constants.EDIT_TYPE.ADD_FEATURE,
            updatedData: updatedData,
            editContext: null
          });
        } else {
          // update tentativeFeature
          tentativeFeature = _objectSpread({}, tentativeFeature, {
            geometry: {
              type: _constants.GEOJSON_TYPE.LINE_STRING,
              coordinates: _toConsumableArray(tentativeFeature.geometry.coordinates).concat([event.mapCoords])
            }
          });

          _this.setTentativeFeature(tentativeFeature);
        }
      } else {
        // create a tentativeFeature
        tentativeFeature = {
          type: 'Feature',
          properties: {
            // TODO deprecate id
            id: (0, _v.default)(),
            renderType: _constants.RENDER_TYPE.POLYGON,
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
      var tentativeFeature = _this.getTentativeFeature();

      var coordinates = (0, _utils.getFeatureCoordinates)(tentativeFeature);

      if (!coordinates) {
        return null;
      }

      var event = props.lastPointerMoveEvent; // existing editHandles + cursorEditHandle

      var editHandles = _this.getEditHandlesFromFeature(tentativeFeature) || [];
      var cursorEditHandle = {
        type: 'Feature',
        properties: {
          guideType: _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE,
          // TODO remove renderType
          renderType: _constants.RENDER_TYPE.POLYGON,
          positionIndexes: [editHandles.length]
        },
        geometry: {
          type: _constants.GEOJSON_TYPE.POINT,
          coordinates: [event.mapCoords]
        }
      };
      editHandles.push(cursorEditHandle); // tentativeFeature

      tentativeFeature = _objectSpread({}, tentativeFeature, {
        geometry: {
          type: _constants.GEOJSON_TYPE.LINE_STRING,
          coordinates: _toConsumableArray(coordinates).concat([event.mapCoords])
        }
      });
      return {
        tentativeFeature: tentativeFeature,
        editHandles: editHandles
      };
    });

    return _this;
  }

  return DrawPolygonMode;
}(_baseMode.default);

exports.default = DrawPolygonMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2RyYXctcG9seWdvbi1tb2RlLmpzIl0sIm5hbWVzIjpbIkRyYXdQb2x5Z29uTW9kZSIsImV2ZW50IiwicHJvcHMiLCJwaWNrZWQiLCJwaWNrcyIsImRhdGEiLCJ0ZW50YXRpdmVGZWF0dXJlIiwiZ2V0VGVudGF0aXZlRmVhdHVyZSIsInBpY2tlZE9iamVjdCIsIm9iamVjdCIsImluZGV4Iiwic2V0VGVudGF0aXZlRmVhdHVyZSIsImNvb3JkaW5hdGVzIiwicHVzaCIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiaWQiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEUiLCJQT0xZR09OIiwiZ2VvbWV0cnkiLCJHRU9KU09OX1RZUEUiLCJ1cGRhdGVkRGF0YSIsImFkZEZlYXR1cmUiLCJnZXRPYmplY3QiLCJvbkVkaXQiLCJlZGl0VHlwZSIsIkVESVRfVFlQRSIsIkFERF9GRUFUVVJFIiwiZWRpdENvbnRleHQiLCJMSU5FX1NUUklORyIsIm1hcENvb3JkcyIsImd1aWRlVHlwZSIsIkdVSURFX1RZUEUiLCJURU5UQVRJVkUiLCJQT0lOVCIsImxhc3RQb2ludGVyTW92ZUV2ZW50IiwiZWRpdEhhbmRsZXMiLCJnZXRFZGl0SGFuZGxlc0Zyb21GZWF0dXJlIiwiY3Vyc29yRWRpdEhhbmRsZSIsIkNVUlNPUl9FRElUX0hBTkRMRSIsInBvc2l0aW9uSW5kZXhlcyIsImxlbmd0aCIsIkJhc2VNb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBGQUNMLFVBQUNDLEtBQUQsRUFBb0JDLEtBQXBCLEVBQTREO0FBQ3hFLFVBQU1DLE1BQU0sR0FBR0YsS0FBSyxDQUFDRyxLQUFOLElBQWVILEtBQUssQ0FBQ0csS0FBTixDQUFZLENBQVosQ0FBOUI7QUFEd0UsVUFFaEVDLElBRmdFLEdBRXZESCxLQUZ1RCxDQUVo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R0FBRztBQUN2QnpCLFFBQUFBLElBQUksRUFBRSxTQURpQjtBQUV2QkMsUUFBQUEsVUFBVSxFQUFFO0FBQ1ZpQixVQUFBQSxTQUFTLEVBQUVDLHNCQUFXTyxrQkFEWjtBQUVWO0FBQ0F2QixVQUFBQSxVQUFVLEVBQUVDLHVCQUFZQyxPQUhkO0FBSVZzQixVQUFBQSxlQUFlLEVBQUUsQ0FBQ0osV0FBVyxDQUFDSyxNQUFiO0FBSlAsU0FGVztBQVF2QnRCLFFBQUFBLFFBQVEsRUFBRTtBQUNSTixVQUFBQSxJQUFJLEVBQUVPLHdCQUFhYyxLQURYO0FBRVJ2QixVQUFBQSxXQUFXLEVBQUUsQ0FBQ1gsS0FBSyxDQUFDOEIsU0FBUDtBQUZMO0FBUmEsT0FBekI7QUFhQU0sTUFBQUEsV0FBVyxDQUFDeEIsSUFBWixDQUFpQjBCLGdCQUFqQixFQXpCbUQsQ0EyQm5EOztBQUNBakMsTUFBQUEsZ0JBQWdCLHFCQUNYQSxnQkFEVztBQUVkYyxRQUFBQSxRQUFRLEVBQUU7QUFDUk4sVUFBQUEsSUFBSSxFQUFFTyx3QkFBYVMsV0FEWDtBQUVSbEIsVUFBQUEsV0FBVyxxQkFBTUEsV0FBTixVQUFtQlgsS0FBSyxDQUFDOEIsU0FBekI7QUFGSDtBQUZJLFFBQWhCO0FBUUEsYUFBTztBQUNMekIsUUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFESztBQUVMK0IsUUFBQUEsV0FBVyxFQUFYQTtBQUZLLE9BQVA7QUFJRCxLOzs7Ozs7RUFuSDBDTSxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7IENsaWNrRXZlbnQsIEZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnQG5lYnVsYS5nbC9lZGl0LW1vZGVzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQvdjEnO1xuXG5pbXBvcnQgdHlwZSB7IE1vZGVQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEVESVRfVFlQRSwgR0VPSlNPTl9UWVBFLCBHVUlERV9UWVBFLCBSRU5ERVJfVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBCYXNlTW9kZSBmcm9tICcuL2Jhc2UtbW9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdQb2x5Z29uTW9kZSBleHRlbmRzIEJhc2VNb2RlIHtcbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQ6IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSA9PiB7XG4gICAgY29uc3QgcGlja2VkID0gZXZlbnQucGlja3MgJiYgZXZlbnQucGlja3NbMF07XG4gICAgY29uc3QgeyBkYXRhIH0gPSBwcm9wcztcblxuICAgIC8vIHVwZGF0ZSB0ZW50YXRpdmUgZmVhdHVyZVxuICAgIGxldCB0ZW50YXRpdmVGZWF0dXJlID0gdGhpcy5nZXRUZW50YXRpdmVGZWF0dXJlKCk7XG5cbiAgICAvLyBhZGQgcG9zaXRpb24gdG8gdGVudGF0aXZlRmVhdHVyZVxuICAgIC8vIGlmIGNsaWNrIHRoZSBmaXJzdCBlZGl0SGFuZGxlLCBjb21taXQgdGVudGF0aXZlRmVhdHVyZSB0byBmZWF0dXJlQ29sbGVjdGlvblxuICAgIGlmICh0ZW50YXRpdmVGZWF0dXJlKSB7XG4gICAgICBjb25zdCBwaWNrZWRPYmplY3QgPSBwaWNrZWQgJiYgcGlja2VkLm9iamVjdDtcbiAgICAgIC8vIGNsaWNrZWQgYW4gZWRpdEhhbmRsZSBvZiBhIHRlbnRhdGl2ZSBmZWF0dXJlXG4gICAgICBpZiAocGlja2VkT2JqZWN0ICYmIHBpY2tlZE9iamVjdC5pbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLnNldFRlbnRhdGl2ZUZlYXR1cmUobnVsbCk7XG5cbiAgICAgICAgLy8gYXBwZW5kIHBvaW50IHRvIHRoZSB0YWlsLCBjbG9zZSB0aGUgcG9seWdvblxuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldEZlYXR1cmVDb29yZGluYXRlcyh0ZW50YXRpdmVGZWF0dXJlKTtcbiAgICAgICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goY29vcmRpbmF0ZXNbMF0pO1xuXG4gICAgICAgIHRlbnRhdGl2ZUZlYXR1cmUgPSB7XG4gICAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIC8vIFRPRE8gZGVwcmVjYXRlIGlkXG4gICAgICAgICAgICBpZDogdGVudGF0aXZlRmVhdHVyZS5wcm9wZXJ0aWVzLmlkLFxuICAgICAgICAgICAgcmVuZGVyVHlwZTogUkVOREVSX1RZUEUuUE9MWUdPTlxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5QT0xZR09OLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFtjb29yZGluYXRlc11cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXBkYXRlZERhdGEgPSBkYXRhLmFkZEZlYXR1cmUodGVudGF0aXZlRmVhdHVyZSkuZ2V0T2JqZWN0KCk7XG5cbiAgICAgICAgcHJvcHMub25FZGl0KHtcbiAgICAgICAgICBlZGl0VHlwZTogRURJVF9UWVBFLkFERF9GRUFUVVJFLFxuICAgICAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgICAgIGVkaXRDb250ZXh0OiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdXBkYXRlIHRlbnRhdGl2ZUZlYXR1cmVcbiAgICAgICAgdGVudGF0aXZlRmVhdHVyZSA9IHtcbiAgICAgICAgICAuLi50ZW50YXRpdmVGZWF0dXJlLFxuICAgICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgICB0eXBlOiBHRU9KU09OX1RZUEUuTElORV9TVFJJTkcsXG4gICAgICAgICAgICBjb29yZGluYXRlczogWy4uLnRlbnRhdGl2ZUZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIGV2ZW50Lm1hcENvb3Jkc11cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0VGVudGF0aXZlRmVhdHVyZSh0ZW50YXRpdmVGZWF0dXJlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY3JlYXRlIGEgdGVudGF0aXZlRmVhdHVyZVxuICAgICAgdGVudGF0aXZlRmVhdHVyZSA9IHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgLy8gVE9ETyBkZXByZWNhdGUgaWRcbiAgICAgICAgICBpZDogdXVpZCgpLFxuICAgICAgICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlBPTFlHT04sXG4gICAgICAgICAgZ3VpZGVUeXBlOiBHVUlERV9UWVBFLlRFTlRBVElWRVxuICAgICAgICB9LFxuICAgICAgICBnZW9tZXRyeToge1xuICAgICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5QT0lOVCxcbiAgICAgICAgICBjb29yZGluYXRlczogW2V2ZW50Lm1hcENvb3Jkc11cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5zZXRUZW50YXRpdmVGZWF0dXJlKHRlbnRhdGl2ZUZlYXR1cmUpO1xuICAgIH1cbiAgfTtcblxuICBnZXRHdWlkZXMgPSAocHJvcHM6IE1vZGVQcm9wczxGZWF0dXJlQ29sbGVjdGlvbj4pID0+IHtcbiAgICBsZXQgdGVudGF0aXZlRmVhdHVyZSA9IHRoaXMuZ2V0VGVudGF0aXZlRmVhdHVyZSgpO1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0RmVhdHVyZUNvb3JkaW5hdGVzKHRlbnRhdGl2ZUZlYXR1cmUpO1xuXG4gICAgaWYgKCFjb29yZGluYXRlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnQgPSBwcm9wcy5sYXN0UG9pbnRlck1vdmVFdmVudDtcblxuICAgIC8vIGV4aXN0aW5nIGVkaXRIYW5kbGVzICsgY3Vyc29yRWRpdEhhbmRsZVxuICAgIGNvbnN0IGVkaXRIYW5kbGVzID0gdGhpcy5nZXRFZGl0SGFuZGxlc0Zyb21GZWF0dXJlKHRlbnRhdGl2ZUZlYXR1cmUpIHx8IFtdO1xuICAgIGNvbnN0IGN1cnNvckVkaXRIYW5kbGUgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGd1aWRlVHlwZTogR1VJREVfVFlQRS5DVVJTT1JfRURJVF9IQU5ETEUsXG4gICAgICAgIC8vIFRPRE8gcmVtb3ZlIHJlbmRlclR5cGVcbiAgICAgICAgcmVuZGVyVHlwZTogUkVOREVSX1RZUEUuUE9MWUdPTixcbiAgICAgICAgcG9zaXRpb25JbmRleGVzOiBbZWRpdEhhbmRsZXMubGVuZ3RoXVxuICAgICAgfSxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5QT0lOVCxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtldmVudC5tYXBDb29yZHNdXG4gICAgICB9XG4gICAgfTtcbiAgICBlZGl0SGFuZGxlcy5wdXNoKGN1cnNvckVkaXRIYW5kbGUpO1xuXG4gICAgLy8gdGVudGF0aXZlRmVhdHVyZVxuICAgIHRlbnRhdGl2ZUZlYXR1cmUgPSB7XG4gICAgICAuLi50ZW50YXRpdmVGZWF0dXJlLFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogR0VPSlNPTl9UWVBFLkxJTkVfU1RSSU5HLFxuICAgICAgICBjb29yZGluYXRlczogWy4uLmNvb3JkaW5hdGVzLCBldmVudC5tYXBDb29yZHNdXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICB0ZW50YXRpdmVGZWF0dXJlLFxuICAgICAgZWRpdEhhbmRsZXNcbiAgICB9O1xuICB9O1xufVxuIl19