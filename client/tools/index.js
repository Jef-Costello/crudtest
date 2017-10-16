export default function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
export function geocodeAddress(geocoder, resultsMap, address, centermap) {
  console.log('íi');
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      this.props.setLatLngUi(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      if (centermap) {
        resultsMap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
      }
    } else {
      alert(`Geocode was not successful for the following reason: ${status}`);
    }
  });
}
export function drawMarkers() {
  console.log('attempt draw markersu');
  if (this.props.filteredProducts.filtered.length > 0 && this.props.gmap.initialized) {
    this.props.removeMarkers();
    console.log('fafafaf');
    this.props.redrawMarkers(false);
    const rendered = [];
    this.props.filteredProducts.filtered.map((product) => {
      product.locations.map((location) => {
        if (rendered.indexOf(location.id) === -1) {
          rendered.push(location.id);
          const indx = this.props.locationsPublic.all.map(el =>
          el.id).indexOf(location.id);
          // const l=this.props.locations.all.map
          const latlng = new google.maps.LatLng(this.props.locationsPublic.all[indx].lat, this.props.locationsPublic.all[indx].lng);
      //  that.props.gmap.map.setCenter(latlng);
          const marker = new google.maps.Marker({
            position: latlng,
            title: location.name,
            map: this.props.gmap.map,
          });
      //  marker.addListener('click', () => {
        //  this.props.gmap.map.setCenter(marker.getPosition());
        //  this.props.selectLocationMap(location.id);
      //  });
          // marker.setPosition(latlng);
        //  marker.setMap(map);
          this.props.pushMarker(marker);

          console.log('h');
        }
      });
    });
  }
}
