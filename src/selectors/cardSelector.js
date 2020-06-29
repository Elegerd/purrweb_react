import { createSelector } from "reselect";

export const getCards = (state) => state.data.cards;

const getColumnId = (_, column) => column.id;

const getCardsSelector = (cards, column_id) =>
  cards.filter((card) => card.column_id === column_id);

const cardSelector = createSelector(getCards, getColumnId, getCardsSelector);

export const getColumnCards = (column) => (state) =>
  cardSelector(state, column);
