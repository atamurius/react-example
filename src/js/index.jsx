import { reducer } from './modules/tasks/reducer';
import TaskList from './modules/tasks/TaskList';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store}>
      <TaskList text="My task list" />
    </Provider>,
    document.getElementById('content')
);
