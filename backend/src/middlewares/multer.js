// import multer from "multer"

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");   


import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory
export const singleUpload = multer({ storage }).single('file');


