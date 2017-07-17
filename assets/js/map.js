var bounds = [
    [		-83.3437, 	42.2102], // Southwest coordinates
    [		-82.8754, 	42.5197]  // Northeast coordinates
];
mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/slusarskiddetroitmi/cj0wo7j6c00t72rqplk8a2m97', //stylesheet location
  center: [-83.1, 42.36], // starting position
  zoom: 10.5, // starting zoom
  maxBounds: bounds
});
map.on('load', function(window) {
  map.addSource('councils', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('offices', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/DHD/HealthCareProviders/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addLayer({
    "id": "councils-fill",
    "type": "fill",
    "source": "councils",
    "layout": {},
    "paint": {
      "fill-color": "#1874BC",
      "fill-opacity": 0.2,
    }
  });

  map.addLayer({
    "id": "councils-borders",
    "type": "line",
    "source": "councils",
    "layout": {},
    "paint": {
      "line-color": "#6A6F70",
      "line-width": 2
    }
  });

  map.addLayer({
      'id': 'offices',
      'type': 'symbol',
      'source': 'offices',
      'layout': {
        'icon-image': 'marker-15'
      },
      'paint': {}
  });
  map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['offices'] });
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
  });
});
var closeInfo = function closeInfo() {
  (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : document.querySelector('#info').className = 'active';
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
document.querySelectorAll('.filter-group input[type=checkbox]').forEach(function(item) {
  item.addEventListener('click',function(e){
    toggleMapLayers(e);
  });
});
document.getElementById('close-emergency-modal-btn').addEventListener('click', closeInfo);
