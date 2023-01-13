const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./friends.db";

function sqlDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const sqlDB = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(sqlDB);
      console.log("SQL Database working");
    });
    return sqlDB;
  }
}

function createTable(sqlDB) {
  sqlDB.exec(`
CREATE TABLE my_friends
(
    last_name       VARCHAR(10),
    first_name      VARCHAR(10),
    date_of_birth   DATE,
    email           VARCHAR(30)     
)
`);
}

module.exports = sqlDatabase();
