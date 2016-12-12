import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { order, name, menu, pinEntered } from './ordersReducer';
import I from 'immutable';

@connect(state => ({
  order: order(state),
  name: name(state),
  menu: menu(state),
}), {
  pinEntered
})
export default class OrderDetails extends React.Component {

  enter = e => {
    e.preventDefault();
    const els = e.target.elements;
    this.props.pinEntered(els.code.value, els.name.value);
  }

  render() {
    const { order, name, menu } = this.props;
    return (
      <div>
        <h1>Order details: #{this.props.params.id}</h1>
        {! order.id ?
          <OrderAccessForm onEnter={this.enter}/>
          :
          <OrderTable
            dishes={menu}
            reservations={order.reservations}
            current={name} />
        }
      </div>
    )
  }
}

const OrderAccessForm = ({ onEnter }) =>
  <form className="form" onSubmit={onEnter}>
    <div className="form-group">
      <label for="code">Пин-код:</label>
      <input
        type="text"
        name="code"
        className="form-control"
        id="code"
        placeholder="Пин-код"
      />
    </div>
    <div className="form-group">
      <label for="name">Ваше имя:</label>
      <input
        type="text"
        name="name"
        className="form-control"
        id="name"
        placeholder="Имя"
      />
    </div>
    <button
      type="submit"
      className="btn btn-default"
    >
      Открыть
    </button>
  </form>
;

function OrderTable({ dishes, reservations, current }) {

  const users = I.fromJS(reservations)
    .groupBy(r => r.get('username'))
    .keySeq()
    .filter(u => u !== current);

  const reservs = I.fromJS(reservations)
    .groupBy(r => `${r.get('username')}:${r.getIn(['dish','id'])}`)
    .map(list => list.get(0));
  
  const categories = I.fromJS(dishes)
    .groupBy(d => d.getIn(['category','id']));

  const total = (dishes, user) => dishes.reduce((sum,dish) => 
    sum + reservs.get(`${user}:${dish.get('id')}`,I.Map()).get('amount',0) * dish.get('price'),
    0 
  );

  const catBlocks = categories.map((dishes, cat) => [
          <thead key={`${cat}-header`}>
            <tr>
              <th>{dishes.getIn([0, 'category', 'title'])}</th>
              <th className="text-right">Цена</th>
              <th className="text-center warning">Кол.</th>
              <th className="text-right warning">Стоим.</th>
              {users.map(u =>
                <th 
                  key={u}
                  className="text-right"
                >
                  {u}
                </th>
              )}
              <th className="text-center info">Кол. всего</th>
              <th className="text-right info">Стоим. всего</th>
            </tr>
          </thead>,
          <tbody key={cat}>
            {dishes.map(dish =>
              <DishOrder key={dish.get('id')} {...{dish, users, reservs, current}} />
            )}

            <tr className="footer">
              <td colSpan="2"></td>
              <td colSpan="2" className="text-right warning">
                {total(dishes, current)}
              </td>
              {users.map(u =>
                <td className="text-right">{total(dishes, u)}</td>
              )}
              <td colSpan="2" className="text-right info">
                {total(dishes, current) + users.reduce((sum, u) => sum + total(dishes,u), 0)}
              </td>
            </tr>
          </tbody>
        ]).reduce((acc, x) => acc.concat(x), []);

  return (
  <div>
      <style>{`
      .table .footer td {
        border-top: 2px solid #ddd;
        background: white;
      }
      .table .footer:hover td {
        background: white;
      }
      .table tbody {
        border-bottom: 2px solid #ddd;
      }
      .order-table tbody tr button {
        visibility: hidden;
      }
      .order-table tbody tr:hover button {
        visibility: visible;
      }
    `}
    </style>
      <h1>Ваш заказ</h1>
      <table className="table order-table table-hover table-striped">
        {catBlocks}
        <tfoot>
          <tr>
            <td colSpan="2"></td>
            <td colSpan="2" className="text-right warning">
              150
            </td>
            {users.map(u =>
              <td key={u} className="text-right">60</td>
            )}
            <td colSpan="2" className="text-right info">330</td>
          </tr>
        </tfoot>
      </table>
  </div>
  )
}

function DishOrder({ dish, users, reservs, current }) {
  const r = reservs.get(`${current}:${dish.get('id')}`, I.Map());
  const d = dish.toJS();
  const userReservs = users.map(u => reservs.get(`${u}:${d.id}`, I.Map()));
  const totalAmount = r.get('amount', 0) + userReservs
    .map(r => r.get('amount',0))
    .reduce((a,b) => a + b, 0);
  return (
    <tr>
      <td>{d.name}</td>
      <td className="text-right">{d.price.toFixed(2)}</td>
      <td className="text-center warning">
        <button className="btn btn-xs btn-default btn-success">
          <span className="glyphicon glyphicon-plus-sign"></span>
        </button>
        <span className="badge">{r.get('amount', 0)}</span>
        <button className="btn btn-xs btn-danger">
          <span className="glyphicon glyphicon-minus-sign"></span>
        </button>
      </td>
      <td className="text-right warning">{
        (r.get('amount',0) * d.price).toFixed(2)
      }</td>
      {userReservs.map((ur,u) =>
        <td key={u} className="text-right">
          {ur.get('amount') ? (ur.get('amount',0) * d.price).toFixed(2) : null} 
          {' '}
          {ur.get('amount') ? 
            <span className="badge">{ur.get('amount',0)}</span>
            :
            null
          }
        </td> 
      )}
      <td className="text-center info">{totalAmount}</td>
      <td className="text-right info">{(totalAmount * d.price).toFixed(2)}</td>
    </tr>
  )
}