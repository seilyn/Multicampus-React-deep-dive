import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

axios.defaults.baseURL = "/api";

/**
 * Custom Hook
 * 상태 변경 (로딩,에러,res)에 대한걸 매번 작성하기 귀찮음
 * Custom hook으로 뺐다.
 * @returns { response, error, isLoading, requestData }
 */
const useFetch = <T>(url: string, params: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse<T>>(); // BE에서 응답되는 형식이 다 다를 테니 <T>로 정의한다.
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setResponse(undefined);
    try {
      // 로딩
      setIsLoading(true);

      const result: AxiosResponse<T> = await axios.get<T>(url, params);
      // 객체를 통째로 상태 데이터에 저장
      setResponse(result);
    } catch (err) {
      setError(err as unknown as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Await없이 바로 실행할수있도록 말아줌
   */
  const requestData = () => {
    fetchData();
  };

  return { response, error, isLoading, requestData };
};

export { useFetch };
