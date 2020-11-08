import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {resetGame} from "../../store/action";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const WinScreen = (props) => {
  const {questionsCount, mistakesCount, resetGameAction} = props;
  const correctlyQuestionsCount = questionsCount - mistakesCount;
  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
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
};

WinScreen.propTypes = {
  questionsCount: PropTypes.number.isRequired,
  mistakesCount: PropTypes.number.isRequired,
  resetGameAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({game}) => ({
  questionsCount: game.step,
  mistakesCount: game.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  resetGameAction() {
    dispatch(resetGame());
  },
});


export {WinScreen};

export default connect(mapStateToProps, mapDispatchToProps)(WinScreen);
