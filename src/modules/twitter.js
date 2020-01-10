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

window.captureTweets = function(tweets) {

    window.twttr.ready( function (twttr) {

        window.refreshStories(tweets);
  
        document.querySelectorAll('.skeleton-tweet').forEach(skeleton => {
          skeleton.classList.add('hidden');
        });

    
    });
};
