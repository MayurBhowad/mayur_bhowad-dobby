const { Storage } = require('@google-cloud/storage');
const { format } = require('util');

const configKeys = require('../config/config');

const storage = new Storage({
    projectId: configKeys.PROJECT_ID,
    keyFilename: "./config/reactimgupload-be04a-firebase-adminsdk-zmroq-d13bc2fcc3.json"
});

const bucket = storage.bucket(configKeys.BUCKET_NAME);

module.exports = uploadPostImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image File!');
        }

        let fileNewCopyName = `${Date.now()}_${file.originalname}`;
        let newFileName = `dobby_ads/${fileNewCopyName}`;
        let storageFileName = `${fileNewCopyName}`;
        let imagepath = `https://firebasestorage.googleapis.com/v0/b/reactimgupload-be04a.appspot.com/o/dobby_ads%2F${storageFileName}?alt=media&token=2c6cc6a9-2ce4-4b9c-981a-ed9f7c68e9aa`;
        let fileUpload = bucket.file(newFileName);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            console.log(error)
            reject('Something is wrong! Unable to upload at the moment.');
        })

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            // resolve(url);
            resolve(imagepath);
        });

        blobStream.end(file.buffer);
    });
} 