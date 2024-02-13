import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { appReducer } from "./appRedux";
import { docsReducer } from "./reducers/documents/docsReducer";

const rootReducers = combineReducers({
  app: appReducer,
  docsReducer: docsReducer
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
