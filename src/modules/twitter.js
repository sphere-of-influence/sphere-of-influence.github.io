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
window.pinnedTweet = '1199426412740038662';

window.captureTweets = (tweets) => {
    window.tweets = tweets;

    window.twttr.ready( function (twttr) {
  
      twttr.widgets.createTweet(
        window.pinnedTweet,
        document.getElementById('pinned-tweet-hook'),
        {
          theme: 'light'
        }
      ).then(() => {
        
          window.refreshStories(window.tweets);
    
          document.querySelectorAll('.skeleton-tweet').forEach(skeleton => {
            skeleton.classList.add('hidden');
          });
    
      });
    
    
    });

};
