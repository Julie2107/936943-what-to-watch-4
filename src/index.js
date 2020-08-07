import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import reducer from "./reducer/reducer.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {ActionCreator as UserActionCreator, Operation as UserOperation, AuthorizationStatus} from "./reducer/user/user.js";

import {createAPI} from "./api.js";
import App from "./components/app/app.jsx";

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(DataOperation.loadMovies());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
      />,
    </Provider>,
    document.querySelector(`#root`)
);
