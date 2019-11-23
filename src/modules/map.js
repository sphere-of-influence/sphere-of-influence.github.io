import Map from 'ol/Map'
import View from 'ol/View'
import SourceVector from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import LayerVector from 'ol/layer/Vector'
import LayerTile from 'ol/layer/Tile'
import SourceOSM from 'ol/source/OSM'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import {
    Icon,
    Circle as CircleStyle,
    Fill,
    Style,
    Text
} from 'ol/style'
import {
    fromLonLat,
    toLonLat
} from 'ol/proj'
import {
    toStringHDMS
} from 'ol/coordinate';
import Overlay from 'ol/Overlay'
import Modify from 'ol/interaction/Modify'
import Collection from 'ol/Collection'

import timeSince from './time-since';

// map & sidebar related interaction events
const mapWrapperResizeEvent = new Event('mapWrapperResize');
const storyFocusedEvent = (story) => {
    return new CustomEvent('storyFocused', {
        detail: story
    })
};

const vectorSource = new SourceVector({
    features: [],
    wrapX: false
});

const vectorLayer = new LayerVector({
    source: vectorSource
});

const map = new Map({
    target: 'map',
    layers: [
        new LayerTile({
            source: new SourceOSM()
        })
    ],
    view: new View({
        center: [-1146103.7497373186, 7312647.439038483],
        zoom: 6,
        minZoom: 4.5,
        maxZoom: 7.5
    })
});

// this is called when there's things like window resizes going on
// the slight delay ensures that any animations etc have finished
// before we re-render the map with the .updateSize() method
const delayedResize = () => {
    return setTimeout(() => {
        map.updateSize()
    }, 500)
}

// after initial load the map might be a bit skew,
// remedy this by waiting half a second or so then trigger
// the resize method
document.addEventListener('DOMContentLoaded', delayedResize, false)
// bespoke event incase map container is changed externally
document.addEventListener('mapWrapperResize', delayedResize, false)


// Following: https://openlayers.org/en/latest/examples/popup.html?q=popup
// to gain popup fuctionality

let popup = document.getElementById('popup');

