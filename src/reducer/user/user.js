import {extend} from "../../utils";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,

};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    email: ``,
    name: ``,
  },
  isAuthError: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  GET_USER_DATA: `GET_USER_DATA`,
  AUTH_ERROR: `AUTH_ERROR`
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  getUserData: (user) => ({
    type: ActionType.GET_USER_DATA,
    payload: {user},
  }),
  authError: () => ({
    type: ActionType.AUTH_ERROR,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.GET_USER_DATA:
      return extend(state, {
        user: action.payload
      });

    case ActionType.AUTH_ERROR:
      return extend(state, {
        isAuthError: true,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => (
    api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUserData(response.data));
      })

  ),

  login: (authData) => (dispatch, getState, api) => (
    api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUserData(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      })
  )
};

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};
