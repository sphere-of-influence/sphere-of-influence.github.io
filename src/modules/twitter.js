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

function captureTweets(tweets) {

    window.twttr.ready( function (twttr) {
  
      twttr.widgets.createTweet(
        window.pinnedTweet,
        document.getElementById('pinned-tweet-hook'),
        {
          theme: 'light'
        }
      ).then(() => {
        
          window.refreshStories(tweets);
    
          document.querySelectorAll('.skeleton-tweet').forEach(skeleton => {
            skeleton.classList.add('hidden');
          });
    
      });
    
    
    });
}

async function getMapJson() 
{
  let response = await fetch(`/map.json`);
  let data = await response.json();
  return data;
}

async function requestTweets(demand, mapJson) 
{
  let response = await fetch(`http://0.0.0.0:5000/?demand=${demand}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mapJson)
  });
  let data = await response.json();
  return data;
}

getMapJson()
  .then(mapJson => {

    window.initMap(mapJson);

    requestTweets('stale', mapJson)
    .then(data => {
      captureTweets(data.tweets);
    }); 
  
    requestTweets('dummy', mapJson)
    .then(data => {
      captureTweets(data.tweets);
    }); 
      
  });