function reload() {
    console.log('Reloading!');
    window.location.reload();
}

window.addEventListener('hashchange', reload);
window.addEventListener('popstate', reload);

const path = window.location.hash.split('/');

async function getMapJson() 
{
  let response = await fetch(`/maps/${path[1]}.json`);
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

function setPageEls(options) {

    const page = {
        nameEls: document.querySelectorAll('.js-map-name'),
        strapEls: document.querySelectorAll('.js-map-strap'),
        rootEl: document.documentElement
    };
    
    page.nameEls.forEach(element => {
        element.innerHTML = options.name;
    });

    page.strapEls.forEach(element => {
        element.innerHTML = options.strap;
    });

    page.rootEl.style.setProperty('--color', options.color)

}

getMapJson()
  .then(mapJson => {

    window.initMap(mapJson);
    setPageEls(mapJson);

    requestTweets('stale', mapJson)
    .then(data => {
      window.captureTweets(data.tweets);
    }); 
  
    requestTweets('nothing', mapJson)
    .then(data => {
      window.captureTweets(data.tweets);
    }); 
      
  })
  .catch(reason => {
      const options = {
        name : "404 - Map not found",
        strap : "We couldn't find a map here, is the link correct?",
        color : ""
      };
      setPageEls(options);
  });