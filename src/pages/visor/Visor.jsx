import { useContext } from "react";
import Logo from "../../../public/lessline.png";
import BG from "../../assets/side-bg.png";
import LoginContext from "../../contexts/LoginContext";

function Visor() {
  const { dadosClinica } = useContext(LoginContext);

  return (
    <div className="Visor">
      <img className="bg" src={BG} alt="Background" />
      <div className="conteudo">
        <img className="logo" src={Logo} alt="LessLine" />
        <div className="senhaContainer">
          <div className="tempoMedio">
            {/* {deixar dinamico} */}
            <h1>47m</h1>
            <p>Tempo médio entre atendimentos</p>
          </div>
          <div className="senhaVisor">
            <p>SENHA</p>
            <h1>
              {dadosClinica.senhasChamadas.length !== 0
                ? dadosClinica.senhasChamadas[0].senha
                : "000"}
            </h1>
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
    </div>
  );
}

export default Visor;
