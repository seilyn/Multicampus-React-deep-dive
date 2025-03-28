import { useIsFetching, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTodoOne, TodoType, updateTodo } from "../apis/TodoAPI";
import { ReactCsspin } from "react-csspin";

type PropsType = { owner: string };
const EditTodo = ({ owner }: PropsType) => {
  const [data, setData] = useState<TodoType>(); // fetch한 한건의 데이터를 저장할 상태
  const refTodo = useRef<HTMLInputElement>(null); // 비제어 컴포넌트 방법으로 업데이트 위해 useRef 사용
  const refDesc = useRef<HTMLInputElement>(null);
  const refDone = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // 업데이트 후 / 경로로 이동하기 위한 navigate() 함수
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const id: number = parseInt(params.id ? params.id : "");

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, todo, desc, done }: TodoType) => updateTodo({ owner, id, todo, desc, done }),
    onSuccess: () => {
      navigate("/");
    },
  });

  const fetchOne = useCallback(async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["fetchTodoOne", owner, id],
      queryFn: () => fetchTodoOne({ owner, id }),
    });
    setData(data);
  }, [id, owner, queryClient]);

  const updateHandler = () => {
    const reqParam = {
      id: parseInt(params.id ? params.id : ""),
      todo: refTodo.current ? refTodo.current.value : "",
      desc: refDesc.current ? refDesc.current.value : "",
      done: refDone.current ? refDone.current.checked : false,
    };
    updateTodoMutation.mutate(reqParam);
  };

  // 마운트될때 편집화면에 띄워줄 데이터 한건 읽어옴.
  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  return (
    <div>
      <h2>할일 수정</h2>
      <hr />
      {data ? (
        <div>
          id : {params.id}
          <br />
          Todo : <input type="text" defaultValue={data.todo} ref={refTodo} /> <br />
          Desc : <input type="text" defaultValue={data.desc} ref={refDesc} /> <br />
          Done : <input type="checkbox" defaultChecked={data.done} ref={refDone} /> <br />
          <br />
          <button onClick={updateHandler}>업데이트</button>
        </div>
      ) : (
        ""
      )}
      {isFetching > 0 ? <ReactCsspin opacity={0.8} message="로딩중입니다" /> : ""}
      {updateTodoMutation.isPending ? <ReactCsspin opacity={0.8} message="업데이트중입니다" /> : ""}
    </div>
  );
};

export default EditTodo;
