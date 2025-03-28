import { Outlet } from "react-router-dom";

import Header from "./components/Header";
/**
 * 옛날방식이다.
 * 선언적 방식 => 이걸 Data API로 Migration
 * @returns
 */
const App = () => {
  return (
    // <Router>
    //   <div className="container">
    //     <Header />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/about" element={<About title={"여우와 늙다리들"} />} />
    //       <Route path="/members" element={<Members />} />
    //       <Route path="/songs" element={<SongList />} />
    //       <Route path="/songs/:id" element={<SongDetail />} />
    //     </Routes>
    //   </div>
    // </Router>

    // 컴포넌트를 분리했다 .
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
