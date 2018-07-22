import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../actions/quizActions';

class TestComponent extends Component {
  componentDidMount() {
    this.props.fetchQuiz();
  }

  componentDidUpdate() {
    console.log(this.props.questions);
  }

  render() {
    return this.props.error ? (
      <p>{this.props.error}</p>
    ) : this.props.questions.length === 0 ? (
      <p>Loading...</p>
    ) : this.props.questions.map((question, index) => (
      <p key={index}>{question.text}</p>
    ));
  }
}

const mapStateToProps = state => ({
  questions: state.quiz.quiz,
  error: state.quiz.error
});

const mapDispatchToProps = dispatch => ({
  fetchQuiz: () => dispatch(fetchQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
