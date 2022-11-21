import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLng } from 'leaflet';
import { IApartmentCreate } from '../../models/IApartment';


export interface rentHouseState {
  apartment: IApartmentCreate;
}

const initialState: rentHouseState = {
  apartment: {
    title: '',
    rentType: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
    comforts: [],
    address: '',
    price: 1,
    currency: '',
    description: '',
    houseArea: 1,
    countRooms: 1,
    images: null,
  },
};

const rentHouseSlice = createSlice({
  name: 'rentHouseSlice',
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<{ coordinates: LatLng, address: string }>) => {
      const { payload } = action;
      state.apartment.coordinates = payload.coordinates;
      state.apartment.address = payload.address;
    },
    setTypeRent: (state, action: PayloadAction<string>) => {
      state.apartment.rentType = action.payload;
    },
    setFiles: (state, action: PayloadAction<FileList>) => {
      state.apartment.images = action.payload;
    },
    setData: <K extends keyof rentHouseState>(state: any, action: PayloadAction<{ key: K, value: string | number }>) => {
      const { payload } = action;
      state.apartment[payload.key] = payload.value;
    },
    setComforts: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const copy = state.apartment.comforts;
      const index = copy.findIndex(c => c === payload);
      if (!~index) {
        copy.push(payload);
      } else {
        copy.splice(index, 1);
      }
      state.apartment.comforts = copy;
    },
    setDefault: () => initialState,
    setApartment: (state, action: PayloadAction<IApartmentCreate>) => {
      state.apartment = action.payload;
    },
  },
});

export const {
  setCoords,
  setTypeRent,
  setFiles,
  setData,
  setComforts,
  setDefault,
  setApartment,
} = rentHouseSlice.actions;

export default rentHouseSlice.reducer;
