import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import boardSagas from "./board/saga";
import ideaSagas from "./idea/saga";

export default function* rootSaga(getState) {
  yield all([boardSagas(), authSagas(), ideaSagas()]);
}
