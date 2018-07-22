import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerResponse, setQuizError } from '../../actions/quizActions';
import Panel from '../../components/Panel';
import CodePreview from './CodePreview';

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

    } else {
      const quizIndex = this.props.responses.length > 0
        ? this.props.responses.length : 0;
      this.setQuestion(quizIndex);
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

  }

  render() {
    if (this.state.quizIndex === -1) return null;

    const question = this.props.quiz[this.state.quizIndex];
    return (
      <Panel
        title="Coding Quiz"
        error={this.props.error}
        buttonText={this.state.quizIndex === this.props.quiz.length - 1 ? "Complete" : "Next Question"}
        buttonOnClick={this.buttonCLick}
        loading={this.state.loading}
      >
        <h4>{"Question #" + (this.state.quizIndex + 1)}</h4>
        {question.code && (
          <CodePreview code={question.code} />
        )}
        <p>{question.text}</p>
      </Panel>
    );
  }
}

Quiz.propTypes = {
  quiz: PropTypes.array.isRequired,
  error: PropTypes.string,
  responses: PropTypes.array.isRequired,
  registerResponse: PropTypes.func.isRequired,
  setQuizError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
  error: state.quiz.error,
  responses: state.quiz.responses
});

const mapDispatchToProps = dispatch => ({
  registerResponse: (id, questionType, response) => dispatch(registerResponse(id, questionType, response)),
  setQuizError: error => dispatch(setQuizError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
