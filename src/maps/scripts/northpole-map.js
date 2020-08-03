import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';

console.log('Running Northpole.');


function northpole() {
  document.getElementById('map').style.background = 'white';
  const img = new Image(); img.src = '/maps/scripts/sea-ice-concentration.png';
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');

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
      projection: 'EPSG:3413',
    });

    window.map.addLayer(sicLayer);
  };
}

window.northpole = northpole;
