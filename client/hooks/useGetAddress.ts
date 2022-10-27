import { useEffect, useState } from 'react';

export const useGetAddress = ({lat, lng}: {lat: number, lng: number}) => {
  const [value, setValue] = useState('')
  useEffect(() => {
    getAddress()
  }, [lat, lng])

  const getAddress = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon${lng}`)
    const data = await response.json()
    setValue(data)
  }

  return value
}

