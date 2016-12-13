import * as Orders from './ordersModel';

export default (state, action, dispatch) => {

  if (action.type === '@@router/LOCATION_CHANGE') {
    const { payload: { pathname, query } } = action;
    if (pathname.match(/^\/orders\/?$/)) {
      const loadedPage = Orders.paging(state).current;
      const page = +(query.page || loadedPage || 0);
      if (page !== loadedPage) {
        dispatch(Orders.fetchOrdersList(page));
      }
    }
  }

  // Order details page navigated
  if (action.type === '@@router/LOCATION_CHANGE') {
    const { payload: { pathname, query } } = action;
    const match = pathname.match(/^\/orders\/(\d+)\/?$/);
    if (match && match[1] != Orders.order(state).id) {
      //dispatch({ type: 'ORDER_CLEAR_INFO' })
      dispatch(Orders.pinEntered('0000','Алексей'))
      if (Orders.menu(state).length === 0) {
        dispatch(Orders.fetchMenu());
      }
    }
  }

  if (action.type === Orders.ORDER_PIN_ENTERED) {
    const { pathname } = state.routing.locationBeforeTransitions;
    const match = pathname.match(/^\/orders\/(\d+)\/?$/);
    if (match) {
      dispatch(Orders.fetchOrder(match[1], action.code));
    }
  }

  if (action.type === Orders.ORDER_RESERVE.SUCCESS) {
    dispatch(Orders.fetchOrder(Orders.order(state).id, state.orders.code));
  }
}
