import Map from 'ol/Map'
import View from 'ol/View'
import SourceVector from 'ol/source/Vector'
import LayerVector from 'ol/layer/Vector'
import LayerTile from 'ol/layer/Tile'
import SourceOSM from 'ol/source/OSM'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import { Icon, Style } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import Overlay from 'ol/Overlay'
import timeSince from './time-since';
import './long-press';

window.initMap = function(options) {

    // map & sidebar related interaction events
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
        view: new View(options.view)
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

            if (feature == null) return;

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

        if (e.target.href)
            return;

        focusStoryById(e.target.dataset.storyId);
        e.preventDefault();
    }

    function addSidebarStories(stories) {
        const sidebarStories = document.getElementById('sidebar-stories');
        stories.reverse().forEach(story => {

            if (document.getElementById('story-' + story.id) != null) return;

            const html = `<div 
                data-story-id='${story.id}' 
                id='story-${story.id}'
                class='story link loader-bg'>
                    <time datetime='20:00'>${timeSince(story.date)}</time>
                    <div id='story-${story.id}-twitter-hook' class='skeleton-tweet'></div>
                </div>`;

            let virtual = document.createElement('div');
            virtual.innerHTML = html.trim();

            const newStoryEl = virtual.firstChild;
            const twitterEl = newStoryEl.children[1];
            sidebarStories.prepend(newStoryEl);

            window.twttr.widgets.createTweet(
                ''+story.id,
                twitterEl, {
                    theme: 'light'
                }
            )
            .then(()=>{
                twitterEl.className = 'tweet';
                    twitterEl.setAttribute('data-long-press-delay', 10);
                    twitterEl.parentElement.addEventListener('long-press', function(e) {
                        if(window.matchMedia('(max-width: 551px)').matches)
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(`https://twitter.com/i/web/status/${story.id}`)
                    });
            });

        });
    }

    function registerSidebarStories() {
        document.querySelectorAll('.story.link').forEach(storyEl => {
            if (storyEl.classList.contains('registered')) return;
            else storyEl.addEventListener('click', handleStoryClick)
        });
    }

    function adjust(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }
    
    function addFeatures(stories) {

        let feature, features = [];
        stories.forEach((story, i) => {

            if (story.place == null) return;

            feature = new Feature(new Point(fromLonLat([story.longitude, story.latitude])))
            //feature = new Feature(new Point(fromLonLat([i, i])))
            feature.setId(story.id)

            // copy all the story data across to the feature
            feature.data = {};
            for (var k in story)
                feature.data[k] = story[k]

            const color = document.documentElement.style.getPropertyValue('--color');

            //let iconSrc = '/dist/icons/flag-x.png';
            const iconSrc = `<svg width="60px" height="60px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <rect x="16.5" y="31" style="fill:#871B1B;" width="10px" height="6px"/>
                    <path style="fill:#424A60;" d="M3.5,0c-0.552,0-1,0.447-1,1v3v55c0,0.553,0.448,1,1,1s1-0.447,1-1V4V1C4.5,0.447,4.052,0,3.5,0z"/>
                    <rect x="4.5" y="4" style="fill:${adjust(color, 33)};" width="22px" height="29px"/>
                    <path style="fill:${color};" d="M26.5,9v24h-6c-2.209,0-4,1.791-4,4c0,2.209,1.791,4,4,4h4h33l-11-16l11-16H26.5z"/>
                    <path style="fill:${color, 25};" d="M16.5,37c0,2.209,1.791,4,4,4h4h2v-8h-6C18.291,33,16.5,34.791,16.5,37z"/>
                    </svg>`;

            feature.setStyle(new Style({
                image: new Icon({
                    anchor: [0.15, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src:'data:image/svg+xml;charset=utf-8,' + encodeURIComponent( iconSrc ),
                    scale: 0.33,
                    rotation: 0.261799
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
        const evt = storyFocusedEvent({
            id
        });
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
        if (feature[0]) {
            tryPopup(feature[0], (feature[0].data.place != null), (feature[0].data.place == null));
            scrollTo(evt.detail.id);
        } else {
            tryPopup({
                data: {
                    id: evt.detail.id
                }
            }, false, true);
            scrollTo(evt.detail.id);
        }


    }, false);

    function scrollTo(id) {

        if (window.matchMedia("(min-width: 550px)").matches) {

            document.querySelectorAll('.story.link').forEach(storyEl => {
                storyEl.classList.remove('focused');
            });

            const storyEl = document.getElementById('story-' + id);
            storyEl.scrollIntoView({
                block: "center",
                inline: "center"
            });
            storyEl.classList.add('focused');

        }
    }

    function tryPopup(feature, pan = true, orphan = false) {

        try {

            let coordinate = !orphan ? feature.getGeometry().getCoordinates() : map.getView().getCenter();

            popup.innerHTML = `<div class='tweet' id='popup-twitter-hook'></div>`;

            window.twttr.widgets.createTweet(
                `${feature.data.id}`,
                document.getElementById(`popup-twitter-hook`), {
                    theme: 'light',
                    linkColor: '#CD0000',
                    //width: 325,
                    //cards: 'hidden'
                }
            );

            if (orphan)
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

    function polygonCenter(arr) {
        var x = arr.map(x => x[0]);
        var y = arr.map(x => x[1]);
        var cx = (Math.min(...x) + Math.max(...x)) / 2;
        var cy = (Math.min(...y) + Math.max(...y)) / 2;
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

    function refreshStories(stories = []) {

        stories = stories.map(story => {

                if (story.place !== null && Object.keys(story.place).length > 0)

                    if (story.place_is_found == 'True')
                        [story.longitude, story.latitude] = [story.place.longitude, story.place.latitude];
                    else
                        [story.longitude, story.latitude] = polygonCenter(story.place.bounding_box.coordinates[0]);

                else
                    story.place = null;

                return story;

        });

        addFeatures(stories);
        addSidebarStories(stories);
        registerSidebarStories(stories);

    }


    /**
     *      globally bootstrap key methods
     */
    window.refreshStories = refreshStories;
    window.mapCenter = () => {
        return map.getView().getCenter()
    };

}