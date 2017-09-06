var mapSectionClickModule = (function(informationCard){
  var formatPhoneNumber = function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };
  map.on('load', function(window) {
    map.on('click', function (e) {
      console.log(e);
      var features = map.queryRenderedFeatures(e.point, { layers: ['demolitions', 'upcoming-demolitions', 'event-locations'] });
      if(features.length){
        let feature = features[0];
        console.log(feature);
        map.flyTo({
            center: [e.lngLat.lng, e.lngLat.lat],
            zoom: 16,
            bearing: 0,
            speed: 4,
            curve: 1,
            easing: function (t) {
                return t;
            }

        });
        var tempHTML = "";
        switch (feature.layer.id) {
          case 'demolitions':
            tempHTML = '<div class="title-name">' + feature.properties.address + '</div><article class="parcel"><span>Parcel ID:</span> ' + feature.properties.parcel_id + '</article><article class="contractor"><span>Contractor:</span> ' + feature.properties.contractor_name + '</article><article class="demolish_by_date"><span>Demolished on:</span> ' + moment(feature.properties.demolition_date).format('MMMM Do YYYY') + '</article><article class="demo-price"><span>Cost of Demolition:</span> $' + parseInt(feature.properties.price).toLocaleString() + '</article>';
            break;
          case 'upcoming-demolitions':
            tempHTML = '<div class="title-name">' + feature.properties.address + '</div><article class="parcel"><span>Parcel ID:</span> ' + feature.properties.parcel_id + '</article><article class="contractor"><span>Contractor:</span> ' + feature.properties.contractor_name + '</article><article class="demolish_by_date"><span>Demolish by:</span> ' + moment(feature.properties.demolish_by_date).format('MMMM Do YYYY') + '</article>';
            break;
          default:
            var temp = feature.properties.video_link.split('/');
            tempHTML = '<div class="title-name">' + feature.properties.facility + '</div><article class="address"><span>Address:</span> ' + feature.properties.address + '</article><article class="video_link"><iframe width="340" height="315" src="https://www.youtube.com/embed/'+ temp[temp.length - 1] + '" frameborder="0" allowfullscreen></iframe></article><article class="text"><span>Description :</span> ' + feature.properties.text + '</article>';
        }
        document.querySelector('#info .info-container .panel-content').innerHTML = tempHTML;
        (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
      }else{
        console.log('no data for this point');
      }
    });
  });
})(window);
