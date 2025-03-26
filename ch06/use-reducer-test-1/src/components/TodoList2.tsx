import { useReducer, useState } from "react";
import { addTodoAction, deleteTodoAction, TodoReducer } from "../TodoReducer";

type TodoItemType = {
  id: number;
  todo: string;
};

const initialState: TodoItemType[] = [
  { id: 1, todo: "운동2" },
  { id: 2, todo: "독서2" },
  { id: 3, todo: "음악감상2" },
];

const TodoList2 = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, dispatchTodoList] = useReducer(TodoReducer, initialState);

  const addTodo = () => {
    dispatchTodoList(addTodoAction(todo));
    setTodo("");
  };
  const deleteTodo = (id: number) => {
    dispatchTodoList(deleteTodoAction(id));
  };

  return (
    <div style={{ margin: "10px", padding: "10px", border: "solid 1px gray" }}>
      <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
      <button onClick={addTodo}>할일 추가</button>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            {item.todo} &nbsp;&nbsp;
            <button onClick={() => deleteTodo(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList2;
