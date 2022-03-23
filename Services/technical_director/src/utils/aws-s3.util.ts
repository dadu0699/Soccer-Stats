const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const NODE_ENV = process.env.NODE_ENV || 'development'
require('dotenv').config({
    path: ".env." + NODE_ENV
})


console.log(process.env.S3_REGION)
console.log(process.env.S3_ACCESS_KEY_ID)
console.log(process.env.S3_SECRET_ACCESS_KEY)
console.log(process.env.S3_BUCKET)
const S3 = new AWS.S3({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const UploadFile = (base64: any, extension: any) => {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.from(base64, 'base64');
        let nombre = `usuarios/${uuidv4()}.${extension}`;

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: nombre,
            Body: buffer,
        };

        S3.upload(params, (err: any, data: any) => {
            if (err) {
                console.log(err)
                resolve(null)
            } else {
                resolve(data)
            }
        });
    });
}

export default UploadFile;