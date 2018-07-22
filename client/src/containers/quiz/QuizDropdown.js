import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuizDropdown extends Component {
  constructor(props) {
    super(props);
    this.setResponse = this.setResponse.bind(this);
  }

  setResponse(event) {
    this.props.setResponse(event.target.value);
  }

  renderOptions() {
    return this.props.options.map((option, index) => (
      <option value={index} key={index}>{option.text}</option>
    ))
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="select">{this.props.label}</label>
        <select
          id="select"
          className="form-control"
          onChange={this.setResponse}
          style={{
            maxWidth:"450px"
          }}
        >
          <option value="">Select...</option>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}

QuizDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setResponse: PropTypes.func.isRequired
};

export default QuizDropdown;
