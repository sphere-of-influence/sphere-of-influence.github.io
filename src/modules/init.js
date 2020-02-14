let path = window.location.hash.split('/');
let is_home = false;

if (path.length < 2 || path[1] === '') {
  is_home = true;
  path = ["#!home", "sphere-of-influence"];
}

function reload() {
  throw new Error((function(){
    window.location.reload(true);
  })());
}

window.addEventListener('popstate', reload);
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

async function getMapIndex() {
  let response = await fetch(`/maps/index.json`);
  let data = await response.json();
  return data;
}

async function getMapJson() {
  let response = await fetch(`/maps/${path[1]}.json`);
  let data = await response.json();
  return data;
}

async function requestTweets(demand, mapJson) {
  let response = await fetch(`https://sphere-of-influence.herokuapp.com/?demand=${demand}`, {
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

function setupPage(options) {

  const page = {
    nameEls: document.querySelectorAll('.js-map-name'),
    strapEls: document.querySelectorAll('.js-map-strap'),
    followingEl: document.querySelector('.js-map-following'),
    followingLeadEl: document.querySelector('.js-map-following-lead'),
    metaTitleEls: document.querySelectorAll('[property="og:title"], [property="twitter:title"]'),
    metaDescriptionEls: document.querySelectorAll('[property="og:description"], [property="twitter:description"]'),
    mapListEl: document.querySelector('.js-map-list'),
    rootEl: document.documentElement
  };


  page.nameEls.forEach(element => {
    element.innerHTML = options.name;
  });

  page.strapEls.forEach(element => {
    element.innerHTML = options.strap;
  });

  page.metaTitleEls.forEach(element => {
    element.setAttribute('content', options.name);
  });

  page.metaDescriptionEls.forEach(element => {
    element.setAttribute('content', options.strap);
  });

  options.handles = options.handles || [];
  if (options.handles.length > 0) {
    options.handles.forEach(handle => {
      const link = document.createElement('a');
      const pic = new Image();
      pic.src = `https://avatars.io/twitter/${handle}`;
      pic.className = 'profile-pic';
      link.href = `//twitter.com/${handle}`;
      link.innerHTML = `@${handle}`;
      link.prepend(pic);
      page.followingEl.appendChild(link);
      link.insertAdjacentHTML('afterend', ' ');
    });
  } else {
    page.followingLeadEl.parentElement.removeChild(page.followingLeadEl);
  }

  page.rootEl.style.setProperty('--color', options.color);

  document.title = `${options.name} - ${options.strap}`;

  if ('scripts' in options) {
    options.scripts.forEach(script => {
      const s = document.createElement('script');
      s.setAttribute('src', `maps/scripts/${script}.js`);
      document.body.appendChild(s);
    });
  }

  getMapIndex().then(index => {
    Object.keys(index).forEach(function(slug) {
      const link = document.createElement('a');
      link.href = `/#!/${slug}`;
      link.classList.add('more-map-link');
      link.innerHTML = index[slug];
      page.mapListEl.appendChild(link);
      link.insertAdjacentHTML('beforebegin', '<br>');
    });
  });

}

// for the splash
document.body.classList.add('loading');

getMapJson()
  .then(mapJson => {

    setupPage(mapJson);
    window.initMap(mapJson);

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
    console.error(reason);
    const options = {
      name: "404 - Map not found",
      strap: "We couldn't find a map here, is the link correct?",
      color: ""
    };
    setupPage(options);
  });