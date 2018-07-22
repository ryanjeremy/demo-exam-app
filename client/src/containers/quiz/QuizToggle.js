import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuizToggle extends Component {
  constructor(props) {
    super(props);
    this.setResponse = this.setResponse.bind(this);
  }

  setResponse(event) {
    this.props.setResponse(event.target.value === "true");
  }

  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="inputTrue"
            value="true"
            checked={this.props.response === true}
            onChange={this.setResponse}
          />
          <label className="form-check-label" htmlFor="inputTrue">True</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="inputFalse"
            value="false"
            checked={this.props.response === false}
            onChange={this.setResponse}
          />
          <label className="form-check-label" htmlFor="inputFalse">False</label>
        </div>
      </div>
    );
  }
}

QuizToggle.propTypes = {
  label: PropTypes.string.isRequired,
  response: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  setResponse: PropTypes.func.isRequired
};

export default QuizToggle;
