import React from "react";
import { useSelector } from "react-redux";

import Node from "./Node";
import Buttons from "./Buttons";
import { nest } from "../utilities/utils";

function App() {
  const state = useSelector(state => state.store);
  const expand = useSelector(state => state.isExpand);
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Category Tree</h1>
      <Buttons />
      <div className="Catergory">
        {nest(state).map(node => {
          const { id } = node;
          return <Node key={id} index={id} isExpand={expand} />;
        })}
      </div>
    </div>
  );
}

export default App;
