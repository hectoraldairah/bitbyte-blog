const { DateTime } = require("luxon");

module.exports = {
  postDate: function (dateObj) {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  },

  w3Date: function (value) {
    const dateObject = new Date(value);
    return dateObject.toLocaleDateString();
  },
};
