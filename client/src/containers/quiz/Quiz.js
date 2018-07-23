import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerResponse, setQuizError, scoreQuiz } from '../../actions/quizActions';
import Panel from '../../components/Panel';
import CodePreview from './CodePreview';
import QuizDropdown from './QuizDropdown';
import QuizInput from './QuizInput';
import QuizToggle from './QuizToggle';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizIndex: -1,
      response: null,
      loading: false
    };

    this.buttonClick = this.buttonClick.bind(this);
    this.setResponse = this.setResponse.bind(this);
  }

  componentDidMount() {
    if (this.props.quiz.length === 0) {
      this.props.history.replace("/");
    } else if (this.props.responses.length === this.props.quiz.length) {
      this.props.history.replace("/result");
    } else {
      const quizIndex = this.props.responses.length > 0
        ? this.props.responses.length : 0;
      this.setQuestion(quizIndex);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.responses.length < this.props.responses.length) {
       // safe response update
      if (this.props.responses.length === this.props.quiz.length) {
        this.setState({
          loading: true
        }, () => this.props.scoreQuiz());
      } else {
        this.setState(state => {
          const nextQuestion = this.props.quiz[state.quizIndex + 1];
          return {
            quizIndex: state.quizIndex + 1,
            response: {
              id: nextQuestion.id,
              type: nextQuestion.type,
              response: ""
            }
          };
        });
      }
    } else if (!prevProps.quizScore && this.props.quizScore !== null) {
      // safe to redirect after score has been resolved
      this.props.history.replace("/result");
    }
  }

  setQuestion(quizIndex) {
    const question = this.props.quiz[quizIndex];
    const response = {
      id: question.id,
      type: question.type,
      response: ""
    };

    this.setState({
      quizIndex,
      response
    });
  }

  setResponse(response) {
    this.setState(state => ({
      response: Object.assign({}, state.response, {
        response
      })
    }));
  }

  buttonClick() {
    if (!this.state.loading) {
      if (!this.state.response || this.state.response.response === "") {
        this.props.setQuizError("Please answer the question before continuing.");
      } else {
        this.props.registerResponse(
          this.state.response.id,
          this.state.response.type,
          this.state.response.response
        );
      }
    }
  }

  render() {
    if (this.state.quizIndex === -1) return null;

    const question = this.props.quiz[this.state.quizIndex];
    return (
      <Panel
        title="Coding Quiz"
        error={this.props.error}
        buttonText={this.state.quizIndex === this.props.quiz.length - 1 ? "Complete" : "Next Question"}
        buttonOnClick={this.buttonClick}
        loading={this.state.loading}
      >
        <h4>{"Question #" + (this.state.quizIndex + 1)}</h4>

        {question.code && (
          <CodePreview code={question.code} />
        )}

        {question.type === "input" ? (
          <QuizInput
            label={question.text}
            response={this.state.response.response}
            setResponse={this.setResponse}
          />
        ) : question.type === "dropdown" ? (
          <QuizDropdown
            label={question.text}
            setResponse={this.setResponse}
            options={question.options}
          />
        ) : question.type === "toggle" && (
          <QuizToggle
            label={question.text}
            response={this.state.response.response}
            setResponse={this.setResponse}
          />
        )}
      </Panel>
    );
  }
}

Quiz.propTypes = {
  quiz: PropTypes.array.isRequired,
  score: PropTypes.number,
  error: PropTypes.string,
  responses: PropTypes.array.isRequired,
  registerResponse: PropTypes.func.isRequired,
  setQuizError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
  quizScore: state.quiz.score,
  error: state.quiz.error,
  responses: state.quiz.responses
});

const mapDispatchToProps = dispatch => ({
  registerResponse: (id, questionType, response) => dispatch(registerResponse(id, questionType, response)),
  setQuizError: error => dispatch(setQuizError(error)),
  scoreQuiz: () => dispatch(scoreQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
