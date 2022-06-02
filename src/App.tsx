import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import BeerListPage from "./pages/BeerListPage/BeerListPage";
import LoginFormPage from "./pages/LoginPage/LoginFormPage";
import RegisterFormPage from "./pages/RegisterPage/RegisterFormPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/iniciar-sesion" element={<LoginFormPage />} />
        <Route path="/registro" element={<RegisterFormPage />} />
        <Route path="/cervezas-del-mundo" element={<BeerListPage />} />
        <Route path="/" element={<Navigate replace to="/iniciar-sesion" />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
