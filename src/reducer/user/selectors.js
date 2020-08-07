import NameSpace from "../name-space";

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

export const getAuthorizationError = (state) => state[NameSpace.USER].isAuthError;

export const getUser = (state) => state[NameSpace.USER].user;
