import { createBrowserRouter } from "react-router-dom";

import { membersLoader, playerLoader, songListLoader } from "../loaders";
import ErrorBoundary from "../components/ErrorBoundary";
import { addSongAction, updateSongAction } from "../actions";

import App from "../App";
import React from "react";
import pMinDelay from "p-min-delay";

// Lazy loading으로 바꿀려 한다.

// import Home from "../pages/Home";
// import About from "../pages/About";
// import AddSong from "../pages/AddSong";

// import { MembersSuspense } from "../pages/Members";
// import { SongListSuspense } from "../pages/SongList";
// import { PlayerSuspense } from "../components/Player";
// import { UpdateSongSuspense } from "../pages/UpdateSong";

// Lazy loading
//Fast refresh only works when a file only exports components. Move your component(s) to a separate file.eslint(react-refresh/only-export-components)
// 경고 뜨는데 걍 브라우저에서 새로고침하면됨.
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => pMinDelay(import("../pages/About"), 1000));
const AddSong = React.lazy(() => import("../pages/AddSong"));

const MembersSuspense = React.lazy(() => import("../pages/Members").then((module) => ({ default: module.MembersSuspense })));
const SongListSuspense = React.lazy(() => import("../pages/SongList").then((module) => ({ default: module.SongListSuspense })));
const PlayerSuspense = React.lazy(() => import("../components/Player").then((module) => ({ default: module.PlayerSuspense })));
const UpdateSongSuspense = React.lazy(() => import("../pages/UpdateSong").then((module) => ({ default: module.UpdateSongSuspense })));

/**
 * index: true = 루트 경로 (자기 자신)
 * 중첩된 라우트 (특정 경로가 매칭)
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About title={"여우와 늙다리들"} /> },
      { path: "members", element: <MembersSuspense />, loader: membersLoader },
      {
        path: "songs",
        element: <SongListSuspense />,
        loader: songListLoader,
        children: [{ path: ":id", element: <PlayerSuspense />, loader: playerLoader }],
      },
      { path: "songs/new", element: <AddSong />, action: addSongAction },
      { path: "songs/update/:id", element: <UpdateSongSuspense />, action: updateSongAction, loader: playerLoader },
    ],
  },
]);
export default router;
