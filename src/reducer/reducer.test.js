import {reducer, ActionCreator, ActionType, initialState} from "./reducer.js";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

it(`reducer returns the right genre value`, () => {
  expect(reducer({
    currentGenre: `All genres`
  }, {
    type: ActionType.FILTER_CHANGE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
  });
});

it(`Action creators work correctly`, () => {
  expect(ActionCreator.getCurrentFilter(`Comedy`)).toEqual({
    type: ActionType.FILTER_CHANGE,
    payload: `Comedy`
  });
});

