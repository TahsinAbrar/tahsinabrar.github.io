// Use the custom-domain measurement ID selected by the owner.
// Local previews must never send visits to the production property.
(function () {
  if (location.hostname !== 'tahsinabrar.com' && location.hostname !== 'www.tahsinabrar.com') return;
  if (window.__portfolioAnalytics) return;
  window.__portfolioAnalytics = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-0CVZ3VWFXZ');
  // GA4 Enhanced Measurement handles browser-history navigation; do not also
  // emit manual page_view events, which would double-count those visits.
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0CVZ3VWFXZ';
  document.head.appendChild(script);
})();
