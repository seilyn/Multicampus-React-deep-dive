import { useState } from "react";
import App from "./components/App";
import { produce } from "immer";

/**
 * 다른 자식컴포넌트에서도 사용하기 때문에 export 붙여줌.
 */
export interface ITodoItem {
  no: number;
  todo: string;
  done: boolean;
}

/**
 * Generic 사용
 * @returns todoList
 */
const AppContainer = () => {
  const [todoList, setTodoList] = useState<ITodoItem[]>([
    { no: 1, todo: "React학습1", done: false },
    { no: 2, todo: "React학습2", done: false },
    { no: 3, todo: "React학습3", done: true },
    { no: 4, todo: "React학습4", done: false },
  ]);

  /**
   * 추가
   * @param todo
   */
  const addTodo = (todo: string) => {
    let newTodoList = produce(todoList, (draft) => {
      draft.push({ no: new Date().getTime(), todo: todo, done: false });
    });
    setTodoList(newTodoList);
  };

  /**
   * 삭제
   * @param no
   */
  const deleteTodo = (no: number) => {
    let newTodoList = todoList.filter((item) => item.no !== no);
    setTodoList(newTodoList);
  };

  /**
   * 할일완료여부
   * @param no
   */
  const toggleDone = (no: number) => {
    let index = todoList.findIndex((item) => item.no === no);
    let newTodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done;
    });
    setTodoList(newTodoList);
  };

  return <App todoList={todoList} addTodo={addTodo} deleteTodo={deleteTodo} toggleDone={toggleDone} />;
};

export default AppContainer;
