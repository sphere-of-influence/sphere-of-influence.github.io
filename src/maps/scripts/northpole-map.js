import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import {
  Stroke, Fill, Style, Icon,
} from 'ol/style';

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

function driftingStations() {
  const stationData = {
    'North Pole-1': {
      start: ['-78.6666666666667', '89.4166666666667'], finish: ['-19.2666666666667', '70.6666666666667'], began: 'May 21, 1937', ended: 'February 19, 1938', distance: '2,850',
    },
    'North Pole-2': {
      start: ['-166.6', '76.05'], finish: ['-163.8', '81.7333333333333'], began: 'April 2, 1950', ended: 'April 11, 1951', distance: '2,600',
    },
    'North Pole-3': {
      start: ['-175', '85.9666666666667'], finish: ['-24', '86'], began: 'April 4, 1954', ended: 'April 20, 1955', distance: '1,865',
    },
    'North Pole-4': {
      start: ['-178.416666666667', '75.8'], finish: ['0', '85.8666666666667'], began: 'April 8, 1954', ended: 'April 19, 1957', distance: '6,970',
    },
    'North Pole-5': {
      start: ['156.85', '82.1666666666667'], finish: ['63.3333333333333', '84.3'], began: 'April 21, 1955', ended: 'October 8, 1956', distance: '3,630',
    },
    'North Pole-6': {
      start: ['-177.066666666667', '74.4'], finish: ['3.93333333333333', '82.1'], began: 'April 19, 1956', ended: 'September 14, 1959', distance: '8,650',
    },
    'North Pole-7': {
      start: ['-164.183333333333', '82.1'], finish: ['-33.05', '85.2333333333333'], began: 'April 23, 1957', ended: 'April 11, 1959', distance: '3,520',
    },
    'North Pole-8': {
      start: ['-164.4', '76.1833333333333'], finish: ['-132.5', '83.25'], began: 'April 27, 1959', ended: 'March 19, 1962', distance: '6,090',
    },
    'North Pole-9': {
      start: ['163', '77.3833333333333'], finish: ['-76', '86.6'], began: 'April 26, 1960', ended: 'March 28, 1961', distance: '2,660',
    },
    'North Pole-10': {
      start: ['177.166666666667', '75.45'], finish: ['90.5', '88.5333333333333'], began: 'October 17, 1961', ended: 'April 29, 1964', distance: '3,960',
    },
    'North Pole-11': {
      start: ['-165.966666666667', '77.1666666666667'], finish: ['-139.566666666667', '81.1666666666667'], began: 'April 16, 1962', ended: 'April 20, 1963', distance: '2,400',
    },
    'North Pole-12': {
      start: ['-165.566666666667', '76.8333333333333'], finish: ['-145.783333333333', '81.1'], began: 'April 30, 1963', ended: 'April 25, 1965', distance: '1,595',
    },
    'North Pole-13': {
      start: ['-161.316666666667', '73.9166666666667'], finish: ['3.53333333333333', '87.9166666666667'], began: 'April 22, 1964', ended: 'April 20, 1967', distance: '3,545',
    },
    'North Pole-14': {
      start: ['-175.416666666667', '72.7'], finish: ['154.816666666667', '76.9833333333333'], began: 'May 1, 1965', ended: 'February 12, 1966', distance: '1,040',
    },
    'North Pole-15': {
      start: ['168.133333333333', '78.8166666666667'], finish: ['-10.5', '85.75'], began: 'April 15, 1966', ended: 'March 25, 1968', distance: '2,330',
    },
    'North Pole-16': {
      start: ['-172', '75.5166666666667'], finish: ['-85.45', '86'], began: 'April 10, 1968', ended: 'March 22, 1972', distance: '5,850',
    },
    'North Pole-17': {
      start: ['165.433333333333', '80.5'], finish: ['25.3333333333333', '86.8'], began: 'April 18, 1968', ended: 'October 16, 1969', distance: '1,750',
    },
    'North Pole-18': {
      start: ['-165.033333333333', '75.1666666666667'], finish: ['153.85', '86.1'], began: 'October 9, 1969', ended: 'October 24, 1971', distance: '5,240',
    },
    'North Pole-20': {
      start: ['175.366666666667', '75.9333333333333'], finish: ['-166.783333333333', '81.7333333333333'], began: 'April 22, 1970', ended: 'May 17, 1972', distance: '3,780',
    },
    'North Pole-21': {
      start: ['178.25', '74.1'], finish: ['143.583333333333', '86.2666666666667'], began: 'April 30, 1972', ended: 'May 17, 1974', distance: '3,605',
    },
    'North Pole-22': {
      start: ['-168.516666666667', '76.2666666666667'], finish: ['0', '86.1666666666667'], began: 'September 13, 1973', ended: 'April 8, 1982', distance: '17,069',
    },
    'North Pole-23': {
      start: ['-178.416666666667', '73.85'], finish: ['-22.5166666666667', '87.6666666666667'], began: 'December 5, 1975', ended: 'November 1, 1978', distance: '5,786',
    },
    'North Pole-24': {
      start: ['163', '76.75'], finish: ['29.6666666666667', '86.05'], began: 'June 23, 1978', ended: 'November 19, 1980', distance: '5,652',
    },
    'North Pole-25': {
      start: ['168.583333333333', '75.0166666666667'], finish: ['-122.25', '85.8333333333333'], began: 'May 16, 1981', ended: 'April 20, 1984', distance: '5,754',
    },
    'North Pole-26': {
      start: ['174.766666666667', '78.5'], finish: ['-170.516666666667', '82.7666666666667'], began: 'May 21, 1983', ended: 'April 9, 1986', distance: '5,380',
    },
    'North Pole-27': {
      start: ['160.5', '78.5166666666667'], finish: ['-9.03333333333333', '86.4666666666667'], began: 'June 2, 1984', ended: 'May 20, 1987', distance: '5,655',
    },
    'North Pole-28': {
      start: ['168.483333333333', '80.6666666666667'], finish: ['3.15', '79.6666666666667'], began: 'May 21, 1986', ended: 'January 23, 1989', distance: '7,634',
    },
    'North Pole-29': {
      start: ['112.983333333333', '80.38'], finish: ['-56.5716666666667', '84.7133333333333'], began: 'June 10, 1987', ended: 'August 19, 1988', distance: '2,686',
    },
    'North Pole-30': {
      start: ['-171.4', '74.3'], finish: ['-126.433333333333', '82.5166666666667'], began: 'October 9, 1987', ended: 'April 4, 1991', distance: '7,675',
    },
    'North Pole-32': {
      start: ['148.05', '87.875'], finish: ['-3.55', '84.6833333333333'], began: 'April 25, 2003', ended: 'March 6, 2004', distance: '2,418',
    },
    'North Pole-33': {
      start: ['156.516666666667', '85.0833333333333'], finish: ['95.9', '86.2333333333333'], began: 'September 9, 2004', ended: 'October 5, 2005', distance: '3,156',
    },
    'North Pole-34': {
      start: ['115.316666666667', '85.65'], finish: ['7.65', '87.4333333333333'], began: 'September 19, 2005', ended: 'May 25, 2006', distance: '2,032',
    },
    'North Pole-35': {
      start: ['103.9', '81.5'], finish: ['31.3', '81'], began: 'September 21, 2007', ended: 'July 22, 2008', distance: '3,614',
    },
    'North Pole-36': {
      start: ['144.933333333333', '82.5333333333333'], finish: ['-26.6833333333333', '85.8833333333333'], began: 'September 7, 2008', ended: 'August 24, 2009', distance: '2,905',
    },
    'North Pole-37': {
      start: ['-164.583333333333', '81.4666666666667'], finish: ['-140.666666666667', '80.0666666666667'], began: 'September 7, 2009', ended: 'May 31, 2010', distance: '2,076',
    },
    'North Pole-38': {
      start: ['-176.533333333333', '76.1166666666667'], finish: ['-154.3', '83.8833333333333'], began: 'October 14, 2010', ended: 'September 20, 2011', distance: '3,024',
    },
    'North Pole-39': {
      start: ['-148.816666666667', '84.1666666666667'], finish: ['-96.7333333333333', '83.95'], began: 'October 2, 2011', ended: 'September 15, 2012', distance: '1,885',
    },
    'North Pole-40': {
      start: ['-142.883333333333', '85.35'], finish: ['-130.416666666667', '82.4166666666667'], began: 'October 1, 2012', ended: 'June 7, 2013', distance: '1,736',
    },
    'North Pole-2015': {
      start: ['-17.1333333333333', '89.5666666666667'], finish: ['-7.86666666666667', '86.25'], began: 'April 11, 2015', ended: 'August 9, 2015', distance: '714',
    },
  };
  const color = '#2D6073';
  const iconSrc = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
  <path d="M 20 2.03125 C 19.449219 2.03125 19 2.480469 19 3.03125 L 19 7.8125 L 13.71875 2.53125 C 13.328125 2.140625 12.671875 2.140625 12.28125 2.53125 L 0.5625 14.28125 C 0.171875 14.671875 0.171875 15.296875 0.5625 15.6875 C 0.953125 16.078125 1.578125 16.078125 1.96875 15.6875 L 13 4.65625 L 24.0625 15.71875 C 24.257813 15.914063 24.523438 16.03125 24.78125 16.03125 C 25.039063 16.03125 25.273438 15.914063 25.46875 15.71875 C 25.859375 15.328125 25.859375 14.703125 25.46875 14.3125 L 22 10.84375 L 22 3.03125 C 22 2.480469 21.550781 2.03125 21 2.03125 Z M 13 6.5 L 2 17.5 L 2 23 C 2 24.65625 3.34375 26 5 26 L 21 26 C 22.65625 26 24 24.65625 24 23 L 24 17.5 Z M 11 16 L 15 16 C 15.550781 16 16 16.449219 16 17 L 16 23 C 16 23.550781 15.550781 24 15 24 L 11 24 C 10.449219 24 10 23.550781 10 23 L 10 17 C 10 16.449219 10.449219 16 11 16 Z"/>
  </svg>`;
  const style = new Style({
    image: new Icon({
      anchor: [0.5, 0],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSrc)}`,
      scale: 0.4,
      rotation: 0,
    }),
  });
  Object.keys(stationData).forEach((name) => {
    const station = stationData[name];
    const data = {
      fetchTweet: false,
      popupInnerHTML: `<div style="
                          background: rgba(255, 255, 255, 0.88);
                          width: 100%;
                          padding: 10px;
                          border-radius: inherit;
                      ">
                        <a href="https://en.wikipedia.org/wiki/List_of_research_stations_in_the_Arctic#Drifting_ice_stations">Drifting Ice Station</a>,
                        <br><b>${name}</b> (${station.began} — ${station.ended}) finished its journey here after travelling ${station.distance}km
                        <i><a href="https://en.wikipedia.org/wiki/List_of_research_stations_in_the_Arctic#Drifting_ice_stations">Wikipedia</a></i>
                      </div>`,
      place: [station.finish[0], station.finish[1]],
    };
    window.addFeature(name, station.finish[0], station.finish[1], style, data);
  });
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
    ctx.globalAlpha = 0.8;
    ctx.drawImage(img, 0, 0);
    const sicSource = new Static({
      imageExtent: [-3846875.000, -5353125.000, 3753125.000, 5846875.000],
      url: c.toDataURL(),
    });
    const sicLayer = new ImageLayer({
      source: sicSource,
      projection: 'EPSG:3413', // important!
      zIndex: 0,
    });
    window.map.addLayer(sicLayer);
    arcticCircle();
    driftingStations();
  };
}

window.map.once('postrender', () => {
  northpole();
  northpole = () => {};
});
