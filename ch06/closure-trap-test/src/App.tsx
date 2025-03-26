import { useEffect, useReducer, useState } from "react";
import { CountAction, CountReducer, CountStateType } from "./countReducer";

const initialState: CountStateType = { count: 0 };

const App = () => {
  const [state, dispatch] = useReducer(CountReducer, initialState);

  useEffect(() => {
    const handle = setInterval(() => {
      dispatch(CountAction.increment(1));
    }, 2000);
    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    const handle = setInterval(() => {
      console.log(state.count);
    }, 2000);

    return () => {
      clearInterval(handle);
    };
  }, [state]);

  return <div>카운트 : {state.count}</div>;
};

export default App;
