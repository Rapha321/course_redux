import { createStore } from "redux";
import { rootReducers, applyMiddleware, compose } from "./reducers";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialStore) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux dev tools
  return createStore(
    rootReducer,
    initialStore,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}
