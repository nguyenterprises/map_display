import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxglAccessToken = import.meta.env.VITE_MAPBOX_KEY;

export const mapParams = (snap) => {
  return {
    center: [ snap.latitude, snap.longitude ],
    zoom: 12,
    layers: [ L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapboxglAccessToken
    }) ],
    renderer: L.canvas(),
    zoomControl: true
  }
}


    