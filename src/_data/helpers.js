module.exports = {
    getLinkActiveState(itemUrl, pageUrl) {
      let response = '';
  
      if (itemUrl === pageUrl) {
        response = ' aria-current="page" data-state="active"';
      }
  
      return response;
    },
  };
  