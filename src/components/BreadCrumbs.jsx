import Prototypes from "prop-types";
import { Breadcrumb } from "react-bootstrap";
import { pathname } from "~/configs/path";

export const BreadCrumbs = ({ hrefs = [] }) => {
  console.log(hrefs);
  return (
    <Breadcrumb>
      {hrefs.map((item, index) => (
        <Breadcrumb.Item key={index}>{item}/</Breadcrumb.Item>
      ))}
      {/* <Breadcrumb.Item href={pathname.home}>Home</Breadcrumb.Item> */}
    </Breadcrumb>
  );
};
