import axios from "axios";

const useAuth = () => {
  const pathToRoles = [
    {
      path: "/users",
      role: "users",
    },
    {
      path: "/admins",
      role: "admins",
    },
  ];

  /**
   * 토큰 저장
   * @param access_token  액세스 토큰
   * @param refresh_token 리프레시 토큰
   */
  const saveToken = (access_token: string, refresh_token: string) => {
    window.localStorage.setItem("access_token", access_token);
    window.localStorage.setItem("refresh_token", refresh_token);
  };
  /**
   * 토큰 값 꺼내오는 메소드
   * @returns access_token, refresh_token
   */
  const loadToken = () => {
    const access_token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    return { access_token, refresh_token };
  };

  /**
   * AccessToken 가져오는 메소드
   * @returns
   */
  const parseAccessToken = () => {
    try {
      const { access_token } = loadToken();
      if (!access_token) throw new Error("유효한 토큰이 존재하지 않습니다.");
      const arr = access_token.split(".");
      const claimSet = JSON.parse(atob(arr[1]));
      return claimSet;
    } catch {
      return "토큰 구문 분석 오류";
    }
  };

  /**
   * Access 토큰 검증
   * @returns {검증값, 메시지}
   */
  const isValidAccessToken = () => {
    const result = { valid: true, message: "정상적인 토큰" };
    const claimSet = parseAccessToken();
    if (typeof claimSet === "string") {
      result.valid = false;
      result.message = claimSet;
    }
    const currentTimeStamp = new Date().getTime() / 1000;
    if (claimSet.exp < currentTimeStamp) {
      result.valid = false;
      result.message = "파기된 토큰, refresh_token을 이용해 access_token을 재발급받으세요";
    }
    return result;
  };

  /**
   * 유저 정보를 얻는 메소드
   * @returns {유저아이디, 권한}
   */
  const getCurrentUserInfo = () => {
    const { userid, role } = parseAccessToken();
    return { userid, role };
  };

  /**
   * 로그인 로직
   * @param userid 유저아이디
   * @param password 비밀번호
   * @param callback 로그인요청 시 콜백
   */
  const loginProcess = async (userid: string, password: string, callback: (cbArgs: { status: string; message: string }) => void) => {
    const LOGIN_URL = "/login";
    try {
      const response = await axios.post(LOGIN_URL, { userid, password });

      if (response.data.status === "success") {
        saveToken(response.data.access_token, response.data.refresh_token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
        callback({ status: "ok", message: "로그인 성공" });
      } else {
        callback({ status: "fail", message: response.data.message });
      }
    } catch {
      callback({ status: "fail", message: "로그인 실패 - 서버 오류" });
    }
  };

  /**
   * 로그아웃 로직
   * @param callback
   */
  const logoutProcess = (callback: () => void) => {
    saveToken("", ""); // 토큰삭제
    axios.defaults.headers.common["Authorization"] = "";
    callback();
  };

  /**
   * 토큰 재발급
   * @param refresh_token 리프레시 토큰
   * @param callback 콜백
   */
  const refreshTokenProcess = async (refresh_token: string, callback: (cbArgs: { status?: string; message?: string }) => void) => {
    const TOKEN_URL = "/token";
    try {
      const response = await axios.post(TOKEN_URL, { refresh_token });
      if (response.data.status === "success") {
        saveToken(response.data.access_token, response.data.refresh_token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
        callback({ status: "ok", message: "토큰 재발급 성공" });
      } else {
        callback({ status: "fail", message: response.data.message });
      }
    } catch {
      callback({ status: "fail", message: "토큰 재발급 실패 - 서버 오류" });
    }
  };

  const isAccessibleToPath = (path: string) => {
    //pathToRoles 에 있는 경로 중 path와 일치하는 경로를 가진 것을 찾음
    const pathToRole = pathToRoles.find((p) => p.path === path);
    //매칭되는 경로가 없다면 권한이 없어도 접근 가능한 것으로 간주함
    if (!pathToRole) return true;
    //JWT가 유효하지 않으므로
    if (isValidAccessToken().valid === false) return false;
    //JWT에서 사용자 정보 payload 파싱
    const claimSet = parseAccessToken();
    //요청된 경로에서 요구하는 Role
    const requiredRole = pathToRole.role;
    if (claimSet.role === requiredRole || claimSet.role === "admins") return true;
    else return false;
  };
  return { parseAccessToken, isValidAccessToken, getCurrentUserInfo, loginProcess, logoutProcess, refreshTokenProcess, isAccessibleToPath };
};

export { useAuth };
