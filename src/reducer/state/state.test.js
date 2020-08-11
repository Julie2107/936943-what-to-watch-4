import {reducer, ActionCreator, ActionType} from './state.js';
import {MOVIES_TO_SHOW} from "../../consts.js";


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

it(`Action creator gets the right genre`, () => {
  expect(ActionCreator.getCurrentFilter(`Comedy`)).toEqual({
    type: ActionType.FILTER_CHANGE,
    payload: `Comedy`
  });
});

it(`Action creator gives th right number of shownMoviesNumber`, () => {
  expect(reducer({
    shownMoviesNumber: MOVIES_TO_SHOW,
  }, {
    type: ActionType.SHOW_MORE,
    payload: MOVIES_TO_SHOW,
  })).toEqual({
    shownMoviesNumber: MOVIES_TO_SHOW + MOVIES_TO_SHOW,
  });
});
