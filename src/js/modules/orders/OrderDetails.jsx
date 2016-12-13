import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { 
  order, name, pinEntered, quantityOf, reservations, categories,
  usersOfOrder, totalCostOf, totalQuantityOf, reserveOrderDish,
  unreserveOrderDish,
} from './ordersModel';
import I from 'immutable';

@connect(state => ({
  reservations: reservations(state),
  categories: categories(state),
  order: order(state),
  name: name(state),
}), {
  pinEntered, reserveOrderDish, unreserveOrderDish
})
export default class OrderDetails extends React.Component {

  enter = e => {
    e.preventDefault();
    const els = e.target.elements;
    this.props.pinEntered(els.code.value, els.name.value);
  }

  render() {
    const { reservations, order, name, categories, reserveOrderDish, unreserveOrderDish } = this.props;
    return (
      <div>
        <h1>Order details: #{this.props.params.id}</h1>
        {! order.id ?
          <OrderAccessForm onEnter={this.enter}/>
          :
          <OrderTable
            categories={categories}
            reservations={reservations}
            users={usersOfOrder(order, name)}
            reserve={reserveOrderDish}
            unreserve={unreserveOrderDish}
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

function OrderTable({ users, categories, reservations, current, reserve, unreserve }) {

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
              <DishOrder key={dish.get('id')} {...{dish, users, reservations, current, reserve, unreserve}} />
            )}

            <tr className="footer">
              <td colSpan="2"></td>
              <td colSpan="2" className="text-right warning">
                {totalCostOf([current], dishes, reservations)}
              </td>
              {users.map(u =>
                <td className="text-right">
                  {totalCostOf([u], dishes, reservations)}
                </td>
              )}
              <td colSpan="2" className="text-right info">
                {totalCostOf(users.concat(current), dishes, reservations)}
              </td>
            </tr>
          </tbody>
        ]).reduce((acc, x) => acc.concat(x), []);

  const dishes = categories.valueSeq().reduce((acc,ds) => acc.concat(ds), I.List());

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
              {totalCostOf(
                [current], 
                dishes,
                reservations
              )}
            </td>
            {users.map(u =>
              <td key={u} className="text-right">
                {totalCostOf(
                  [u], 
                  dishes,
                  reservations
                )}
              </td>
            )}
            <td colSpan="2" className="text-right info">
                {totalCostOf(
                  users.concat([current]), 
                  dishes,
                  reservations
                )}
            </td>
          </tr>
        </tfoot>
      </table>
  </div>
  )
}

function DishOrder({ dish, users, reservations, current, reserve, unreserve }) {
  return (
    <tr>
      <td>{dish.get('name')}</td>
      <td className="text-right">{dish.get('price').toFixed(2)}</td>
      <td className="text-center warning">
        <button 
          className="btn btn-xs btn-default btn-success"
          onClick={() => reserve(dish.get('id'))}
        >
          <span className="glyphicon glyphicon-plus-sign"></span>
        </button>
        <span className="badge">{quantityOf(current, dish.get('id'), reservations)}</span>
        <button
          className="btn btn-xs btn-danger"
          onClick={() => unreserve(dish.get('id'))}
        >
          <span className="glyphicon glyphicon-minus-sign"></span>
        </button>
      </td>
      <td className="text-right warning">{
        (quantityOf(current, dish.get('id'), reservations) * dish.get('price')).toFixed(2)
      }</td>
      {users.map(u =>
        <td key={u} className="text-right">
          {quantityOf(u, dish.get('id'), reservations) * dish.get('price')}
          {' '}
          <span className="badge">{quantityOf(u, dish.get('id'), reservations)}</span>
        </td>
      )}
      <td className="text-center info">
        {totalQuantityOf(users.concat([current]), [dish], reservations)}
      </td>
      <td className="text-right info">
        {totalCostOf(users.concat([current]), [dish], reservations)}
      </td>
    </tr>
  )
}
