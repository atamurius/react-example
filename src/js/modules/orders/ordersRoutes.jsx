import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import OrdersList from './OrdersList';

export default (
  <Route path="orders" component={OrdersList} />
)
