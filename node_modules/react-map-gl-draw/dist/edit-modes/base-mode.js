"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../constants");

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BaseMode =
/*#__PURE__*/
function () {
  function BaseMode() {
    var _this = this;

    _classCallCheck(this, BaseMode);

    _defineProperty(this, "_tentativeFeature", void 0);

    _defineProperty(this, "_editHandles", void 0);

    _defineProperty(this, "getTentativeFeature", function () {
      return _this._tentativeFeature;
    });

    _defineProperty(this, "getEditHandles", function () {
      return _this._editHandles;
    });

    _defineProperty(this, "setTentativeFeature", function (feature) {
      _this._tentativeFeature = feature;
    });

    _defineProperty(this, "getSelectedFeature", function (props, featureIndex) {
      var data = props.data,
          selectedIndexes = props.selectedIndexes;
      var featureCollection = data.getObject();
      var features = featureCollection && featureCollection.features;
      var selectedIndex = (0, _utils.isNumeric)(featureIndex) ? Number(featureIndex) : selectedIndexes && selectedIndexes[0];
      return features && features[selectedIndex];
    });

    this._tentativeFeature = null;
    this._editHandles = null;
  }

  _createClass(BaseMode, [{
    key: "handleClick",
    value: function handleClick(event, props) {}
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event, props) {}
  }, {
    key: "handleStartDragging",
    value: function handleStartDragging(event, props) {}
  }, {
    key: "handleStopDragging",
    value: function handleStopDragging(event, props) {}
  }, {
    key: "getGuides",
    value: function getGuides(props) {}
  }, {
    key: "getEditHandlesFromFeature",
    value: function getEditHandlesFromFeature(feature, featureIndex) {
      var coordinates = (0, _utils.getFeatureCoordinates)(feature);

      if (!coordinates) {
        return null;
      }

      return coordinates.map(function (coord, i) {
        return {
          type: 'Feature',
          properties: {
            // TODO deprecate renderType
            renderType: feature.properties.renderType,
            guideType: _constants.GUIDE_TYPE.EDIT_HANDLE,
            featureIndex: featureIndex,
            positionIndexes: [i]
          },
          geometry: {
            type: _constants.GEOJSON_TYPE.POINT,
            coordinates: [coord]
          }
        };
      });
    }
  }]);

  return BaseMode;
}();

