import { createSelector } from "reselect";

const commentsSelector = (state) => state.comments;
const currentCardId = (_, card) => card.id;

const getComments = (comments, card_id) =>
  comments.filter((comment) => comment.card_id === card_id);

export default createSelector(commentsSelector, currentCardId, getComments);
