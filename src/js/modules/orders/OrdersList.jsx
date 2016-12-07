import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { 
  orders, isFetching, ORDERS_FETCH_REQUEST,
  ordersFetchSuccess, ORDERS_FETCH_FAILURE
} from './ordersReducer';
import axios from 'axios';

@connect(state => ({
  orders: orders(state),
  isFetching: isFetching(state),
}))
export default class OrdersList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: ORDERS_FETCH_REQUEST });
    axios.get('/api/orders')
         .then(res => dispatch(ordersFetchSuccess(res.data)))
         .catch(err => dispatch({ type: ORDERS_FETCH_FAILURE }));
  }

  render() {
    const { orders, isFetching } = this.props;
    return (
      <div>
        <h1>Orders list</h1>
        {orders && orders.length ?
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Users</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => 
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.users.join(', ')}</td>
                  <td className="text-right">{order.amount.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>
          :
          <p>Orders are {isFetching || 'not'} fetching</p>
        }
      </div>
    )
  }
}
