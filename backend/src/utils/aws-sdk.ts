import AWS from 'aws-sdk';
import multer from 'multer';
import path from 'path';

const BUCKET_NAME = "djbeats-bucket"

const s3 = new AWS.S3();

const singlePublicFileUpload = async (file: Express.Multer.File) => {
    const { originalname, mimetype, buffer } = file;
    // file name will be time in ms and extension name
    const Key = new Date().getTime().toString() + path.extname(originalname)
    const uploadParams = {
        Bucket: BUCKET_NAME,
        Key,
        body: buffer,
        ACL: "public-read"
    };
    const result = await s3.upload(uploadParams).promise();

    return result.Location

}

// STORAGE

const storage = multer.memoryStorage();

const singleMulterUpload = (nameOfKey: string) =>
    multer({ storage: storage }).single(nameOfKey);

export {
    s3,
    singlePublicFileUpload,
    singleMulterUpload
}