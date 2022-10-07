import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import { FC, useEffect } from 'react';
import 'leaflet-geosearch/assets/css/leaflet.css';
import { icon } from 'leaflet';

interface SearchFieldProps {

}

export const SearchField: FC<SearchFieldProps> = () => {
  const map = useMap();

  // @ts-ignore
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoCompleteDelay: 1000,
      style: 'bar',
      showMarker: false,

    });
    map.addControl(searchControl);
    map.on('geosearch/showlocation', () => {

    });
    map.on('geosearch/marker/dragend', () => {

    });
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};
