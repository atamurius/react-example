import * as Orders from './ordersModel';

const initialState = {
  orders: { },
  order: { },
  menu: [ ],
  code: null,
  name: 'Аноним',
  isFetching: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case Orders.ORDERS_FETCH.REQUEST:
    case Orders.MENU_FETCH_REQUEST:
    case Orders.ORDER_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case Orders.ORDERS_FETCH.SUCCESS:
      return {
        ...state,
        orders: action.orders,
        isFetching: false
      }

    case Orders.MENU_FETCH_SUCCESS:
      return {
        ...state,
        menu: action.menu,
        isFetching: false
      }

    case Orders.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        order: action.order,
        isFetching: false
      }

    case Orders.ORDER_CLEAR_INFO:
      return {
        ...state,
        order: { }
      };

    case Orders.ORDER_PIN_ENTERED:
      return {
        ...state,
        code: action.code,
        name: action.name,
      };

    case Orders.MENU_FETCH_FAILURE:
    case Orders.ORDERS_FETCH.FAILURE:
    case Orders.ORDER_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
}


//- ----------

/*

const increment = () => ({ type: 'INCREMENT' });

const incrementBy = n => dispatch => {
  dispatch(increment());
  if (n > 1) {
    dispatch(incrementBy(n - 1));
  }
}

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

const thunkMiddleware = (store, action, next) => {
  if (typeof action === 'function') {
    action(store.dispatch)
  } else {
    next(action)
  }
}

const store = {
  state: null,
  reducer,
  middleware: thunkMiddleware,
  dispatch(action) {
    middleware(this, action, action => {
      this.state = this.reducer(this.state, action);
    });
  }
}

store.dispatch(incrementBy(3))

*/
