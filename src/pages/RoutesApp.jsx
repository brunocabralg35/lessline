import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import { useContext } from "react";

import Login from "./adm/Login";
import RetiraSenha from "./paciente/RetiraSenha";
import Visor from "./visor/Visor";
import Error from "./Error";
import Dashboard from "./adm/Dashboard";
import EsperaSenha from "./paciente/EsperaSenha";

const RoutesApp = () => {
  const { isLogged } = useContext(LoginContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" exact />
        <Route
          element={isLogged ? <Dashboard /> : <Error />}
          path="/dashboard"
          exact
        />
        <Route element={<RetiraSenha />} path="/paciente" exact />
        <Route element={<EsperaSenha />} path="/paciente/:senha/:medicoID/:nomePaciente" exact />
        <Route element={<Visor />} path="/visor" exact />
        <Route element={<Error />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
