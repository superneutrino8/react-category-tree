import { initalData } from "../utilities/utils";
import { ACTIONS } from "../actions/actions";

const localStateStatus = localStorage.getItem("state") ? true : false;

const initialState = localStateStatus
  ? JSON.parse(localStorage.getItem("state"))
  : {
      store: initalData,
      isExpand: false
    };

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.DELETE_NODE:
      // let newArr = DeleteNode(payload.index, state);
      let newArr = state.store;
      newArr = newArr.filter(function(obj) {
        return obj.id !== payload.index;
      });
      return {
        ...state,
        store: newArr
      };
    case ACTIONS.ADD_NODE:
      let tempArray = state.store;
      tempArray = [
        ...tempArray,
        {
          id: payload.id ? payload.id : Date.now(),
          name: payload.description,
          parent_id: payload.index
        }
      ];
      return {
        ...state,
        store: tempArray
      };
    case ACTIONS.EDIT_NODE:
      let editArr = state.store.filter(function(obj) {
        return obj.id === payload.index;
      });
      let replaceArr = state.store.filter(function(obj) {
        return obj.id !== payload.index;
      });
      replaceArr.push({
        id: editArr[0].id,
        name: payload.description,
        parent_id: editArr[0].parent_id
      });
      return {
        ...state,
        store: replaceArr
      };
    case ACTIONS.ADD_PARENT:
      let addParentArr = [
        ...state.store,
        {
          id: Date.now(),
          name: payload.description,
          parent_id: null
        }
      ];
      return {
        ...state,
        store: addParentArr
      };
    case ACTIONS.EXPAND_ALL:
      return {
        ...state,
        isExpand: !state.isExpand
      };
    default:
      return state;
  }
}

export default rootReducer;
