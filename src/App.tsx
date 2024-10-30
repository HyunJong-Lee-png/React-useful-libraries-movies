import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { darkThema, DefaultThema, lightThema } from "./theme";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./atom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import Chart from "./routes/Chart";
import ToDoList from "./ToDo/ToDoList";
import ToDo from "./ToDo/ToDo";
import TimeTrans from "./Kanban/TimeTrans";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableCard from "./Kanban/DroppableCard";
import KanbanList from "./Kanban/KanbanList";
import Motion1 from "./Animation/Motion1";
import Motion2 from "./Animation/Motion2";
import Motion3 from "./Animation/Motion3";
import Motion4 from "./Animation/Motion4";
import Motion5 from "./Animation/Motion5";
import Motion6 from "./Animation/Motion6";
import Motion7 from "./Animation/Motion7";
import Motion8 from "./Animation/Motion8";
import Motion9 from "./Animation/Motion9";
import Home from "./Netflix/Router/Home";
import Header from "./Netflix/Components/Header";
import Tv from "./Netflix/Router/Tv";
import Search from "./Netflix/Router/Search";

function App() {
  const themeMode = useRecoilValue(themeAtom);

  const onDragEnd = () => { }

  return (
    // 비트코인
    //   <ThemeProvider theme={themeMode ? darkThema : lightThema}> 
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<Coins />} />
    //         <Route path="/:coinId" element={<Coin />}>
    //           <Route path="price" element={<Price />} />
    //           <Route path="chart" element={<Chart />} />
    //         </Route>
    //       </Routes>
    //     </BrowserRouter>
    //   </ThemeProvider>

    // 투두리스트
    // <>
    //   {/* <ToDoList /> */}
    //   <ToDo/>
    // </>

    // 시간변환
    // <TimeTrans/>

    // 드래그 앤 드롭
    // <>
    //   <KanbanList />
    // </>

    // 애니메이션
    // <>
    //   {/* <Motion1 /> */}
    //   {/* <Motion2/> */}
    //   {/* <Motion3/> */}
    //   {/* <Motion4/> */}
    //   {/* <Motion5 /> */}
    //   {/* <Motion6/> */}
    //   {/* <Motion7/> */}
    //   {/* <Motion8/> */}
    //   {/* <Motion9/> */}
    // </>

    //넷플릭스
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies/:movieId' element={<Home />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
