// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { Suspense } from "react";
import Footer from "./components/Footer/Footer";
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
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<Suspense fallback={<div>Loading...</div>}>{Page}</Suspense>}
                            />
                        );
                    })}
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
