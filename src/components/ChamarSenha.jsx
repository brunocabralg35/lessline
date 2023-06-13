/* eslint-disable react/prop-types */
import Button from "../components/Button";
import { Clock, Check } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../contexts/LoginContext";

function ChamarSenha(props) {
  const { dadosClinica } = useContext(LoginContext);

  const data = new Date();

  const [senhasCombinadas, setSenhasCombinadas] = useState([]);

  useEffect(() => {
    let senhas = [];
    dadosClinica.especialistas.forEach((i) => {
      senhas = senhas.concat(i.fila);
    });
    setSenhasCombinadas(senhas);
  }, [dadosClinica]);

  return (
    <div className="chamarSenha">
      <div className="date-Btn">
        <p>
          {data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}
        </p>
        <Button
          width="200px"
          title="CHAMAR SENHA"
          padding="15px"
          onClick={props.isModalOpen}
        />
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">
            <Clock size={45} color="#ffffff" />
          </div>
          <div className="conteudo">
            <p>Pacientes aguardando</p>
            <h1>{senhasCombinadas.length}</h1>
          </div>
        </div>
        <div className="card-senha">
          <p>SENHA</p>
          <h1>
            {dadosClinica.senhasChamadas.length !== 0
              ? dadosClinica.senhasChamadas[0].senha
              : "000"}
          </h1>
        </div>
        <div className="card">
          <div className="icon">
            <Check size={45} color="#ffffff" />
          </div>
          <div className="conteudo">
            <p>Pacientes atendidos</p>
            <h1>{dadosClinica.senhasChamadas.length}</h1>
          </div>
        </div>
      </div>

      <div className="senhas">
        <p>Lista de pacientes</p>
        <div className="atendimentosBox">
          {senhasCombinadas.map((senha, index) => {
            return (
              <div key={index} className="pessoa">
                <div className="nomePessoa">
                  <div className="icon">{senha.nomePaciente[0]}</div>
                  <p>{senha.nomePaciente}</p>
                </div>
                <p>
                  {
                    dadosClinica.especialistas[senha.medicoPacienteID]
                      .nomeEspecialista
                  }{" "}
                  |{" "}
                  {
                    dadosClinica.especialistas[senha.medicoPacienteID]
                      .especialidade
                  }
                </p>
                <p className="senhaUsuario">{senha.senha}</p>
                <p>{senha.horario}</p>
                <p>{senha.preferencial ? "PREF." : "TRAD."}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChamarSenha;
