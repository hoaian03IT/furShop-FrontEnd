// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";
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
            if (route.layout === null) {
              Page = route.component;
            } else {
              const Layout = route.layout;
              const Component = route.component;
              Page = (
                <Layout>
                  <Component />
                </Layout>
              );
            }
            return (
              <Route key={route.path} to={route.path} element={<Page />} />
            );
          })}
        </Routes>
      </main>
    </div>
  );
}

export default App;
