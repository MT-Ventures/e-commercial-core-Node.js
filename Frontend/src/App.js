import "./Index.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/login/LoginPage.jsx";
import RegisterPage from "./pages/Home/register/Regiser.jsx";



function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
