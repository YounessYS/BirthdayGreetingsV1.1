const fs = require("fs");
const { parse } = require("csv-parse");
const sqlDB = require("./sqlDB");

fs.createReadStream("./friends.csv", { encoding: "utf8" })
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    sqlDB.serialize(function () {
      sqlDB.run(
        `INSERT INTO my_friends VALUES (?, ?, ?, ?)`,
        [row[0], row[1], row[2], row[3]],
        function (error) {
          if (error) {
            return console.log(error.message);
          }
          console.log(`Row id: ${this.lastID}`);
        }
      );
    });
  });
