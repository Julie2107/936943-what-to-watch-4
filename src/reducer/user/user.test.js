import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, Operation} from "./user.js";
import {AuthorizationStatus} from "./user.js";
import {createAPI} from '../../api';

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
