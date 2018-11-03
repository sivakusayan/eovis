/**
 * @fileoverview Handles rendering of the map layer concerned
 * with drought events.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { GeoJSONLayer } from 'react-mapbox-gl';

import Event from '../../../propTypes/Event';

class DroughtLayer extends React.Component {
  circleLayout = { visibility: 'visible' };

  circlePaint = { 'circle-color': 'red' };

  render() {
    return (
      <GeoJSONLayer
        data={this.props.geoJSON}
        circleLayout={this.circleLayout}
        circlePaint={this.circlePaint}
      />
    );
  }
}

DroughtLayer.propTypes = {
  /**
   * The geoJSON data used to render this layer.
   */
  geoJSON: PropTypes.arrayOf(Event).isRequired,
};

export default DroughtLayer;
