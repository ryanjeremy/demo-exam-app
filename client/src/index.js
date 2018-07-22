import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Init from './containers/init/Init';
import Quiz from './containers/quiz/Quiz';
import Result from './containers/result/Result';

import './style.scss';

const store = createStore(reducer, applyMiddleware(
  thunk
));

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Init} />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/result" component={Result} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
