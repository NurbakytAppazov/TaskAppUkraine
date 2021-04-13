import { NEXT, PREV, PAGE, CHANGE_SORT_FIELD, CHANGE_SORT_DIRECTION, LOAD_ALL_TASK, LOAD_PAGES, SIGN_IN, SIGN_OUT } from "./types";

// Pager actions
export const prev = () => {
   return { type: PREV }
}
export const page = (number) => {
   return { type: PAGE, payload: number }
}
export const next = () => {
   return { type: NEXT }
}

// Sort actions
export const sortByDirection = (payload) => {
   return { type: CHANGE_SORT_DIRECTION, payload }
}
export const sortByField = (payload) => {
   return { type: CHANGE_SORT_FIELD, payload }
}

// Get Tasks
export const loadTasks = (data) => {
   return {
      type: LOAD_ALL_TASK, payload: data
   }
}
export const loadPages = (pages) => {
   return {
      type: LOAD_PAGES, payload: pages
   }
}

// Authorize
export const signIn = (userData) => {
   return { type: SIGN_IN, payload: userData }
}
export const signOut = () => {
   return { type: SIGN_OUT }
}


export const createTask = async (username, email, text) => {
   let formData = new FormData();
   formData.append("username", username);
   formData.append("email", email);
   formData.append("text", text);

   let response = await fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Nurbakyt1', {
      method: 'POST',
      body: formData
   });
   let result = await response.json();

   console.log(result)
}

export const status = (status) => {
   switch(status){
      case 0: return 'задача не выполнена';
      case 1: return 'задача не выполнена, отредактирована админом';
      case 10: return 'задача выполнена';
      case 11: return 'задача отредактирована админом и выполнена';
      default: return null;
   }
}