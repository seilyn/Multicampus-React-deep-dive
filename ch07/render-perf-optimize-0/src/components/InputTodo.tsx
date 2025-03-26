import React, { useState } from "react";

type Props = {
  addTodo: (todo: string) => void;
};

const InputTodo = ({ addTodo }: Props) => {
  const [todo, setTodo] = useState<string>("");

  // <> (이름없는것) => jsx는 하나만 있어야됨
  // 비어있는 시작/마감태그로 안감싸면 root가 2개가됨.
  return (
    <>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => addTodo(todo)}>Add Todo</button>
    </>
  );
};

export default InputTodo;
