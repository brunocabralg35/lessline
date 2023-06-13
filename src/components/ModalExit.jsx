/* eslint-disable react/prop-types */
import Button from "./Button";
import { XSquare } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import LoginContext from ".././contexts/LoginContext";
import { useContext } from "react";

function ModalExit(props) {
  const navigate = useNavigate();
  const { setIsLogged } = useContext(LoginContext);

  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return (
    <div className="container">
      <div className="modalExit">
        <span onClick={props.isModalOpen}>
          <XSquare size={30} />
        </span>
        <h1>Gostaria de deslogar do sistema?</h1>
        <Button
          width="100%"
          title="Sim"
          padding="15px"
          color="#69d97b"
          onClick={() => {
            setIsLogged(false);
            setData("LoginInfo", {isLogged: false})
            navigate("/");
          }}
        />
        <Button
          width="100%"
          title="Não"
          padding="15px"
          color="red"
          onClick={() => {
            props.isModalOpen();
          }}
        />
      </div>
    </div>
  );
}

export default ModalExit;
