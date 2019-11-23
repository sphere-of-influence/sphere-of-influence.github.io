window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
  
    return t;
  }(document, "script", "twitter-wjs"));

// Setup done ->
window.pinnedTweet = '1198025479904776192';

window.twttr.ready( function (twttr) {

  twttr.widgets.createTweet(
    window.pinnedTweet,
    document.getElementById('sidebar-stories'),
    {
      theme: 'light'
    }
  );

  window.refreshStories();

});