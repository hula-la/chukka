import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import signupAccounts, { signupAccountsSaga } from './signup';
import loginAccounts, { loginAccountsSaga } from './login';
import loading from './loading';

const rootReducer = combineReducers({
  signupAccounts,
  loginAccounts,
  loading,
});

export function* rootSaga() {
  yield all([signupAccountsSaga(), loginAccountsSaga()]);
}

export default rootReducer;
