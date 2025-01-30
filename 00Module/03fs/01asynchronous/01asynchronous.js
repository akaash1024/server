const fs = require("fs").promises;
const path = require("path");

const fileName = "async.txt";
const filePath = path.join(__dirname, fileName);

const writeFile = async () => {
  try {
    await fs.writeFile("async.txt", "This is async data");
    console.log("created");
  } catch (error) {
    console.error(error);
  }
};


const readFile = async () => {
    try {
        const data = await fs.readFile(fileName, "utf-8")
        console.log(data);
        
    } catch (error) {
        console.error(error)
    }
}

const updateFile = async( ) => {
    try {
        const update  = await fs.appendFile(fileName, "\n this is updated data");
        console.log("Data Updated");
    } catch (error) {
        console.error(error)
    }
}

const newFileName = "newASYNC.txt"
const newFilePath = path.join(__dirname, newFileName)

const updateFileName = async () => {
    try {
        await fs.rename("async.txt", newFilePath)
        console.log("Renamed");
        
    } catch (error) {
        console.error(error)
    }
}

const deleteFile = async () =>{ 
    try {
        await fs.unlink("newASYNC.txt")
        console.log("File Delete");
    } catch (error) {
        console.error(error)
    }
}


// writeFile()
// readFile()
// updateFile()
// updateFileName()
deleteFile()
