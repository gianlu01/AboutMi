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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawRectangleMode =
/*#__PURE__*/
function (_BaseMode) {
  _inherits(DrawRectangleMode, _BaseMode);

  function DrawRectangleMode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DrawRectangleMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DrawRectangleMode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (event, props) {
      var data = props.data;

      var tentativeFeature = _this.getTentativeFeature(); // close rectangle and commit


      if (tentativeFeature) {
        // clear guides
        _this.setTentativeFeature(null);

        var coordinates = (0, _utils.updateRectanglePosition)(tentativeFeature, 2, event.mapCoords);

        if (!coordinates) {
          return;
        } // close rectangle


        coordinates = _toConsumableArray(coordinates).concat([coordinates[0]]);
        tentativeFeature = {
          type: 'Feature',
          properties: {
            // TODO deprecate id
            id: tentativeFeature.properties.id,
            renderType: _constants.RENDER_TYPE.RECTANGLE
          },
          geometry: {
            type: _constants.GEOJSON_TYPE.POLYGON,
            coordinates: [coordinates]
          }
        };
        var updatedData = data.addFeature(tentativeFeature).getObject(); // commit rectangle

        props.onEdit({
          editType: _constants.EDIT_TYPE.ADD_FEATURE,
          updatedData: updatedData,
          editContext: null
        });
      } else {
        // create a tentativeFeature
        tentativeFeature = {
          type: 'Feature',
          properties: {
            // TODO deprecate id
            id: (0, _v.default)(),
            renderType: _constants.RENDER_TYPE.RECTANGLE,
            guideType: _constants.GUIDE_TYPE.TENTATIVE
          },
          geometry: {
            type: 'LineString',
            coordinates: [event.mapCoords, event.mapCoords, event.mapCoords, event.mapCoords]
          }
        };

        _this.setTentativeFeature(tentativeFeature);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEditHandlesFromFeature", function (feature, featureIndex) {
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);
      return coordinates && coordinates.map(function (coord, i) {
        return {
          type: 'Feature',
          properties: {
            // TODO remove renderType
            renderType: _constants.RENDER_TYPE.RECTANGLE,
            guideType: _constants.GUIDE_TYPE.CURSOR_EDIT_HANDLE,
            featureIndex: featureIndex,
            positionIndexes: [i]
          },
          geometry: {
            type: _constants.GEOJSON_TYPE.POINT,
            coordinates: [coord]
          }
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getGuides", function (props) {
      var tentativeFeature = _this.getTentativeFeature();

      var coordinates = (0, _utils.getFeatureCoordinates)(tentativeFeature);

      if (!coordinates) {
        return null;
      }

      var event = props.lastPointerMoveEvent; // update tentative feature

      var newCoordinates = (0, _utils.updateRectanglePosition)(tentativeFeature, 2, event.mapCoords);
      tentativeFeature = {
        type: 'Feature',
        properties: {
          // TODO deprecate id and renderType
          id: (0, _v.default)(),
          guideType: _constants.GUIDE_TYPE.TENTATIVE,
          renderType: _constants.RENDER_TYPE.RECTANGLE
        },
        geometry: {
          type: _constants.GEOJSON_TYPE.LINE_STRING,
          coordinates: newCoordinates
        }
      };

      var editHandles = _this.getEditHandlesFromFeature(tentativeFeature);

      return {
        tentativeFeature: tentativeFeature,
        editHandles: editHandles
      };
    });

    return _this;
  }

  return DrawRectangleMode;
}(_baseMode.default);

exports.default = DrawRectangleMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2RyYXctcmVjdGFuZ2xlLW1vZGUuanMiXSwibmFtZXMiOlsiRHJhd1JlY3RhbmdsZU1vZGUiLCJldmVudCIsInByb3BzIiwiZGF0YSIsInRlbnRhdGl2ZUZlYXR1cmUiLCJnZXRUZW50YXRpdmVGZWF0dXJlIiwic2V0VGVudGF0aXZlRmVhdHVyZSIsImNvb3JkaW5hdGVzIiwibWFwQ29vcmRzIiwidHlwZSIsInByb3BlcnRpZXMiLCJpZCIsInJlbmRlclR5cGUiLCJSRU5ERVJfVFlQRSIsIlJFQ1RBTkdMRSIsImdlb21ldHJ5IiwiR0VPSlNPTl9UWVBFIiwiUE9MWUdPTiIsInVwZGF0ZWREYXRhIiwiYWRkRmVhdHVyZSIsImdldE9iamVjdCIsIm9uRWRpdCIsImVkaXRUeXBlIiwiRURJVF9UWVBFIiwiQUREX0ZFQVRVUkUiLCJlZGl0Q29udGV4dCIsImd1aWRlVHlwZSIsIkdVSURFX1RZUEUiLCJURU5UQVRJVkUiLCJmZWF0dXJlIiwiZmVhdHVyZUluZGV4IiwibWFwIiwiY29vcmQiLCJpIiwiQ1VSU09SX0VESVRfSEFORExFIiwicG9zaXRpb25JbmRleGVzIiwiUE9JTlQiLCJsYXN0UG9pbnRlck1vdmVFdmVudCIsIm5ld0Nvb3JkaW5hdGVzIiwiTElORV9TVFJJTkciLCJlZGl0SGFuZGxlcyIsImdldEVkaXRIYW5kbGVzRnJvbUZlYXR1cmUiLCJCYXNlTW9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBGQUNMLFVBQUNDLEtBQUQsRUFBb0JDLEtBQXBCLEVBQTREO0FBQUEsVUFDaEVDLElBRGdFLEdBQ3ZERCxLQUR1RCxDQUNoRUMsSUFEZ0U7O0FBR3hFLFVBQUlDLGdCQUFnQixHQUFHLE1BQUtDLG1CQUFMLEVBQXZCLENBSHdFLENBS3hFOzs7QUFDQSxVQUFJRCxnQkFBSixFQUFz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aEIsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsVUFBTU4sS0FBSyxHQUFHQyxLQUFLLENBQUNtQyxvQkFBcEIsQ0FSbUQsQ0FTbkQ7O0FBQ0EsVUFBTUMsY0FBYyxHQUFHLG9DQUF3QmxDLGdCQUF4QixFQUEwQyxDQUExQyxFQUE2Q0gsS0FBSyxDQUFDTyxTQUFuRCxDQUF2QjtBQUVBSixNQUFBQSxnQkFBZ0IsR0FBRztBQUNqQkssUUFBQUEsSUFBSSxFQUFFLFNBRFc7QUFFakJDLFFBQUFBLFVBQVUsRUFBRTtBQUNWO0FBQ0FDLFVBQUFBLEVBQUUsRUFBRSxpQkFGTTtBQUdWZSxVQUFBQSxTQUFTLEVBQUVDLHNCQUFXQyxTQUhaO0FBSVZoQixVQUFBQSxVQUFVLEVBQUVDLHVCQUFZQztBQUpkLFNBRks7QUFRakJDLFFBQUFBLFFBQVEsRUFBRTtBQUNSTixVQUFBQSxJQUFJLEVBQUVPLHdCQUFhdUIsV0FEWDtBQUVSaEMsVUFBQUEsV0FBVyxFQUFFK0I7QUFGTDtBQVJPLE9BQW5COztBQWNBLFVBQU1FLFdBQVcsR0FBRyxNQUFLQyx5QkFBTCxDQUErQnJDLGdCQUEvQixDQUFwQjs7QUFFQSxhQUFPO0FBQ0xBLFFBQUFBLGdCQUFnQixFQUFoQkEsZ0JBREs7QUFFTG9DLFFBQUFBLFdBQVcsRUFBWEE7QUFGSyxPQUFQO0FBSUQsSzs7Ozs7O0VBbkg0Q0UsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IEZlYXR1cmUsIENsaWNrRXZlbnQsIEZlYXR1cmVDb2xsZWN0aW9uIH0gZnJvbSAnQG5lYnVsYS5nbC9lZGl0LW1vZGVzJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQvdjEnO1xuaW1wb3J0IHR5cGUgeyBNb2RlUHJvcHMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCB7IEVESVRfVFlQRSwgR0VPSlNPTl9UWVBFLCBHVUlERV9UWVBFLCBSRU5ERVJfVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgQmFzZU1vZGUgZnJvbSAnLi9iYXNlLW1vZGUnO1xuaW1wb3J0IHsgZ2V0RmVhdHVyZUNvb3JkaW5hdGVzLCB1cGRhdGVSZWN0YW5nbGVQb3NpdGlvbiB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3UmVjdGFuZ2xlTW9kZSBleHRlbmRzIEJhc2VNb2RlIHtcbiAgaGFuZGxlQ2xpY2sgPSAoZXZlbnQ6IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSA9PiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBwcm9wcztcblxuICAgIGxldCB0ZW50YXRpdmVGZWF0dXJlID0gdGhpcy5nZXRUZW50YXRpdmVGZWF0dXJlKCk7XG5cbiAgICAvLyBjbG9zZSByZWN0YW5nbGUgYW5kIGNvbW1pdFxuICAgIGlmICh0ZW50YXRpdmVGZWF0dXJlKSB7XG4gICAgICAvLyBjbGVhciBndWlkZXNcbiAgICAgIHRoaXMuc2V0VGVudGF0aXZlRmVhdHVyZShudWxsKTtcblxuICAgICAgbGV0IGNvb3JkaW5hdGVzID0gdXBkYXRlUmVjdGFuZ2xlUG9zaXRpb24odGVudGF0aXZlRmVhdHVyZSwgMiwgZXZlbnQubWFwQ29vcmRzKTtcbiAgICAgIGlmICghY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjbG9zZSByZWN0YW5nbGVcbiAgICAgIGNvb3JkaW5hdGVzID0gWy4uLmNvb3JkaW5hdGVzLCBjb29yZGluYXRlc1swXV07XG5cbiAgICAgIHRlbnRhdGl2ZUZlYXR1cmUgPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIC8vIFRPRE8gZGVwcmVjYXRlIGlkXG4gICAgICAgICAgaWQ6IHRlbnRhdGl2ZUZlYXR1cmUucHJvcGVydGllcy5pZCxcbiAgICAgICAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNUQU5HTEVcbiAgICAgICAgfSxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiBHRU9KU09OX1RZUEUuUE9MWUdPTixcbiAgICAgICAgICBjb29yZGluYXRlczogW2Nvb3JkaW5hdGVzXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB1cGRhdGVkRGF0YSA9IGRhdGEuYWRkRmVhdHVyZSh0ZW50YXRpdmVGZWF0dXJlKS5nZXRPYmplY3QoKTtcblxuICAgICAgLy8gY29tbWl0IHJlY3RhbmdsZVxuICAgICAgcHJvcHMub25FZGl0KHtcbiAgICAgICAgZWRpdFR5cGU6IEVESVRfVFlQRS5BRERfRkVBVFVSRSxcbiAgICAgICAgdXBkYXRlZERhdGEsXG4gICAgICAgIGVkaXRDb250ZXh0OiBudWxsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY3JlYXRlIGEgdGVudGF0aXZlRmVhdHVyZVxuICAgICAgdGVudGF0aXZlRmVhdHVyZSA9IHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgLy8gVE9ETyBkZXByZWNhdGUgaWRcbiAgICAgICAgICBpZDogdXVpZCgpLFxuICAgICAgICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlJFQ1RBTkdMRSxcbiAgICAgICAgICBndWlkZVR5cGU6IEdVSURFX1RZUEUuVEVOVEFUSVZFXG4gICAgICAgIH0sXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbZXZlbnQubWFwQ29vcmRzLCBldmVudC5tYXBDb29yZHMsIGV2ZW50Lm1hcENvb3JkcywgZXZlbnQubWFwQ29vcmRzXVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNldFRlbnRhdGl2ZUZlYXR1cmUodGVudGF0aXZlRmVhdHVyZSk7XG4gICAgfVxuICB9O1xuXG4gIGdldEVkaXRIYW5kbGVzRnJvbUZlYXR1cmUgPSAoZmVhdHVyZTogRmVhdHVyZSwgZmVhdHVyZUluZGV4OiA/bnVtYmVyKSA9PiB7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMoZmVhdHVyZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvb3JkaW5hdGVzICYmXG4gICAgICBjb29yZGluYXRlcy5tYXAoKGNvb3JkLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIC8vIFRPRE8gcmVtb3ZlIHJlbmRlclR5cGVcbiAgICAgICAgICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlJFQ1RBTkdMRSxcbiAgICAgICAgICAgIGd1aWRlVHlwZTogR1VJREVfVFlQRS5DVVJTT1JfRURJVF9IQU5ETEUsXG4gICAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgICBwb3NpdGlvbkluZGV4ZXM6IFtpXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5QT0lOVCxcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbY29vcmRdXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIGdldEd1aWRlcyA9IChwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikgPT4ge1xuICAgIGxldCB0ZW50YXRpdmVGZWF0dXJlID0gdGhpcy5nZXRUZW50YXRpdmVGZWF0dXJlKCk7XG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRGZWF0dXJlQ29vcmRpbmF0ZXModGVudGF0aXZlRmVhdHVyZSk7XG5cbiAgICBpZiAoIWNvb3JkaW5hdGVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBldmVudCA9IHByb3BzLmxhc3RQb2ludGVyTW92ZUV2ZW50O1xuICAgIC8vIHVwZGF0ZSB0ZW50YXRpdmUgZmVhdHVyZVxuICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0gdXBkYXRlUmVjdGFuZ2xlUG9zaXRpb24odGVudGF0aXZlRmVhdHVyZSwgMiwgZXZlbnQubWFwQ29vcmRzKTtcblxuICAgIHRlbnRhdGl2ZUZlYXR1cmUgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIFRPRE8gZGVwcmVjYXRlIGlkIGFuZCByZW5kZXJUeXBlXG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIGd1aWRlVHlwZTogR1VJREVfVFlQRS5URU5UQVRJVkUsXG4gICAgICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlJFQ1RBTkdMRVxuICAgICAgfSxcbiAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgIHR5cGU6IEdFT0pTT05fVFlQRS5MSU5FX1NUUklORyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IG5ld0Nvb3JkaW5hdGVzXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGVkaXRIYW5kbGVzID0gdGhpcy5nZXRFZGl0SGFuZGxlc0Zyb21GZWF0dXJlKHRlbnRhdGl2ZUZlYXR1cmUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRlbnRhdGl2ZUZlYXR1cmUsXG4gICAgICBlZGl0SGFuZGxlc1xuICAgIH07XG4gIH07XG59XG4iXX0=