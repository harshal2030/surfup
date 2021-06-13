import * as SQlite from 'expo-sqlite';
import {store} from '../global';
import {setGroups} from '../global/actions/group';

const db = SQlite.openDatabase('stox.db');

type Item = {
  id: string;
  name: string;
  buy: number;
  sell: number;
  price: number | null;
  group_id: string;
};

type Group = {
  id: string;
  name: string;
};

const initTable = (cb?: (id: string) => void) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS groups (id VARCHAR(10) NOT NULL PRIMARY KEY UNIQUE, name TEXT NOT NULL)',
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (
          id VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
          group_id VARCHAR(10) NOT NULL,
          name TEXT NOT NULL,
          buy INT NOT NULL,
          sell INT NOT NULL DEFAULT 0,
          price FLOAT
        )`,
      );
      tx.executeSql(
        "INSERT INTO groups (id, name) SELECT 'default', 'default' WHERE NOT EXISTS (SELECT * FROM groups WHERE id = 'default')",
      );
      tx.executeSql('SELECT * FROM groups', [], (_, {rows}) => {
        const {_array} = (rows as unknown) as {
          length: number;
          _array: Group[];
        };

        store.dispatch(setGroups(_array));
        if (cb) {
          cb(_array[0].id);
        }
      });
    },
    (e) => console.log(e),
  );
};

const insertInItems = (
  id: string,
  group_id: string,
  name: string,
  buy: number,
  sell?: number,
  price?: number | null,
  cb?: (e: SQlite.SQLError) => void,
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO items(id, group_id, name, buy, sell, price) VALUES(?, ?, ?, ?, ?, ?)',
        [id, group_id, name, buy, sell, price],
      );
    },
    (e) => cb!(e),
  );
};

const updateTable = (
  id: string,
  group_id: string,
  name: string,
  buy: number,
  sell?: number,
  price?: number | null,
  cb?: (e: SQlite.SQLError) => void,
) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE items SET name = ?, group_id = ?, buy = ?, sell=?, price = ? WHERE id = ?',
      [name, group_id, buy, sell, price, id],
    );
  }, cb);
};

const deleteFromTable = (id: string, cb?: (e: SQlite.SQLError) => void) => {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM items WHERE id = ?', [id]);
  }, cb);
};

const addGroupInTable = (id: string, name: string) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO groups (id, name) VALUES (?, ?)', [id, name]);
  });
};

const updateGroupInTable = (id: string, name: string) => {
  db.transaction((tx) => {
    tx.executeSql('UPDATE groups SET name = ? WHERE id = ?', [name, id]);
  });
};

const deleteGroupFromTables = (id: string) => {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM groups WHERE id = ?', [id]);
    tx.executeSql('DELETE FROM items WHERE group_id = ?', [id]);
  });
};

export {
  db,
  initTable,
  insertInItems,
  updateTable,
  deleteFromTable,
  addGroupInTable,
  updateGroupInTable,
  deleteGroupFromTables,
};

// eslint-disable-next-line no-undef
export type {Item, Group};
