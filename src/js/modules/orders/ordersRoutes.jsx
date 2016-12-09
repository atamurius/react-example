import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import OrdersList from './OrdersList';
import OrderDetails from './OrderDetails';

export default (
  <Route path="orders">
    <IndexRoute component={OrdersList} />
    <Route path=":id" component={OrderDetails} />
  </Route>
)
