import { initDataApplication } from "../config";
import {
  addCard,
  addComment,
  removeCard,
  removeComment,
  patchCard,
  patchComment,
  patchColumn,
} from "routines/index";
import { AnyAction } from "redux";
import { getNewId } from "utils/index";

export function dataReducer(
  state = initDataApplication,
  action: AnyAction
): DataState {
  switch (action.type) {
    case addCard.TRIGGER: {
      const newCard = {
        id: getNewId(state.cards.map((card) => card.id)),
        ...action.payload,
      };
      return {
        ...state,
        cards: [...state.cards, newCard],
      };
    }
    case addComment.TRIGGER: {
      const newComment = {
        id: getNewId(state.comments.map((comment) => comment.id)),
        ...action.payload,
      };
      return {
        ...state,
        comments: [...state.comments, newComment],
      };
    }
    case removeCard.TRIGGER: {
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    }
    case removeComment.TRIGGER: {
      return {
        ...state,
        comments: state.comments.filter((comment) =>
          Array.isArray(action.payload)
            ? !action.payload.includes(comment.id)
            : comment.id !== action.payload
        ),
      };
    }
    case patchCard.TRIGGER: {
      const { id, ...data } = action.payload;
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === id)
            return {
              ...card,
              ...data,
            };
          else return card;
        }),
      };
    }
    case patchComment.TRIGGER: {
      const { id, ...data } = action.payload;
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === id)
            return {
              ...comment,
              ...data,
            };
          else return comment;
        }),
      };
    }
    case patchColumn.TRIGGER: {
      const { id, ...data } = action.payload;
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === id)
            return {
              ...column,
              ...data,
            };
          else return column;
        }),
      };
    }
    default:
      return state;
  }
}
