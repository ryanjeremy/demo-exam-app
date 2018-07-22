import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Init from './containers/init/Init';

import './style.scss';

const store = createStore(reducer, applyMiddleware(
  thunk
));

const App = () => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Init} />
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
