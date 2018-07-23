import React from 'react';
import PropTypes from 'prop-types';

import './CodePreview.scss';

const CodePreview = ({ code }) => (
  <div className="code-preview">
    <pre style={{color: "#37d404", margin: 0}}>{code}</pre>
  </div>
);

CodePreview.propTypes = {
  code: PropTypes.string.isRequired
};

export default CodePreview;
