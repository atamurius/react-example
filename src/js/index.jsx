import { reducer } from './modules/tasks/reducer';
import TaskList from './modules/tasks/TaskList';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { connect, actor, push } from './common/router';
import { actors } from './common/actors';

const history = createHistory();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    actors([
      actor(history)
    ])
  ));

connect(history, store);

store.dispatch(push('/test/route'))

ReactDOM.render(
    <Provider store={store}>
      <TaskList text="My task list" />
    </Provider>,
    document.getElementById('content')
);
