import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mercury.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS jogs (id INTEGER PRIMARY KEY NOT NULL, distance REAL NOT NULL, time TEXT NOT NULL, date INTEGER NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertJog = (distance, time, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO jogs (distance, time, date) VALUES (?, ?, ?)",
        [distance, time, date],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
