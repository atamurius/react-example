import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  reducer as tasksReducer,
  routes as tasksRoutes
} from './tasks';

import {
  routes as ordersRoutes,
  reducer as ordersReducer,
  actor as ordersActor,
} from './orders';

export const reducer = combineReducers({
  tasks: tasksReducer,
  orders: ordersReducer,
  routing: routerReducer,
});

export const routes = [
  ordersRoutes,
  tasksRoutes
];

export const actorMiddleware = store => next => action => {
  const result = next(action);
  ordersActor(store.getState(), action, store.dispatch);
  return result;
}
