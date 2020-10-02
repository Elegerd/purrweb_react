import { setName } from "routines/index";
import { AnyAction } from "redux";
import { initAuthApplication } from "../config";

export function authReducer(
  state = initAuthApplication,
  action: AnyAction
): AuthState {
  switch (action.type) {
    case setName.TRIGGER: {
      return {
        ...state,
        name: action.payload,
      };
    }
    default:
      return state;
  }
}
