import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

const DATABASE_NAME = "db.sqlite";

const SQL_CREATE_ENTRIES = [
  `CREATE TABLE IF NOT EXISTS feeds (
      id INTEGER PRIMARY KEY autoincrement,
      name VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL
    )`,
];

let db = null;

export function executeSql(query, params = []) {
  if (!db) openDB();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, rs) => resolve(rs),
        (_, err) => reject(err)
      );
    });
  });
}

export default function openDB() {
  if (db) return db;

  db = SQLite.openDatabase(DATABASE_NAME);
  db.transaction((tx) => {
    SQL_CREATE_ENTRIES.map((query) => {
      tx.executeSql(query);
    });
    (err) => console.log(err);
    () => console.log("Banco iniciado");
  });
}
