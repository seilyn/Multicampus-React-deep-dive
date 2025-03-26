import { useCallback, useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { produce } from "immer";

export type TodoListItemType = { id: number; todo: string };

const App = () => {
  const [todoList, setTodoList] = useState<TodoListItemType[]>([]);
  const [todo, setTodo] = useState<string>("");

  // React 18까진 비워놔도 되는데 19부터는 인자를 비워둘수 없음. undefined라고 명시적으로 지정을 해줘야 한다.
  const addTodoRef = useRef<(todo: string) => void | undefined>();
  const deleteTodoRef = useRef<(id: number) => void | undefined>();

  // 렌더링 성능이 조금 더 좋아진다.
  useEffect(() => {
    addTodoRef.current = (todo: string) => {
      const newTodoList = produce(todoList, (draft) => {
        draft.push({ id: new Date().getTime(), todo: todo });
      });
      setTodoList(newTodoList);
      setTodo("");
    };
    deleteTodoRef.current = (id: number) => {
      const index = todoList.findIndex((item) => item.id === id);
      const newTodoList = produce(todoList, (draft) => {
        draft.splice(index, 1);
      });
      setTodoList(newTodoList);
    };
  });

  const addTodo = useCallback((todo: string) => {
    addTodoRef.current && addTodoRef.current(todo);
  }, []);
  const deleteTodo = useCallback((id: number) => {
    deleteTodoRef.current && deleteTodoRef.current(id);
  }, []);
  return (
    <div className="boxStyle">
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => addTodo(todo)}>Add Todo</button>
      <br />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} />
      <div>todo 갯수 : {todoList.length}</div>
    </div>
  );
};

export default App;
