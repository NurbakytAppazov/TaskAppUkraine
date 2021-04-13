import { LOAD_ALL_TASK, LOAD_PAGES } from "../types";

const initialState = {
   pages: [],
   data: []
}

export const taskReducer = ( state = initialState, action ) => {
   switch ( action.type ) {
      case LOAD_PAGES:
         return {
            ...state,
            pages: action.payload
         }
      case LOAD_ALL_TASK:
         return {
            ...state,
            data: action.payload
         }
      default: return state;
   }
}