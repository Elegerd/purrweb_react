import { createSelector } from "reselect";

export const getCards = (state: ApplicationState): Array<Card> =>
  state.data.cards;

const getColumnId = (_: unknown, column: Column) => column.id;

const getCardsSelector = (cards: Array<Card>, column_id: number) =>
  cards.filter((card) => card.column_id === column_id);

const cardSelector = createSelector(getCards, getColumnId, getCardsSelector);

export const getColumnCards = (column: Column) => (
  state: ApplicationState
): Array<Card> => cardSelector(state, column);
