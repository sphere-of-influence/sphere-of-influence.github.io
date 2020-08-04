/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import Map from 'ol/Map';
import View from 'ol/View';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import { Cluster } from 'ol/source';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {
  Icon, Style, Fill, Stroke, Circle, Text,
} from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import timeSince from './time-since';

window.initMap = (options) => {
  const color = document.documentElement.style.getPropertyValue('--color');

  function adjust(_color, amount) {
    return `#${_color.replace(/^#/, '').replace(/../g, (c) => (`0${Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)}`).substr(-2))}`;
  }
  const iconSrc = `<svg width="60px" height="60px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <rect x="16.5" y="31" style="fill:#871B1B;" width="10px" height="6px"/>
                <path style="fill:#424A60;" d="M3.5,0c-0.552,0-1,0.447-1,1v3v55c0,0.553,0.448,1,1,1s1-0.447,1-1V4V1C4.5,0.447,4.052,0,3.5,0z"/>
                <rect x="4.5" y="4" style="fill:${adjust(color, 33)};" width="22px" height="29px"/>
                <path style="fill:${color};" d="M26.5,9v24h-6c-2.209,0-4,1.791-4,4c0,2.209,1.791,4,4,4h4h33l-11-16l11-16H26.5z"/>
                <path style="fill:${adjust(color, 25)};" d="M16.5,37c0,2.209,1.791,4,4,4h4h2v-8h-6C18.291,33,16.5,34.791,16.5,37z"/>
                </svg>`;

  // map & sidebar related interaction events
  const storyFocusedEvent = (story) => new CustomEvent('storyFocused', {
    detail: story,
  });

  const vectorSource = new SourceVector({
    features: [],
    wrapX: false,
  });

  const vectorSourceFree = new SourceVector({
    features: [],
    wrapX: false,
  });

  const clusterSource = new Cluster({
    distance: 28,
    source: vectorSource,
    wrapX: false,
  });


  const styleCache = {};
  const clusterLayer = new LayerVector({
    source: clusterSource,
    style(feature) {
      const features = feature.get('features');
      const size = features.length;
      let style = styleCache[size];
      if (size > 1) {
        if (!style) {
          style = [new Style({
            image: new Icon({
              anchor: [1.15, 1.5],
              anchorXUnits: 'fraction',
              anchorYUnits: 'fraction',
              src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg width="16px" height="16px" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle fill="${color}" cx="8" cy="8" r="8"/></svg>`)}`,
              scale: 0.9,
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff',
              }),
              scale: 0.9,
              offsetX: -9,
              offsetY: -14,
            }),
          }),
          features[0].getStyle(),
          ];
          styleCache[size] = style;
        }
      } else {
        style = features[0].getStyle(); // we're at 1, get the features actual style
      }
      return style;
    },
  });

  const vectorLayer = new LayerVector({
    source: vectorSourceFree,
  });

  // eslint-disable-next-line no-param-reassign
  options.view.projection = options.view.projection || 'EPSG:3857';
  if (options.proj4String || false) {
    proj4.defs(
      options.view.projection,
      options.proj4String,
    );
    register(proj4);
    // eslint-disable-next-line no-param-reassign
    options.view.center = fromLonLat(options.view.center, options.view.projection);
  }

  const map = new Map({
    target: 'map',
    layers: options.layers || [
      new LayerTile({
        source: new SourceOSM(),
      }),
      clusterLayer,
    ],
    view: new View(options.view),
  });

  // this is called when there's things like window resizes going on
  // the slight delay ensures that any animations etc have finished
  // before we re-render the map with the .updateSize() method
  const delayedResize = () => setTimeout(() => {
    map.updateSize();
  }, 500);

  // after initial load the map might be a bit skew,
  // remedy this by waiting half a second or so then trigger
  // the resize method
  document.addEventListener('DOMContentLoaded', delayedResize, false);
  // bespoke event incase map container is changed externally
  document.addEventListener('mapWrapperResize', delayedResize, false);


  // Following: https://openlayers.org/en/latest/examples/popup.html?q=popup
  // to gain popup fuctionality

  const popup = document.getElementById('popup');

  // Create an overlay to anchor the popup to the map.
  const overlay = new Overlay({
    element: popup,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  map.addOverlay(overlay);
  popup.classList.add('hidden');

  const observerCallback = (entries, observer) => {
    const rootBottom = observer.root
      ? observer.root.getBoundingClientRect().bottom : window.innerHeight;
    entries.forEach((entry) => {
      const el = entry.target;
      if ((!entry.isIntersecting
             && entry.boundingClientRect.y > rootBottom)
             || el.twitterEl.childNodes.length >= 1) {
        return;
      }
      observer.unobserve(entry.target);
      window.twttr.widgets.createTweet(
        `${el.dataset.storyId}`,
        el.twitterEl,
        {
          theme: 'light',
        },
      ).then(() => {
        el.twitterEl.className = 'tweet';
        el.twitterEl.touched = false;

        el.twitterEl.parentElement.addEventListener('touchstart', (e) => {
          if (window.matchMedia('(max-width: 551px)').matches) {
            e.stopPropagation();
            if (el.twitterEl.touched === true) {
              const target = `https://twitter.com/i/web/status/${el.dataset.storyId}`;
              let tryWindow = null;
              tryWindow = window.open(target);
              if (tryWindow === null) { // Safari is a petchalent child
                window.location.href = target;
              }
              el.twitterEl.touched = false;
            }
            el.twitterEl.touched = true;
            setTimeout(() => {
              el.twitterEl.touched = false;
            }, 250);
          }
        });
      });
    });
  };

  const sidebarObserver = new IntersectionObserver(observerCallback,
    { rootMargin: '600px 0px 600px 0px' });

  const popupObserver = new IntersectionObserver(observerCallback,
    {
      root: popup,
      rootMargin: '100px 0px 100px 0px',
    });

  function addSidebarStories(stories) {
    const sidebarStories = document.getElementById('sidebar-stories');
    stories.reverse().forEach((story) => {
      if (document.getElementById(`story-${story.id}`) != null) return;

      const html = `<div 
                data-story-id='${story.id}' 
                id='story-${story.id}'
                class='story link observable'>
                    <time datetime='20:00'>${timeSince(story.date)}</time>
                    <div id='story-${story.id}-twitter-hook' class='skeleton-tweet'></div>
                    <!--<div class='place-name'>${story.place.name}</div>-->
                </div>`;

      const virtual = document.createElement('div');
      virtual.innerHTML = html.trim();

      const newStoryEl = virtual.firstChild;
      // eslint-disable-next-line prefer-destructuring
      newStoryEl.twitterEl = newStoryEl.children[1];
      sidebarStories.prepend(newStoryEl);
    });

    document.querySelectorAll('.story.observable').forEach((el) => { sidebarObserver.observe(el); });
    document.body.classList.remove('loading');
    document.body.classList.add('loading-done');
  }

  // for usage by plugins to add features and skip story crafting
  window.addFeature = function addFeature(id, longitude, latitude, style, data) {
    const feature = new Feature(new Point(fromLonLat([longitude, latitude])));
    if (options.proj4String || false) {
      feature.getGeometry().transform('EPSG:3857', options.view.projection);
    }
    feature.setStyle(style);
    feature.setId(id);
    feature.data = data;
    vectorSourceFree.addFeature(feature);
    map.removeLayer(vectorLayer);
    map.addLayer(vectorLayer);
  };

  function addFeatures(stories) {
    let feature; const
      features = [];
    stories.forEach((story) => {
      if (story.place == null) return;

      feature = new Feature(new Point(fromLonLat([story.longitude, story.latitude])));
      feature.setId(story.id);
      if (options.proj4String || false) {
        feature.getGeometry().transform('EPSG:3857', options.view.projection);
      }
      // copy all the story data across to the feature
      feature.data = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const k in story) {
        if ({}.hasOwnProperty.call(story, k)) {
          feature.data[k] = story[k];
        }
      }

      feature.setStyle(new Style({
        image: new Icon({
          anchor: [0.15, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSrc)}`,
          scale: 0.33,
          rotation: 0.261799,
        }),
      }));
      feature.data.iconSrc = iconSrc;
      features.push(feature);
    });

    vectorSource.addFeatures(features);
    // map.removeLayer(vectorLayer);
    // map.addLayer(vectorLayer);

    return features;
  }

  function focusStoryById(id) {
    const evt = storyFocusedEvent({
      id,
    });
    document.dispatchEvent(evt);
  }


  function scrollTo(id) {
    // if (window.matchMedia("(min-width: 550px)").matches) {

    document.querySelectorAll('.story.link').forEach((storyEl) => {
      storyEl.classList.remove('focused');
    });

    const storyEl = document.getElementById(`story-${id}`);
    if (storyEl) {
      storyEl.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
      storyEl.classList.add('focused');
    }
  }

  function panTo(center) {
    // zoom out.. so the user doesn't feel too flung around
    // then pan..
    // then zoom in slightly to focus the user
    map.getView().animate({
      zoom: 6,
      duration: 250,
    }, {
      center,
      duration: 250,
    }, {
      zoom: 6.5,
      duration: 250,
    });
  }

  function tryPopup(feature, pan = true, orphan = false, features = []) {
    try {
      const coordinate = orphan
        ? map.getView().getCenter()
        : feature.getGeometry().getCoordinates();

      // show the popup, its a feature which has been clicked
      // but wait for the panning animation to finish
      // otherwise there will be jank as the setPositions clash

      popup.classList.remove('hidden');
      overlay.setPosition(coordinate);

      if (features.length === 0) {
        popup.innerHTML = feature.data.popupInnerHTML || '<div class="tweet" id="popup-twitter-hook"></div>';
        const fetchTweet = 'fetchTweet' in feature.data ? feature.data.fetchTweet : true;
        if (fetchTweet) {
          window.twttr.widgets.createTweet(
            `${feature.data.id}`,
            document.getElementById('popup-twitter-hook'), {
              theme: 'light',
              linkColor: '#CD0000',
            },
          );
        }
      } else {
        popup.innerHTML = '<div class="popup-list"></div>';

        features.forEach((f) => {
          const tweetHook = document.createElement('div');
          tweetHook.id = `popup-twitter-hook--${f.data.id}`;
          tweetHook.className = 'popup-list-row';
          tweetHook.setAttribute('data-story-id', f.data.id);
          const twitterEl = document.createElement('div');
          twitterEl.className = 'skeleton-tweet';
          tweetHook.appendChild(twitterEl);
          tweetHook.twitterEl = twitterEl;
          popup.firstElementChild.appendChild(tweetHook);
          popupObserver.observe(tweetHook);
        });
      }

      if (orphan) popup.classList.add('orphan');
      else popup.classList.remove('orphan');

      if (pan && !orphan) panTo(coordinate);
    } catch (err) {
      // no need to log this since these will be common
      // console.error('Attempted popup on non-feature')
    }
  }

  // Add a click handler to the map to render the popup.
  map.on('singleclick', (evt) => {
    // hide the popup, it might be a click anywhere
    popup.classList.add('hidden');
    popupObserver.disconnect(); // remove its observations
    map.forEachFeatureAtPixel(evt.pixel, (feature) => {
      let target = feature;
      // check if this is being attempted on a cluster rather than a
      // feature directly
      const possibleClusterFeatures = feature.get('features') || null;

      if (possibleClusterFeatures && possibleClusterFeatures.length === 1) {
        target = feature.get('features')[0];
      } else if (possibleClusterFeatures && possibleClusterFeatures.length > 1) {
        tryPopup(feature, true, false, possibleClusterFeatures);
      } else if (target == null) {
        return;
      }

      const id = target.getId();
      if (id == null) return;

      try {
        focusStoryById(id);
      } catch (err) {
        // ..
      }
    });
  });

  function handleStoryClick(e) {
    if (e.target.href) return;
    focusStoryById(e.target.dataset.storyId);
    e.preventDefault();
  }

  // bespoke event for when a story is set into focus external to the map
  // eg. someone clicking on the menu
  document.addEventListener('storyFocused', (evt) => {
    // hide any popups already open
    popup.classList.add('hidden');

    const feature = vectorSource.getFeatures()
      .concat(...vectorSourceFree.getFeatures())
      .filter((f) => f.getId() === evt.detail.id);

    feature[0] = feature[0] || false;
    if (feature[0]) {
      tryPopup(feature[0], (feature[0].data.place != null), (feature[0].data.place == null));
      scrollTo(evt.detail.id);
    } else {
      tryPopup({
        data: {
          id: evt.detail.id,
        },
      }, false, true);
      scrollTo(evt.detail.id);
    }
  }, false);

  function polygonCenter(arr) {
    const x = arr.map((_x) => _x[0]);
    const y = arr.map((_x) => _x[1]);
    const cx = (Math.min(...x) + Math.max(...x)) / 2;
    const cy = (Math.min(...y) + Math.max(...y)) / 2;
    return [cx, cy];
  }

  function registerSidebarStories() {
    document.querySelectorAll('.story.link').forEach((storyEl) => {
      if (storyEl.classList.contains('registered')) return;
      storyEl.addEventListener('click', handleStoryClick);
    });
  }

  function refreshStories(stories = []) {
    // eslint-disable-next-line no-param-reassign
    stories = stories.map((story) => {
      const _story = story;
      if (story.place !== null && Object.keys(story.place).length > 0) {
        if (story.place_is_found === 'True') {
          [_story.longitude,
            _story.latitude] = [story.place.longitude, story.place.latitude];
        } else {
          [_story.longitude,
            _story.latitude] = polygonCenter(story.place.bounding_box.coordinates[0]);
        }
      } else _story.place = null;

      return _story;
    });

    addFeatures(stories);
    addSidebarStories(stories);
    registerSidebarStories(stories);
  }

  function toggleFeed(show) {
    if (show) {
      document.body.classList.remove('hide-feed');
    } else {
      document.body.classList.add('hide-feed');
    }
  }

  /**
     *      globally bootstrap key items
     */
  window.refreshStories = refreshStories;
  window.toggleFeed = toggleFeed;
  window.mapCenter = () => map.getView().getCenter();
  window.map = map;
};
