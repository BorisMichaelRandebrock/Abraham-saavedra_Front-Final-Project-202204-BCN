import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BeerState, BeerDataApi } from "../../types/interfaces";

const initialState: BeerState = {
  listOfBeers: [],
  page: 0,
  totalPages: 0,
  singleBeer: {
    name: "",
    brewery: "",
    style: "",
    degrees: 0,
    IBU: 0,
    country: "",
    description: "",
    image: "",
    owner: "",
    id: "",
  },
};

const beerSlice = createSlice({
  name: "beer",
  initialState,
  reducers: {
    loadBeers: (
      beer: BeerState,
      action: PayloadAction<BeerDataApi[]>
    ): BeerState => ({
      ...beer,
      listOfBeers: action.payload,
    }),
    deleteBeer: (beer, action: PayloadAction<string>): BeerState => ({
      ...beer,
      listOfBeers: beer.listOfBeers.filter(
        (currentBeer) => currentBeer.id !== action.payload
      ),
    }),
    createBeer: (beer, action: PayloadAction<BeerDataApi>): BeerState => ({
      ...beer,
      listOfBeers: beer.listOfBeers.concat(action.payload),
      singleBeer: action.payload,
    }),
    loadSingleBeer: (beer, action: PayloadAction<BeerDataApi>): BeerState => ({
      ...beer,
      singleBeer: action.payload,
    }),
    editBeer: (beer, action: PayloadAction<BeerDataApi>): BeerState => ({
      ...beer,
      listOfBeers: beer.listOfBeers.filter((currentBeer) =>
        currentBeer.id === action.payload.id ? action.payload : currentBeer
      ),
    }),
    getMaxPages: (beer, action: PayloadAction<number>): BeerState => ({
      ...beer,
      totalPages: action.payload,
    }),
    upNumberPage: (beer): BeerState => ({
      ...beer,
      page: beer.page + 1 > beer.totalPages ? beer.page : beer.page + 1,
    }),
    downNumberPage: (beer): BeerState => ({
      ...beer,
      page: beer.page - 1 < 0 ? beer.page : beer.page - 1,
    }),
    setNumberPage: (beer, action: PayloadAction<number>): BeerState => ({
      ...beer,
      page: action.payload,
    }),
  },
});

export default beerSlice.reducer;

export const {
  loadBeers: loadBeersActionCreator,
  deleteBeer: deleteBeerActionCreator,
  createBeer: createBeerActionCreator,
  loadSingleBeer: loadSingleBeerActionCreator,
  editBeer: editBeerActionCreator,
  getMaxPages: getMaxPagesActionCreator,
} = beerSlice.actions;
