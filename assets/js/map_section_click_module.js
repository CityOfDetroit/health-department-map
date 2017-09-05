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
            tempHTML = '<article class="title-name">' + feature.properties.address + '</article><article class="parcel"><span>Parcel ID:</span> ' + feature.properties.parcel_id + '</article><article class="contractor">' + feature.properties.contractor_name +;
            break;
          case 'upcoming-demolitions':

            break;
          default:

        }
        document.querySelector('.info-container > .street-name').innerHTML = feature.properties.address;
        if(feature.properties.facility === undefined){
          document.querySelector('.info-container > .facility').style.display = 'none';
        }else{
          document.querySelector('.info-container > .facility').innerHTML = '<span></span> ' + feature.properties.facility;
          document.querySelector('.info-container > .facility').style.display = 'block';
        }
        if(feature.properties.text === undefined){
          document.querySelector('.info-container > .text').style.display = 'none';
        }else{
          document.querySelector('.info-container > .text').innerHTML = '<span></span> ' + feature.properties.text;
          document.querySelector('.info-container > .text').style.display = 'block';
        }
        if(feature.properties.video_link === undefined){
          document.querySelector('.info-container > .video_link').style.display = 'none';
        }else{
          var temp = feature.properties.video_link.split('/');
          document.querySelector('.info-container > .video_link').innerHTML = '<iframe width="340" height="315" src="https://www.youtube.com/embed/'+ temp[temp.length - 1] + '" frameborder="0" allowfullscreen></iframe>';
          document.querySelector('.info-container > .video_link').style.display = 'block';
        }
        if (feature.properties.parcel_id === undefined){
          document.querySelector('.info-container > .parcel_id').style.display = 'none';
        }else{
          document.querySelector('.info-container > .parcel_id').innerHTML = '<span>Parcel ID:</span> ' + feature.properties.parcel_id;
          document.querySelector('.info-container > .parcel_id').style.display = 'block';
        }
        if (feature.properties.demolition_date === undefined)
        {
          document.querySelector('.info-container > .demo-date').style.display = 'none';
        }
        else{
          document.querySelector('.info-container > .demo-date').innerHTML = '<span>Demolished On:</span> ' + feature.properties.demolition_date.split('T')[0];
          document.querySelector('.info-container > .demo-date').style.display = 'block';
        }
        if (feature.properties.contractor_name=== undefined)
        {
          document.querySelector('.info-container > .contractor_name').style.display = 'none';
        }
        else{
          document.querySelector('.info-container > .contractor_name').innerHTML = '<span>Contractor:</span> ' + feature.properties.contractor_name
          document.querySelector('.info-container > .contractor_name').style.display = 'block';
        }
        if (feature.properties.demolish_by_date === undefined)
        {
          document.querySelector('.info-container > .demolish_by_date').style.display = 'none';
        }
        else{
          document.querySelector('.info-container > .demolish_by_date').innerHTML = '<span>Demolish By Date:</span> ' + feature.properties.demolish_by_date.split('T')[0];
          document.querySelector('.info-container > .demolish_by_date').style.display = 'block';
        }
        if (feature.properties.price === undefined)
        {
          document.querySelector('.info-container > .demo-price').style.display = 'none';
        }
        else{
          document.querySelector('.info-container > .demo-price').innerHTML = '<span>Cost of Demolition: </span> ' + feature.properties.price;
          document.querySelector('.info-container > .demo-price').style.display = 'block';
        }




        (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';


      }else{
        features = map.queryRenderedFeatures(e.point, { layers: ['event-locations'] });
        if(features.length){
          console.log(features[0]);
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
          document.querySelector('.info-container > .facility').innerHTML = '<span></span> ' + feature.properties.facility;
          document.querySelector('.info-container > .text').innerHTML = '<span>About:</span> ' + feature.properties.text;
          document.querySelector('.info-container > .text').innerHTML = '<span>About:</span> ' + feature.properties.video_link;
          document.querySelector('.info-container > .parcel_id').innerHTML = '<span>Parcel ID:</span> ' + feature.properties.parcel_id;
          document.querySelector('.info-container > .contractor_name').innerHTML = '<span>Contractor:</span> ' + feature.properties.contractor_name;
          document.querySelector('.info-container > .demo-date').innerHTML = '<span>Demolished On:</span> ' + feature.properties.demolition_date;
          document.querySelector('.info-container > .demo-cost').innerHTML = '<span>Cost of Demolition:</span> ' + feature.properties.price;
          (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
        }else{
          features = map.queryRenderedFeatures(e.point, { layers: ['upcoming-demolitions'] });
          if(features.length){
            console.log(features[0]);
          }else{
            console.log('no data for this point');
          }
        }
      }
    });
  });
})(window);
