import { combineReducers } from 'redux';

import {
  reducer as tasksReducer,
  routes as tasksRoutes
} from './tasks';

import {
  routes as ordersRoutes,
  reducer as ordersReducer,
} from './orders';

export const reducer = combineReducers({
  tasks: tasksReducer,
  orders: ordersReducer,
});

export const routes = [
  ordersRoutes,
  tasksRoutes
];
