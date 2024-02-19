import React from "react";
import Background from "../components/HomePage/background";
import Introduction from "../components/HomePage/Introduction";
import DisplayVoucher from "~/components/HomePage/DisplayVoucher";
import NewProduct from "~/components/HomePage/NewProduct";
import Feedback from "~/components/HomePage/Feedback";
function HomePage() {
  return (
    <div className="pb-5">
      <Background />
      <Introduction />
      <DisplayVoucher />
      <NewProduct />
      <Feedback />
    </div>
  );
}

export default HomePage;
