import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { useContext } from "react";
import LoginContext from ".././contexts/LoginContext";

Chart.register(CategoryScale, LineElement, LinearScale, PointElement);

function Home() {
  const { dadosClinica, setDadosClinica } = useContext(LoginContext);

  const dataGraph1 = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Atendimentos neste mês",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(192, 75, 149)",
        tension: 0.1,
      },
    ],
  };

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Média de pacientes",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  console.log(dadosClinica.senhasChamadas);

  return (
    <div className="home">
      <div className="box">
        <div className="graph1">
          <div className="atendimentosBox">
            {dadosClinica.senhasChamadas.map((pessoa, i) => {
              return (
                <div key={i} className="pessoa">
                  <div className="nomePessoa">
                    <div className="icon">{pessoa.nomePaciente[0]}</div>
                    <p>{pessoa.nomePaciente}</p>
                  </div>
                  <p>
                    {
                      dadosClinica.especialistas[pessoa.medicoPacienteID]
                        .nomeEspecialista
                    }{" "}
                    |{" "}
                    {
                      dadosClinica.especialistas[pessoa.medicoPacienteID]
                        .especialidade
                    }
                  </p>
                </div>
              );
            })}
          </div>
          <p>Últimos atendimentos</p>
        </div>
        <div className="graph2">
          <div className="donutBox">
            <Doughnut data={data} />
          </div>
          <p>Média de tempo de atendimento por médico</p>
        </div>
      </div>
      <div className="box">
        <div className="graph2">
          <div className="donutBox">
            <Doughnut data={data} />
          </div>
          <p>Média de pacientes de cada médico</p>
        </div>
        <div className="graph1">
          <div className="lineBox">
            <Line data={dataGraph1} />
          </div>
          <p>Número de atendimentos por mês</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
