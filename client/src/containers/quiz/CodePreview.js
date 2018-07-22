import React from 'react';
import PropTypes from 'prop-types';

import './CodePreview.scss';

const CodePreview = ({ code }) => (
  <div className="code-preview">{code}</div>
);

CodePreview.propTypes = {
  code: PropTypes.string.isRequired
};

export default CodePreview;
