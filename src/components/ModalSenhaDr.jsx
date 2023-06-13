/* eslint-disable react/prop-types */
import LoginContext from ".././contexts/LoginContext";
import { useContext, useState } from "react";
import Button from "./Button";
import { XSquare } from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalSenhaDr(props) {
  const { dadosClinica, setDadosClinica } = useContext(LoginContext);

  const [medico, setMedico] = useState(0);

  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="modalSenhaDr">
        <span>
          <XSquare size={30} onClick={props.isModalOpen} />
        </span>
        <h1>Escolha o especialista</h1>
        <p>Selecione o especialista em que pretende chamar a senha.</p>

        <div className="input">
          <select
            value={medico}
            onChange={(e) => {
              setMedico(Number(e.target.value));
            }}
            name="selectDrSenha"
            id="selectDrSenha"
          >
            {dadosClinica.especialistas.map((medico, key) => (
              <option value={key} key={key}>
                {medico.nomeEspecialista}
              </option>
            ))}
          </select>
        </div>

        <Button
          width="100%"
          title="CHAMAR SENHA"
          padding="15px"
          onClick={() => {
            if (dadosClinica.especialistas[medico].fila.length === 0) {
              toast.error("Não possuem pacientes na fila!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              let senhasChamadasAux = dadosClinica.senhasChamadas;
              senhasChamadasAux.push(
                dadosClinica.especialistas[medico].fila[0]
              );
              console.log(senhasChamadasAux);
              setDadosClinica((prevState) => {
                return { ...prevState, senhasChamadas: senhasChamadasAux };
              });
              let popSenhaAux = dadosClinica;
              popSenhaAux.especialistas[medico].fila.shift();
              setDadosClinica(popSenhaAux);
              setData("dadosClinica", dadosClinica);
              props.isModalOpen();
            }
          }}
        />
      </div>
    </div>
  );
}

export default ModalSenhaDr;
