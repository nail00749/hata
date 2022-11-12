import { useCallback, useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { icon, LatLng, LeafletMouseEvent } from 'leaflet';
import { setCoords } from '../../store/slices/RentHouseSlice';
import { useAppDispatch } from '../../hooks/redux';
import { useGetAddress } from '../../hooks/useGetAddress';

export const LocationMarker = () => {
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<LatLng | null>(null);
  const { getAddress } = useGetAddress();

  const handlerCoordinates = useCallback(async (event: LeafletMouseEvent) => {
    const { address } = await getAddress(event.latlng);
    const formatAddress = `${address.neighbourhood || ''} ${address.house_number || ''} ${address.town || ''}`;

    dispatch(setCoords({coordinates: event.latlng, address: formatAddress }));
  }, []);


  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.on('click', handlerCoordinates);

    return () => {
      map.on('click', handlerCoordinates);
    };
  }, []);


  return position ?
    <Marker
      position = {position}
      icon = {icon({ iconUrl: './marker.svg', iconSize: [50, 50] })}
    >
      <Popup>This place</Popup>
    </Marker> : null;
};
