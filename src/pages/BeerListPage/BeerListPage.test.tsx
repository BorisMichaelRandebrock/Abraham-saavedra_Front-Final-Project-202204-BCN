import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { groupOfBeer } from "../../mocks/beerMocks";
import BeerListPage from "./BeerListPage";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Given a BeerLisPage component", () => {
  describe("When it's instanciated without beers on state", () => {
    test("Then it should show an image 404 from 404 page", () => {
      const beerMockSlice = createSlice({
        name: "beer",
        initialState: { listOfBeers: [] },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { beer: beerMockSlice.reducer },
      });
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <BeerListPage />
          </Provider>
        </BrowserRouter>
      );
      const image = screen.getByAltText("404");

      expect(image).toBeInTheDocument();
    });
  });

  describe("When it's instanciated with listOfBeers on state", () => {
    test("Then it should show an image beer from detail page", () => {
      const beerMockSlice = createSlice({
        name: "beer",
        initialState: { listOfBeers: groupOfBeer },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { beer: beerMockSlice.reducer },
      });

      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <BeerListPage />
          </Provider>
        </BrowserRouter>
      );
      const images = screen.getAllByAltText("Imagen de cerveza");

      expect(images).toHaveLength(3);
    });
  });
});
