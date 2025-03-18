import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";


export interface FiltersState {
  location: string,
  beds: string,
  baths: string,
  propertyType: string,
  amenities: string[],
  availableFrom: string,
  priceRange: [number, number] | [null, null],
  squareFeet: [number, number] | [null, null],
  coordinates: [number, number];
}

interface InitialStateTypes {
  filters: FiltersState;
  isFilterFullOpen: boolean,
  viewMode: "grid" | "list"
}

export const initialState: InitialStateTypes = {
  filters: {
    location: "Pune",
    beds: "any",
    baths: "any",
    propertyType: "any",
    amenities: [],
    availableFrom: "any",
    priceRange: [null, null],
    squareFeet: [null, null],
    coordinates: [ 73.8567, 18.5204],
  },
  isFilterFullOpen: false,
  viewMode: 'grid'
};




export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {

    setFilters: (state, action: PayloadAction<Partial<FiltersState>>)=>{
      state.filters={...state.filters, ...action.payload};
    },
    toggleFiltersFullOpen: (state)=>{
      state.isFilterFullOpen = !state.isFilterFullOpen;
    },
    setViewMode : (state, action: PayloadAction<"grid" | "list">)=>{
      state.viewMode = action.payload;
    }
  },
});

export const { setFilters, toggleFiltersFullOpen, setViewMode} = globalSlice.actions;

export default globalSlice.reducer;
