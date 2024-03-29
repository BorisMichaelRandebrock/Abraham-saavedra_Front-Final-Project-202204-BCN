import { configureStore, createSlice } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { groupOfBeer } from "../../mocks/beerMocks";
import LoginFormPage from "../../pages/LoginPage/LoginFormPage";
import CheckNotLogged from "./CheckNotLogged";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Given CheckNotLogged component", () => {
  describe("When it's instantiated with user logged", () => {
    test("Then it should call navigate to redirect", () => {
      const userMockSlice = createSlice({
        name: "user",
        initialState: { name: "admin", id: "1234", logged: true },
        reducers: {},
      });
      const beerMockSlice = createSlice({
        name: "beer",
        initialState: { page: 0, listOfBeers: groupOfBeer },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer, beer: beerMockSlice.reducer },
      });

      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <CheckNotLogged>
              <LoginFormPage />
            </CheckNotLogged>
          </Provider>
        </BrowserRouter>
      );

      expect(mockedUsedNavigate).toHaveBeenCalled();
    });
  });

  describe("When it's instantiated with user no logged", () => {
    test("Then it should call navigate to redirect", () => {
      const userMockSlice = createSlice({
        name: "user",
        initialState: { name: "", id: "", logged: false },
        reducers: {},
      });
      const beerMockSlice = createSlice({
        name: "beer",
        initialState: { page: 0, listOfBeers: groupOfBeer },
        reducers: {},
      });
      const mockStore = configureStore({
        reducer: { user: userMockSlice.reducer, beer: beerMockSlice.reducer },
      });

      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <CheckNotLogged>
              <LoginFormPage />
            </CheckNotLogged>
          </Provider>
        </BrowserRouter>
      );

      const buttonLogin = screen.getByRole("button", {
        name: "Iniciar sesión",
      });

      expect(buttonLogin).toBeInTheDocument();
    });
  });
});
