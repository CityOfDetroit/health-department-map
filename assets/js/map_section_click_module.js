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
    document.querySelector('.info-container > .street-name').innerHTML = feature.properties.Affiliatio;
    document.querySelector('.info-container > .district').innerHTML = '<span>Address:</span> ' + feature.properties.Address + '<br>' + feature.properties.City + ', ' + feature.properties.State + ' ' + feature.properties.Zip;
    document.querySelector('.info-container > .provider').innerHTML = '<span>Phone:</span> ' + formatPhoneNumber(feature.properties.Phone_1);
    document.querySelector('.info-container > .larc-type').innerHTML = '<span>LARC Type: </span> ' + feature.properties.LARC_Type;
    document.querySelector('.info-container > .age-type').innerHTML = '<span>Age Range: </span> ' + feature.properties.Age_Range;
    document.querySelector('.info-container > .std-testing').innerHTML = '<span>STD Testing: </span> ' + feature.properties.STD_Testin;
    (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
  });
})(window);
