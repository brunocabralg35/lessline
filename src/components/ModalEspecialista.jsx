import { useState, useContext } from "react";
import Button from "./Button";
import { XSquare } from "@phosphor-icons/react";
import LoginContext from "../contexts/LoginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/* eslint-disable react/prop-types */
function ModalEspecialista(props) {
  const { dadosClinica, setDadosClinica } = useContext(LoginContext);
  const [newEspecialista, setNewEspecialista] = useState({
    nomeEspecialista: "",
    crm: "",
    especialidade: "",
    fila: [],
  });

  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function addEspecialista() {
    let dadosClinicaAux = dadosClinica;
    dadosClinicaAux.especialistas.push(newEspecialista);

    let dadosClinicaAuxFiltered = [];

    dadosClinicaAux.especialistas.forEach((item) => {
      var duplicated =
        dadosClinicaAuxFiltered.findIndex((redItem) => {
          return item.crm == redItem.crm;
        }) > -1;

      if (!duplicated) {
        dadosClinicaAuxFiltered.push(item);
      }
    });

    dadosClinicaAux.especialistas = dadosClinicaAuxFiltered;
    setDadosClinica(dadosClinicaAux);
    console.log(dadosClinica);
  }

  const handleChange = (propriedade) => (e) => {
    setNewEspecialista((prevState) => {
      return { ...prevState, [propriedade]: e.target.value };
    });
  };

  function verificaInputs() {
    if (
      newEspecialista.nomeEspecialista === "" ||
      newEspecialista.crm === "" ||
      newEspecialista.especialidade === ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="modalEspecialista">
        <span onClick={props.isOpen}>
          <XSquare size={30} />
        </span>
        <h1>Cadastre um especialista</h1>
        <p>Insira os dados do profissional</p>

        <div className="input">
          <label htmlFor="nomeEspecialista">Nome do especialista</label>
          <input
            type="text"
            id="nomeEspecialista"
            onChange={handleChange("nomeEspecialista")}
            value={newEspecialista.nomeEspecialista}
          />
        </div>
        <div className="input">
          <label htmlFor="nomeEspecialidade">Especialidade</label>
          <input
            type="text"
            id="nomeEspecialidade"
            onChange={handleChange("especialidade")}
            value={newEspecialista.especialidade}
          />
        </div>
        <div className="input">
          <label htmlFor="CRM">CRM</label>
          <input
            type="text"
            id="CRM"
            onChange={handleChange("crm")}
            value={newEspecialista.crm}
          />
        </div>

        <Button
          width="100%"
          title="Cadastrar"
          padding="15px"
          onClick={() => {
            if (verificaInputs()) {
              addEspecialista();
              setNewEspecialista({
                nomeEspecialista: "",
                crm: "",
                especialidade: "",
                fila: [],
              });
              setData("dadosClinica", dadosClinica);
              props.isOpen();
            } else {
              toast.error("Preencha todos os dados", {
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
    </div>
  );
}

export default ModalEspecialista;
