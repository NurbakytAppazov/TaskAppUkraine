import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { pageReducer } from "./reducers/pageReducer";
import { sortReducer } from "./reducers/sortReducer";
import { taskReducer } from "./reducers/taskReducer";

export const allReducers = combineReducers({
   page: pageReducer,
   sort: sortReducer,
   task: taskReducer,
   auth: authReducer
})