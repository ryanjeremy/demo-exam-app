import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuizInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.setResponse(event.target.value);
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="input">{this.props.label}</label>
        <input
          type="text"
          className="form-control"
          id="input"
          value={this.props.response}
          onChange={this.onChange}
          style={{
            maxWidth:"450px"
          }}
        />
      </div>
    );
  }
}

QuizInput.propTypes = {
  label: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
  setResponse: PropTypes.func.isRequired
};

export default QuizInput;
