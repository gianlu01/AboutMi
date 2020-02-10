"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmutableFeatureCollection = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ImmutableFeatureCollection =
/*#__PURE__*/
function () {
  function ImmutableFeatureCollection(featureCollection) {
    _classCallCheck(this, ImmutableFeatureCollection);

    _defineProperty(this, "featureCollection", void 0);

    this.featureCollection = featureCollection;
  }

  _createClass(ImmutableFeatureCollection, [{
    key: "getObject",
    value: function getObject() {
      return this.featureCollection;
    }
    /**
     * Replaces the position deeply nested withing the given feature's geometry.
     * Works with Point, MultiPoint, LineString, MultiLineString, Polygon, and MultiPolygon.
     *
     * @param featureIndex The index of the feature to update
     * @param positionIndexes An array containing the indexes of the position to replace
     * @param updatedPosition The updated position to place in the result (i.e. [lng, lat])
     *
     * @returns A new `ImmutableFeatureCollection` with the given position replaced. Does not modify this `ImmutableFeatureCollection`.
     */

  }, {
    key: "replacePosition",
    value: function replacePosition(featureIndex, positionIndexes, updatedPosition) {
      var geometry = this.featureCollection.features[featureIndex].geometry;
      var isPolygonal = geometry.type === 'Polygon' || geometry.type === 'MultiPolygon';

      var updatedGeometry = _objectSpread({}, geometry, {
        coordinates: immutablyReplacePosition(geometry.coordinates, positionIndexes, updatedPosition, isPolygonal)
      });

      return this.replaceGeometry(featureIndex, updatedGeometry);
    }
    /**
     * Removes a position deeply nested in a GeoJSON geometry coordinates array.
     * Works with MultiPoint, LineString, MultiLineString, Polygon, and MultiPolygon.
     *
     * @param featureIndex The index of the feature to update
     * @param positionIndexes An array containing the indexes of the postion to remove
     *
     * @returns A new `ImmutableFeatureCollection` with the given coordinate removed. Does not modify this `ImmutableFeatureCollection`.
     */

  }, {
    key: "removePosition",
    value: function removePosition(featureIndex, positionIndexes) {
      var geometry = this.featureCollection.features[featureIndex].geometry;

      if (geometry.type === 'Point') {
        throw Error("Can't remove a position from a Point or there'd be nothing left");
      }

      if (geometry.type === 'MultiPoint' && // only 1 point left
      geometry.coordinates.length < 2) {
        throw Error("Can't remove the last point of a MultiPoint or there'd be nothing left");
      }

      if (geometry.type === 'LineString' && // only 2 positions
      geometry.coordinates.length < 3) {
        throw Error("Can't remove position. LineString must have at least two positions");
      }

      if (geometry.type === 'Polygon' && // outer ring is a triangle
      geometry.coordinates[0].length < 5 && // trying to remove from outer ring
      positionIndexes[0] === 0) {
        throw Error("Can't remove position. Polygon's outer ring must have at least four positions");
      }

      if (geometry.type === 'MultiLineString' && // only 1 LineString left
      geometry.coordinates.length === 1 && // only 2 positions
      geometry.coordinates[0].length < 3) {
        throw Error("Can't remove position. MultiLineString must have at least two positions");
      }

      if (geometry.type === 'MultiPolygon' && // only 1 polygon left
      geometry.coordinates.length === 1 && // outer ring is a triangle
      geometry.coordinates[0][0].length < 5 && // trying to remove from first polygon
      positionIndexes[0] === 0 && // trying to remove from outer ring
      positionIndexes[1] === 0) {
        throw Error("Can't remove position. MultiPolygon's outer ring must have at least four positions");
      }

      var isPolygonal = geometry.type === 'Polygon' || geometry.type === 'MultiPolygon';

      var updatedGeometry = _objectSpread({}, geometry, {
        coordinates: immutablyRemovePosition(geometry.coordinates, positionIndexes, isPolygonal)
      }); // Handle cases where incomplete geometries need pruned (e.g. holes that were triangles)


      pruneGeometryIfNecessary(updatedGeometry);
      return this.replaceGeometry(featureIndex, updatedGeometry);
    }
    /**
     * Adds a position deeply nested in a GeoJSON geometry coordinates array.
     * Works with MultiPoint, LineString, MultiLineString, Polygon, and MultiPolygon.
     *
     * @param featureIndex The index of the feature to update
     * @param positionIndexes An array containing the indexes of the position that will proceed the new position
     * @param positionToAdd The new position to place in the result (i.e. [lng, lat])
     *
     * @returns A new `ImmutableFeatureCollection` with the given coordinate removed. Does not modify this `ImmutableFeatureCollection`.
     */

  }, {
    key: "addPosition",
    value: function addPosition(featureIndex, positionIndexes, positionToAdd) {
      var geometry = this.featureCollection.features[featureIndex].geometry;

      if (geometry.type === 'Point') {
        throw new Error('Unable to add a position to a Point feature');
      }

      var isPolygonal = geometry.type === 'Polygon' || geometry.type === 'MultiPolygon';

      var updatedGeometry = _objectSpread({}, geometry, {
        coordinates: immutablyAddPosition(geometry.coordinates, positionIndexes, positionToAdd, isPolygonal)
      });

      return this.replaceGeometry(featureIndex, updatedGeometry);
    }
  }, {
    key: "replaceGeometry",
    value: function replaceGeometry(featureIndex, geometry) {
      var updatedFeature = _objectSpread({}, this.featureCollection.features[featureIndex], {
        geometry: geometry
      });

      var updatedFeatureCollection = _objectSpread({}, this.featureCollection, {
        features: _toConsumableArray(this.featureCollection.features.slice(0, featureIndex)).concat([updatedFeature], _toConsumableArray(this.featureCollection.features.slice(featureIndex + 1)))
      });

      return new ImmutableFeatureCollection(updatedFeatureCollection);
    }
  }, {
    key: "addFeature",
    value: function addFeature(feature) {
      return this.addFeatures([feature]);
    }
  }, {
    key: "addFeatures",
    value: function addFeatures(features) {
      var updatedFeatureCollection = _objectSpread({}, this.featureCollection, {
        features: _toConsumableArray(this.featureCollection.features).concat(_toConsumableArray(features))
      });

      return new ImmutableFeatureCollection(updatedFeatureCollection);
    }
  }, {
    key: "deleteFeature",
    value: function deleteFeature(featureIndex) {
      return this.deleteFeatures([featureIndex]);
    }
  }, {
    key: "deleteFeatures",
    value: function deleteFeatures(featureIndexes) {
      var features = _toConsumableArray(this.featureCollection.features);

      featureIndexes.sort();

      for (var i = featureIndexes.length - 1; i >= 0; i--) {
        var featureIndex = featureIndexes[i];

        if (featureIndex >= 0 && featureIndex < features.length) {
          features.splice(featureIndex, 1);
        }
      }

      var updatedFeatureCollection = _objectSpread({}, this.featureCollection, {
        features: features
      });

      return new ImmutableFeatureCollection(updatedFeatureCollection);
    }
  }]);

  return ImmutableFeatureCollection;
}();

