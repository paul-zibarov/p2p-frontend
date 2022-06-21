import { Header } from "./components/Header";
import { LotTable } from "./components/LotTable";
import { LotPage } from "./components/LotPage";
import { CreateLotModal } from "./components/CreateLotModal";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/">
          <Route path="/lots">
            <Route path="/lots/:lotId" element={<LotPage></LotPage>}></Route>
            <Route path="/lots/all" element={<LotTable></LotTable>}></Route>
            <Route path="/lots/my" element={<LotTable></LotTable>}></Route>
          </Route>
        </Route>       
      </Routes>
    </div>
  );
}

export default App;
