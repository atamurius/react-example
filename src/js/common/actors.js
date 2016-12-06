
export const actors = actors => store => next => action => {
  const result = next(action);
  for (let actor of actors) {
    actor(action, store.dispatch);
  }
  return result;
}
