/**
 * @fileoverview This is the main file for the Search Component of our application.
 * It allows the user to search for events, and returns the server's response to be 
 * rendered to the user. The results can be filtered if the user wishes.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Event from '../../propTypes/Event';

import SearchBar from './SearchBar';
import Filters from './Filters/Filters';
import SearchResults from './SearchResults';

const Search = ({
  events, setFilters, filters, debouncedSearch,
  isLoading, error,
}) => (
  <div>
    <SearchBar
      debouncedSearch={debouncedSearch}
    />
    <Filters
      filters={filters}
      setFilters={setFilters}
    />
    <SearchResults
      events={events}
      isLoading={isLoading}
      error={error}
    />
  </div>
);

Search.propTypes = {
  /**
   * A debounced function to search for events specifying
   * the query and filters.
   */
  debouncedSearch: PropTypes.func.isRequired,
  /**
   * Array of EventGeoJSON. The current events being
   * used in the application.
   */
  events: PropTypes.arrayOf(Event).isRequired,
  /**
   * A collection of functions that can set the filters
   * of their respective fields for searching.  
   */
  setFilters: PropTypes.shape({
    latitude: PropTypes.func.isRequired,
    longitude: PropTypes.func.isRequired,
    radius: PropTypes.func.isRequired,
    addToCategories: PropTypes.func.isRequired,
    removeFromCategories: PropTypes.func.isRequired,
    startDate: PropTypes.func.isRequired,
    endDate: PropTypes.func.isRequired,
  }).isRequired,
  /**
   * A collection of values that describe the current
   * filters used in the application.
   */
  filters: PropTypes.shape({
    locationFilter: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
    }).isRequired,
    categoriesFilter: PropTypes.arrayOf(PropTypes.number).isRequired,
    startDateFilter: PropTypes.number.isRequired,
    endDateFilter: PropTypes.number.isRequired,
  }).isRequired,
  /**
   * True if the search results are loading, false otherwise.
   */
  isLoading: PropTypes.bool.isRequired,
  /**
   * True if the most recent search request gave back an 
   * error, false otherwise.
   */
  error: PropTypes.bool.isRequired,
};

export default Search;
