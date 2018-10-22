/**
 * @fileoverview Runs a function daily to check for any new events from the Eonet API. If there are,
 * process and insert them into the database.
 */
const geocoder = require('local-reverse-geocoder');
const path = require('path');
const schedule = require('node-schedule');

const fetchData = require('./getData/fetchData');
const roundEvents = require('./processData/roundEvents')
const toGeoJSONEvents = require('./processData/toGeoJSONEvents');
const reverseGeocodeEvents = require('./processData/reverseGeocodeEvents');

const mongoose = require('../db/mongoose');
const Event = require('../models/Event');

/**
 * Queries the EONET API and filters for any new events not found in the
 * database. Once those events are found, they are processed then inserted
 * into the database.
 */
const updateDatabase = async () => {
  // Find id of Events already in Database
  const eventsInDB = await Event.find({}, '_id').then(ids => ids.map(id => id._id));
  // Fetch events from EONET API
  const events = await fetchData();
  // Filter for events not in the database
  const newEvents = events.filter(event => !eventsInDB.includes(event.id));
  // Round GeoJSON coordinates to optimize MapBox performance
  const roundedEvents = roundEvents(newEvents);
  // Converts the new events into valid GeoJSON
  const geoJSONEvents = toGeoJSONEvents(roundedEvents);
  // Attach the reverse geocoded location to each event's geometry
  const reverseGeocodedEvents = await reverseGeocodeEvents(geoJSONEvents);
  // Insert processed events into database
  Event.insertMany(reverseGeocodedEvents);
};

/**
 * Starts the reverse geocoding machinery, and then schedules the 
 * updateDatabase function to everyday at midnight.
 */
const scheduleUpdates = () => {
  geocoder.init({
    // Disable download of geographical data we don't need
    load: {
      admin2: false,
      admin3and4: false,
      alternateNames: false,
    },
    // Path of geographical data used to reverse geocode
    dumpDirectory: path.join(__dirname, '../geoLand'),
  }, () => {
    schedule.scheduleJob('0 0 * * *', updateDatabase);
  });
};

module.exports = scheduleUpdates;