import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mercury.db");

export const init = async () => {
    try {
    await db.exec([{sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on'))
    await initJogsTable();
    await initIntervalsTable();
    } catch (error){
        console.log(error);
    }
}

export const dropTables = async () => {
    try {
        await db.exec([{sql: 'PRAGMA foreign_keys = OFF;', args: [] }], false, () => console.log('Foreign keys turned off'));
        await dropJogsTable();
        await updateIntervals();
        await dropIntervalsTable();
        await init();
    } catch (error) {
        console.log(error);
    }
}



export const initJogsTable = () => {
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

export const initIntervalsTable = () => {
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

export const dropJogsTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DROP TABLE IF EXISTS jogs",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const dropIntervalsTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DROP TABLE IF EXISTS intervals",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise;
}

const updateIntervals = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            "UPDATE intervals SET jogs_reference = NULL",
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
}

export const insertJog = (distance, duration, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO jogs (distance, duration, date) VALUES (?, ?, ?)",
        [distance, duration, date],
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

export const insertInterval = (latitude, longitude, time, jogs_reference) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO intervals (latitude, longitude, time, jogs_reference) VALUES (?, ?, ?, ?)",
          [latitude, longitude, time, jogs_reference],
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
        "SELECT * FROM jogs INNER JOIN intervals ON intervals.jogs_reference = jogs.id",
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

export const getIntervals = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            "SELECT * FROM intervals",
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
}
