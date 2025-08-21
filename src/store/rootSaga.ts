import { all, fork } from "redux-saga/effects";
import { todoRootSaga } from "@store/sagas/todosagas";

export default function* rootSaga() {
  yield all([fork(todoRootSaga)]);
}
