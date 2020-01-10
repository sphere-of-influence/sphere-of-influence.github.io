
let path = window.location.hash.split('/');

if (path[1] === '') {
  console.log('home');
}

function reload() {
    window.location.reload(true);
}

window.addEventListener('popstate', reload);

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

function setupMapPage(options) {
    
    const page = {
        nameEls: document.querySelectorAll('.js-map-name'),
        strapEls: document.querySelectorAll('.js-map-strap'),
        followingEl: document.querySelector('.js-map-following'),
        followingLeadEl: document.querySelector('.js-map-following-lead'),
        rootEl: document.documentElement
    };
    
    page.nameEls.forEach(element => {
        element.innerHTML = options.name;
    });

    page.strapEls.forEach(element => {
        element.innerHTML = options.strap;
    });

    options.handles = options.handles || [];
    if (options.handles.length > 0) {
      options.handles.forEach(handle => {
          const link = document.createElement('a');
          link.href = `//twitter.com/${handle}`;
          link.innerHTML = `@${handle}`;
          page.followingEl.appendChild(link);
          link.insertAdjacentHTML('afterend', ' ');
      });
    } else {
          page.followingLeadEl.parentElement.removeChild(page.followingLeadEl);
    }

    page.rootEl.style.setProperty('--color', options.color);

    document.title = `${options.name} - ${options.strap}`

}

getMapJson()
  .then(mapJson => {

    setupMapPage(mapJson);
    window.initMap(mapJson);

    requestTweets('stale', mapJson)
    .then(data => {
      window.captureTweets(data.tweets);
    }); 
  
    requestTweets('fresh', mapJson)
    .then(data => {
      window.captureTweets(data.tweets);
    }); 
      
  })
  .catch(reason => {
    console.error(reason);
      const options = {
        name : "404 - Map not found",
        strap : "We couldn't find a map here, is the link correct?",
        color : ""
      };
      setupMapPage(options);
  });