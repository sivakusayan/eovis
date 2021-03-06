/**
 * @fileoverview Renders the mapbox map for the user to interact with. 
 * 
 * The data is divided into four individual layers for independent styling. 
 * The PointLayer, LineStringLayer, and PolygonLayer all contain GeoJSON
 * Point, LineString, and Polygon events respectively. The LineString layer
 * is augmented with its endpoints to show the user what the most recent
 * location was.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';

import STYLE from '../../constants/map/MAPBOX_STYLE';

import PointLayerContainer from '../../containers/Map/Layers/PointLayerContainer';
import LineStringLayerContainer from '../../containers/Map/Layers/LineStringLayerContainer';
import LineStringEndpointsLayerContainer from '../../containers/Map/Layers/LineStringEndpointsLayerContainer';
import PolygonLayerContainer from '../../containers/Map/Layers/PolygonLayerContainer';
import EventPopup from '../../containers/Map/EventPopupContainer';

let MAPBOX_API_KEY;
if (process.env.NODE_ENV === 'production') {
  MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
} else {
  // We require here instead of import since import isn't valid
  // inside else clause.
  MAPBOX_API_KEY = require('../../constants/map/MAPBOX_API_KEY').default;
}

/**
 * Limiting the maxZoom of the map increases performance,although
 * it shouldn't matter too much right now as our dataset is still small. 
 * Still good to have, especially since it doesn't limit the user too 
 * much in the context of this app.
 * 
 * https://www.mapbox.com/help/working-with-large-geojson-data/
 */
const Map = ReactMapboxGl({
  accessToken: MAPBOX_API_KEY,
  minZoom: 2,
  maxZoom: 12,
  logoPosition: 'top-left',
});

const EventMap = ({
  setSelectedEvent,
  resetSelectedEvent,
  hasSelectedEvent,
  doneLoading,
  center,
  zoom,
  updateCenter,
  updateZoom,
}) => (
  <Map
    style={STYLE}
    containerStyle={{
      height: '100%',
      width: '100%',
    }}
    // Remember that mapbox zoom property is wrapped
    // inside an array.
    // https://github.com/alex3165/react-mapbox-gl/issues/57
    zoom={[zoom]}
    center={center}
    onStyleLoad={doneLoading}
    onClick={setSelectedEvent}
    onMouseDown={resetSelectedEvent}
    onTouchStart={resetSelectedEvent}
    onDragEnd={updateCenter}
    onZoomEnd={updateZoom}
  >

    <PointLayerContainer />
    <LineStringLayerContainer />
    <LineStringEndpointsLayerContainer />
    <PolygonLayerContainer />

    {hasSelectedEvent && <EventPopup />}
  </Map>
);

EventMap.propTypes = {
  /**
   * See the redux store inside of the 'state' folder for more
   * information on the selected event state.
   */
  setSelectedEvent: PropTypes.func.isRequired,
  resetSelectedEvent: PropTypes.func.isRequired,
  hasSelectedEvent: PropTypes.bool.isRequired,
  /**
   * Finishes one of the requirements for the loading screen to
   * stop. Once event data is hydrated as well, the application
   * will be shown.
   */
  doneLoading: PropTypes.func.isRequired,
  center: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
  updateCenter: PropTypes.func.isRequired,
  updateZoom: PropTypes.func.isRequired,
};

export default EventMap;
