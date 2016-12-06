import query from 'query-string';
import pattern from 'url-pattern';

export const LOCATION_CHANGED = 'LOCATION_CHANGED';

const locationChanged = (action, location) => ({
  type: LOCATION_CHANGED,
  action,
  pathname: location.pathname,
  query: query.parse(location.search),
  hash: location.hash,
  state: location.state,
})

export function connect(history, store) {
  history.listen((location, action) => {
    store.dispatch(locationChanged(action, location))
  });
  // Initial event
  store.dispatch(locationChanged(history.action, history.location));
}

const LOCATION_NAGIVATE = 'LOCATION_NAGIVATE';

const navigate = method => (loc, state) => ({
  type: LOCATION_NAGIVATE,
  method,
  loc: typeof loc === 'string' ? loc : {
    ...loc,
    search: loc.query ? query.stringify(loc.query) : void 0
  },
  state,
})

export const push = navigate('push');
export const replace = navigate('replace');

export const actor = history => action => {
  if (action.type === LOCATION_NAGIVATE) {
    history[action.method](action.loc, action.state);
  }
}
