import { takeLatest, all } from "redux-saga/effects";

function* actionWatcher() {
  yield takeLatest("GET_DATA", () => {});
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
