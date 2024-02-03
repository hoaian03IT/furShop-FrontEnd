import React from "react";
import Background from "../components/HomePage/background";
import Introduction from "../components/HomePage/Introduction";
import DisplayVoicher from "~/components/HomePage/DisplayVoicher";
function Home() {
  return (
    <div className="pb-5">
      <Background />
      <Introduction />
      <DisplayVoicher />
    </div>
  );
}

export default Home;
