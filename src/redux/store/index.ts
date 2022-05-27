import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

declare global {
  interface Window {
    _REDUX_DEVTOOLS_EXTENSION_COMPOSE_?: typeof compose;
  }
}

const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};
const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: () => true });

const persistedStore = loadFromLocalStorage();
const store = createStore(
  reducers,
  persistedStore,
  composeWithDevTools(applyMiddleware(loggerMiddleware, thunk))
);
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
