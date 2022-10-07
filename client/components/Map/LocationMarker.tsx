import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { icon, LatLng } from 'leaflet';
import { setCoords } from '../../store/slices/RentHouseSlice';
import { useAppDispatch } from '../../hooks/redux';

export const LocationMarker = () => {
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  useEffect(() => {
    map.on('click', (event) => {
      dispatch(setCoords(event.latlng));
    });
  }, []);


  return position ?
    <Marker
      position = {position}
      icon = {icon({ iconUrl: './marker.svg', iconSize: [50, 50] })}
    >
      <Popup>This place</Popup>
    </Marker> : null;
};
