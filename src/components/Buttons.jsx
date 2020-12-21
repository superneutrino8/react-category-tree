import React from "react";
import { useDispatch } from "react-redux";

import { ACTIONS } from "../actions/actions";

const Buttons = function () {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className="Buttons--large"
        onClick={() => {
          dispatch({
            type: ACTIONS.EXPAND_ALL
          });
        }}
      >
        Expand All
      </button>
      <button
        className="Buttons--large"
        onClick={() => {
          let desc = prompt("Enter Description");
          if (desc && desc.trim()) {
            dispatch({
              type: ACTIONS.ADD_PARENT,
              payload: {
                description: desc
              }
            });
          }
        }}
      >
        Add Parent Category
      </button>
    </div>
  );
};

export default Buttons;
