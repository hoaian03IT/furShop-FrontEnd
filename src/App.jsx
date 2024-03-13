// css
import "~/styles/GlobalStyles.scss";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { Suspense, createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { fetchCategoriesApi } from "./api-server";
import { Loading } from "./components/Loading";
export const HeaderContext = createContext();
function App() {
    const [showSearchOffCanvas, setShowSearchOffCanvas] = useState(false);

    // fetch categories
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCategories = async () => {
            await fetchCategoriesApi(dispatch);
        };
        fetchCategories();
    }, [dispatch]);

    return (
        <HeaderContext.Provider value={{ showSearchOffCanvas, setShowSearchOffCanvas }}>
            <div className="d-flex flex-column justify-content-between min-vh-100">
                <ScrollToTop />
                <div>
                    <header className="header">
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
                                        element={<Suspense fallback={<Loading />}>{Page}</Suspense>}
                                    />
                                );
                            })}
                        </Routes>
                    </main>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </HeaderContext.Provider>
    );
}

export default App;
