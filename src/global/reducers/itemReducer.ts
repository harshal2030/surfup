import {Item} from '../../db';
import {
  ActionType,
  insertItemAction,
  getItemAction,
  updateItemAction,
  deleteItemAction,
  deleteItemByGroupAction,
} from '../actions/items';

type Action =
  | insertItemAction
  | getItemAction
  | updateItemAction
  | deleteItemAction
  | deleteItemByGroupAction;

const items = (state: Item[] = [], action: Action) => {
  switch (action.type) {
    case ActionType.getItems:
      return action.payload;
    case ActionType.insertItem:
      return [action.payload, ...state];
    case ActionType.updateItem:
      const itemIndex = state.findIndex((val) => val.id === action.payload.id);
      const temp: Item[] = [...state];

      if (itemIndex !== -1) {
        temp[itemIndex] = action.payload;
      }

      return temp;
    case ActionType.deleteItem:
      return state.filter((val) => val.id !== action.payload.id);
    case ActionType.deleteItemByGroup:
      return state.filter((val) => val.group_id !== action.payload);
    default:
      return state;
  }
};

export {items};