exports.default = BaseMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2Jhc2UtbW9kZS5qcyJdLCJuYW1lcyI6WyJCYXNlTW9kZSIsIl90ZW50YXRpdmVGZWF0dXJlIiwiX2VkaXRIYW5kbGVzIiwiZmVhdHVyZSIsInByb3BzIiwiZmVhdHVyZUluZGV4IiwiZGF0YSIsInNlbGVjdGVkSW5kZXhlcyIsImZlYXR1cmVDb2xsZWN0aW9uIiwiZ2V0T2JqZWN0IiwiZmVhdHVyZXMiLCJzZWxlY3RlZEluZGV4IiwiTnVtYmVyIiwiZXZlbnQiLCJjb29yZGluYXRlcyIsIm1hcCIsImNvb3JkIiwiaSIsInR5cGUiLCJwcm9wZXJ0aWVzIiwicmVuZGVyVHlwZSIsImd1aWRlVHlwZSIsIkdVSURFX1RZUEUiLCJFRElUX0hBTkRMRSIsInBvc2l0aW9uSW5kZXhlcyIsImdlb21ldHJ5IiwiR0VPSlNPTl9UWVBFIiwiUE9JTlQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFZQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUTs7O0FBSW5CLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsaURBZVEsWUFBTTtBQUMxQixhQUFPLEtBQUksQ0FBQ0MsaUJBQVo7QUFDRCxLQWpCYTs7QUFBQSw0Q0FtQkcsWUFBTTtBQUNyQixhQUFPLEtBQUksQ0FBQ0MsWUFBWjtBQUNELEtBckJhOztBQUFBLGlEQXVCUSxVQUFDQyxPQUFELEVBQXNCO0FBQzFDLE1BQUEsS0FBSSxDQUFDRixpQkFBTCxHQUF5QkUsT0FBekI7QUFDRCxLQXpCYTs7QUFBQSxnREFrRE8sVUFBQ0MsS0FBRCxFQUFzQ0MsWUFBdEMsRUFBZ0U7QUFBQSxVQUMzRUMsSUFEMkUsR0FDakRGLEtBRGlELENBQzNFRSxJQUQyRTtBQUFBLFVBQ3JFQyxlQURxRSxHQUNqREgsS0FEaUQsQ0FDckVHLGVBRHFFO0FBRW5GLFVBQU1DLGlCQUFpQixHQUFHRixJQUFJLENBQUNHLFNBQUwsRUFBMUI7QUFDQSxVQUFNQyxRQUFRLEdBQUdGLGlCQUFpQixJQUFJQSxpQkFBaUIsQ0FBQ0UsUUFBeEQ7QUFFQSxVQUFNQyxhQUFhLEdBQUcsc0JBQVVOLFlBQVYsSUFDbEJPLE1BQU0sQ0FBQ1AsWUFBRCxDQURZLEdBRWxCRSxlQUFlLElBQUlBLGVBQWUsQ0FBQyxDQUFELENBRnRDO0FBSUEsYUFBT0csUUFBUSxJQUFJQSxRQUFRLENBQUNDLGFBQUQsQ0FBM0I7QUFDRCxLQTVEYTs7QUFDWixTQUFLVixpQkFBTCxHQUF5QixJQUF6QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDRDs7OztnQ0FFV1csSyxFQUFtQlQsSyxFQUFxQyxDQUFFOzs7c0NBRXBEUyxLLEVBQXlCVCxLLEVBQXFDLENBQUU7Ozt3Q0FFOURTLEssRUFBMkJULEssRUFBcUMsQ0FBRTs7O3VDQUVuRVMsSyxFQUEwQlQsSyxFQUFxQyxDQUFFOzs7OEJBRTFFQSxLLEVBQThDLENBQUU7Ozs4Q0FjaENELE8sRUFBa0JFLFksRUFBdUI7QUFDakUsVUFBTVMsV0FBVyxHQUFHLGtDQUFzQlgsT0FBdEIsQ0FBcEI7O0FBQ0EsVUFBSSxDQUFDVyxXQUFMLEVBQWtCO0FBQ2hCLGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU9BLFdBQVcsQ0FBQ0MsR0FBWixDQUFnQixVQUFDQyxLQUFELEVBQVFDLENBQVIsRUFBYztBQUNuQyxlQUFPO0FBQ0xDLFVBQUFBLElBQUksRUFBRSxTQUREO0FBRUxDLFVBQUFBLFVBQVUsRUFBRTtBQUNWO0FBQ0FDLFlBQUFBLFVBQVUsRUFBRWpCLE9BQU8sQ0FBQ2dCLFVBQVIsQ0FBbUJDLFVBRnJCO0FBR1ZDLFlBQUFBLFNBQVMsRUFBRUMsc0JBQVdDLFdBSFo7QUFJVmxCLFlBQUFBLFlBQVksRUFBWkEsWUFKVTtBQUtWbUIsWUFBQUEsZUFBZSxFQUFFLENBQUNQLENBQUQ7QUFMUCxXQUZQO0FBU0xRLFVBQUFBLFFBQVEsRUFBRTtBQUNSUCxZQUFBQSxJQUFJLEVBQUVRLHdCQUFhQyxLQURYO0FBRVJiLFlBQUFBLFdBQVcsRUFBRSxDQUFDRSxLQUFEO0FBRkw7QUFUTCxTQUFQO0FBY0QsT0FmTSxDQUFQO0FBZ0JEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUge1xuICBGZWF0dXJlLFxuICBDbGlja0V2ZW50LFxuICBQb2ludGVyTW92ZUV2ZW50LFxuICBTdGFydERyYWdnaW5nRXZlbnQsXG4gIFN0b3BEcmFnZ2luZ0V2ZW50LFxuICBGZWF0dXJlQ29sbGVjdGlvblxufSBmcm9tICdAbmVidWxhLmdsL2VkaXQtbW9kZXMnO1xuaW1wb3J0IHR5cGUgeyBNb2RlUHJvcHMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmltcG9ydCB7IEdFT0pTT05fVFlQRSwgR1VJREVfVFlQRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRGZWF0dXJlQ29vcmRpbmF0ZXMsIGlzTnVtZXJpYyB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlTW9kZSB7XG4gIF90ZW50YXRpdmVGZWF0dXJlOiA/RmVhdHVyZTtcbiAgX2VkaXRIYW5kbGVzOiA/KEZlYXR1cmVbXSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdGVudGF0aXZlRmVhdHVyZSA9IG51bGw7XG4gICAgdGhpcy5fZWRpdEhhbmRsZXMgPSBudWxsO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IENsaWNrRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7fVxuXG4gIGhhbmRsZVBvaW50ZXJNb3ZlKGV2ZW50OiBQb2ludGVyTW92ZUV2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikge31cblxuICBoYW5kbGVTdGFydERyYWdnaW5nKGV2ZW50OiBTdGFydERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7fVxuXG4gIGhhbmRsZVN0b3BEcmFnZ2luZyhldmVudDogU3RvcERyYWdnaW5nRXZlbnQsIHByb3BzOiBNb2RlUHJvcHM8RmVhdHVyZUNvbGxlY3Rpb24+KSB7fVxuXG4gIGdldEd1aWRlcyhwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPik6ID9PYmplY3Qge31cblxuICBnZXRUZW50YXRpdmVGZWF0dXJlID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLl90ZW50YXRpdmVGZWF0dXJlO1xuICB9O1xuXG4gIGdldEVkaXRIYW5kbGVzID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0SGFuZGxlcztcbiAgfTtcblxuICBzZXRUZW50YXRpdmVGZWF0dXJlID0gKGZlYXR1cmU6IEZlYXR1cmUpID0+IHtcbiAgICB0aGlzLl90ZW50YXRpdmVGZWF0dXJlID0gZmVhdHVyZTtcbiAgfTtcblxuICBnZXRFZGl0SGFuZGxlc0Zyb21GZWF0dXJlKGZlYXR1cmU6IEZlYXR1cmUsIGZlYXR1cmVJbmRleDogP251bWJlcikge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0RmVhdHVyZUNvb3JkaW5hdGVzKGZlYXR1cmUpO1xuICAgIGlmICghY29vcmRpbmF0ZXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRpbmF0ZXMubWFwKChjb29yZCwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgLy8gVE9ETyBkZXByZWNhdGUgcmVuZGVyVHlwZVxuICAgICAgICAgIHJlbmRlclR5cGU6IGZlYXR1cmUucHJvcGVydGllcy5yZW5kZXJUeXBlLFxuICAgICAgICAgIGd1aWRlVHlwZTogR1VJREVfVFlQRS5FRElUX0hBTkRMRSxcbiAgICAgICAgICBmZWF0dXJlSW5kZXgsXG4gICAgICAgICAgcG9zaXRpb25JbmRleGVzOiBbaV1cbiAgICAgICAgfSxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiBHRU9KU09OX1RZUEUuUE9JTlQsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IFtjb29yZF1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkRmVhdHVyZSA9IChwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPiwgZmVhdHVyZUluZGV4OiA/bnVtYmVyKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBzZWxlY3RlZEluZGV4ZXMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGZlYXR1cmVDb2xsZWN0aW9uID0gZGF0YS5nZXRPYmplY3QoKTtcbiAgICBjb25zdCBmZWF0dXJlcyA9IGZlYXR1cmVDb2xsZWN0aW9uICYmIGZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IGlzTnVtZXJpYyhmZWF0dXJlSW5kZXgpXG4gICAgICA/IE51bWJlcihmZWF0dXJlSW5kZXgpXG4gICAgICA6IHNlbGVjdGVkSW5kZXhlcyAmJiBzZWxlY3RlZEluZGV4ZXNbMF07XG5cbiAgICByZXR1cm4gZmVhdHVyZXMgJiYgZmVhdHVyZXNbc2VsZWN0ZWRJbmRleF07XG4gIH07XG59XG4iXX0=