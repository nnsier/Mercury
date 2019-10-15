import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mercury.db");

export const init = async () => {
    try {
    await db.exec([{sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on'))
    await initJogTable();
    await initIntervalTable();
    } catch (error){
        console.log(error);
    }
}

export const initJogTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS jogs (id INTEGER PRIMARY KEY NOT NULL, distance REAL NOT NULL, duration TEXT NOT NULL, date INTEGER NOT NULL);",
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

export const initIntervalTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS intervals (id INTEGER PRIMARY KEY NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL, time INTEGER NOT NULL, jogs_reference INTEGER, FOREIGN KEY (jogs_reference) REFERENCES jogs(id));",
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

export const insertJog = (distance, duration, date) => {
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

export const getJogs = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM jogs",
        [],
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
