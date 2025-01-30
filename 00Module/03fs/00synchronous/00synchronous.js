const fs = require('fs');
const path = require('path');

const fileName = `text.txt`;
const filePath = path.join(__dirname, fileName);


// ! write file
const writeFile = fs.writeFileSync(filePath, "This is Initial Data", 'utf-8')
console.log(`Created`);


// ! read file
const readFile = fs.readFileSync(filePath, 'utf-8')
console.log(readFile);

// ! update
const updateFile = fs.appendFileSync(filePath, `\n this is new data`, 'utf-8')
console.log(`updated`);
ke


// ! rename
const newUpdatedFileName = `newUpdatedFile.txt`;
const newFilePath = path.join(__dirname, newUpdatedFileName)

const renameFile = fs.renameSync(filePath, newFilePath)
console.log(`Renamed`);




// ! delete
const deleteFile = fs.unlinkSync(newFilePath)
console.log(`File Deleted`);