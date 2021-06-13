import {combineReducers, createStore} from 'redux';

import {Item, Group} from '../db';
import {groupReducer} from './reducers/groupReducer';
import {items} from './reducers/itemReducer';

export interface StoreState {
  items: Item[];
  groups: Group[];
}

const reducers = combineReducers<StoreState>({
  items,
  groups: groupReducer,
});

export const store = createStore(reducers);
