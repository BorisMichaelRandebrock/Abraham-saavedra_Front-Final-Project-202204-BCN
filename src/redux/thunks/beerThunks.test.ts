import axios from "axios";
import { groupOfBeer, singleBeer } from "../../mocks/beerMocks";
import {
  createBeerThunk,
  deleteBeerThunk,
  getBeerByIdThunk,
  loadBeersThunk,
  updateBeerThunk,
} from "./beerThunks";

jest.useFakeTimers();

describe("Given a loadBeersThunk function", () => {
  describe("When it's invoked and do right", () => {
    test("Then it should call dispatch", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: { groupOfBeer } });
      const dispatch = jest.fn();
      const thunk = loadBeersThunk(0);

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When it's invoked and do wrong", () => {
    test("Then it should call dispatch 4 times", async () => {
      axios.get = jest.fn().mockRejectedValue(new Error());
      const dispatch = jest.fn();
      const thunk = loadBeersThunk(0);
      const expectCalls = 4;

      await thunk(dispatch);

      jest.runOnlyPendingTimers();

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });
});

describe("Given a deleteBeerThunk function", () => {
  describe("When it's invoked and do right", () => {
    test("Then it should call dispatch 4 times", async () => {
      const message = "Se ha eliminado la cerveza";
      axios.delete = jest.fn().mockResolvedValue({ data: { message } });
      const dispatch = jest.fn();
      const thunk = deleteBeerThunk(singleBeer.id);
      jest.runOnlyPendingTimers();
      const expectCalls = 4;

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });

  describe("When it's invoked and do wrong", () => {
    test("Then it should call dispatch 4 times", async () => {
      axios.delete = jest.fn().mockRejectedValue(new Error());
      const dispatch = jest.fn();
      const thunk = deleteBeerThunk(singleBeer.id);
      const expectCalls = 4;

      await thunk(dispatch);

      jest.runOnlyPendingTimers();

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });
});

describe("Given a createBeerThunk function", () => {
  describe("When it's invoked and do right", () => {
    test("Then it should call dispatch 4 times", async () => {
      const message = "Se ha creado la cerveza";
      axios.post = jest
        .fn()
        .mockResolvedValue({ data: { message }, beer: singleBeer });
      const dispatch = jest.fn();
      const mockFormData = new FormData();
      const thunk = createBeerThunk(mockFormData);
      jest.runOnlyPendingTimers();
      const expectCalls = 4;

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });

  describe("When it's invoked and do wrong", () => {
    test("Then it should call dispatch 4 times", async () => {
      axios.post = jest.fn().mockRejectedValue(new Error());
      const dispatch = jest.fn();
      const mockFormData = new FormData();
      const thunk = createBeerThunk(mockFormData);
      const expectCalls = 4;

      await thunk(dispatch);

      jest.runOnlyPendingTimers();

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });
});

describe("Given a getBeerByIdThunk function", () => {
  describe("When it's invoked and do right", () => {
    test("Then it should call dispatch 3 times", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: { beer: singleBeer } });
      const dispatch = jest.fn();
      const thunk = getBeerByIdThunk(singleBeer.id);
      jest.runOnlyPendingTimers();
      const expectCalls = 3;

      await thunk(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });

  describe("When it's invoked and do wrong", () => {
    test("Then it should call dispatch 4 times", async () => {
      axios.get = jest.fn().mockRejectedValue(new Error());
      const dispatch = jest.fn();
      const thunk = getBeerByIdThunk(singleBeer.id);
      const expectCalls = 4;

      await thunk(dispatch);

      jest.runOnlyPendingTimers();

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });
});

describe("Given a updateBeerThunk function", () => {
  describe("When it's invoked and do right", () => {
    test("Then it should call dispatch 5 times", async () => {
      const message = "Se ha modificado la cerveza";
      axios.put = jest
        .fn()
        .mockResolvedValue({ data: { message, beer: singleBeer } });
      const dispatch = jest.fn();
      const mockFormData = new FormData();
      const thunk = updateBeerThunk(mockFormData, singleBeer.id);
      const expectCalls = 5;

      await thunk(dispatch);
      jest.runOnlyPendingTimers();

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });

  describe("When it's invoked and do wrong", () => {
    test("Then it should call dispatch 4 times", async () => {
      axios.put = jest.fn().mockRejectedValue(new Error());
      const dispatch = jest.fn();
      const mockFormData = new FormData();
      const thunk = updateBeerThunk(mockFormData, singleBeer.id);
      const expectCalls = 4;

      await thunk(dispatch);

      jest.runOnlyPendingTimers();

      expect(dispatch).toHaveBeenCalledTimes(expectCalls);
    });
  });
});