exports.ImmutableFeatureCollection = ImmutableFeatureCollection;

function getUpdatedPosition(updatedPosition, previousPosition) {
  // This function checks if the updatedPosition is missing elevation
  // and copies it from previousPosition
  if (updatedPosition.length === 2 && previousPosition.length === 3) {
    var elevation = previousPosition[2];
    return [updatedPosition[0], updatedPosition[1], elevation];
  }

  return updatedPosition;
}

function immutablyReplacePosition(coordinates, positionIndexes, updatedPosition, isPolygonal) {
  if (!positionIndexes) {
    return coordinates;
  }

  if (positionIndexes.length === 0) {
    return getUpdatedPosition(updatedPosition, coordinates);
  }

  if (positionIndexes.length === 1) {
    var updated = _toConsumableArray(coordinates.slice(0, positionIndexes[0])).concat([getUpdatedPosition(updatedPosition, coordinates[positionIndexes[0]])], _toConsumableArray(coordinates.slice(positionIndexes[0] + 1)));

    if (isPolygonal && (positionIndexes[0] === 0 || positionIndexes[0] === coordinates.length - 1)) {
      // for polygons, the first point is repeated at the end of the array
      // so, update it on both ends of the array
      updated[0] = getUpdatedPosition(updatedPosition, coordinates[0]);
      updated[coordinates.length - 1] = getUpdatedPosition(updatedPosition, coordinates[0]);
    }

    return updated;
  } // recursively update inner array


  return _toConsumableArray(coordinates.slice(0, positionIndexes[0])).concat([immutablyReplacePosition(coordinates[positionIndexes[0]], positionIndexes.slice(1, positionIndexes.length), updatedPosition, isPolygonal)], _toConsumableArray(coordinates.slice(positionIndexes[0] + 1)));
}

function immutablyRemovePosition(coordinates, positionIndexes, isPolygonal) {
  if (!positionIndexes) {
    return coordinates;
  }

  if (positionIndexes.length === 0) {
    throw Error('Must specify the index of the position to remove');
  }

  if (positionIndexes.length === 1) {
    var updated = _toConsumableArray(coordinates.slice(0, positionIndexes[0])).concat(_toConsumableArray(coordinates.slice(positionIndexes[0] + 1)));

    if (isPolygonal && (positionIndexes[0] === 0 || positionIndexes[0] === coordinates.length - 1)) {
      // for polygons, the first point is repeated at the end of the array
      // so, if the first/last coordinate is to be removed, coordinates[1] will be the new first/last coordinate
      if (positionIndexes[0] === 0) {
        // change the last to be the same as the first
        updated[updated.length - 1] = updated[0];
      } else if (positionIndexes[0] === coordinates.length - 1) {
        // change the first to be the same as the last
        updated[0] = updated[updated.length - 1];
      }
    }

    return updated;
  } // recursively update inner array


  return _toConsumableArray(coordinates.slice(0, positionIndexes[0])).concat([immutablyRemovePosition(coordinates[positionIndexes[0]], positionIndexes.slice(1, positionIndexes.length), isPolygonal)], _toConsumableArray(coordinates.slice(positionIndexes[0] + 1)));
}

function immutablyAddPosition(coordinates, positionIndexes, positionToAdd, isPolygonal) {
  if (!positionIndexes) {
    return coordinates;
  }

  if (positionIndexes.length === 0) {
    throw Error('Must specify the index of the position to remove');
  }

  if (positionIndexes.length === 1) {
    var updated = _toConsumableArray(coordinates.slice(0, positionIndexes[0])).concat([positionToAdd], _toConsumableArray(coordinates.slice(positionIndexes[0])));

    return updated;
  } // recursively update inner array


  return _toConsumableArray(coordinates.slice(0, positionIndexes[0])).concat([immutablyAddPosition(coordinates[positionIndexes[0]], positionIndexes.slice(1, positionIndexes.length), positionToAdd, isPolygonal)], _toConsumableArray(coordinates.slice(positionIndexes[0] + 1)));
}

function pruneGeometryIfNecessary(geometry) {
  switch (geometry.type) {
    case 'Polygon':
      prunePolygonIfNecessary(geometry);
      break;

    case 'MultiLineString':
      pruneMultiLineStringIfNecessary(geometry);
      break;

    case 'MultiPolygon':
      pruneMultiPolygonIfNecessary(geometry);
      break;

    default:
      // Not downgradable
      break;
  }
}

function prunePolygonIfNecessary(geometry) {
  var polygon = geometry.coordinates; // If any hole is no longer a polygon, remove the hole entirely

  for (var holeIndex = 1; holeIndex < polygon.length; holeIndex++) {
    if (removeHoleIfNecessary(polygon, holeIndex)) {
      // It was removed, so keep the index the same
      holeIndex--;
    }
  }
}

function pruneMultiLineStringIfNecessary(geometry) {
  for (var lineStringIndex = 0; lineStringIndex < geometry.coordinates.length; lineStringIndex++) {
    var lineString = geometry.coordinates[lineStringIndex];

    if (lineString.length === 1) {
      // Only a single position left on this LineString, so remove it (can't have Point in MultiLineString)
      geometry.coordinates.splice(lineStringIndex, 1); // Keep the index the same

      lineStringIndex--;
    }
  }
}

function pruneMultiPolygonIfNecessary(geometry) {
  for (var polygonIndex = 0; polygonIndex < geometry.coordinates.length; polygonIndex++) {
    var polygon = geometry.coordinates[polygonIndex];
    var outerRing = polygon[0]; // If the outer ring is no longer a polygon, remove the whole polygon

    if (outerRing.length <= 3) {
      geometry.coordinates.splice(polygonIndex, 1); // It was removed, so keep the index the same

      polygonIndex--;
    }

    for (var holeIndex = 1; holeIndex < polygon.length; holeIndex++) {
      if (removeHoleIfNecessary(polygon, holeIndex)) {
        // It was removed, so keep the index the same
        holeIndex--;
      }
    }
  }
}

