import { MapContainer, Marker,  TileLayer } from 'react-leaflet';
import { icon, LatLng } from 'leaflet';
import { FC } from 'react';

interface MapInfoProps {
  position: LatLng;
}

const MapInfo: FC<MapInfoProps> = ({ position }) => {
  return (
    <div
      className = 'z-3 pr-6 my-4 col-span-1 sm:col-span-2 max-w-full'
      style = {{
        minWidth: 300,
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
        <Marker
          position = {position}
          icon = {icon({ iconUrl: '/marker.svg', iconSize: [50, 50] })}
        >

        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapInfo;
