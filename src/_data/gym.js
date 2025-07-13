const fetch = require('@11ty/eleventy-fetch');
require('dotenv').config();

module.exports = async function () {
  const HEAVY_API_KEY = process.env.HEAVY_API_KEY;
  const URL =
    'https://api.hevyapp.com/v1/workouts/events?page=1&pageSize=10&since=1970-01-01T00%3A00%3A00Z';

  try {
    const json = await fetch(URL, {
      duration: '2d',
      type: 'json',
      fetchOptions: {
        headers: {
          accept: 'application/json',
          'api-key': HEAVY_API_KEY,
        },
      },
    });

    return json.events;
  } catch (error) {
    console.error(`Fetch heavy API failed: ${error}`);
    return [];
  }
};
