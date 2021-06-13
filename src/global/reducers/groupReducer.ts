import {Group} from '../../db';
import {
  setGroupsAction,
  ActionTypes,
  insertGroupAction,
  updateGroupAction,
  deleteGroupAction,
} from '../actions/group';

type Action =
  | setGroupsAction
  | insertGroupAction
  | updateGroupAction
  | deleteGroupAction;

const groupReducer = (state: Group[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.setGroups:
      return action.payload;
    case ActionTypes.insertGroup:
      return [...state, action.payload];
    case ActionTypes.updateGroup:
      const temp = [...state];
      const index = temp.findIndex((val) => val.id === action.payload.id);
      if (index !== -1) {
        temp[index] = action.payload;
      }

      return temp;
    case ActionTypes.deleteGroup:
      return state.filter((val) => val.id !== action.payload);
    default:
      return state;
  }
};

export {groupReducer};
