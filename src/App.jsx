// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { ReactLazy } from "./components/ReactLazy";
import { Fragment } from "react";

function App() {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>
                <Routes>
                    {publicRoutes.map((route) => {
                        let Layout;
                        let Component = route.component;
                        if (route.layout === null) {
                            Layout = Fragment;
                        } else {
                            Layout = route.layout;
                        }
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <ReactLazy>
                                            <Component />
                                        </ReactLazy>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </main>
        </div>
    );
}

export default App;
