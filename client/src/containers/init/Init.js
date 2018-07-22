import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from '../../components/Panel';
import { connect } from 'react-redux';
import { fetchQuiz } from '../../actions/quizActions';

class Init extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.setQuiz = this.setQuiz.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.error && !!this.props.error) {
      this.setState({
        loading: false
      });
    } else if (prevProps.quiz.length === 0 && this.props.quiz.length > 0) {
      this.props.history.replace("/quiz");
    }
  }

  setQuiz() {
    if (!this.state.loading) {
      this.setState({
        loading: true
      }, () => {
        this.props.fetchQuiz();
      });
    }
  }

  render() {
    return (
      <Panel
        title="Coding Quiz"
        error={this.props.error}
        buttonText="Begin Quiz"
        buttonOnClick={this.setQuiz}
        loading={this.state.loading}
      >
        <h4>Ready To Get Started!?</h4>
        <p>{"We'll go ahead and test your coding experience with 3 simple questions. There's no time limit, so take your time! However, once you move on from a question, you won't be able to go back. So be sure to review your answer carefully!"}</p>
        <p>Good luck!</p>
      </Panel>
    );
  }
}

Init.propTypes = {
  quiz: PropTypes.array.isRequired,
  error: PropTypes.string,
  fetchQuiz: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  quiz: state.quiz.quiz,
  error: state.quiz.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuiz: () => dispatch(fetchQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(Init);
