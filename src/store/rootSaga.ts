import { all, fork } from "redux-saga/effects";
import { todoRootSaga } from "@src/store/sagas/todosagas";

export default function* rootSaga() {
  yield all([fork(todoRootSaga)]);
}
