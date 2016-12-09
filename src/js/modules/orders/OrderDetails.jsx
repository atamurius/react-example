import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { order, pinEntered } from './ordersReducer';

@connect(state => ({
  order: order(state),
}), {
  pinEntered
})
export default class OrderDetails extends React.Component {

  enter = e => {
    e.preventDefault();
    this.props.pinEntered(this.refs.code.value);
  }

  render() {
    const { order } = this.props;
    return (
      <div>
        <h1>Order details: #{this.props.params.id}</h1>
        {! order.id ?
          <form className="form-inline" onSubmit={this.enter}>
            <div className="form-group">
              <label for="code">Code:&nbsp;</label>
              <input
                type="text"
                ref="code"
                className="form-control"
                id="code"
                placeholder="Пин-код"
              />
            </div>
            <button
              type="submit"
              className="btn btn-default"
            >
              Открыть
            </button>
          </form>
          :
          <ul>
            {order.reservations.map(r =>
              <li><b>{r.username}</b> ordered {r.amount} of {r.dish.name}</li>
            )}
          </ul>
        }
      </div>
    )
  }
}
