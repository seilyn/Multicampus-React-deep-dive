import { useState } from "react";
import TodoList from "./TodoList";
import { produce } from "immer";
import InputTodo from "./components/InputTodo";

export type TodoListItemType = { id: number; todo: string };

// typing하는 상태가 App에 있음. => 하위에 영향 안주고 싶다?
// 그러면 컴포넌트 분리를 해라
const App = () => {
  const [todoList, setTodoList] = useState<TodoListItemType[]>([]);
  const [todo, setTodo] = useState<string>("");

  const addTodo = (todo: string) => {
    const newTodoList = produce(todoList, (draft) => {
      draft.push({ id: new Date().getTime(), todo: todo });
    });
    setTodoList(newTodoList);
    setTodo("");
  };

  const deleteTodo = (id: number) => {
    const index = todoList.findIndex((item) => item.id === id);
    const newTodoList = produce(todoList, (draft) => {
      draft.splice(index, 1);
    });
    setTodoList(newTodoList);
  };

  return (
    <div className="boxStyle">
      <InputTodo addTodo={addTodo} />
      <br />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} />
      <div>todo 갯수 : {todoList.length}</div>
    </div>
  );
};

export default App;
