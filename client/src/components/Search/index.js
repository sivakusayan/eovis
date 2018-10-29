/**
 * @fileoverview This is the main file for the Search Component of our application.
 * It allows the user to search for events, and returns the server's response to be 
 * rendered to the user. The results can be filtered if the user wishes.
 */

import React from 'react';

import SearchBarContainer from '../../containers/Search/SearchBarContainer';
import Filters from './Filters/Filters';
import SearchResultsContainer from '../../containers/Search/SearchResultsContainer';

const Search = ({ setFilters, queryBuilder }) => (
  <div>
    <SearchBarContainer queryBuilder={queryBuilder} />
    <Filters setFilters={setFilters} />
    <SearchResultsContainer />
  </div>
);

export default Search;
