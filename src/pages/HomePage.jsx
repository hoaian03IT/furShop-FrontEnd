import React from "react";
import Background from "../components/HomePage/background";
import Introduction from "../components/HomePage/Introduction";
import DisplayVoicher from "~/components/HomePage/DisplayVoicher";
import NewProduct from "~/components/HomePage/NewProduct";
import Feedback from "~/components/HomePage/Feedback";
function HomePage() {
  return (
    <div className="pb-5">
      <Background />
      <Introduction />
      <DisplayVoicher />
      <NewProduct />
      <Feedback />
    </div>
  );
}

export default HomePage;
