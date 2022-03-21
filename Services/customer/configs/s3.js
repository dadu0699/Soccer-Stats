const S3 = require('aws-sdk/clients/s3');

const { v4: uuidv4 } = require('uuid');

const { S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET } =
  process.env;

const client = new S3({
  region: S3_REGION,
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
});

const itemUpload = async (base64) => {
  const img = base64.split(',');
  const temp = img[0].split(';');
  const ext = temp[0].split('/');
  const buffer = Buffer.from(img[1], 'base64');
  const key = `usuarios/${uuidv4()}.${ext[1]}`;

  const params = {
    Bucket: S3_BUCKET,
    Key: key,
    Body: buffer,
  };

  return await client.upload(params).promise();
};

module.exports = { itemUpload };
