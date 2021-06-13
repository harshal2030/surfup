/* eslint-disable no-undef */
import {Item} from '../../db';

enum ActionType {
  getItems = 'get_items',
  updateItem = 'update_item',
  deleteItem = 'delete_item',
  deleteItemByGroup = 'delete_by_group',
  insertItem = 'insert_item',
}

type getItemAction = {
  type: ActionType.getItems;
  payload: Item[];
};

type insertItemAction = {
  type: ActionType.insertItem;
  payload: Item;
};

type updateItemAction = {
  type: ActionType.updateItem;
  payload: Item;
};

type deleteItemAction = {
  type: ActionType.deleteItem;
  payload: Item;
};

type deleteItemByGroupAction = {
  type: ActionType.deleteItemByGroup;
  payload: string;
};

const getItems = (items: Item[]): getItemAction => {
  return {
    type: ActionType.getItems,
    payload: items,
  };
};

const insertItem = (item: Item): insertItemAction => {
  return {
    type: ActionType.insertItem,
    payload: item,
  };
};

const updateItem = (item: Item): updateItemAction => {
  return {
    type: ActionType.updateItem,
    payload: item,
  };
};

const deleteItem = (item: Item): deleteItemAction => {
  return {
    type: ActionType.deleteItem,
    payload: item,
  };
};

const deleteItemByGroup = (group_id: string): deleteItemByGroupAction => {
  return {
    type: ActionType.deleteItemByGroup,
    payload: group_id,
  };
};

export {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
  deleteItemByGroup,
  ActionType,
};

export type {
  insertItemAction,
  getItemAction,
  deleteItemByGroupAction,
  updateItemAction,
  deleteItemAction,
};
