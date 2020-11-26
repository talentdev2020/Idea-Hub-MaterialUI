import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { auth, store } from "../../helpers/Firebase";

import {
  EDIT_USER,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD
} from "../actions";

import {
  editUserSuccess,
  editUserError,
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError
} from "./actions";

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      localStorage.setItem("user_id", loginUser.user.uid);
      yield put(loginUserSuccess(loginUser.user));
      history.push("/");
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}
const checkApprovedEmail = async email => {
  let res = await store
    .collection("users")
    .get()
    .then(querySnapshot => {
      let result = querySnapshot.docs.filter(doc => doc.data().email === email);
      if (result.length > 0) {
        store
          .collection("users")
          .doc(result[0].id)
          .update({ isRegistered: true });
      }
      return result;
    });
  if (res.length === 0) return false;
  else return true;
};
const registerWithEmailPasswordAsync = async (email, password, name) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser =>{ 
      authUser.user.updateProfile({displayName:name});
      return authUser;
    })
    .catch(error => error);

function* registerWithEmailPassword({ payload }) {
  const {name, email, password } = payload.user;
  const { history } = payload;
  try {
    const isApproved = yield call(checkApprovedEmail, email);
    if (isApproved) {
      const registerUser = yield call(
        registerWithEmailPasswordAsync,
        email,
        password, name
      );
      if (!registerUser.message) {
        localStorage.setItem("user_id", registerUser.user.uid);
        yield put(registerUserSuccess(registerUser));
        history.push("/");
      } else {
        yield put(registerUserError(registerUser.message));
      }
    } else {
      console.log("error");
      yield put(
        registerUserError(
          "Sorry, we can't register your email. Please contact nexus lab management for support"
        )
      );
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async history => {
  await auth
    .signOut()
    .then(authUser => authUser)
    .catch(error => error);
  history.push("/");
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
    localStorage.removeItem("user_id");
  } catch (error) {}
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async email => {
  return await auth
    .sendPasswordResetEmail(email)
    .then(user => user)
    .catch(error => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess("success"));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then(user => user)
    .catch(error => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess("success"));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export function* watchEditUser() {
  yield takeEvery(EDIT_USER, editUser);
}
const editUserAsync = async (name, photoURL) => {
  var user = auth.currentUser;
  // if (user.email !== email) {
  //   await user.updateEmail(email);
  // }
  if (user.displayName !== name || user.photoURL !== photoURL) {
    await user.updateProfile({ photoURL, displayName: name });
  }
  //await user.updatePassword(password);
};

function* editUser({ payload }) {
  console.log(payload);
  const { name, photoURL } = payload.user;
  try {
    yield call(editUserAsync, name, photoURL);
    yield put(editUserSuccess("Successfully modified!"));
  } catch (error) {
    yield put(editUserError(error));
  }
}
export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchEditUser)
  ]);
}
