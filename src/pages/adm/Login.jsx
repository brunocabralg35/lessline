/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import Logo from "../../../public/lessline.png";
import BG from "../../assets/side-bg.png";
import Button from "../../components/Button";
import ModalEspecialista from "../../components/ModalEspecialista";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContext from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const { isFirstLogin, setIsFirstLogin } = useContext(LoginContext);
  const { dadosClinica, setDadosClinica } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const { dadosLogin } = useContext(LoginContext);

  const [usuarioInput, setUsuarioInput] = useState("");
  const [senhaInput, setSenhaInput] = useState("");

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleNomeClinica = (e) => {
    setDadosClinica((prevState) => {
      return { ...prevState, nomeClinica: e.target.value };
    });
  };

  function verificaInputsLogin() {
    if (usuarioInput === "" || senhaInput === "") {
      return false;
    } else {
      return true;
    }
  }

  const navigate = useNavigate();

  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  useEffect(()=>{
    if(isLogged && !isFirstLogin){
      navigate("/dashboard");
    }
  },[])


  return (
    <div className="Login">
      <ToastContainer />
      {showModal && (
        <ModalEspecialista isOpen={() => setShowModal(!showModal)} />
      )}
      <img className="bg" src={BG} alt="Background" />
      {isLogged && isFirstLogin ? (
        <div className="conteudo">
          <img className="logo" src={Logo} alt="LessLine" />
          <h1>Cadastre sua clínica</h1>
          <p>Insira os profissionais que atuam em sua clínica</p>

          <div className="input">
            <label htmlFor="nomeClinica">Nome da clínica</label>
            <input
              type="text"
              id="nomeClinica"
              onChange={handleNomeClinica}
              value={dadosClinica.nomeClinica}
            />
          </div>

          <div className="especialistas">
            <p>
              Especialistas:{" "}
              <button onClick={() => setShowModal(!showModal)}>+</button>
            </p>
            <ul>
              {dadosClinica.especialistas.map((item, key) => {
                return (
                  <li key={key}>
                    {item.nomeEspecialista} | {item.especialidade}
                  </li>
                );
              })}
            </ul>
          </div>

          <Button
            width="100%"
            title="Cadastrar"
            padding="15px"
            onClick={() => {
              if (
                dadosClinica.especialistas.length !== 0 &&
                dadosClinica.nomeClinica !== ""
              ) {
                setData("LoginInfo", {isLogged: true});
                setData("dadosClinica", dadosClinica)
                navigate("/dashboard");
              } else {
                toast.error("Preencha todos os dados!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            }}
          />
        </div>
      ) : (
        <div className="conteudo">
          <img className="logo" src={Logo} alt="LessLine" />
          <h1>Olá, bem-vindo</h1>
          <p>Logue com os dados previamente cadastrados</p>

          <div className="input">
            <label htmlFor="usuarioAdm">Usuário</label>
            <input
              type="text"
              id="usuarioAdm"
              onChange={handleChange(setUsuarioInput)}
              value={usuarioInput}
            />
          </div>

          <div className="input">
            <label htmlFor="senhaAdm">Senha</label>
            <input
              type="password"
              id="senhaAdm"
              onChange={handleChange(setSenhaInput)}
              value={senhaInput}
            />
          </div>

          <Button
            width="100%"
            title="Login"
            padding="15px"
            onClick={() => {
              if (verificaInputsLogin()) {
                if (
                  usuarioInput === dadosLogin.usuario &&
                  senhaInput === dadosLogin.senha
                ) {
                  if (dadosClinica.nomeClinica !== "") {
                    setIsFirstLogin(false);
                    navigate("/dashboard");
                  } else {
                    setIsFirstLogin(true);
                  }
                  setIsLogged(true);
                  setData("LoginInfo", {isLogged: true});
                } else {
                  toast.error("Dados incorretos!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              } else {
                toast.error("Preencha os campos!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
