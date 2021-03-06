import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {getAuthorizationStatus, getAuthorizationError} from "../../reducer/user/selectors.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {Redirect} from "react-router-dom";
import {AppRoute} from "../../consts.js";


class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {authorizationStatus, isAuthError} = this.props;
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

    if (isAuthorized) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link
              className="logo__link"
              to={AppRoute.ROOT}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <form
            action=""
            className="sign-in__form"
            onSubmit={this._handleSubmit}
          >
            {isAuthError ? <div className="sign-in__message">
              <p>Incorrect email or password. Please, try again</p>
            </div> : ``}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.loginRef}
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this.passwordRef}
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string,
  isAuthError: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isAuthError: getAuthorizationError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  }
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
