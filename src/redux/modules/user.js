import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { deleteCookie, setCookie } from '../../shared/Cookie';

// 초기값 설정
const initialState = {
  user: null,
  isLogin: false,
  err: null,
};

// 액션 타입 정의

const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const GET_USER = 'auth/GET_USER';

// 액션 생성 함수

export const logIn = createAction(LOGIN, (user) => ({ user }));
export const logOut = createAction(LOGOUT, (user) => ({ user }));
export const getUser = createAction(GET_USER, (user) => ({ user }));

const User = handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        setCookie('myToken', `success`, 3);
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie('myToken');
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState,
);

const actionCreators = {
  logIn,
  logOut,
  getUser,
};

export { actionCreators };

export default User;
