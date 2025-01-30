// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create our web server
const app = express();
const PORT = 3000;

// Make sure we have a folder to store uploaded files
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// How we want to save uploaded files
const fileStorage = multer.diskStorage({
  // Where to save the files
  destination: (req, file, saveFile) => {
    saveFile(null, './uploads');
  },
  
  // What to name the files
  filename: (req, file, saveFile) => {
    saveFile(
      null, 
      file.originalname.split('.')[0] + 
      '-' + 
      Date.now() + 
      path.extname(file.originalname)
    );
  }
});

// Rules for file uploads
const uploadRules = multer({
  storage: fileStorage,
  
  // Maximum file size (2MB)
  limits: { 
    fileSize: 1024 * 1024 * 2 
  },
  
  // Only allow image files
  fileFilter: (req, file, checkFile) => {
    // List of allowed file types
    const allowedTypes = /jpeg|jpg|png|gif/;
    
    // Check file extension
    const isValidExtension = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    
    // Check file MIME type
    const isValidMimeType = allowedTypes.test(file.mimetype);

    // Only allow file if both extension and type are valid
    if (isValidExtension && isValidMimeType) {
      checkFile(null, true);
    } else {
      checkFile(new Error('Only image files are allowed!'));
    }
  }
});

// Show the upload page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file uploads
app.post('/upload', uploadRules.array('files', 4), (req, res) => {
  // Check if any files were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false, 
      message: 'No files uploaded'
    });
  }

  // Get details of uploaded files
  const uploadedFiles = req.files.map(file => ({
    originalName: file.originalname,
    savedName: file.filename,
    size: file.size
  }));

  // Send back successful response
  res.status(200).json({
    success: true, 
    files: uploadedFiles
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});