function removeHoleIfNecessary(polygon, holeIndex) {
  var hole = polygon[holeIndex];

  if (hole.length <= 3) {
    polygon.splice(holeIndex, 1);
    return true;
  }

  return false;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvaW1tdXRhYmxlLWZlYXR1cmUtY29sbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbiIsImZlYXR1cmVDb2xsZWN0aW9uIiwiZmVhdHVyZUluZGV4IiwicG9zaXRpb25JbmRleGVzIiwidXBkYXRlZFBvc2l0aW9uIiwiZ2VvbWV0cnkiLCJmZWF0dXJlcyIsImlzUG9seWdvbmFsIiwidHlwZSIsInVwZGF0ZWRHZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwiaW1tdXRhYmx5UmVwbGFjZVBvc2l0aW9uIiwicmVwbGFjZUdlb21ldHJ5IiwiRXJyb3IiLCJsZW5ndGgiLCJpbW11dGFibHlSZW1vdmVQb3NpdGlvbiIsInBydW5lR2VvbWV0cnlJZk5lY2Vzc2FyeSIsInBvc2l0aW9uVG9BZGQiLCJpbW11dGFibHlBZGRQb3NpdGlvbiIsInVwZGF0ZWRGZWF0dXJlIiwidXBkYXRlZEZlYXR1cmVDb2xsZWN0aW9uIiwic2xpY2UiLCJmZWF0dXJlIiwiYWRkRmVhdHVyZXMiLCJkZWxldGVGZWF0dXJlcyIsImZlYXR1cmVJbmRleGVzIiwic29ydCIsImkiLCJzcGxpY2UiLCJnZXRVcGRhdGVkUG9zaXRpb24iLCJwcmV2aW91c1Bvc2l0aW9uIiwiZWxldmF0aW9uIiwidXBkYXRlZCIsInBydW5lUG9seWdvbklmTmVjZXNzYXJ5IiwicHJ1bmVNdWx0aUxpbmVTdHJpbmdJZk5lY2Vzc2FyeSIsInBydW5lTXVsdGlQb2x5Z29uSWZOZWNlc3NhcnkiLCJwb2x5Z29uIiwiaG9sZUluZGV4IiwicmVtb3ZlSG9sZUlmTmVjZXNzYXJ5IiwibGluZVN0cmluZ0luZGV4IiwibGluZVN0cmluZyIsInBvbHlnb25JbmRleCIsIm91dGVyUmluZyIsImhvbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhYUEsMEI7OztBQUdYLHNDQUFZQyxpQkFBWixFQUFrRDtBQUFBOztBQUFBOztBQUNoRCxTQUFL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QyxZQUFZLEdBQUcsQ0FBeEIsRUFBMkJBLFlBQVksR0FBR3BDLFFBQVEsQ0FBQ0ssV0FBVCxDQUFxQkksTUFBL0QsRUFBdUUyQixZQUFZLEVBQW5GLEVBQXVGO0FBQ3JGLFFBQU1MLE9BQU8sR0FBRy9CLFFBQVEsQ0FBQ0ssV0FBVCxDQUFxQitCLFlBQXJCLENBQWhCO0FBQ0EsUUFBTUMsU0FBUyxHQUFHTixPQUFPLENBQUMsQ0FBRCxDQUF6QixDQUZxRixDQUlyRjs7QUFDQSxRQUFJTSxTQUFTLENBQUM1QixNQUFWLElBQW9CLENBQXhCLEVBQTJCO0FBQ3pCVCxNQUFBQSxRQUFRLENBQUNLLFdBQVQsQ0FBcUJrQixNQUFyQixDQUE0QmEsWUFBNUIsRUFBMEMsQ0FBMUMsRUFEeUIsQ0FFekI7O0FBQ0FBLE1BQUFBLFlBQVk7QUFDYjs7QUFFRCxTQUFLLElBQUlKLFNBQVMsR0FBRyxDQUFyQixFQUF3QkEsU0FBUyxHQUFHRCxPQUFPLENBQUN0QixNQUE1QyxFQUFvRHVCLFNBQVMsRUFBN0QsRUFBaUU7QUFDL0QsVUFBSUMscUJBQXFCLENBQUNGLE9BQUQsRUFBVUMsU0FBVixDQUF6QixFQUErQztBQUM3QztBQUNBQSxRQUFBQSxTQUFTO0FBQ1Y7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsU0FBU0MscUJBQVQsQ0FBK0JGLE9BQS9CLEVBQTREQyxTQUE1RCxFQUErRTtBQUM3RSxNQUFNTSxJQUFJLEdBQUdQLE9BQU8sQ0FBQ0MsU0FBRCxDQUFwQjs7QUFDQSxNQUFJTSxJQUFJLENBQUM3QixNQUFMLElBQWUsQ0FBbkIsRUFBc0I7QUFDcEJzQixJQUFBQSxPQUFPLENBQUNSLE1BQVIsQ0FBZVMsU0FBZixFQUEwQixDQUExQjtBQUNBLFdBQU8sSUFBUDtBQUNEOztBQUNELFNBQU8sS0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUge1xuICBGZWF0dXJlLFxuICBGZWF0dXJlQ29sbGVjdGlvbixcbiAgR2VvbWV0cnksXG4gIFBvbHlnb24sXG4gIE11bHRpTGluZVN0cmluZyxcbiAgTXVsdGlQb2x5Z29uLFxuICBQb3NpdGlvbixcbiAgUG9seWdvbkNvb3JkaW5hdGVzXG59IGZyb20gJy4uL2dlb2pzb24tdHlwZXMuanMnO1xuXG5leHBvcnQgY2xhc3MgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24ge1xuICBmZWF0dXJlQ29sbGVjdGlvbjogRmVhdHVyZUNvbGxlY3Rpb247XG5cbiAgY29uc3RydWN0b3IoZmVhdHVyZUNvbGxlY3Rpb246IEZlYXR1cmVDb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5mZWF0dXJlQ29sbGVjdGlvbiA9IGZlYXR1cmVDb2xsZWN0aW9uO1xuICB9XG5cbiAgZ2V0T2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmZlYXR1cmVDb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSBwb3NpdGlvbiBkZWVwbHkgbmVzdGVkIHdpdGhpbmcgdGhlIGdpdmVuIGZlYXR1cmUncyBnZW9tZXRyeS5cbiAgICogV29ya3Mgd2l0aCBQb2ludCwgTXVsdGlQb2ludCwgTGluZVN0cmluZywgTXVsdGlMaW5lU3RyaW5nLCBQb2x5Z29uLCBhbmQgTXVsdGlQb2x5Z29uLlxuICAgKlxuICAgKiBAcGFyYW0gZmVhdHVyZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgZmVhdHVyZSB0byB1cGRhdGVcbiAgICogQHBhcmFtIHBvc2l0aW9uSW5kZXhlcyBBbiBhcnJheSBjb250YWluaW5nIHRoZSBpbmRleGVzIG9mIHRoZSBwb3NpdGlvbiB0byByZXBsYWNlXG4gICAqIEBwYXJhbSB1cGRhdGVkUG9zaXRpb24gVGhlIHVwZGF0ZWQgcG9zaXRpb24gdG8gcGxhY2UgaW4gdGhlIHJlc3VsdCAoaS5lLiBbbG5nLCBsYXRdKVxuICAgKlxuICAgKiBAcmV0dXJucyBBIG5ldyBgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb25gIHdpdGggdGhlIGdpdmVuIHBvc2l0aW9uIHJlcGxhY2VkLiBEb2VzIG5vdCBtb2RpZnkgdGhpcyBgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb25gLlxuICAgKi9cbiAgcmVwbGFjZVBvc2l0aW9uKFxuICAgIGZlYXR1cmVJbmRleDogbnVtYmVyLFxuICAgIHBvc2l0aW9uSW5kZXhlczogbnVtYmVyW10sXG4gICAgdXBkYXRlZFBvc2l0aW9uOiBQb3NpdGlvblxuICApOiBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLmZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnk7XG5cbiAgICBjb25zdCBpc1BvbHlnb25hbCA9IGdlb21ldHJ5LnR5cGUgPT09ICdQb2x5Z29uJyB8fCBnZW9tZXRyeS50eXBlID09PSAnTXVsdGlQb2x5Z29uJztcbiAgICBjb25zdCB1cGRhdGVkR2VvbWV0cnk6IGFueSA9IHtcbiAgICAgIC4uLmdlb21ldHJ5LFxuICAgICAgY29vcmRpbmF0ZXM6IGltbXV0YWJseVJlcGxhY2VQb3NpdGlvbihcbiAgICAgICAgZ2VvbWV0cnkuY29vcmRpbmF0ZXMsXG4gICAgICAgIHBvc2l0aW9uSW5kZXhlcyxcbiAgICAgICAgdXBkYXRlZFBvc2l0aW9uLFxuICAgICAgICBpc1BvbHlnb25hbFxuICAgICAgKVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlR2VvbWV0cnkoZmVhdHVyZUluZGV4LCB1cGRhdGVkR2VvbWV0cnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBwb3NpdGlvbiBkZWVwbHkgbmVzdGVkIGluIGEgR2VvSlNPTiBnZW9tZXRyeSBjb29yZGluYXRlcyBhcnJheS5cbiAgICogV29ya3Mgd2l0aCBNdWx0aVBvaW50LCBMaW5lU3RyaW5nLCBNdWx0aUxpbmVTdHJpbmcsIFBvbHlnb24sIGFuZCBNdWx0aVBvbHlnb24uXG4gICAqXG4gICAqIEBwYXJhbSBmZWF0dXJlSW5kZXggVGhlIGluZGV4IG9mIHRoZSBmZWF0dXJlIHRvIHVwZGF0ZVxuICAgKiBAcGFyYW0gcG9zaXRpb25JbmRleGVzIEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGluZGV4ZXMgb2YgdGhlIHBvc3Rpb24gdG8gcmVtb3ZlXG4gICAqXG4gICAqIEByZXR1cm5zIEEgbmV3IGBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbmAgd2l0aCB0aGUgZ2l2ZW4gY29vcmRpbmF0ZSByZW1vdmVkLiBEb2VzIG5vdCBtb2RpZnkgdGhpcyBgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb25gLlxuICAgKi9cbiAgcmVtb3ZlUG9zaXRpb24oZmVhdHVyZUluZGV4OiBudW1iZXIsIHBvc2l0aW9uSW5kZXhlczogbnVtYmVyW10pOiBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSB0aGlzLmZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzW2ZlYXR1cmVJbmRleF0uZ2VvbWV0cnk7XG5cbiAgICBpZiAoZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgdGhyb3cgRXJyb3IoYENhbid0IHJlbW92ZSBhIHBvc2l0aW9uIGZyb20gYSBQb2ludCBvciB0aGVyZSdkIGJlIG5vdGhpbmcgbGVmdGApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBnZW9tZXRyeS50eXBlID09PSAnTXVsdGlQb2ludCcgJiZcbiAgICAgIC8vIG9ubHkgMSBwb2ludCBsZWZ0XG4gICAgICBnZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGggPCAyXG4gICAgKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2FuJ3QgcmVtb3ZlIHRoZSBsYXN0IHBvaW50IG9mIGEgTXVsdGlQb2ludCBvciB0aGVyZSdkIGJlIG5vdGhpbmcgbGVmdGApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBnZW9tZXRyeS50eXBlID09PSAnTGluZVN0cmluZycgJiZcbiAgICAgIC8vIG9ubHkgMiBwb3NpdGlvbnNcbiAgICAgIGdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCA8IDNcbiAgICApIHtcbiAgICAgIHRocm93IEVycm9yKGBDYW4ndCByZW1vdmUgcG9zaXRpb24uIExpbmVTdHJpbmcgbXVzdCBoYXZlIGF0IGxlYXN0IHR3byBwb3NpdGlvbnNgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nICYmXG4gICAgICAvLyBvdXRlciByaW5nIGlzIGEgdHJpYW5nbGVcbiAgICAgIGdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdLmxlbmd0aCA8IDUgJiZcbiAgICAgIC8vIHRyeWluZyB0byByZW1vdmUgZnJvbSBvdXRlciByaW5nXG4gICAgICBwb3NpdGlvbkluZGV4ZXNbMF0gPT09IDBcbiAgICApIHtcbiAgICAgIHRocm93IEVycm9yKGBDYW4ndCByZW1vdmUgcG9zaXRpb24uIFBvbHlnb24ncyBvdXRlciByaW5nIG11c3QgaGF2ZSBhdCBsZWFzdCBmb3VyIHBvc2l0aW9uc2ApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBnZW9tZXRyeS50eXBlID09PSAnTXVsdGlMaW5lU3RyaW5nJyAmJlxuICAgICAgLy8gb25seSAxIExpbmVTdHJpbmcgbGVmdFxuICAgICAgZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoID09PSAxICYmXG4gICAgICAvLyBvbmx5IDIgcG9zaXRpb25zXG4gICAgICBnZW9tZXRyeS5jb29yZGluYXRlc1swXS5sZW5ndGggPCAzXG4gICAgKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2FuJ3QgcmVtb3ZlIHBvc2l0aW9uLiBNdWx0aUxpbmVTdHJpbmcgbXVzdCBoYXZlIGF0IGxlYXN0IHR3byBwb3NpdGlvbnNgKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgZ2VvbWV0cnkudHlwZSA9PT0gJ011bHRpUG9seWdvbicgJiZcbiAgICAgIC8vIG9ubHkgMSBwb2x5Z29uIGxlZnRcbiAgICAgIGdlb21ldHJ5LmNvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgLy8gb3V0ZXIgcmluZyBpcyBhIHRyaWFuZ2xlXG4gICAgICBnZW9tZXRyeS5jb29yZGluYXRlc1swXVswXS5sZW5ndGggPCA1ICYmXG4gICAgICAvLyB0cnlpbmcgdG8gcmVtb3ZlIGZyb20gZmlyc3QgcG9seWdvblxuICAgICAgcG9zaXRpb25JbmRleGVzWzBdID09PSAwICYmXG4gICAgICAvLyB0cnlpbmcgdG8gcmVtb3ZlIGZyb20gb3V0ZXIgcmluZ1xuICAgICAgcG9zaXRpb25JbmRleGVzWzFdID09PSAwXG4gICAgKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYENhbid0IHJlbW92ZSBwb3NpdGlvbi4gTXVsdGlQb2x5Z29uJ3Mgb3V0ZXIgcmluZyBtdXN0IGhhdmUgYXQgbGVhc3QgZm91ciBwb3NpdGlvbnNgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGlzUG9seWdvbmFsID0gZ2VvbWV0cnkudHlwZSA9PT0gJ1BvbHlnb24nIHx8IGdlb21ldHJ5LnR5cGUgPT09ICdNdWx0aVBvbHlnb24nO1xuICAgIGNvbnN0IHVwZGF0ZWRHZW9tZXRyeTogYW55ID0ge1xuICAgICAgLi4uZ2VvbWV0cnksXG4gICAgICBjb29yZGluYXRlczogaW1tdXRhYmx5UmVtb3ZlUG9zaXRpb24oZ2VvbWV0cnkuY29vcmRpbmF0ZXMsIHBvc2l0aW9uSW5kZXhlcywgaXNQb2x5Z29uYWwpXG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBjYXNlcyB3aGVyZSBpbmNvbXBsZXRlIGdlb21ldHJpZXMgbmVlZCBwcnVuZWQgKGUuZy4gaG9sZXMgdGhhdCB3ZXJlIHRyaWFuZ2xlcylcbiAgICBwcnVuZUdlb21ldHJ5SWZOZWNlc3NhcnkodXBkYXRlZEdlb21ldHJ5KTtcblxuICAgIHJldHVybiB0aGlzLnJlcGxhY2VHZW9tZXRyeShmZWF0dXJlSW5kZXgsIHVwZGF0ZWRHZW9tZXRyeSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHBvc2l0aW9uIGRlZXBseSBuZXN0ZWQgaW4gYSBHZW9KU09OIGdlb21ldHJ5IGNvb3JkaW5hdGVzIGFycmF5LlxuICAgKiBXb3JrcyB3aXRoIE11bHRpUG9pbnQsIExpbmVTdHJpbmcsIE11bHRpTGluZVN0cmluZywgUG9seWdvbiwgYW5kIE11bHRpUG9seWdvbi5cbiAgICpcbiAgICogQHBhcmFtIGZlYXR1cmVJbmRleCBUaGUgaW5kZXggb2YgdGhlIGZlYXR1cmUgdG8gdXBkYXRlXG4gICAqIEBwYXJhbSBwb3NpdGlvbkluZGV4ZXMgQW4gYXJyYXkgY29udGFpbmluZyB0aGUgaW5kZXhlcyBvZiB0aGUgcG9zaXRpb24gdGhhdCB3aWxsIHByb2NlZWQgdGhlIG5ldyBwb3NpdGlvblxuICAgKiBAcGFyYW0gcG9zaXRpb25Ub0FkZCBUaGUgbmV3IHBvc2l0aW9uIHRvIHBsYWNlIGluIHRoZSByZXN1bHQgKGkuZS4gW2xuZywgbGF0XSlcbiAgICpcbiAgICogQHJldHVybnMgQSBuZXcgYEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uYCB3aXRoIHRoZSBnaXZlbiBjb29yZGluYXRlIHJlbW92ZWQuIERvZXMgbm90IG1vZGlmeSB0aGlzIGBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbmAuXG4gICAqL1xuICBhZGRQb3NpdGlvbihcbiAgICBmZWF0dXJlSW5kZXg6IG51bWJlcixcbiAgICBwb3NpdGlvbkluZGV4ZXM6IG51bWJlcltdLFxuICAgIHBvc2l0aW9uVG9BZGQ6IFBvc2l0aW9uXG4gICk6IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIHtcbiAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XS5nZW9tZXRyeTtcblxuICAgIGlmIChnZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBhZGQgYSBwb3NpdGlvbiB0byBhIFBvaW50IGZlYXR1cmUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc1BvbHlnb25hbCA9IGdlb21ldHJ5LnR5cGUgPT09ICdQb2x5Z29uJyB8fCBnZW9tZXRyeS50eXBlID09PSAnTXVsdGlQb2x5Z29uJztcbiAgICBjb25zdCB1cGRhdGVkR2VvbWV0cnk6IGFueSA9IHtcbiAgICAgIC4uLmdlb21ldHJ5LFxuICAgICAgY29vcmRpbmF0ZXM6IGltbXV0YWJseUFkZFBvc2l0aW9uKFxuICAgICAgICBnZW9tZXRyeS5jb29yZGluYXRlcyxcbiAgICAgICAgcG9zaXRpb25JbmRleGVzLFxuICAgICAgICBwb3NpdGlvblRvQWRkLFxuICAgICAgICBpc1BvbHlnb25hbFxuICAgICAgKVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlR2VvbWV0cnkoZmVhdHVyZUluZGV4LCB1cGRhdGVkR2VvbWV0cnkpO1xuICB9XG5cbiAgcmVwbGFjZUdlb21ldHJ5KGZlYXR1cmVJbmRleDogbnVtYmVyLCBnZW9tZXRyeTogR2VvbWV0cnkpOiBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbiB7XG4gICAgY29uc3QgdXBkYXRlZEZlYXR1cmU6IGFueSA9IHtcbiAgICAgIC4uLnRoaXMuZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNbZmVhdHVyZUluZGV4XSxcbiAgICAgIGdlb21ldHJ5XG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZWRGZWF0dXJlQ29sbGVjdGlvbiA9IHtcbiAgICAgIC4uLnRoaXMuZmVhdHVyZUNvbGxlY3Rpb24sXG4gICAgICBmZWF0dXJlczogW1xuICAgICAgICAuLi50aGlzLmZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLnNsaWNlKDAsIGZlYXR1cmVJbmRleCksXG4gICAgICAgIHVwZGF0ZWRGZWF0dXJlLFxuICAgICAgICAuLi50aGlzLmZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLnNsaWNlKGZlYXR1cmVJbmRleCArIDEpXG4gICAgICBdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgSW1tdXRhYmxlRmVhdHVyZUNvbGxlY3Rpb24odXBkYXRlZEZlYXR1cmVDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogRmVhdHVyZSk6IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5hZGRGZWF0dXJlcyhbZmVhdHVyZV0pO1xuICB9XG5cbiAgYWRkRmVhdHVyZXMoZmVhdHVyZXM6IEZlYXR1cmVbXSk6IEltbXV0YWJsZUZlYXR1cmVDb2xsZWN0aW9uIHtcbiAgICBjb25zdCB1cGRhdGVkRmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gICAgICAuLi50aGlzLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgZmVhdHVyZXM6IFsuLi50aGlzLmZlYXR1cmVDb2xsZWN0aW9uLmZlYXR1cmVzLCAuLi5mZWF0dXJlc11cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbih1cGRhdGVkRmVhdHVyZUNvbGxlY3Rpb24pO1xuICB9XG5cbiAgZGVsZXRlRmVhdHVyZShmZWF0dXJlSW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmRlbGV0ZUZlYXR1cmVzKFtmZWF0dXJlSW5kZXhdKTtcbiAgfVxuXG4gIGRlbGV0ZUZlYXR1cmVzKGZlYXR1cmVJbmRleGVzOiBudW1iZXJbXSkge1xuICAgIGNvbnN0IGZlYXR1cmVzID0gWy4uLnRoaXMuZmVhdHVyZUNvbGxlY3Rpb24uZmVhdHVyZXNdO1xuICAgIGZlYXR1cmVJbmRleGVzLnNvcnQoKTtcbiAgICBmb3IgKGxldCBpID0gZmVhdHVyZUluZGV4ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGZlYXR1cmVJbmRleCA9IGZlYXR1cmVJbmRleGVzW2ldO1xuICAgICAgaWYgKGZlYXR1cmVJbmRleCA+PSAwICYmIGZlYXR1cmVJbmRleCA8IGZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgICBmZWF0dXJlcy5zcGxpY2UoZmVhdHVyZUluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVkRmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gICAgICAuLi50aGlzLmZlYXR1cmVDb2xsZWN0aW9uLFxuICAgICAgZmVhdHVyZXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBJbW11dGFibGVGZWF0dXJlQ29sbGVjdGlvbih1cGRhdGVkRmVhdHVyZUNvbGxlY3Rpb24pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFVwZGF0ZWRQb3NpdGlvbih1cGRhdGVkUG9zaXRpb246IFBvc2l0aW9uLCBwcmV2aW91c1Bvc2l0aW9uOiBQb3NpdGlvbik6IFBvc2l0aW9uIHtcbiAgLy8gVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIHVwZGF0ZWRQb3NpdGlvbiBpcyBtaXNzaW5nIGVsZXZhdGlvblxuICAvLyBhbmQgY29waWVzIGl0IGZyb20gcHJldmlvdXNQb3NpdGlvblxuICBpZiAodXBkYXRlZFBvc2l0aW9uLmxlbmd0aCA9PT0gMiAmJiBwcmV2aW91c1Bvc2l0aW9uLmxlbmd0aCA9PT0gMykge1xuICAgIGNvbnN0IGVsZXZhdGlvbiA9IChwcmV2aW91c1Bvc2l0aW9uOiBhbnkpWzJdO1xuICAgIHJldHVybiBbdXBkYXRlZFBvc2l0aW9uWzBdLCB1cGRhdGVkUG9zaXRpb25bMV0sIGVsZXZhdGlvbl07XG4gIH1cblxuICByZXR1cm4gdXBkYXRlZFBvc2l0aW9uO1xufVxuXG5mdW5jdGlvbiBpbW11dGFibHlSZXBsYWNlUG9zaXRpb24oXG4gIGNvb3JkaW5hdGVzOiBhbnksXG4gIHBvc2l0aW9uSW5kZXhlczogbnVtYmVyW10sXG4gIHVwZGF0ZWRQb3NpdGlvbjogUG9zaXRpb24sXG4gIGlzUG9seWdvbmFsOiBib29sZWFuXG4pOiBhbnkge1xuICBpZiAoIXBvc2l0aW9uSW5kZXhlcykge1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuICBpZiAocG9zaXRpb25JbmRleGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBnZXRVcGRhdGVkUG9zaXRpb24odXBkYXRlZFBvc2l0aW9uLCBjb29yZGluYXRlcyk7XG4gIH1cbiAgaWYgKHBvc2l0aW9uSW5kZXhlcy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCB1cGRhdGVkID0gW1xuICAgICAgLi4uY29vcmRpbmF0ZXMuc2xpY2UoMCwgcG9zaXRpb25JbmRleGVzWzBdKSxcbiAgICAgIGdldFVwZGF0ZWRQb3NpdGlvbih1cGRhdGVkUG9zaXRpb24sIGNvb3JkaW5hdGVzW3Bvc2l0aW9uSW5kZXhlc1swXV0pLFxuICAgICAgLi4uY29vcmRpbmF0ZXMuc2xpY2UocG9zaXRpb25JbmRleGVzWzBdICsgMSlcbiAgICBdO1xuXG4gICAgaWYgKFxuICAgICAgaXNQb2x5Z29uYWwgJiZcbiAgICAgIChwb3NpdGlvbkluZGV4ZXNbMF0gPT09IDAgfHwgcG9zaXRpb25JbmRleGVzWzBdID09PSBjb29yZGluYXRlcy5sZW5ndGggLSAxKVxuICAgICkge1xuICAgICAgLy8gZm9yIHBvbHlnb25zLCB0aGUgZmlyc3QgcG9pbnQgaXMgcmVwZWF0ZWQgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXlcbiAgICAgIC8vIHNvLCB1cGRhdGUgaXQgb24gYm90aCBlbmRzIG9mIHRoZSBhcnJheVxuICAgICAgdXBkYXRlZFswXSA9IGdldFVwZGF0ZWRQb3NpdGlvbih1cGRhdGVkUG9zaXRpb24sIGNvb3JkaW5hdGVzWzBdKTtcbiAgICAgIHVwZGF0ZWRbY29vcmRpbmF0ZXMubGVuZ3RoIC0gMV0gPSBnZXRVcGRhdGVkUG9zaXRpb24odXBkYXRlZFBvc2l0aW9uLCBjb29yZGluYXRlc1swXSk7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVkO1xuICB9XG5cbiAgLy8gcmVjdXJzaXZlbHkgdXBkYXRlIGlubmVyIGFycmF5XG4gIHJldHVybiBbXG4gICAgLi4uY29vcmRpbmF0ZXMuc2xpY2UoMCwgcG9zaXRpb25JbmRleGVzWzBdKSxcbiAgICBpbW11dGFibHlSZXBsYWNlUG9zaXRpb24oXG4gICAgICBjb29yZGluYXRlc1twb3NpdGlvbkluZGV4ZXNbMF1dLFxuICAgICAgcG9zaXRpb25JbmRleGVzLnNsaWNlKDEsIHBvc2l0aW9uSW5kZXhlcy5sZW5ndGgpLFxuICAgICAgdXBkYXRlZFBvc2l0aW9uLFxuICAgICAgaXNQb2x5Z29uYWxcbiAgICApLFxuICAgIC4uLmNvb3JkaW5hdGVzLnNsaWNlKHBvc2l0aW9uSW5kZXhlc1swXSArIDEpXG4gIF07XG59XG5cbmZ1bmN0aW9uIGltbXV0YWJseVJlbW92ZVBvc2l0aW9uKFxuICBjb29yZGluYXRlczogYW55LFxuICBwb3NpdGlvbkluZGV4ZXM6IG51bWJlcltdLFxuICBpc1BvbHlnb25hbDogYm9vbGVhblxuKTogYW55IHtcbiAgaWYgKCFwb3NpdGlvbkluZGV4ZXMpIHtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cbiAgaWYgKHBvc2l0aW9uSW5kZXhlcy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBFcnJvcignTXVzdCBzcGVjaWZ5IHRoZSBpbmRleCBvZiB0aGUgcG9zaXRpb24gdG8gcmVtb3ZlJyk7XG4gIH1cbiAgaWYgKHBvc2l0aW9uSW5kZXhlcy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCB1cGRhdGVkID0gW1xuICAgICAgLi4uY29vcmRpbmF0ZXMuc2xpY2UoMCwgcG9zaXRpb25JbmRleGVzWzBdKSxcbiAgICAgIC4uLmNvb3JkaW5hdGVzLnNsaWNlKHBvc2l0aW9uSW5kZXhlc1swXSArIDEpXG4gICAgXTtcblxuICAgIGlmIChcbiAgICAgIGlzUG9seWdvbmFsICYmXG4gICAgICAocG9zaXRpb25JbmRleGVzWzBdID09PSAwIHx8IHBvc2l0aW9uSW5kZXhlc1swXSA9PT0gY29vcmRpbmF0ZXMubGVuZ3RoIC0gMSlcbiAgICApIHtcbiAgICAgIC8vIGZvciBwb2x5Z29ucywgdGhlIGZpcnN0IHBvaW50IGlzIHJlcGVhdGVkIGF0IHRoZSBlbmQgb2YgdGhlIGFycmF5XG4gICAgICAvLyBzbywgaWYgdGhlIGZpcnN0L2xhc3QgY29vcmRpbmF0ZSBpcyB0byBiZSByZW1vdmVkLCBjb29yZGluYXRlc1sxXSB3aWxsIGJlIHRoZSBuZXcgZmlyc3QvbGFzdCBjb29yZGluYXRlXG4gICAgICBpZiAocG9zaXRpb25JbmRleGVzWzBdID09PSAwKSB7XG4gICAgICAgIC8vIGNoYW5nZSB0aGUgbGFzdCB0byBiZSB0aGUgc2FtZSBhcyB0aGUgZmlyc3RcbiAgICAgICAgdXBkYXRlZFt1cGRhdGVkLmxlbmd0aCAtIDFdID0gdXBkYXRlZFswXTtcbiAgICAgIH0gZWxzZSBpZiAocG9zaXRpb25JbmRleGVzWzBdID09PSBjb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIGNoYW5nZSB0aGUgZmlyc3QgdG8gYmUgdGhlIHNhbWUgYXMgdGhlIGxhc3RcbiAgICAgICAgdXBkYXRlZFswXSA9IHVwZGF0ZWRbdXBkYXRlZC5sZW5ndGggLSAxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZWQ7XG4gIH1cblxuICAvLyByZWN1cnNpdmVseSB1cGRhdGUgaW5uZXIgYXJyYXlcbiAgcmV0dXJuIFtcbiAgICAuLi5jb29yZGluYXRlcy5zbGljZSgwLCBwb3NpdGlvbkluZGV4ZXNbMF0pLFxuICAgIGltbXV0YWJseVJlbW92ZVBvc2l0aW9uKFxuICAgICAgY29vcmRpbmF0ZXNbcG9zaXRpb25JbmRleGVzWzBdXSxcbiAgICAgIHBvc2l0aW9uSW5kZXhlcy5zbGljZSgxLCBwb3NpdGlvbkluZGV4ZXMubGVuZ3RoKSxcbiAgICAgIGlzUG9seWdvbmFsXG4gICAgKSxcbiAgICAuLi5jb29yZGluYXRlcy5zbGljZShwb3NpdGlvbkluZGV4ZXNbMF0gKyAxKVxuICBdO1xufVxuXG5mdW5jdGlvbiBpbW11dGFibHlBZGRQb3NpdGlvbihcbiAgY29vcmRpbmF0ZXM6IGFueSxcbiAgcG9zaXRpb25JbmRleGVzOiBudW1iZXJbXSxcbiAgcG9zaXRpb25Ub0FkZDogUG9zaXRpb24sXG4gIGlzUG9seWdvbmFsOiBib29sZWFuXG4pOiBhbnkge1xuICBpZiAoIXBvc2l0aW9uSW5kZXhlcykge1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuICBpZiAocG9zaXRpb25JbmRleGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IEVycm9yKCdNdXN0IHNwZWNpZnkgdGhlIGluZGV4IG9mIHRoZSBwb3NpdGlvbiB0byByZW1vdmUnKTtcbiAgfVxuICBpZiAocG9zaXRpb25JbmRleGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IHVwZGF0ZWQgPSBbXG4gICAgICAuLi5jb29yZGluYXRlcy5zbGljZSgwLCBwb3NpdGlvbkluZGV4ZXNbMF0pLFxuICAgICAgcG9zaXRpb25Ub0FkZCxcbiAgICAgIC4uLmNvb3JkaW5hdGVzLnNsaWNlKHBvc2l0aW9uSW5kZXhlc1swXSlcbiAgICBdO1xuICAgIHJldHVybiB1cGRhdGVkO1xuICB9XG5cbiAgLy8gcmVjdXJzaXZlbHkgdXBkYXRlIGlubmVyIGFycmF5XG4gIHJldHVybiBbXG4gICAgLi4uY29vcmRpbmF0ZXMuc2xpY2UoMCwgcG9zaXRpb25JbmRleGVzWzBdKSxcbiAgICBpbW11dGFibHlBZGRQb3NpdGlvbihcbiAgICAgIGNvb3JkaW5hdGVzW3Bvc2l0aW9uSW5kZXhlc1swXV0sXG4gICAgICBwb3NpdGlvbkluZGV4ZXMuc2xpY2UoMSwgcG9zaXRpb25JbmRleGVzLmxlbmd0aCksXG4gICAgICBwb3NpdGlvblRvQWRkLFxuICAgICAgaXNQb2x5Z29uYWxcbiAgICApLFxuICAgIC4uLmNvb3JkaW5hdGVzLnNsaWNlKHBvc2l0aW9uSW5kZXhlc1swXSArIDEpXG4gIF07XG59XG5cbmZ1bmN0aW9uIHBydW5lR2VvbWV0cnlJZk5lY2Vzc2FyeShnZW9tZXRyeTogR2VvbWV0cnkpIHtcbiAgc3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XG4gICAgY2FzZSAnUG9seWdvbic6XG4gICAgICBwcnVuZVBvbHlnb25JZk5lY2Vzc2FyeShnZW9tZXRyeSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aUxpbmVTdHJpbmcnOlxuICAgICAgcHJ1bmVNdWx0aUxpbmVTdHJpbmdJZk5lY2Vzc2FyeShnZW9tZXRyeSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgcHJ1bmVNdWx0aVBvbHlnb25JZk5lY2Vzc2FyeShnZW9tZXRyeSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gTm90IGRvd25ncmFkYWJsZVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJ1bmVQb2x5Z29uSWZOZWNlc3NhcnkoZ2VvbWV0cnk6IFBvbHlnb24pIHtcbiAgY29uc3QgcG9seWdvbiA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuXG4gIC8vIElmIGFueSBob2xlIGlzIG5vIGxvbmdlciBhIHBvbHlnb24sIHJlbW92ZSB0aGUgaG9sZSBlbnRpcmVseVxuICBmb3IgKGxldCBob2xlSW5kZXggPSAxOyBob2xlSW5kZXggPCBwb2x5Z29uLmxlbmd0aDsgaG9sZUluZGV4KyspIHtcbiAgICBpZiAocmVtb3ZlSG9sZUlmTmVjZXNzYXJ5KHBvbHlnb24sIGhvbGVJbmRleCkpIHtcbiAgICAgIC8vIEl0IHdhcyByZW1vdmVkLCBzbyBrZWVwIHRoZSBpbmRleCB0aGUgc2FtZVxuICAgICAgaG9sZUluZGV4LS07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBydW5lTXVsdGlMaW5lU3RyaW5nSWZOZWNlc3NhcnkoZ2VvbWV0cnk6IE11bHRpTGluZVN0cmluZykge1xuICBmb3IgKGxldCBsaW5lU3RyaW5nSW5kZXggPSAwOyBsaW5lU3RyaW5nSW5kZXggPCBnZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGg7IGxpbmVTdHJpbmdJbmRleCsrKSB7XG4gICAgY29uc3QgbGluZVN0cmluZyA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzW2xpbmVTdHJpbmdJbmRleF07XG4gICAgaWYgKGxpbmVTdHJpbmcubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBPbmx5IGEgc2luZ2xlIHBvc2l0aW9uIGxlZnQgb24gdGhpcyBMaW5lU3RyaW5nLCBzbyByZW1vdmUgaXQgKGNhbid0IGhhdmUgUG9pbnQgaW4gTXVsdGlMaW5lU3RyaW5nKVxuICAgICAgZ2VvbWV0cnkuY29vcmRpbmF0ZXMuc3BsaWNlKGxpbmVTdHJpbmdJbmRleCwgMSk7XG4gICAgICAvLyBLZWVwIHRoZSBpbmRleCB0aGUgc2FtZVxuICAgICAgbGluZVN0cmluZ0luZGV4LS07XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBydW5lTXVsdGlQb2x5Z29uSWZOZWNlc3NhcnkoZ2VvbWV0cnk6IE11bHRpUG9seWdvbikge1xuICBmb3IgKGxldCBwb2x5Z29uSW5kZXggPSAwOyBwb2x5Z29uSW5kZXggPCBnZW9tZXRyeS5jb29yZGluYXRlcy5sZW5ndGg7IHBvbHlnb25JbmRleCsrKSB7XG4gICAgY29uc3QgcG9seWdvbiA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzW3BvbHlnb25JbmRleF07XG4gICAgY29uc3Qgb3V0ZXJSaW5nID0gcG9seWdvblswXTtcblxuICAgIC8vIElmIHRoZSBvdXRlciByaW5nIGlzIG5vIGxvbmdlciBhIHBvbHlnb24sIHJlbW92ZSB0aGUgd2hvbGUgcG9seWdvblxuICAgIGlmIChvdXRlclJpbmcubGVuZ3RoIDw9IDMpIHtcbiAgICAgIGdlb21ldHJ5LmNvb3JkaW5hdGVzLnNwbGljZShwb2x5Z29uSW5kZXgsIDEpO1xuICAgICAgLy8gSXQgd2FzIHJlbW92ZWQsIHNvIGtlZXAgdGhlIGluZGV4IHRoZSBzYW1lXG4gICAgICBwb2x5Z29uSW5kZXgtLTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBob2xlSW5kZXggPSAxOyBob2xlSW5kZXggPCBwb2x5Z29uLmxlbmd0aDsgaG9sZUluZGV4KyspIHtcbiAgICAgIGlmIChyZW1vdmVIb2xlSWZOZWNlc3NhcnkocG9seWdvbiwgaG9sZUluZGV4KSkge1xuICAgICAgICAvLyBJdCB3YXMgcmVtb3ZlZCwgc28ga2VlcCB0aGUgaW5kZXggdGhlIHNhbWVcbiAgICAgICAgaG9sZUluZGV4LS07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhvbGVJZk5lY2Vzc2FyeShwb2x5Z29uOiBQb2x5Z29uQ29vcmRpbmF0ZXMsIGhvbGVJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IGhvbGUgPSBwb2x5Z29uW2hvbGVJbmRleF07XG4gIGlmIChob2xlLmxlbmd0aCA8PSAzKSB7XG4gICAgcG9seWdvbi5zcGxpY2UoaG9sZUluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=