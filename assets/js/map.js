var bounds = [
    [		-83.3437, 	42.2102], // Southwest coordinates
    [		-82.8754, 	42.5197]  // Northeast coordinates
];
mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/slusarskiddetroitmi/cj6mb6u9n8vkq2rmsdp9351ax', //stylesheet location
  center: [-83.02797,42.4112], // starting position
  zoom: 12, // starting zoom
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
map.on('load', function(window) {

// adding district 3
  map.addSource('councils', {
    type: 'geojson',
    data: 'http://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=districts%3D%273%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('council-label', {
    type: 'geojson',
    data: 'http://gis.detroitmi.gov/arcgis/rest/services/Boundaries/Council_Districts/MapServer/0/query?where=number%3D3&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });


// total demolitions
  map.addSource('demolitions', {
    type: 'geojson',
    data: 'https://data.detroitmi.gov/resource/uzpg-2pfj.geojson?council_district=3'
  });

  // upcoming demolitions

  map.addSource('upcoming-demolitions', {
    type: 'geojson',
    data: 'https://data.detroitmi.gov/resource/nfx3-ihbp.geojson?council_district=3'
  });


  map.addSource('events', {
    type: 'geojson',
    data: 'https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/D3/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=pgeojson&token=x-gzcfnhA8XKlRxwEsRsB41pd_6sG4oxTj_dNLUOEF2Yvv2qu2PyRdaX5WPGfRXdHG9E3toJKIGMuQoHortzeH335AUpT4yS_s7aO3hoLqAl9dOULTZzXBnKX24dtA8yqQTRWVQahkCeIEFOcEFxRjXJVzwmVevbRfgLUmIQhmFNkKN6ZnkOhzvja3JaNLRMmUYJOO1vBN-XsgKZUXPBx8R_SXzG9HGfWGKHQEXpznz5OemyITulG-KIoKp4Xw1J'
  });



  map.addLayer({
    "id": "councils-borders",
    "type": "line",
    "source": "councils",
    "layout": {},
    "paint": {
      "line-color": "#0099cc",
      "line-width": 4
    }
  });

  map.addLayer({
    "id": "councils-label",
    "type": "symbol",
    "source": "councils-label",
  });

  map.addLayer({
           id: 'event-locations',
           type: 'symbol',
           source: 'events',
           layout: {
               'icon-image': 'marker-15'
           }
       });

  map.loadImage('assets/img/cross-green.png', function(error, image) {
        if (error) throw error;
        map.addImage('cross-green', image);
        map.addLayer({
            "id": "demolitions",
            "type": "symbol",
            "source": 'demolitions',
            "layout": {
                "icon-image": "cross-green",
                "icon-size": 1
            }
        });

        map.loadImage('assets/img/cross-red.png', function(error, image) {
                if (error) throw error;
                map.addImage('cross-red', image);
                map.addLayer({
                    "id": "upcoming-demolitions",
                    "type": "symbol",
                    "source": 'upcoming-demolitions',
                    "layout": {
                    "icon-image": "cross-red",
                    "icon-size": 1
                          }
                      });
                        });



    });



  map.on("mousemove", function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["demolitions"]
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



document.getElementById('close-emergency-modal-btn').addEventListener('click', closeInfo);
