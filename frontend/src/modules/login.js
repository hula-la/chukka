import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const CHANGE_FIELD = 'login/CHANGE_FIELD';
const INITIALIZE_FORM = 'login/INITIALIZE_FORM';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('login/LOGIN');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // login
    key, // username, password
    value, // 실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

// saga 생성
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* loginAccountsSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  login: {
    username: '',
    password: '',
  },
  accounts: null,
  accountsError: null,
};

const loginAccounts = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      accountsError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      accountsError: null,
      accounts,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      accountsError: error,
    }),
  },
  initialState,
);

export default loginAccounts;
