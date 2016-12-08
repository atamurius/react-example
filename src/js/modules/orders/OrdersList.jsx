import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import {
  orders, isFetching, paging,
  fetchOrdersList, 
} from './ordersReducer';
import { Link } from 'react-router';

@connect(state => ({
  orders: orders(state),
  isFetching: isFetching(state),
  page: paging(state),
}), {
  fetch: fetchOrdersList
})
export default class OrdersList extends React.Component {

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const { page, isFetching, fetch, location: { query } } = props;
    if (! isFetching && (query.page != page.current || ! page.total)) {
      fetch(query.page || page.current || 0);
    }
  }

  navigation() {
    const res = [];
    for (let i = 0; i < this.props.page.total; i++)
      res.push(
        <Link
          key={i}
          to={`/orders?page=${i}`}
          activeClassName="btn-primary"
          className='btn btn-default btn-xs'
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
                  <td>{order.id}</td>
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
