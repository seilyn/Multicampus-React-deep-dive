export type TodoItemType = {
  id: number;
  todo: string;
};

export const addTodoAction = (todo: string) => {
  return { type: "TODO_ADD" as const, payload: { todo: todo } };
};
// 속성명과 변수이름이 일치하면 생략가능
export const deleteTodoAction = (id: number) => {
  return { type: "TODO_DELETE" as const, payload: { id } };
};

// AddTodoAction의 타입을 구하는거임.
export type TodoActionType = ReturnType<typeof addTodoAction> | ReturnType<typeof deleteTodoAction>;

export const TodoReducer = (todoList: TodoItemType[], action: TodoActionType) => {
  let newTodoList;

  // 새로운 상태를 만들어서 리턴해주면 된다.
  switch (action.type) {
    case "TODO_ADD":
      newTodoList = [...todoList, { id: new Date().getTime(), todo: action.payload.todo }];
      return newTodoList;
    case "TODO_DELETE":
      newTodoList = todoList.filter((todoItem) => todoItem.id !== action.payload.id);
      return newTodoList;

    default:
      return todoList;
  }
};
