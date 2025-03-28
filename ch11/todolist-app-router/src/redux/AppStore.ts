import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import TimeReducer, { TimeStatesType } from "./TimeReducer";
import TodoReducer, { TodoStatesType } from "./TodoReducer";
export type RootStatesType = {
  home: TimeStatesType;
  todos: TodoStatesType;
};
const RootReducer = combineReducers({
  home: TimeReducer,
  todos: TodoReducer,
});

/**
 * 미들웨어 (store, next, action)
 * 세가지 개념만 이해하면 된다.
 * @param store
 * @returns
 */
// const logger: Middleware = (store) => (next) => (action) => {
//   console.log("## action", action);
//   console.log("전 상태 : " + store.getState());
//   next(action);
//   console.log("후 상태 : " + store.getState());
// };

/**
 * 1. Redux devtool extension : 디버깅용 개발자도구 익스텐션,
 * 2. Redux thunk : 비동기 처리
 * 이렇게 두개가 포함되어 있음.
 *
 */
const AppStore = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }); // 로거 만들어서 쓰지 마라
    // .concat([logger]);
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default AppStore;
