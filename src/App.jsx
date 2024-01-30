// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";
<<<<<<< HEAD
import Home from "./pages/Home";

function App() {
    return (
        <div>
            <Header />
            <Home />
        </div>
    );
=======
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {publicRoutes.map((route) => {
            let Page;
            const Component = route.component;
            if (route.layout === null) {
              Page = <Component />;
            } else {
              const Layout = route.layout;
              Page = (
                <Layout>
                  <Component />
                </Layout>
              );
            }
            return <Route key={route.path} path={route.path} element={Page} />;
          })}
        </Routes>
      </main>
    </div>
  );
>>>>>>> 28b64f17d07f455669a28b1d2fe459baa111bdbd
}

export default App;
