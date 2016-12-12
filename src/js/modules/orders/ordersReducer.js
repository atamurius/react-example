import axios from 'axios';

export const ORDERS_FETCH_REQUEST = 'ORDERS_FETCH_REQUEST';
export const ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
export const ORDERS_FETCH_FAILURE = 'ORDERS_FETCH_FAILURE';

export const ordersFetchSuccess = orders => ({
  type: ORDERS_FETCH_SUCCESS,
  orders,
})

export const ORDER_PIN_ENTERED = 'ORDER_PIN_ENTERED';

export const pinEntered = (code, name) => ({
  type: ORDER_PIN_ENTERED,
  code, name,
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

const initialState = {
  orders: { },
  order: { },
  menu: [ ],
  code: null,
  name: 'Аноним',
  isFetching: false
}

export const menu = state => state.orders.menu;
export const name = state => state.orders.name;
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
    case MENU_FETCH_REQUEST:
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

    case MENU_FETCH_SUCCESS:
      return {
        ...state,
        menu: action.menu,
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
        code: action.code,
        name: action.name,
      };

    case MENU_FETCH_FAILURE:
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

  // Order details page navigated
  if (action.type === '@@router/LOCATION_CHANGE') {
    const { payload: { pathname, query } } = action;
    const match = pathname.match(/^\/orders\/(\d+)\/?$/);
    if (match && match[1] != order(state).id) {
      //dispatch({ type: 'ORDER_CLEAR_INFO' })
      dispatch(pinEntered('0000','Алексей'))
      if (menu(state).length === 0) {
        dispatch(fetchMenu());
      }
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
