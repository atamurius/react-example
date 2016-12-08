import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { reducer, routes } from './modules';
import Layout from './layout/Layout';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk));

const history = syncHistoryWithStore(useRouterHistory(createHistory)(), store);

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout}>
          {routes}
        </Route>
      </Router>
    </Provider>,
    document.getElementById('content')
);
