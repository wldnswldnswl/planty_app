import { combineReducers } from 'redux';



import isLogin from './status.reducer';

//reducer: A function that receives the current Redux state and the action dispatched, and returns a new state object that replaces the current state in the store.


const rootReducer = combineReducers({

  isLogin

});


export default rootReducer;