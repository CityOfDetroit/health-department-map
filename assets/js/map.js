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

map.on('load', function(window) {
  map.addSource('councils', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('offices', {
    type: 'geojson',
    data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/LARC_Locations(revise)/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=geojson'
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
  map.loadImage('assets/img/place.png', function(error, image) {
        if (error) throw error;
        map.addImage('heart', image);
        map.addLayer({
            "id": "offices",
            "type": "symbol",
            "source": 'offices',
            "layout": {
                "icon-image": "heart",
                "icon-size": 0.75
            }
        });
    });
  map.on("mousemove", function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["offices"]
    });
    if(!features.length){
      var features = map.queryRenderedFeatures(e.point, {
        layers: ["offices-teen"]
      });
    }
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
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

var loadDirections = function loadDirections(){
  var cleanAddr = '';
  var tempAddr = document.querySelector('.info-container input[name="address"]').value;
  tempAddr = tempAddr.split('(')[0];
  tempAddr = tempAddr.split('-')[0];
  tempAddr = tempAddr.split(' ');
  for (let index = 0; index < tempAddr.length; index++) {
    if(tempAddr[index] != ''){
      cleanAddr += tempAddr[index];
      if(index < (tempAddr.length - 2)){
        cleanAddr += '+';
      }
    }
  }
  var win = window.open("https://www.google.com/maps/dir/''/" + cleanAddr, '_blank');
  win.focus();
};

document.getElementById('directions-btn').addEventListener('click', loadDirections);
