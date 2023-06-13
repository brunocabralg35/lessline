import { LoginProvider } from "./contexts/LoginContext";
import RoutesApp from "./pages/RoutesApp";

function App() {


  return (
    <div className="App">
      <LoginProvider>
      <RoutesApp/>
      </LoginProvider>
    </div>
  );
}

export default App;
