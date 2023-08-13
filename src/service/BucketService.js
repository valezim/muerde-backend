
const AWS = require('aws-sdk');

class BucketService {
  constructor() {
    this.s3 = new AWS.S3();
  }
  async uploadFile(file) {
    try {
      if (!file) throw new Error('File is required');

      const fileName = file.name;
      const fileKey = `${new Date().getTime()}_${fileName}`;
      const mimetype = file.mimetype;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileKey,
        Body: file.data,
        ContentType: mimetype,
      };

      const { Location } = await new Promise((resolve, reject) => {
        this.s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
      });

      return { location: Location };
    } catch (error) {
      console.log(`Error - BucketService :: uploadFile - ${error.stack}`);
      throw error;
    }
  }

  async deleteFile(fileKey) {
    try {
      if (!fileKey) throw new Error('Document bucket key is required');

      const params = { Bucket: process.env.BUCKET_NAME, Key: fileKey };

      await new Promise((resolve, reject) => {
        this.s3.deleteObject(params, (err, data) => err == null ? resolve(data) : reject(err));
      });
    } catch (error) {
      console.log(`Error - BucketService :: deleteFile - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new BucketService();
