// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";
import Home from "./pages/Home";

function App() {
    return (
        <div>
            <Header />
            <Home />
        </div>
    );
}

export default App;
