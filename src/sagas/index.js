import { takeEvery, put, all, select } from "redux-saga/effects";
import { removeCard, removeComment } from "@routines";

function* cardWatcherSaga() {
  yield takeEvery(removeCard.TRIGGER, cardWorker);
}

function* cardWorker({ payload }) {
  try {
    const { data } = yield select();
    const removeCommentIds = data.comments
      .filter((comment) => comment.card_id === payload)
      .map((comment) => comment.id);
    yield put(removeComment(removeCommentIds));
  } catch (error) {
    console.error("[CARD WORKER]:", error);
  }
}

export default function* rootSaga() {
  yield all([cardWatcherSaga()]);
}
