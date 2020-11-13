import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../store/api-actions";
import {Link, Redirect} from "react-router-dom";
import {AppRoute} from "../../const";
import {resetGame} from "../../store/action";
import {AuthorizationStatus} from "../../const";


class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {resetGameAction, authorizationStatus} = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.RESULT} />;
    }
    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Хотите узнать свой результат? Представьтесь!</p>
        <form
          className="login__form"
          action=""
          onSubmit={this.handleSubmit}
        >
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input
              ref={this.loginRef}
              className="login__input"
              type="text"
              name="name"
              id="name"
            />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              ref={this.passwordRef}
              className="login__input"
              type="text"
              name="password"
              id="password"
            />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">Войти</button>
        </form>
        <Link to={AppRoute.GAME}>
          <button
            onClick={() => {
              resetGameAction();
            }}

            className="replay"
            type="button"
          >
          Сыграть ещё раз
          </button>
        </Link>
      </section>
    );
  }
}

AuthScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  resetGameAction: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.user.authorizationStatus,
});


const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  },

  resetGameAction() {
    dispatch(resetGame());
  },
});

export {AuthScreen};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
