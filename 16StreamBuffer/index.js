const { createReadStream, createWriteStream } = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");

const readableStream = createReadStream(inputFilePath, {
    encoding: "utf-8",
    highWaterMark: 16,
});

const writableStream = createWriteStream(outputFilePath);

// Log each chunk as it's read
readableStream.on('data', (chunk) => {
    console.log('Chunk received:', chunk);
    console.log('Chunk length:', chunk.length, 'bytes');
});

readableStream.pipe(writableStream);

// Handle errors
readableStream.on("error", (err) => console.error("Error:", err));
writableStream.on("error", (err) => console.error("Error:", err));
 

// When the stream starts
readableStream.on('open', () => {
    console.log('Stream opened');
});

// When the stream ends
readableStream.on('end', () => {
    console.log('Stream ended');
});

// When the write is finished
writableStream.on('finish', () => {
    console.log('All writes are now complete.');
});