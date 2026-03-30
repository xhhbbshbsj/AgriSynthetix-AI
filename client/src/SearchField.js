import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

const SearchField = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar', // or 'button'
      showMarker: true,
      showPopup: false,
      marker: {
        draggable: false,
      },
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Enter farm location (e.g. Nadia, West Bengal)',
      keepResult: true,
    });

    map.addControl(searchControl);

    // This listener updates your app's position state when a result is selected
    map.on('geosearch/showlocation', (result) => {
      // You can handle the coordinates here if needed
      console.log("New location selected:", result.location);
    });

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

export default SearchField;