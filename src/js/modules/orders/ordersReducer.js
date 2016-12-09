import axios from 'axios';

export const ORDERS_FETCH_REQUEST = 'ORDERS_FETCH_REQUEST';
export const ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
export const ORDERS_FETCH_FAILURE = 'ORDERS_FETCH_FAILURE';

export const ordersFetchSuccess = orders => ({
  type: ORDERS_FETCH_SUCCESS,
  orders,
})

export const ORDER_PIN_ENTERED = 'ORDER_PIN_ENTERED';

export const pinEntered = code => ({
  type: ORDER_PIN_ENTERED,
  code,
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

export const ORDER_FETCH_REQUEST = 'ORDER_FETCH_REQUEST';
export const ORDER_FETCH_SUCCESS = 'ORDER_FETCH_SUCCESS';
export const ORDER_FETCH_FAILURE = 'ORDER_FETCH_FAILURE';

export const fetchOrder = (id, code) => dispatch => {
  dispatch({ type: ORDER_FETCH_REQUEST });
  axios.get(`/api/orders/${id}`, { params: { code } })
   .then(res => dispatch({ type: ORDER_FETCH_SUCCESS, order: res.data }))
   .catch(err => dispatch({ type: ORDER_FETCH_FAILURE }));
}

const initialState = {
  orders: { },
  order: { },
  code: null,
  isFetching: false
}

export const orders = state => state.orders.orders.content;
export const order = state => state.orders.order;
export const isFetching = state => state.orders.isFetching;
export const paging = state => ({
  total: state.orders.orders.totalPages,
  current: state.orders.orders.number,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ORDERS_FETCH_REQUEST:
    case ORDER_FETCH_REQUEST:
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

    case ORDER_FETCH_SUCCESS:
      return {
        ...state,
        order: action.order,
        isFetching: false
      }

    case 'ORDER_CLEAR_INFO':
      return {
        ...state,
        order: { }
      };

    case ORDER_PIN_ENTERED:
      return {
        ...state,
        code: action.code
      };

    case ORDERS_FETCH_FAILURE:
    case ORDER_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
}

export const actor = (state, action, dispatch) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const { payload: { pathname, query } } = action;
    if (pathname.match(/^\/orders\/?$/)) {
      const loadedPage = paging(state).current;
      const page = +(query.page || loadedPage || 0);
      if (page !== loadedPage) {
        dispatch(fetchOrdersList(page));
      }
    }
  }

  if (action.type === '@@router/LOCATION_CHANGE') {
    const { payload: { pathname, query } } = action;
    const match = pathname.match(/^\/orders\/(\d+)\/?$/);
    if (match[1] != order(state).id) {
      console.log(match[1], order(state).id)
      dispatch({ type: 'ORDER_CLEAR_INFO' })
    }
  }

  if (action.type === ORDER_PIN_ENTERED) {
    const { pathname } = state.routing.locationBeforeTransitions;
    const match = pathname.match(/^\/orders\/(\d+)\/?$/);
    if (match) {
      dispatch(fetchOrder(match[1], action.code));
    }
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
