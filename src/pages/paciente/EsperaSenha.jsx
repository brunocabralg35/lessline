/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import Logo from "../../../public/lessline.png";
import { useParams } from "react-router-dom";
import LoginContext from "../../contexts/LoginContext";

function EsperaSenha() {
  let { senha, nomePaciente } = useParams();

  const { dadosClinica } = useContext(LoginContext);

  const [senhaChamada, setSenhaChamada] = useState(false);

  useEffect(() => {
    const filtra = dadosClinica.senhasChamadas.filter((i) => i.senha == senha);
    if (filtra.length !== 0) {
      setSenhaChamada(true);
      console.log(filtra);
    } else {
      setSenhaChamada(false);
    }
  }, []);

  return (
    <div className="esperaSenha">
      <div className="header">
        <img src={Logo} alt="LessLine" />
        <h1>Olá, {nomePaciente}</h1>
        <p>Confira sua senha e as informações do seu atendimento</p>
      </div>
      <div
        className="boxSenha"
        style={senhaChamada ? { backgroundColor: "#69d97b" } : null}
      >
        <div className="info">
          <div className="posicao">
            <h3>12º</h3>
            <p>Posição</p>
          </div>
          <div className="tempoMedio">
            <h3>1h47m</h3>
            <p>Tempo médio</p>
          </div>
        </div>
        <div className="senhaBlock">
          <p>Sua senha é</p>
          <h1>{senha}</h1>
        </div>
      </div>
      <div className="ultimasSenhasContainer">
        <p>Últimas senhas</p>
        <ul>
          {dadosClinica.senhasChamadas.map((senha, i) => {
            return (
              <li key={i}>
                <p>{senha.nomePaciente}</p>
                <strong>{senha.senha}</strong>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default EsperaSenha;
