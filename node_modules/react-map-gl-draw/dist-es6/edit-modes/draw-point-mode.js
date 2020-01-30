"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v1"));

var _constants = require("../constants");

var _baseMode = _interopRequireDefault(require("./base-mode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawPointMode =
/*#__PURE__*/
function (_BaseMode) {
  _inherits(DrawPointMode, _BaseMode);

  function DrawPointMode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DrawPointMode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DrawPointMode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (event, props) {
      var feature = {
        type: 'Feature',
        properties: {
          id: (0, _v.default)(),
          renderType: _constants.RENDER_TYPE.POINT
        },
        geometry: {
          type: _constants.GEOJSON_TYPE.POINT,
          coordinates: [event.mapCoords]
        }
      };
      var updatedData = props.data.addFeature(feature).getObject();
      props.onEdit({
        editType: _constants.EDIT_TYPE.ADD_FEATURE,
        updatedData: updatedData,
        editContext: null
      });
    });

    return _this;
  }

  return DrawPointMode;
}(_baseMode.default);

exports.default = DrawPointMode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0LW1vZGVzL2RyYXctcG9pbnQtbW9kZS5qcyJdLCJuYW1lcyI6WyJEcmF3UG9pbnRNb2RlIiwiZXZlbnQiLCJwcm9wcyIsImZlYXR1cmUiLCJ0eXBlIiwicHJvcGVydGllcyIsImlkIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFIiwiUE9JTlQiLCJnZW9tZXRyeSIsIkdFT0pTT05fVFlQRSIsImNvb3JkaW5hdGVzIiwibWFwQ29vcmRzIiwidXBkYXRlZERhdGEiLCJkYXRhIiwiYWRkRmVhdHVyZSIsImdldE9iamVjdCIsIm9uRWRpdCIsImVkaXRUeXBlIiwiRURJVF9UWVBFIiwiQUREX0ZFQVRVUkUiLCJlZGl0Q29udGV4dCIsIkJhc2VNb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBS0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MEZBQ0wsVUFBQ0MsS0FBRCxFQUFvQkMsS0FBcEIsRUFBNEQ7QUFDeEUsVUFBTUMsT0FBTyxHQUFHO0FBQ2RDLFFBQUFBLElBQUksRUFBRSxTQURRO0FBRWRDLFFBQUFBLFVBQVUsRUFBRTtBQUNWQyxVQUFBQSxFQUFFLEVBQUUsaUJBRE07QUFFVkMsVUFBQUEsVUFBVSxFQUFFQyx1QkFBWUM7QUFGZCxTQUZFO0FBTWRDLFFBQUFBLFFBQVEsRUFBRTtBQUNSTixVQUFBQSxJQUFJLEVBQUVPLHdCQUFhRixLQURYO0FBRVJHLFVBQUFBLFdBQVcsRUFBRSxDQUFDWCxLQUFLLENBQUNZLFNBQVA7QUFGTDtBQU5JLE9BQWhCO0FBWUEsVUFBTUMsV0FBVyxHQUFHWixLQUFLLENBQUNhLElBQU4sQ0FBV0MsVUFBWCxDQUFzQmIsT0FBdEIsRUFBK0JjLFNBQS9CLEVBQXBCO0FBRUFmLE1BQUFBLEtBQUssQ0FBQ2dCLE1BQU4sQ0FBYTtBQUNYQyxRQUFBQSxRQUFRLEVBQUVDLHFCQUFVQyxXQURUO0FBRVhQLFFBQUFBLFdBQVcsRUFBWEEsV0FGVztBQUdYUSxRQUFBQSxXQUFXLEVBQUU7QUFIRixPQUFiO0FBS0QsSzs7Ozs7O0VBckJ3Q0MsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkL3YxJztcblxuaW1wb3J0IHR5cGUgeyBDbGlja0V2ZW50LCBGZWF0dXJlQ29sbGVjdGlvbiB9IGZyb20gJ0BuZWJ1bGEuZ2wvZWRpdC1tb2Rlcyc7XG5pbXBvcnQgdHlwZSB7IE1vZGVQcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcblxuaW1wb3J0IHsgRURJVF9UWVBFLCBHRU9KU09OX1RZUEUsIFJFTkRFUl9UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBCYXNlTW9kZSBmcm9tICcuL2Jhc2UtbW9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdQb2ludE1vZGUgZXh0ZW5kcyBCYXNlTW9kZSB7XG4gIGhhbmRsZUNsaWNrID0gKGV2ZW50OiBDbGlja0V2ZW50LCBwcm9wczogTW9kZVByb3BzPEZlYXR1cmVDb2xsZWN0aW9uPikgPT4ge1xuICAgIGNvbnN0IGZlYXR1cmUgPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlBPSU5UXG4gICAgICB9LFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogR0VPSlNPTl9UWVBFLlBPSU5ULFxuICAgICAgICBjb29yZGluYXRlczogW2V2ZW50Lm1hcENvb3Jkc11cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlZERhdGEgPSBwcm9wcy5kYXRhLmFkZEZlYXR1cmUoZmVhdHVyZSkuZ2V0T2JqZWN0KCk7XG5cbiAgICBwcm9wcy5vbkVkaXQoe1xuICAgICAgZWRpdFR5cGU6IEVESVRfVFlQRS5BRERfRkVBVFVSRSxcbiAgICAgIHVwZGF0ZWREYXRhLFxuICAgICAgZWRpdENvbnRleHQ6IG51bGxcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==