// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";

import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import Home from "~/pages/HomePage";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
