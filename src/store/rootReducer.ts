import { combineReducers } from "@reduxjs/toolkit";
import todos from "@store/reducers/todoReducer";

const rootReducer = combineReducers({
  todos,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
