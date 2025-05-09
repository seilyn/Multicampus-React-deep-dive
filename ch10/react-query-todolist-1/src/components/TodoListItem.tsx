import { useMutation } from "@tanstack/react-query";
import { deleteTodo, TodoType } from "../apis/TodoAPI";
import { ReactCsspin } from "react-csspin";
import { useNavigate } from "react-router-dom";

type PropsType = { todoItem: TodoType; owner: string; refetch: () => void };

const TodoListItem = ({ todoItem, owner, refetch }: PropsType) => {
  const navigate = useNavigate();

  const deleteTodoMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTodo({ owner, id }),
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <>
      <li>
        <button onClick={() => navigate(`/edit/${todoItem.id}`)}>편집</button>
        <button onClick={() => deleteTodoMutation.mutate({ id: todoItem.id })}>삭제</button> {todoItem.todo} - {todoItem.desc}{" "}
        {todoItem.done ? "(완료)" : ""}
      </li>
      {deleteTodoMutation.isPending ? <ReactCsspin opacity={0.8} message="삭제중입니다" /> : ""}
    </>
  );
};

export default TodoListItem;
