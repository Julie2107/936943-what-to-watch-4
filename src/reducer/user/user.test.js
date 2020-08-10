import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, Operation} from "./user.js";
import {AuthorizationStatus} from "./user.js";
import {createAPI} from '../../api';

const mockUser = {
  id: 1,
  name: `Leo`,
  mail: `mail@mail.ru`,
  avatar: `avatar.jpg`,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: {
      email: ``,
      name: ``,
    },
    isAuthError: false,
  });
});

it(`Reducer should change authorization status`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
});

it(`Operation should check authorization`, () => {
  const api = createAPI(() => {});

  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const checkAuthorization = Operation.checkAuth();

  apiMock
    .onGet(`/login`)
    .reply(200, [{fake: true}]);

  return checkAuthorization(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenCalledWith({
            type: ActionType.REQUIRED_AUTHORIZATION,
            payload: `AUTH`,
          });
        });
});

it(`Reducer gets user data`, () => {
  expect(reducer({
    user: {},
  }, {
    type: ActionType.GET_USER_DATA,
    payload: {mockUser},
  })).toEqual({
    user: {mockUser}
  });
});

it(`Reducer should change authorization error status`, () => {
  expect(reducer({
    isAuthError: false,
  }, {
    type: ActionType.AUTH_ERROR,
    payload: true,
  })).toEqual({
    isAuthError: true,
  });
});
