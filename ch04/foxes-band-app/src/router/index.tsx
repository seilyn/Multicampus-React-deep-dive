import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Members from "../pages/Members";
import SongList from "../pages/SongList";
import SongDetail from "../pages/SongDetail";
import Player from "../components/Player";

/**
 * index: true = 루트 경로 (자기 자신)
 * 중첩된 라우트 (특정 경로가 매칭)
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About title="여우와 늙다리들" /> },
      { path: "members", element: <Members /> },
      {
        path: "songs",
        element: <SongList />,
        children: [
          {
            path: ":id",
            element: <Player />,
          },
        ],
      },
    ],
  },
]);

export default router;
