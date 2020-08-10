import React from "react";
import {configure, mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space";
import {Router} from "react-router-dom";

import history from "../../history.js";
import {SignIn} from "./sign-in.jsx";

configure({
  adapter: new Adapter()
});

const mockUser = {
  login: `login@mail.com`,
  password: `qwerty`,
};

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: `AUTH`,
    isAuthError: false
  }
});

it(`Submit login`, () => {
  const onSubmit = jest.fn();
  const signIn = mount(
      <Router history={history}>
        <Provider store={store}>
          <SignIn
            onSubmit={onSubmit}
            isAuthError={false}
          />
        </Provider>
      </Router>
  );

  const signInComp = signIn.find(SignIn);

  const {loginRef} = signInComp.instance();
  loginRef.current.value = mockUser.login;

  const {passwordRef} = signInComp.instance();
  passwordRef.current.value = mockUser.password;

  const form = signIn.find(`form`);

  form.simulate(`submit`);

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith(mockUser);
});
