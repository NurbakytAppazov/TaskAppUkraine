import { CHANGE_SORT_DIRECTION, CHANGE_SORT_FIELD } from "../types";

const initialState = {
   sortDirection: 'asc',
   sortField: 'username'
}

export const sortReducer = (state = initialState, action) => {
   switch (action.type) {
      case CHANGE_SORT_DIRECTION:
         return {
            ...state,
            sortDirection: action.payload
         }
      case CHANGE_SORT_FIELD:
         return {
            ...state,
            sortField: action.payload
         }
      default: return state;
   }
}