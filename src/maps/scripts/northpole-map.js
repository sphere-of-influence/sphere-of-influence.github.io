import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import { Stroke, Fill, Style } from 'ol/style';

function arcticCircle() {
  const layer = new LayerVector({
    source: new SourceVector({
      projection: 'EPSG:3413',
      features: [new Feature(new Circle([0, 0], 10000000 * 0.26))],
    }),
    style: [
      new Style({
        stroke: new Stroke({
          color: 'black',
          width: 1,
          lineDash: [0.1, 5],
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0.05)',
        }),
      }),
    ],
  });
  window.map.addLayer(layer);
}

function northpole() {
  // remove loader else it peaks thru the hole in the top of the world
  document.getElementById('map').style.background = 'white';

  // pull in our Sea Ice pic
  const img = new Image(); img.src = '/maps/scripts/sea-ice-concentration.png';
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');

  // once loaded then put it on the canvas and tweak the colors
  img.onload = () => {
    c.width = img.width; c.height = img.height;
    ctx.filter = 'grayscale(1) brightness(4) contrast(1)';
    ctx.globalAlpha = 0.8;
    ctx.drawImage(img, 0, 0);
    const sicSource = new Static({
      imageExtent: [-3846875.000, -5353125.000, 3753125.000, 5846875.000],
      url: c.toDataURL(),
    });
    const sicLayer = new ImageLayer({
      source: sicSource,
      projection: 'EPSG:3413', // important!
    });
    window.map.addLayer(sicLayer);
    arcticCircle();
  };
}

window.map.once('postrender', () => {
  northpole();
  northpole = () => {};
});
