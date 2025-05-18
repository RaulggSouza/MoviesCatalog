import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Inicio from './paginas/Inicio';
import Ler from "./paginas/Ler";
import Header from "./components/Header";
import Criar from "./paginas/Criar";
import Apagar from "./paginas/Apagar";
import Alterar from "./paginas/Alterar";

function AppRoutes() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Inicio/>}></Route>
        <Route path="/ler/:id" element={<Ler/>}></Route>
        <Route path="/criar" element={<Criar/>}></Route>
        <Route path="/apagar" element={<Apagar/>}></Route>
        <Route path="/alterar" element={<Alterar/>}></Route>
        <Route path="*" element={<h1>Página não encontrada</h1>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
