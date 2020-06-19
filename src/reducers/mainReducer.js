import { initStateApplication } from "../config";

export function mainReducer(state = initStateApplication, action) {
  switch (action.type) {
    default:
      return state;
  }
}
