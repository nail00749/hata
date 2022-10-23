import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLng } from 'leaflet';


export interface rentHouseState {
  rentType: string;
  coordinates: {
    lat: number
    lng: number
  };
  address: string;
  price: number;
  currency: string;
  description: string;
  images?: FileList
  houseArea: number,
  countRooms: number,
}

const initialState: rentHouseState = {
  rentType: '',
  coordinates: {
    lat: 0,
    lng: 0,
  },
  address: '',
  price: 1,
  currency: '',
  description: '',
  images: undefined,
  houseArea: 1,
  countRooms: 1,
};

const rentHouseSlice = createSlice({
  name: 'rentHouseSlice',
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<LatLng>) => {
      state.coordinates = action.payload;
    },
    setTypeRent: (state, action: PayloadAction<string>) => {
      state.rentType = action.payload;
    },
    setFiles: (state, action: PayloadAction<FileList>) => {
      state.images = action.payload;
    },
    setData: <K extends keyof rentHouseState>(state: any, action: PayloadAction<{ key: K, value: string | number }>) => {
      const { payload } = action;
      state[payload.key] = payload.value;
    },
  },
});

export const { setCoords, setTypeRent, setFiles, setData } = rentHouseSlice.actions;

export default rentHouseSlice.reducer;
