import { createStore } from 'redux';
import { appReducer } from "./AppRedux"

const store = createStore(appReducer)

export default store;