const cloudinary = require("cloudinary").v2;
const fs = require("fs")


cloudinary.config({
    cloud_name: "dmzo7pria",
    api_key: "583554861255523",
    api_secret: "FhVCzNvgRqtWO_3Jn1S0seh4Dqc"
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);

        // fs.unlinkSync(localFilePath) // ! need to check 
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



module.exports=  uploadOnCloudinary 