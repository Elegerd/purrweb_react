import { createSelector } from "reselect";

export const getComments = (state) => state.data.comments;

const getCardId = (_, card) => card.id;

const getCardComments = (comments, card_id) =>
  comments.filter((comment) => comment.card_id === card_id);

const commentSelector = createSelector(getComments, getCardId, getCardComments);

export default (card) => (state) => commentSelector.call(null, state, card);
