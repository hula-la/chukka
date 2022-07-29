import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as accountsAPI from '../lib/api/accounts';

const CHANGE_FIELD = 'signup/CHANGE_FIELD';
const INITIALIZE_FORM = 'signup/INITIALIZE_FORM';

const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('signup/SIGNUP');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
export const signup = createAction(
  SIGNUP,
  ({ userid, password, email, phoneNumber, nickname }) => ({
    userid,
    password,
    email,
    phoneNumber,
    nickname,
  }),
);

const signupSaga = createRequestSaga(SIGNUP, accountsAPI.signup);
export function* signupAccountsSaga() {
  yield takeLatest(SIGNUP, signupSaga);
}

const initialState = {
  signup: {
    userId: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phoneNumber: '',
    nickname: '',
  },
  accounts: null,
  accountsError: null,
};

const signupAccounts = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      accountsError: null,
    }),
    // 회원가입 성공
    [SIGNUP_SUCCESS]: (state, { payload: accounts }) => ({
      ...state,
      accountsError: null,
      accounts,
    }),
    // 회원가입 실패
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      accountsError: error,
    }),
  },
  initialState,
);

export default signupAccounts;
