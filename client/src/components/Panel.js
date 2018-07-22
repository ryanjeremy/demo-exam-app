import React from 'react';
import PropTypes from 'prop-types';

import './Panel.scss';

const Panel = ({ children, title, buttonText, buttonOnClick, loading }) => (
    <div className="container">
      <div className="panel d-flex align-items-start flex-column">
        <div className="p-2 top-content ">
          <h1>{title}</h1>
          <hr />
          {children}
        </div>
        <button className="p-2 mt-auto bottom-button" onClick={buttonOnClick}>
          {loading ? (
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </div>
    </div>
);

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object, PropTypes.array
  ]),
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Panel;
