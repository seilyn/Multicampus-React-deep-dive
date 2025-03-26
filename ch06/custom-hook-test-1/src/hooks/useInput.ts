import { ChangeEvent, useState } from "react";

/**
 * 훅 구조 분석용
 * @param initValue
 * @returns
 */
export const useInput = (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, changeHandler] as const;
};

/**
 * 특수문자 입력 불허
 * @param initValue
 * @returns
 */
export const useInputNoSpecialChar = (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 특문, 괄호, 점 제거를 위한 정규식, eslint 비활성화
    // eslint-disable-next-line
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

    setValue(e.target.value.replace(reg, ""));
  };

  return [value, changeHandler] as const;
};
/**
 * 숫자이외의 문자는 입력을 허용하지 않는 훅
 * @param initialValue
 * @returns
 */
const useInputNumber = (initialValue: number) => {
  const [value, setValue] = useState<number>(initialValue);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(e.target.value, 10);
    setValue(isNaN(number) ? 0 : number);
  };
  return [value, changeHandler] as const;
};
