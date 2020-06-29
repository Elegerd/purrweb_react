import { setName } from "@routines/index";

export function authReducer(state = { name: null }, action) {
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
