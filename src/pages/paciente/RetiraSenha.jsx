import Logo from "../../../public/lessline.png";
import Button from "../../components/Button";
import LoginContext from "../../contexts/LoginContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RetiraSenha() {
  const navigate = useNavigate();

  const { dadosClinica, setDadosClinica } = useContext(LoginContext);

  const date = new Date().toLocaleTimeString();

  const [paciente, setPaciente] = useState({
    nomePaciente: "",
    medicoPacienteID: 0,
    preferencial: false,
    senha: "",
    horario: date,
  });

  function criaSenha(pacienteAux) {
    const nomeMedico =
      dadosClinica.especialistas[pacienteAux.medicoPacienteID].nomeEspecialista;
    const nomeMedicoSeparado = nomeMedico.split(" ");
    const iniciaisMedico =
      nomeMedicoSeparado[1][0] +
      nomeMedicoSeparado[nomeMedicoSeparado.length - 1][0];
    const numSenhaNaoTratado =
      dadosClinica.especialistas[pacienteAux.medicoPacienteID].fila.length + 1;

    let senhaAux = "";

    if (numSenhaNaoTratado < 10) {
      senhaAux = "00" + String(numSenhaNaoTratado);
    } else if (numSenhaNaoTratado >= 10 && numSenhaNaoTratado < 100) {
      senhaAux = "0" + String(numSenhaNaoTratado);
    } else if (numSenhaNaoTratado >= 100) {
      senhaAux = String(numSenhaNaoTratado);
    }

    return iniciaisMedico + senhaAux;
  }

  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return (
    <div className="RetiraSenha">
      <ToastContainer />
      <img src={Logo} alt="LessLine" />
      <h1>Olá, bem-vindo</h1>
      <p>Coloque os dados para retirar a senha</p>

      <div className="input">
        <label htmlFor="nomePaciente">Nome do paciente</label>
        <input
          type="text"
          id="nomePaciente"
          value={paciente.nomePaciente}
          onChange={(e) => {
            setPaciente((prevState) => {
              return { ...prevState, nomePaciente: e.target.value };
            });
          }}
        />
      </div>

      <div className="input">
        <label htmlFor="especialista">Escolha o especialista</label>
        <select
          name="especialista"
          id="especialista"
          value={paciente.medicoPacienteID}
          onChange={(e) => {
            setPaciente((prevState) => {
              return { ...prevState, medicoPacienteID: Number(e.target.value) };
            });
          }}
        >
          {dadosClinica.especialistas.map((medico, key) => (
            <option value={key} key={key}>
              {medico.nomeEspecialista}
            </option>
          ))}
        </select>
      </div>

      <div className="preferencial">
        <label htmlFor="preferencial">Preferencial:</label>
        <input
          type="checkbox"
          name="preferencial"
          id="preferencial"
          onClick={(e) => {
            setPaciente((prevState) => {
              return { ...prevState, preferencial: e.target.checked };
            });
          }}
        />
      </div>

      <Button
        onClick={() => {
          let senhaAux = "";
          let medicoIDAux = "";
          let nomePacienteAux = "";

          if (paciente.nomePaciente !== "") {
            let pacienteAux = paciente;
            pacienteAux.senha = criaSenha(pacienteAux);
            senhaAux = pacienteAux.senha;
            medicoIDAux = pacienteAux.medicoPacienteID;
            nomePacienteAux = pacienteAux.nomePaciente;
            setPaciente(pacienteAux);

            // Coloca na fila e ordena
            let dadosClinicaAux = dadosClinica.especialistas;

            dadosClinicaAux[paciente.medicoPacienteID].fila.push(paciente);

            dadosClinicaAux[paciente.medicoPacienteID].fila.sort((a, b) => {
              return a.preferencial === b.preferencial
                ? 0
                : a.preferencial
                ? -1
                : 1;
            });

            console.log(dadosClinicaAux[paciente.medicoPacienteID].fila);

            // Coloca no Contexto e no LocalStorage
            setDadosClinica((prevState) => {
              return { ...prevState, especialistas: dadosClinicaAux };
            });
            setData("dadosClinica", dadosClinica);

            // Apaga o paciente temp
            setPaciente({
              nomePaciente: "",
              medicoPacienteID: "0",
              preferencial: false,
              senha: "",
              horario: "",
            });

            // Navega para esperaSenha
            navigate(`/paciente/${senhaAux}/${medicoIDAux}/${nomePacienteAux}`);
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
        width="100%"
        title="Retirar senha"
        padding="15px"
      />
    </div>
  );
}

export default RetiraSenha;
