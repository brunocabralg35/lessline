import { useContext, useState } from "react";
import Button from "./Button";
import { XSquare, X } from "@phosphor-icons/react";
import LoginContext from "../contexts/LoginContext";
// import { ToastContainer, toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* eslint-disable react/prop-types */
function ModalEdit(props) {
  const { dadosClinica, setDadosClinica } = useContext(LoginContext);

  const [dadosClinicaArray, setDadosClinicaArray] = useState(
    dadosClinica.especialistas
  );

  const [nomeClinicaEdit, setNomeClinicaEdit] = useState("");

  const [showModal, setShowModal] = useState(false);

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
    let dadosClinicaAux = dadosClinicaArray;
    dadosClinicaAux.push(newEspecialista);

    let dadosClinicaAuxFiltered = [];

    dadosClinicaAux.forEach((item) => {
      var duplicated =
        dadosClinicaAuxFiltered.findIndex((redItem) => {
          return item.crm == redItem.crm;
        }) > -1;

      if (!duplicated) {
        dadosClinicaAuxFiltered.push(item);
      }
    });

    dadosClinicaAux = dadosClinicaAuxFiltered;
    setDadosClinicaArray(dadosClinicaAux);
    console.log(dadosClinicaArray);
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
      {showModal ? (
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
                  });
                  setShowModal(!showModal);
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
        </div> // Container repetindo modal
      ) : (
        <div className="modalEdit">
          <span onClick={props.isModalOpen}>
            <XSquare size={30} />
          </span>
          <h1>Edite sua clínica</h1>
          <p>Edite o nome da clínica e os profissionais que atuam na mesma.</p>

          <div className="input">
            <label htmlFor="nomeClinica">Nome da clínica</label>
            <input
              type="text"
              id="nomeClinica"
              placeholder={dadosClinica.nomeClinica}
              onChange={(e) => {
                setNomeClinicaEdit(e.target.value);
              }}
              value={nomeClinicaEdit}
            />
          </div>

          <div className="especialistas">
            <p>
              Especialistas:{" "}
              <button
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                +
              </button>
            </p>
            <ul>
              {dadosClinicaArray.map((item, key) => {
                return (
                  <li key={key}>
                    {item.nomeEspecialista} | {item.especialidade}{" "}
                    <button
                      onClick={() => {
                        setDadosClinicaArray((prevState) =>
                          prevState.filter(
                            (i) => i.nomeEspecialista !== item.nomeEspecialista
                          )
                        );
                      }}
                      className="removeDr"
                    >
                      <X size={24} color="red" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button
            width="100%"
            title="Concluir"
            padding="15px"
            onClick={() => {
              if (dadosClinicaArray.length <= 0) {
                toast.error("Adicione pelo menos 1 especialista", {
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
                let dadosClinicaAux = dadosClinica;
                dadosClinicaAux.especialistas = dadosClinicaArray;

                if (
                  nomeClinicaEdit !== dadosClinica.nomeClinica &&
                  nomeClinicaEdit !== ""
                ) {
                  dadosClinicaAux.nomeClinica = nomeClinicaEdit;
                  setNomeClinicaEdit("");
                }

                setDadosClinica(dadosClinicaAux);
                setData("dadosClinica", dadosClinica);
                props.isModalOpen();
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ModalEdit;
