const aws = require('aws-sdk');
const s3 = new aws.S3({
    region: process.env.S3_REGION, 
    accessKeyId: process.env.S3_ACCESS_KEY_ID, 
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

async function saveFile(photo, nombre, extension, done){

    let inicio = photo.indexOf(',')+1;
    let fin = photo.length;
    const newBase64 = await photo.substring(inicio,fin);

    let buffer = await new Buffer.from(newBase64, 'base64');

    let params ={
        Bucket: process.env.S3_BUCKET,
        Key: "equipos/"+nombre+"."+extension,
        Body: buffer
    };

    await s3.putObject(params).promise()
        .then(res=>{
            done(res);
        })
        .catch(err=>{
            done(err);
        });
}

module.exports = {saveFile};



