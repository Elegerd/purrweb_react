import { createSelector } from "reselect";

export const getComments = (state) => state.data.comments;

const getCardId = (_, card) => card.id;

const getCommentsSelector = (comments, card_id) =>
  comments.filter((comment) => comment.card_id === card_id);

const commentSelector = createSelector(
  getComments,
  getCardId,
  getCommentsSelector
);

export const getCardComments = (card) => (state) =>
  commentSelector(state, card);
