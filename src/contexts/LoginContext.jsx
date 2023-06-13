/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);

  const dadosLogin = {
    usuario: "stilosaude",
    senha: "teste123",
  };

  const [dadosClinica, setDadosClinica] = useState({
    nomeClinica: "",
    especialistas: [],
    senhasChamadas: [],
  });

  function getData(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  useEffect(() => {
    if (getData("LoginInfo") !== null) {
      if (getData("LoginInfo").isLogged === true) {
        setIsFirstLogin(false);
        setIsLogged(true);
      }

      if (getData("dadosClinica" === null)) {
        console.log("null");
      } else {
        setDadosClinica(getData("dadosClinica"));
      }
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        setIsLogged,
        dadosLogin,
        isFirstLogin,
        setIsFirstLogin,
        dadosClinica,
        setDadosClinica,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
