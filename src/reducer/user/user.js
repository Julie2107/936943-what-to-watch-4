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
  }
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  GET_USER_DATA: `GET_USER_DATA`
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  getUserData: (user) => ({
    type: ActionType.GET_USER_DATA,
    payload: {user},
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
  )
};

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};
