import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Item, Separator, useContextMenu } from "react-contexify";

import { nest, MENU_ID } from "../utilities/utils";
import { ACTIONS } from "../actions/actions";

import "react-contexify/dist/ReactContexify.css";

export default function Node({ index, isExpand }) {
  // Context
  const dispatch = useDispatch();
  const currentNodes = nest(useSelector(state => state.store));
  const uniqueID = index;

  // Context Menu
  const { show } = useContextMenu({
    id: MENU_ID
  });

  function displayMenu(e) {
    show(e, { props: { id: Number(e.currentTarget.id) } });
  }

  function handleItemClick({ event, props }) {
    const index = props.id;
    switch (event.currentTarget.id) {
      case "add":
        let newDesc = prompt("Enter Description");
        if (newDesc && newDesc.trim()) {
          dispatch({
            type: ACTIONS.ADD_NODE,
            payload: {
              index: index,
              description: newDesc
            }
          });
        }
        break;
      case "edit":
        let editDesc = prompt("Enter Description");
        if (editDesc && editDesc.trim()) {
          dispatch({
            type: ACTIONS.EDIT_NODE,
            payload: {
              index: index,
              description: editDesc
            }
          });
        }
        break;
      case "remove":
        dispatch({
          type: ACTIONS.DELETE_NODE,
          payload: {
            index: index
          }
        });
        break;
      default:
        break;
    }
  }

  function getObject(theObject) {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        result = getObject(theObject[i]);
        if (result) {
          break;
        }
      }
    } else {
      for (let prop in theObject) {
        if (prop === "id") {
          if (theObject[prop] === uniqueID) {
            return theObject;
          }
        }
        if (
          theObject[prop] instanceof Object ||
          theObject[prop] instanceof Array
        ) {
          result = getObject(theObject[prop]);
          if (result) {
            break;
          }
        }
      }
    }
    return result;
  }

  let output = getObject(currentNodes);
  const { name } = output;
  let tempArray = output?.nodes;

  const [isExpanded, setIsExpanded] = useState(isExpand);

  const content = tempArray?.map(node => {
    return (
      <Node key={node.id} index={node.id} node={node} isExpand={isExpand} />
    );
  });

  useEffect(() => {
    setIsExpanded(isExpand);
  }, [isExpand]);

  return (
    <div style={{ marginLeft: "28px" }}>
      <div className="Category__Node">
        <span id={uniqueID} onContextMenu={displayMenu}>
          {name} ({tempArray ? tempArray.length : "0"})
        </span>
        <Menu id={MENU_ID}>
          <Item onClick={handleItemClick} id="add">
            Add Category
          </Item>
          <Separator />
          <Item onClick={handleItemClick} id="edit">
            Edit Category
          </Item>
          <Separator />
          <Item onClick={handleItemClick} id="remove">
            Remove Category
          </Item>
        </Menu>
        {tempArray?.length ? (
          isExpanded ? (
            <button onClick={() => setIsExpanded(!isExpanded)}>-</button>
          ) : (
            <button onClick={() => setIsExpanded(!isExpanded)}>+</button>
          )
        ) : (
          <span style={{ marginLeft: "28px" }}></span>
        )}
      </div>
      {isExpanded && <span>{content}</span>}
    </div>
  );
}
