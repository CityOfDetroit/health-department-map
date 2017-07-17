var mapSectionClickModule = (function(informationCard){
  var formatPhoneNumber = function formatPhoneNumber(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };
  map.on('click', function (e) {
    console.log(e);
    var features = map.queryRenderedFeatures(e.point, { layers: ['offices'] });
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
    document.querySelector('.info-container > .street-name').innerHTML = feature.properties.Office;
    document.querySelector('.info-container > .district').innerHTML = '<span>Address:</span> ' + feature.properties.ADDRESS + '<br>' + feature.properties.CITY + ', ' + feature.properties.STATE + ' ' + feature.properties.Zip_Code;
    document.querySelector('.info-container > .provider').innerHTML = '<span>Phone:</span> ' + formatPhoneNumber(feature.properties.PHONE);
    // document.querySelector('.info-container > .garbage').innerHTML = '<span>Garbage:</span> ' + capitalizeFirstLetter(data.features[0].attributes.day);
    // document.querySelector('.info-container > .recycle').innerHTML = '<span>Curbside Recycle:</span> ' + capitalizeFirstLetter(data.features[1].attributes.day) + '-' + capitalizeFirstLetter(data.features[1].attributes.week);
    // document.querySelector('.info-container > .bulk').innerHTML = '<span>Bulk:</span> ' + capitalizeFirstLetter(data.features[2].attributes.day) + '-' + capitalizeFirstLetter(data.features[2].attributes.week);
    // document.querySelector('.info-container > .yard').innerHTML = '<span>Yard Waste:</span> ' + capitalizeFirstLetter(data.features[2].attributes.day) + '-' + capitalizeFirstLetter(data.features[2].attributes.week);
    // document.querySelector('.info-container > input[name="route-id"]').value = data.features[0].attributes.FID + ',' + data.features[1].attributes.FID + ',' + data.features[2].attributes.FID;
    // document.querySelector('.info-container > input[name="lng"]').value = e.lngLat.lng;
    // document.querySelector('.info-container > input[name="lat"]').value = e.lngLat.lat;
    (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
  });
})(window);
