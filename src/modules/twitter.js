window.twttr = ((d, s, id) => {
  const fjs = d.getElementsByTagName(s)[0];
  const t = window.twttr || {};
  if (d.getElementById(id)) return t;
  const js = d.createElement(s);
  js.id = id;
  js.src = 'https://platform.twitter.com/widgets.js';
  fjs.parentNode.insertBefore(js, fjs);
  // eslint-disable-next-line no-underscore-dangle
  t._e = [];
  t.ready = (f) => {
    // eslint-disable-next-line no-underscore-dangle
    t._e.push(f);
  };

  return t;
})(document, 'script', 'twitter-wjs');

window.captureTweets = (tweets) => {
  window.twttr.ready(() => {
    window.refreshStories(tweets);
    document.querySelectorAll('.skeleton-tweets .skeleton-tweet').forEach((og) => {
      og.classList.add('hidden');
    });
  });
};
