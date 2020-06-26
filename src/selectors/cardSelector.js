import { createSelector } from "reselect";

export const getCards = (state) => state.data.cards;

const getColumnId = (_, column) => column.id;

const getColumnCards = (cards, column_id) =>
  cards.filter((card) => card.column_id === column_id);

const cardSelector = createSelector(getCards, getColumnId, getColumnCards);

export default (column) => (state) => cardSelector.call(null, state, column);
