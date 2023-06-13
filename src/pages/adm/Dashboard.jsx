import LateralMenu from "../../components/LateralMenu";
import { useState, useContext } from "react";
import LoginContext from "../../contexts/LoginContext";
import Logo from "../../../public/lessline.png";
import Home from "../../components/Home";
import ChamarSenha from "../../components/ChamarSenha";
import ModalEdit from "../../components/ModalEdit";
import ModalExit from "../../components/ModalExit";
import ModalSenhaDr from "../../components/ModalSenhaDr";

function Dashboard() {
  const { dadosClinica } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [showModalExit, setShowModalExit] = useState(false);
  const [showModalSenha, setShowModalSenha] = useState(false);
  const [componentHome, setComponentHome] = useState(true);

  const [overflowHidden, setOverflowHidden] = useState(false);

  return (
    <div
      className="dashboard"
      style={{ overflow: overflowHidden ? "hidden" : "auto" }}
    >
      {showModalSenha ? (
        <ModalSenhaDr
          isModalOpen={() => {
            setShowModalSenha(!showModalSenha);
            setOverflowHidden(!overflowHidden);
          }}
        />
      ) : null}
      {showModal ? (
        <ModalEdit
          isModalOpen={() => {
            setShowModal(!showModal);
            setOverflowHidden(!overflowHidden);
          }}
        />
      ) : null}
      {showModalExit ? (
        <ModalExit
          isModalOpen={() => {
            setShowModalExit(!showModalExit);
            setOverflowHidden(!overflowHidden);
          }}
        />
      ) : null}
      <LateralMenu
        isModalOpen={() => {
          setShowModal(!showModal);
          setOverflowHidden(!overflowHidden);
        }}
        isModalExitOpen={() => {
          setShowModalExit(!showModalExit);
          setOverflowHidden(!overflowHidden);
        }}
        isHome={componentHome}
        changeComponent={() => {
          setComponentHome(!componentHome);
        }}
      />
      <div className="sideComponent">
        <div className="header">
          <div className="dadoClinica-nome">
            <div className="icon">{dadosClinica.nomeClinica[0]}</div>
            <div className="hiClinica">
              {" "}
              <p>
                Olá, <span>{dadosClinica.nomeClinica}.</span>
              </p>{" "}
              <p>Este é o seu dashboard!</p>{" "}
            </div>
          </div>
          <img src={Logo} alt="" />
        </div>
        {componentHome ? <Home /> : <ChamarSenha isModalOpen={()=>{setShowModalSenha(!showModalSenha)}}/>}
      </div>
    </div>
  );
}

export default Dashboard;
