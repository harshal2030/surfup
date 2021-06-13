/* eslint-disable no-undef */
import {Group} from '../../db';

enum ActionTypes {
  setGroups = 'set_groups',
  insertGroup = 'insert_group',
  updateGroup = 'update_group',
  deleteGroup = 'delete_group',
}

interface setGroupsAction {
  type: ActionTypes.setGroups;
  payload: Group[];
}

interface insertGroupAction {
  type: ActionTypes.insertGroup;
  payload: Group;
}

interface updateGroupAction {
  type: ActionTypes.updateGroup;
  payload: Group;
}

interface deleteGroupAction {
  type: ActionTypes.deleteGroup;
  payload: string;
}

const setGroups = (groups: Group[]): setGroupsAction => {
  return {
    type: ActionTypes.setGroups,
    payload: groups,
  };
};

const insertGroup = (group: Group): insertGroupAction => {
  return {
    type: ActionTypes.insertGroup,
    payload: group,
  };
};

const updateGroup = (group: Group): updateGroupAction => {
  return {
    type: ActionTypes.updateGroup,
    payload: group,
  };
};

const deleteGroup = (id: string): deleteGroupAction => {
  return {
    type: ActionTypes.deleteGroup,
    payload: id,
  };
};

export {ActionTypes, setGroups, insertGroup, updateGroup, deleteGroup};

export type {
  setGroupsAction,
  updateGroupAction,
  insertGroupAction,
  deleteGroupAction,
};
