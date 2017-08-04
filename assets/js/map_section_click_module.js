var mapSectionClickModule = (function(informationCard){
  var formatPhoneNumber = function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };
  map.on('click', function (e) {
    console.log(e);
    var features = map.queryRenderedFeatures(e.point, { layers: ['demolitions'] });
    if(features.length){
      let feature = features[0];
      console.log(feature);
      map.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 12,
          bearing: 0,
          speed: 2,
          curve: 1,
          easing: function (t) {
              return t;
          }
      });



      document.querySelector('.info-container input[name="lng"]').value = e.lngLat.lng;
            document.querySelector('.info-container input[name="lat"]').value = e.lngLat.lat;
            document.querySelector('.info-container > .street-name').innerHTML = feature.properties.address;
            document.querySelector('.info-container > .parcel_id').innerHTML = '<span>Parcel ID:</span> ' + feature.properties.parcel_id;
            document.querySelector('.info-container > .contractor_name').innerHTML = '<span>Contractor:</span> ' + feature.properties.contractor_name;
            document.querySelector('.info-container > .demo-date').innerHTML = '<span>Demolished On:</span> ' + feature.properties.demolition_date;
            document.querySelector('.info-container > .demo-cost').innerHTML = '<span>Cost of Demolition:</span> ' + feature.properties.price;
      (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
    }else{
      console.log('no data for this point');
    }
  });
})(window);
