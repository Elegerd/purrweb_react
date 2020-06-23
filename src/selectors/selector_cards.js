import { createSelector } from "reselect";

const cardsSelector = (state) => state.cards;
const currentColumnId = (_, column) => column.id;

const getCards = (cards, column_id) =>
  cards.filter((card) => card.column_id === column_id);

export default createSelector(cardsSelector, currentColumnId, getCards);
