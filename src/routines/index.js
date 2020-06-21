import { createRoutine } from "redux-saga-routines";
import {
  ADD_CARD,
  ADD_COMMENT,
  REMOVE_CARD,
  REMOVE_COMMENT,
  PATCH_CARD,
  PATCH_COMMENT,
  PATCH_COLUMN,
} from "@actions/dataActions";
import { SET_NAME } from "@actions/authActions";

export const addCard = createRoutine(ADD_CARD);
export const addComment = createRoutine(ADD_COMMENT);

export const removeCard = createRoutine(REMOVE_CARD);
export const removeComment = createRoutine(REMOVE_COMMENT);

export const patchCard = createRoutine(PATCH_CARD);
export const patchComment = createRoutine(PATCH_COMMENT);
export const patchColumn = createRoutine(PATCH_COLUMN);

export const setName = createRoutine(SET_NAME);
