import "leaflet-geosearch";
import "leaflet-control-geocoder";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export function LeafletControlGeocoder({ ville, setVille }) {
  const map = useMap();
  function searchEventHandler(result) {
    setVille({
      label: result.location.label,
      lat: result.location.raw.lat,
      lon: result.location.raw.lon,
    });
  }

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      searchLabel: "J'habite dans la ville de:",
    });
    map.on("geosearch/showlocation", searchEventHandler);
    map.addControl(searchControl);

    /*  var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng, { icon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map); */
  }, []);

  return null;
}
