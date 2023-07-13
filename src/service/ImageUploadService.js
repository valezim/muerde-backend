const s3 = require('../../aws');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const uploadImageToS3 = async (file) => {
  const { originalname, buffer } = file;
  
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, 
    Key: originalname, 
    Body: buffer
  };

  await s3.upload(params).promise();

  await unlinkFile(file.path);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${originalname}`;
}

module.exports = {
  uploadImageToS3,
};
