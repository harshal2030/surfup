import {Item} from '../db';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Items: {
    item?: Item;
  };
  Groups: undefined;
};
