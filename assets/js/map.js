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
     inputs: true,
     instructions: true,
     profileSwitcher: true
   },
   geocoder: {
     bbox: bounds
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
            },
            "filter": ['!in', "Affiliatio", "Detroit Community Health Connection - Woodward Corridor Family Health Center -Teen Clinic", "CHASS Center","Planned Parenthood-Detroit Health Center"]
        });
    });
    map.loadImage('assets/img/like.png', function(error, image) {
          if (error) throw error;
          map.addImage('teen', image);
          map.addLayer({
              "id": "offices-teen",
              "type": "symbol",
              "source": 'offices',
              "layout": {
                  "icon-image": "teen",
                  "icon-size": 0.5
              },
              "filter": ['in', "Affiliatio", "Detroit Community Health Connection - Woodward Corridor Family Health Center -Teen Clinic", "CHASS Center","Planned Parenthood-Detroit Health Center"]
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
    proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");
    proj4.defs('EPSG:2253', "+proj=lcc +lat_1=43.66666666666666 +lat_2=42.1 +lat_0=41.5 +lon_0=-84.36666666666666 +x_0=3999999.999984 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048 +no_defs");
    // creating source and destination Proj4js objects
    // once initialized, these may be re-used as often as needed
    var source = new proj4.Proj("EPSG:4326");    //source coordinates will be in Longitude/Latitude
    var dest = new proj4.Proj("EPSG:2253");     //destination coordinates in LCC, south of France
    // transforming point coordinates
    var p = proj4(source, dest, [long,lat]);     //any object will do as long as it has 'x' and 'y' properties
        //do the transformation.  x and y are modified in place
    //p.x and p.y are now EPSG:27563 easting and northing in meters
    console.log(p);
    let url = "http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/reverseGeocode?location=" + p[0] + "%2C" + p[1] + "&distance=&langCode=&outSR=4326&returnIntersection=false&f=pjson";
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      console.log(data);
      if(data.address){
        directions = directions.setOrigin(data.address.Street);
      }else{
        console.log('no address found');
      }
    });
}
function errorFunction(e){
  alert("Geolocation permission was denied. Please enable Geolocation.")
}

document.getElementById('close-emergency-modal-btn').addEventListener('click', closeInfo);

var loadDirections = function loadDirections(){
  console.log(document.querySelector('.info-container input[name="address"]'));
  directions.setDestination(document.querySelector('.info-container input[name="address"]').value);
  document.querySelector('.mapboxgl-ctrl-directions.mapboxgl-ctrl').style.display = "block";
  closeInfo();
};

document.getElementById('directions-btn').addEventListener('click', loadDirections);
