import axios from 'axios';
import I from 'immutable';

export const menu = state => state.orders.menu;
export const name = state => state.orders.name;
export const orders = state => state.orders.orders.content;
export const order = state => state.orders.order;
export const isFetching = state => state.orders.isFetching;
export const paging = state => ({
  total: state.orders.orders.totalPages,
  current: state.orders.orders.number,
});

export const reservations = state => I.fromJS(order(state).reservations || I.List())
  .groupBy(r => `${r.get('username')}:${r.getIn(['dish','id'])}`)
  .map(list => list.get(0));

export const categories = state => I.fromJS(menu(state))
  .groupBy(d => d.getIn(['category','id']));

export const quantityOf = (user, dishId, reservations) =>
  reservations.get(`${user}:${dishId}`, I.Map()).get('amount', 0);


function _totalOf(users, dishes, reservations, doCost = true) {

  const cost = (user, dish) =>
    quantityOf(user, dish.get('id'), reservations) * (doCost ? dish.get('price') : 1);

  const dishSubtotal = dish =>
    users.reduce((subTotal, user) => subTotal + cost(user, dish), 0);

  return dishes.reduce((total, dish) => total + dishSubtotal(dish), 0);
}

export const totalCostOf = (users, dishes, reservations) =>
  _totalOf(users, dishes, reservations, true);

export const totalQuantityOf = (users, dishes, reservations) =>
  _totalOf(users, dishes, reservations, false);

export const usersOfOrder = (order, current) => I.fromJS(order.reservations)
    .groupBy(r => r.get('username'))
    .keySeq()
    .filter(u => u !== current);


export const ORDER_CLEAR_INFO = 'ORDER_CLEAR_INFO';

const requestAction = prefix => ({
  REQUEST: `${prefix}_REQUEST`,
  SUCCESS: `${prefix}_SUCCESS`,
  FAILURE: `${prefix}_FAILURE`,
})

const ajaxAction = ({ actionType, request, dataKey = 'data' }) => (...args) => (dispatch, getState) => {
  dispatch({ type: actionType.REQUEST, args });
  request(getState(), ...args)
    .then(res => {
      try {
        dispatch({
          type: actionType.SUCCESS,
          [dataKey]: res.data
        })
      } catch (e) {
        console.error(e);
      }
    })
    .catch(err => dispatch({
      type: actionType.FAILURE,
      err,
    }))
}


export const ORDER_PIN_ENTERED = 'ORDER_PIN_ENTERED';

export const pinEntered = (code, name) => ({
  type: ORDER_PIN_ENTERED,
  code, name,
})


export const ORDER_RESERVE = requestAction('ORDER_RESERVE');

export const reserveOrderDish = ajaxAction({
  actionType: ORDER_RESERVE,
  request: (state, dish) => axios
    .put(`/api/orders/${order(state).id}/${name(state)}/${dish}?code=${state.orders.code}`)
})

export const unreserveOrderDish = ajaxAction({
  actionType: ORDER_RESERVE,
  request: (state, dish) => axios
    .delete(`/api/orders/${order(state).id}/${name(state)}/${dish}?code=${state.orders.code}`)
})



export const ORDERS_FETCH = requestAction('ORDERS_FETCH');

export const fetchOrdersList = ajaxAction({
  actionType: ORDERS_FETCH,
  request: (state, page) => axios.get('/api/orders', { params: { page: page || 0 } }),
  dataKey: 'orders',
});

/*
export const fetchOrdersList = (page = 0) => dispatch => {
  dispatch({ type: ORDERS_FETCH.REQUEST });
  axios.get('/api/orders', {
    params: {
      page
    }
  })
   .then(res => dispatch({ type: ORDERS_FETCH.SUCCESS, orders: res.data }))
   .catch(err => dispatch({ type: ORDERS_FETCH.FAILURE }));
}
*/

export const ORDER_FETCH_REQUEST = 'ORDER_FETCH_REQUEST';
export const ORDER_FETCH_SUCCESS = 'ORDER_FETCH_SUCCESS';
export const ORDER_FETCH_FAILURE = 'ORDER_FETCH_FAILURE';

export const fetchOrder = (id, code) => dispatch => {
  dispatch({ type: ORDER_FETCH_REQUEST });
  axios.get(`/api/orders/${id}`, { params: { code } })
   .then(res => dispatch({ type: ORDER_FETCH_SUCCESS, order: res.data }))
   .catch(err => dispatch({ type: ORDER_FETCH_FAILURE }));
}


export const MENU_FETCH_REQUEST = 'MENU_FETCH_REQUEST';
export const MENU_FETCH_SUCCESS = 'MENU_FETCH_SUCCESS';
export const MENU_FETCH_FAILURE = 'MENU_FETCH_FAILURE';

export const fetchMenu = () => dispatch => {
  dispatch({ type: MENU_FETCH_REQUEST });
  axios.get(`/api/dishes`)
   .then(res => dispatch({
      type: MENU_FETCH_SUCCESS,
      menu: res.data.content,
    }))
   .catch(err => dispatch({ type: MENU_FETCH_FAILURE, err }));
}
