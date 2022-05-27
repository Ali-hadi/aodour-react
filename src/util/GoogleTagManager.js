export const gtagEvent = (event, options) => {
  // window.dataLayer = window.dataLayer || [];
  // function gtag() {
  //   window.dataLayer.push(arguments);
  // }
  // gtag("js", new Date());
  // gtag("config", "AW-835343819");

  window.gtag("event", event, options);
};
