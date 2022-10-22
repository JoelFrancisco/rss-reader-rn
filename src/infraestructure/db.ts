import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "db.sqlite";

const SQL_CREATE_ENTRIES = [
  `CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY autoincrement,
      name VARCHAR(255) NOT NULL,
      qtd INTEGER DEFAULT 1 NOT NULL,
      comprado VARCHAR(1) DEFAULT "N" NOT NULL
    )`,
];

let db: SQLite.WebSQLDatabase = null!;

export function executeSql(query: string, params = []) {
  if (!db) openDB();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        params,
        (_, rs) => resolve(rs),
        (_, err): any => reject(err)
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
    (err: unknown) => console.warn(err);
    () => console.log("Banco iniciado");
  });
}
