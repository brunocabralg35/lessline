import Lottie from "lottie-react";
import animationData from "../assets/errorPageAnimation.json";
import Logo from "../../public/lessline.png";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="errorPage">
      <Lottie animationData={animationData} />
      <p>Página não encontrada!</p>
      <img
        src={Logo}
        alt="LessLine"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}

export default Error;
