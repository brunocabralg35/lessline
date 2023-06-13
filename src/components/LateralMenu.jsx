/* eslint-disable react/prop-types */
import { House, Ticket, PencilSimple, SignOut } from "@phosphor-icons/react";

function LateralMenu(props) {
  return (
    <div className="LateralMenu">
      <ul className="links">
        <li
          onClick={() => {
            if (props.isHome) {
              return;
            } else {
              props.changeComponent();
            }
          }}
        >
          <House size={24} /> HOME
        </li>
        <li onClick={() => {
            if (!props.isHome) {
              return;
            } else {
              props.changeComponent();
            }
          }}>
          <Ticket size={24} /> CHAMAR SENHAS
        </li>
        <li onClick={props.isModalOpen}>
          <PencilSimple size={24} /> EDITAR CLÍNICA
        </li>
        <li onClick={props.isModalExitOpen}>
          <SignOut size={24} /> SAIR
        </li>
      </ul>
    </div>
  );
}

export default LateralMenu;
