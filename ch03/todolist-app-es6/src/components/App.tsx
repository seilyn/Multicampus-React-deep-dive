import { ITodoItem } from "../AppContainer";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

type PropsType = {
  todoList: ITodoItem[];
  addTodo: (todo: string) => void;
  deleteTodo: (no: number) => void;
  toggleDone: (no: number) => void;
};

const App = ({ todoList, addTodo, deleteTodo, toggleDone }: PropsType) => {
  return (
    <div className="container">
      <div className="card card-body bg-light">
        <div className="title">:: Todolist App</div>
      </div>
      <div className="card card-default card-borderless">
        <div className="card-body">
          {/* inputTodo는 addTodo 하나만 전달 하도록 한다. */}
          <InputTodo addTodo={addTodo} />
          <TodoList todoList={todoList} toggleDone={toggleDone} deleteTodo={deleteTodo} />
        </div>
      </div>
    </div>
  );
};

export default App;
