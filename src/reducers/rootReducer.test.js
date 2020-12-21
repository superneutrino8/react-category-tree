import reducer from "./rootReducer";
import { ACTIONS } from "../actions/actions";
import { initalData } from "../utilities/utils";

const expectedData = {
  isExpand: false,
  store: [...initalData]
};

const deleteExpected = initalData.filter(function(obj) {
  return obj.id !== 8;
});

const deleteData = {
  isExpand: false,
  store: [...deleteExpected]
};

let addArray = initalData;
addArray = [
  ...addArray,
  {
    id: 50,
    name: "TEST DESC",
    parent_id: 2
  }
];

const addData = {
  isExpand: false,
  store: [...addArray]
};

let editArr = initalData.filter(function(obj) {
  return obj.id === 8;
});
let replaceArr = initalData.filter(function(obj) {
  return obj.id !== 8;
});
replaceArr.push({
  id: 8,
  name: "EDIT DESC",
  parent_id: null
});

const editData = {
  isExpand: false,
  store: [...replaceArr]
};

describe("Root Reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(expectedData);
  });
  it("should handle DELETE_NODE", () => {
    expect(
      reducer(expectedData, {
        type: ACTIONS.DELETE_NODE,
        payload: {
          index: 8
        }
      })
    ).toEqual(deleteData);
  });
  it("should handle ADD_NODE", () => {
    expect(
      reducer(expectedData, {
        type: ACTIONS.ADD_NODE,
        payload: {
          id: 50,
          description: "TEST DESC",
          index: 2
        }
      })
    ).toEqual(addData);
  });
  it("should handle EDIT_NODE", () => {
    expect(
      reducer(expectedData, {
        type: ACTIONS.EDIT_NODE,
        payload: {
          index: 8,
          description: "EDIT DESC"
        }
      })
    ).toEqual(editData);
  });
});
