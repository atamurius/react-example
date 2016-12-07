import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import TaskList from './TaskList';

export default (
  <Route path="tasks" component={TaskList} />
)
