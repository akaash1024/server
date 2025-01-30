const fs = require("fs");
const path = require("path");

const fileName = "async.txt";
const filePath = path.join(__dirname, fileName);

const writeFs = () => {
  fs.writeFile("async.txt", "This is data", (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log("created");
  });
};

// * readfile

const readFs = () => {
  fs.readFile("async.txt", "utf-8", (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res, "27");
  });
};

// * update file

const updateFs = () => {
  fs.appendFile("async.txt", "\nthis is updated", (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(`Data Updated-41`);
  });
};

const deleteFs = () => {
  fs.unlink("async.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Deleted");
  });
};

writeFs();
readFs();
updateFs();
deleteFs();
