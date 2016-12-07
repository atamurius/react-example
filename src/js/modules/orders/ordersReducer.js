
export const ORDERS_FETCH_REQUEST = 'ORDERS_FETCH_REQUEST';
export const ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
export const ORDERS_FETCH_FAILURE = 'ORDERS_FETCH_FAILURE';

export const ordersFetchSuccess = orders => ({
  type: ORDERS_FETCH_SUCCESS,
  orders,
})

const initialState = {
  orders: [],
  isFetching: false
}

export const orders = state => state.orders.orders.content;
export const isFetching = state => state.orders.isFetching;

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
