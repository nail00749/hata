import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationMarker } from './LocationMarker';
import { SearchField } from './SearchField';
import { FC } from 'react';

interface MapProps {
}

const MapRent: FC<MapProps> = () => {

  return (
    <div
      className = 'z-3 pr-6 my-4'
      style = {{
        minWidth: 300,
        maxWidth: 720,
        height: 400,
        zIndex: 3,
      }}
    >
      <MapContainer
        style = {{ height: '100%', width: '100%', zIndex: 3 }}
        center = {[
          64.432286, 76.469353,
        ]}
        zoom = {15}
      >
        <TileLayer
          url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchField />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapRent;
