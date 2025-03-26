import { useCallback, useMemo, useState } from "react";

type TodoListItemType = {
  id: number;
  todo: string;
};

const getTodoListCount = (todoList: Array<TodoListItemType>) => {
  console.log("## TodoList 카운트 : ", todoList.length);
  return todoList.length;
};

const App = () => {
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([]);
  const [todo, setTodo] = useState<string>("");

  // todoList의 상태가 변경되지 않아서 캐싱된 값
  // 변경이 되는 순간 factory()가 실행됨 => 다시 렌더링 => 함수 호출 횟수가 줄었다.
  const memoizedCnt = useMemo<number>(() => getTodoListCount(todoList), [todoList]);

  // 함수가 매번 만들어지지 않고 todoList 배열이 변경될때만 호출된다.

  // Closure trap
  // 캐싱된 함수는 생성될때의 상태나 속성을 참조하기 때문에 상태나 속성이 변경되면 캐싱된 함수도 갱신
  // 의존값 리스트
  // []을 넣게 되면 callback일때 []였기 때문에 빈배열에 추가만 하게된다.
  const addTodo = useCallback(
    (todo: string) => {
      const newTodoList = [...todoList, { id: new Date().getTime(), todo: todo }];
      setTodoList(newTodoList);
      setTodo("");
    },
    [todoList]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      const index = todoList.findIndex((item) => item.id === id);
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    },
    [todoList]
  );

  return (
    <div className="boxStyle">
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => addTodo(todo)}>Add Todo</button>
      <br />
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            {item.todo}&nbsp;&nbsp;
            <button onClick={() => deleteTodo(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <div>todo 개수 : {memoizedCnt}</div>
    </div>
  );
};
export default App;
