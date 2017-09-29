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
