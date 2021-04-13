import { NEXT, PAGE, PREV } from "../types";

export const pageReducer = (state = 1, action) => {
   switch (action.type) {
      case PREV: 
         return state - 1;
      case PAGE:
         return action.payload;
      case NEXT:
         return state + 1;
      default:
         return state;
   }
}