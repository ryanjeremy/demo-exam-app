import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartQuiz } from '../../actions/quizActions';
import Panel from '../../components/Panel';

class Result extends Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount() {
    if (this.props.score === null) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.score !== null && !this.props.score) {
      this.props.history.push('/');
    }
  }

  buttonClick() {
    this.props.restartQuiz();
  }

  render() {
    return (
      <Panel
        title="Quiz Complete!"
        error={null}
        buttonText={"Start Over"}
        buttonOnClick={this.buttonClick}
        loading={false}
      >
        {this.props.percentageScore === 100 ? (
            <h4>Awesome job! You got a perfect score!</h4>
        ) : this.props.percentageScore > 50 ? (
            <h4>Well done! You scored a {this.props.percentageScore}%!</h4>
        ) : this.props.percentageScore === 0 ? (
            <h4>Oops! Better luck next time.</h4>
        ) : (
            <h4>You scored a {this.props.percentageScore}%</h4>
        )}
        <p>You got <strong>{this.props.score}/{this.props.quizSize}</strong> of the questions correct. Thank you for completing the coding quiz! Feel free to re-take the quiz as many times as you like to continue testing your skills.</p>
      </Panel>
    );
  }
}

Result.propTypes = {
  quizSize: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  percentageScore: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  quizSize: state.quiz.quiz.length,
  score: state.quiz.score,
  percentageScore: Math.floor((state.quiz.score / state.quiz.quiz.length) * 100)
});

const mapDispatchToProps = dispatch => ({
  restartQuiz: () => dispatch(restartQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);
