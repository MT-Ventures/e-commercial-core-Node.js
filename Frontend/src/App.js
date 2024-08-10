import "./Index.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";


function App() {
  return (
    <>
      <div>
       <Routes>
          <Route index path="/" element={<HomePage></HomePage>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
