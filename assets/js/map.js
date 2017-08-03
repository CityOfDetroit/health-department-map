var bounds = [
    [		-83.3437, 	42.2102], // Southwest coordinates
    [		-82.8754, 	42.5197]  // Northeast coordinates
];
mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/slusarskiddetroitmi/cj58f1ib64x352sp8150mpl5j', //stylesheet location
  center: [-83.1, 42.36], // starting position
  zoom: 10.5, // starting zoom
  maxBounds: bounds
});
var directions = new MapboxDirections({
   accessToken: mapboxgl.accessToken,
   controls: {
     inputs: false,
     instructions: true
   }
 });
// add to your mapboxgl map
map.addControl(directions, 'top-right');
console.log('added directions');
map.on('load', function(window) {
  map.addSource('councils', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('offices', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/DoIT/LARC/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
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
  map.loadImage('assets/img/hearts.png', function(error, image) {
        if (error) throw error;
        map.addImage('heart', image);
        map.addLayer({
            "id": "offices",
            "type": "symbol",
            "source": 'offices',
            "layout": {
                "icon-image": "heart",
                "icon-size": 0.5
            }
        });
    });
  map.on("mousemove", function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["offices"]
    });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
});
var closeInfo = function closeInfo() {
  (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : document.querySelector('#info').className = 'active';
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", function(event) {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  } else {
      alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
  }
  console.log(map);
});

document.querySelectorAll('.filter-group input[type=checkbox]').forEach(function(item) {
  item.addEventListener('click',function(e){
    toggleMapLayers(e);
  });
});

function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log('Your latitude is :'+lat+' and longitude is '+long);
    directions = directions.setOrigin([long,lat]);
}
function errorFunction(e){
  alert("Geolocation permission was denied. Please enable Geolocation.")
}

document.getElementById('close-emergency-modal-btn').addEventListener('click', closeInfo);

var loadDirections = function loadDirections(){
  directions.setDestination([document.querySelector('.info-container input[name="lng"]').value, document.querySelector('.info-container input[name="lat"]').value]);
  document.querySelector('.mapboxgl-ctrl-directions.mapboxgl-ctrl').style.display = "block";
  closeInfo();
};

document.getElementById('directions-btn').addEventListener('click', loadDirections);
