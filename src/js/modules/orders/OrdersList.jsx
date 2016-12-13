import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import {
  orders, isFetching, paging,
  fetchOrdersList,
} from './ordersModel';
import { Link } from 'react-router';

@connect(state => ({
  orders: orders(state),
  isFetching: isFetching(state),
  page: paging(state),
}), {
  fetch: fetchOrdersList
})
export default class OrdersList extends React.Component {

  navigation() {
    const { page: { current } } = this.props;
    const res = [];
    for (let i = 0; i < this.props.page.total; i++)
      res.push(
        <Link
          key={i}
          to={`/orders?page=${i}`}
          className={`btn btn-default btn-xs ${current === i && 'btn-primary'}`}
        >
          {i + 1}
        </Link>
      )
    return res;
  }

  render() {
    const { orders, isFetching, page } = this.props;
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
                  <td>
                    <Link to={`/orders/${order.id}`}>
                      #{order.id}
                    </Link>
                  </td>
                  <td>{order.users.join(', ')}</td>
                  <td className="text-right">{order.amount.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right">
                  <div className="btn-group">
                    {this.navigation()}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          :
          <p>Orders are {isFetching || 'not'} fetching</p>
        }
      </div>
    )
  }
}
