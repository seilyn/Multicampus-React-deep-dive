import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

export const useFetch = async <T>(params?: AxiosRequestConfig) => {
  const [responseData, setResponseData] = useState<T>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (url: string) => {
    setResponseData(undefined);
    setError(undefined);
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await axios.get<T, AxiosResponse<T>>(url, params);
      setResponseData(response.data);
    } catch (error) {
      setError(error as unknown as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const requestFetchData = (url: string) => {
    fetchData(url);
  };

  return { responseData, error, isLoading, requestFetchData };
};
