import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import { reducer, routes } from './modules';
import Layout from './layout/Layout';

const store1 = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store1}>
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          {routes}
        </Route>
      </Router>
    </Provider>,
    document.getElementById('content')
);
