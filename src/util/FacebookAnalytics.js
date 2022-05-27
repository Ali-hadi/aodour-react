export const fbqTrack = (event, options) => {
  if(options.content_ids !== '["LPK3474636819706"]' && options.content_id !== "LPK3474636819706"){
    window.fbq("track", event, options);
  }
};

export const fbqPageView = () => {
  if (window.fbq) {
    window.fbq("track", "PageView");
  }
};
