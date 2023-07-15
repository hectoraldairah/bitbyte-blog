const { DateTime } = require('luxon');

module.exports = {
  postDate: function (dateObj) {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  },

  w3Date: function (value) {
    const dateObject = new Date(value);
    return dateObject.toLocaleDateString();
  },

  logger: function (value) {
    console.log(value);
  },

  stars: function (rating) {
    console.log(rating, 'rating');
    return ['☆', '☆', '☆', '☆', '☆']
      .map((item, idx) => (idx + 1 <= rating ? '★' : item))
      .toString()
      .replaceAll(',', ' ');
  },

  previewDate: function (dateObj) {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc',
    })
      .setLocale('en-US')
      .toISODate();
  },
};
