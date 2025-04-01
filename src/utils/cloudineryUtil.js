const cloundinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {
  //conif
  cloundinary.config({
    cloud_name: "dtslg5nyj",
    api_key: "468281211629131",
    api_secret: "CogUrpn8DfzEkSsHD09MDwGZcbg",
  });

  const cloundinaryResponse = await cloundinary.uploader.upload(file.path);
  return cloundinaryResponse;
};
module.exports = {
  uploadFileToCloudinary,
};

// file valu logic hordings controller ma uper and add hording with file ma che