// Create an overlay to anchor the popup to the map.
let overlay = new Overlay({
    element: popup,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

map.addOverlay(overlay);
popup.classList.add('hidden');


// Add a click handler to the map to render the popup.
map.on('singleclick', function (evt) {
    // hide the popup, it might be a click anywhere
    popup.classList.add('hidden');
    map.forEachFeatureAtPixel(evt.pixel, (feature) => {

        if(feature == null) return;

        let id = feature.getId();

        if (id == null) return;

        try {
            focusStoryById(id);
        } catch (err) {
            // .. 
        }

    });
});

function handleStoryClick(e) {

    if(e.target.href)
        return;

    focusStoryById(e.target.dataset.storyId);
    e.preventDefault();
}

function addSidebarStories(stories) {
    const sidebarStories = document.getElementById('sidebar-stories');
    stories.forEach( story => {

        if(document.getElementById('story-'+story.id) != null) return;
        
        const html = `<div 
        data-story-id='${story.id}' 
        id='story-${story.id}'
        class='story link'>
            <time datetime='20:00'>${timeSince(story.date)}</time>
            <div id='story-${story.id}-twitter-hook' class='tweet'></div>
        </div>`;

        let virtual = document.createElement('div');
        virtual.innerHTML = html.trim();
      
        const newStoryEl = virtual.firstChild;
        sidebarStories.appendChild(newStoryEl);

        window.twttr.widgets.createTweet(
        `${story.id}`,
        document.getElementById(`story-${story.id}-twitter-hook`),
        {
            theme: 'light',
            linkColor: '#CD0000'
        }
        );
        
    });
}

function registerSidebarStories() {
    document.querySelectorAll('.story.link').forEach(storyEl => {

        if(storyEl.classList.contains('registered')) return;

        storyEl.addEventListener('click', handleStoryClick)
        storyEl.addEventListener('touchstart', handleStoryClick)
    });
}

function addFeatures(stories) {

    let feature, features = [];
    stories.forEach((story, i) => {

        if(story.place == null) return;

        feature = new Feature(new Point(fromLonLat([story.longitude, story.latitude])))
        //feature = new Feature(new Point(fromLonLat([i, i])))
        feature.setId(story.id)

        // copy all the story data across to the feature
        feature.data = {};
        for (var k in story)
            feature.data[k] = story[k]

        let iconSrc = '/dist/icons/flag-x.png';
        feature.setStyle(new Style({
            image: new Icon({
                anchor: [0.15, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: iconSrc,
                scale: 1
            })
        }));
        feature.data.iconSrc = iconSrc;
        features.push(feature);
    });

    vectorSource.addFeatures(features);
    map.removeLayer(vectorLayer);
    map.addLayer(vectorLayer);

    return features;
}

function focusStoryById(id) {
    const evt = storyFocusedEvent({id});
    document.dispatchEvent(evt);
}


// bespoke event for when a story is set into focus external to the map
// eg. someone clicking on the menu
document.addEventListener('storyFocused', evt => {

    // hide any popups already open
    popup.classList.add('hidden');

    let feature = vectorSource.getFeatures().filter(feature => {
        return feature.getId() == evt.detail.id;
    });

    feature[0] = feature[0] || false;
    if(feature[0]) {
        tryPopup(feature[0],  (feature[0].data.place != null), (feature[0].data.place == null) );
        scrollTo(evt.detail.id);
    }
    else {
        tryPopup({data: { id: evt.detail.id }}, false, true);
        scrollTo(evt.detail.id);
    }
        

}, false);

function scrollTo(id) {

    document.querySelectorAll('.story.link').forEach(storyEl => {
        storyEl.classList.remove('focused');
    });

    const storyEl = document.getElementById('story-'+id);
    storyEl.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    storyEl.classList.add('focused');
}

function tryPopup(feature, pan = true, orphan=false) {

    try {

        let coordinate = !orphan ? feature.getGeometry().getCoordinates() : map.getView().getCenter();

        popup.innerHTML = `<div class='tweet' id='popup-twitter-hook'></div>`;

        window.twttr.widgets.createTweet(
            `${feature.data.id}`,
            document.getElementById(`popup-twitter-hook`),
            {
                theme: 'light',
                linkColor: '#CD0000',
                width: 325,
                cards: 'hidden'
            }
        );

        if(orphan)
            popup.classList.add('orphan');
        else 
            popup.classList.remove('orphan');

        if (pan && !orphan)
            panTo(coordinate)

        // show the popup, its a feature which has been clicked
        // but wait for the panning animation to finish
        // otherwise there will be jank as the setPositions clash
        setTimeout(() => {
            popup.classList.remove('hidden')
            overlay.setPosition(coordinate)
        }, 500)
    } catch (err) {
        // no need to log this since these will be common
        // console.error('Attempted popup on non-feature')
    }
}

function polygonCenter(arr)
{
    var x = arr.map (x => x[0]);
    var y = arr.map (x => x[1]);
    var cx = (Math.min (...x) + Math.max (...x)) / 2;
    var cy = (Math.min (...y) + Math.max (...y)) / 2;
    return [cx, cy];
}


function panTo(center) {
    // zoom out.. so the user doesn't feel too flung around
    // then pan..
    // then zoom in slightly to focus the user
    map.getView().animate({
        zoom: 6,
        duration: 250
    }, {
        center: center,
        duration: 250
    }, {
        zoom: 6.5,
        duration: 250
    });
}

function refreshStories(stories=[]) {

    stories = stories.map(story => {

        if (story.place !== null && Object.keys(story.place).length>0)
            [story.longitude, story.latitude] = polygonCenter(story.place.bounding_box.coordinates[0]);
        else
            story.place = null;

        return story;

    })
    .filter( tweet => {
        return tweet.id != window.pinnedTweet;
    });

    addFeatures(stories);
    addSidebarStories(stories);
    registerSidebarStories(stories);

}


/**
 *      globally bootstrap key methods
 */
window.refreshStories = refreshStories;
window.mapCenter = () => {return map.getView().getCenter()};
