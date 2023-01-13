const fs = require("fs");
const { parse } = require("csv-parse");

const todayDate = new Date();
let detailedDate = todayDate.toISOString().substring(0, 10);
detailedDate = detailedDate.split("");
detailedDate[4] = "/";
detailedDate[7] = "/";
detailedDate = detailedDate.join("");

const febTwentyNinth = "02/29";
const febTwentyEigth = "02/28";

function readFromCSV() {
  return fs
    .createReadStream("./friends.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      console.log(row);
    })
    .on("end", function () {
      console.log("You've run out of friends");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

function sendEmail() {
  return fs
    .createReadStream("./friends.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      // If today is their birthday, email them while taking into account 29th Feb
      if (
        " " + detailedDate.indexOf(febTwentyEigth) > -1 &&
        row[2].indexOf(febTwentyNinth) > -1
      ) {
        console.log(
          "Happy birthday!",
          "\n",
          "Happy birthday, dear" + row[0] + "!"
        );
      } else if (
        " " + detailedDate === row[2] &&
        " " + detailedDate.indexOf(febTwentyNinth) == -1
      ) {
        console.log(
          "Happy birthday!",
          "\n",
          "Happy birthday, dear" + row[0] + "!"
        );
      } else {
        // Do nothing
      }
    })
    .on("end", function () {
      console.log("No emails sent as it's no one's birthday today");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

function sendSMS() {
  return fs
    .createReadStream("./friends.csv", { encoding: "utf8" })
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      // If today is their birthday, text them while taking into account 29th Feb
      if (
        " " + detailedDate.indexOf(febTwentyEigth) > -1 &&
        row[2].indexOf(febTwentyNinth) > -1
      ) {
        console.log("Happy birthday, dear" + row[0] + "!");
      } else if (
        " " + detailedDate === row[2] &&
        " " + detailedDate.indexOf(febTwentyNinth) == -1
      ) {
        console.log("Happy birthday, dear" + row[0] + "!");
      } else {
        // Do nothing
      }
    })
    .on("end", function () {
      console.log("No SMS sent as it's no one's birthday today");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

readFromCSV();
sendEmail();
sendSMS();
