// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";

import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        {/* <Routes>
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
        </Routes> */}
        <Home />
      </main>
    </div>
  );
}

export default App;
