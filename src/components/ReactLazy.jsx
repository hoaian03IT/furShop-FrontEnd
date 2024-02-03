import { Suspense } from "react";
import { Loading } from "./Loading";

export const ReactLazy = ({ children }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
