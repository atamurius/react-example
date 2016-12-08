import axios from 'axios';

export const ORDERS_FETCH_REQUEST = 'ORDERS_FETCH_REQUEST';
export const ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
export const ORDERS_FETCH_FAILURE = 'ORDERS_FETCH_FAILURE';

export const ordersFetchSuccess = orders => ({
  type: ORDERS_FETCH_SUCCESS,
  orders,
})

export const fetchOrdersList = (page = 0) => dispatch => {
  dispatch({ type: ORDERS_FETCH_REQUEST });
  axios.get('/api/orders', {
    params: {
      page
    }
  })
   .then(res => dispatch(ordersFetchSuccess(res.data)))
   .catch(err => dispatch({ type: ORDERS_FETCH_FAILURE }));
}

const initialState = {
  orders: [],
  isFetching: false
}

export const orders = state => state.orders.orders.content;
export const isFetching = state => state.orders.isFetching;
export const paging = state => ({
  total: state.orders.orders.totalPages,
  current: state.orders.orders.number,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ORDERS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        isFetching: false
      }

    case ORDERS_FETCH_FAILURE:
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
