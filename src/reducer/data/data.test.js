import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionDataCreator, Operation, ActionType, initialState} from "./data.js";
import {MOVIES_TO_SHOW} from "../../consts.js";
import {createAPI} from "../../api.js";
import movieAdapter from '../../adapters/movies-adapter.js';

const mockMovie = {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``};

const mockMovies = [
  {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, isFavourite: true},
  {title: `Aviator`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, isFavourite: true},
  {title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, isFavourite: true},
];

const mockReviews = [
  {author: `Amanda Greever`,
    id: 1,
    date: `November 18, 2015`,
    message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    rating: 2},
  {author: `Amanda Greever`,
    id: 2,
    date: `November 18, 2015`,
    message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    rating: 2},
];

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual(initialState);
});

describe(`Reducer updates state`, () => {
  it(`Reducer updates movies within loading`, () => {
    expect(reducer({
      movies: []
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: mockMovies,
    })).toEqual({
      movies: mockMovies,
    });
  });

  it(`Reducer updates promoMovie within loading`, () => {
    expect(reducer({
      promoMovie: {}
    }, {
      type: ActionType.LOAD_PROMO,
      payload: mockMovie,
    })).toEqual({
      promoMovie: mockMovie,
    });
  });

  it(`Reducer updates reviews within loading`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: mockReviews,
    })).toEqual({
      reviews: mockReviews,
    });
  });

  it(`Reducer updates myList within loading`, () => {
    expect(reducer({
      myListMovies: [],
    }, {
      type: ActionType.GET_MY_LIST,
      payload: mockMovies,
    })).toEqual({
      myListMovies: mockMovies,
    });
  });

  it(`Reducer updates loading status correctly`, () => {
    expect(reducer({
      isLoading: true,
    }, {
      type: ActionType.LOADING_MOVIES_STATUS,
      payload: false,
    })).toEqual({
      isLoading: false,
    });
  });

  it(`Reducer updates error status correctly`, () => {
    expect(reducer({
      isError: false,
    }, {
      type: ActionType.ERROR_STATE,
      payload: true,
    })).toEqual({
      isError: true,
    });
  });

  it(`Reducer updates sending review status correctly`, () => {
    expect(reducer({
      sendingReviewStatus: false,
    }, {
      type: ActionType.SENDING_REVIEW,
      payload: true,
    })).toEqual({
      sendingReviewStatus: true,
    });
  });
});

describe(`data operations`, () => {
  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadPromoMovie = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return loadPromoMovie(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_PROMO,
              payload: movieAdapter({fake: true}),
            });
          });
  });

  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadMovies = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return loadMovies(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_MOVIES,
              payload: [movieAdapter({fake: true})],
            });
          });
  });

  it(`Should make a correct API call to /favorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadMyList = Operation.loadMyList(1);

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return loadMyList(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(2);

          });
  });
});
