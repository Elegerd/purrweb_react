import { createSelector } from "reselect";

export const getComments = (state: ApplicationState): Array<UserComment> =>
  state.data.comments;

const getCardId = (_: unknown, card: Card) => card.id;

const getCommentsSelector = (comments: Array<UserComment>, card_id: number) =>
  comments.filter((comment) => comment.card_id === card_id);

const commentSelector = createSelector(
  getComments,
  getCardId,
  getCommentsSelector
);

export const getCardComments = (card: Card) => (
  state: ApplicationState
): Array<UserComment> => commentSelector(state, card);
