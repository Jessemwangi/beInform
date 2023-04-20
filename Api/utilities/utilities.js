require("dotenv").config();
const sharp = require('sharp'); // resize images
const {
    S3Client,GetObjectCommand,
    PutObjectCommand,
  } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// const client = new S3Client(clientParams);

const accessId = process.env.KEY_VAR;
const accessPass = process.env.SECRET;
const Storage = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;

const s3 = new S3Client({
    credentials: {
      accessKeyId: accessId,
      secretAccessKey: accessPass,
    },
    region: region,
  });

 const generateUniqueKey = (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniqueSuffix + file.originalname;
  }
  
const uploadFile = async (req,res) =>{
    const file = req.file;
    const buffer = await sharp(file.buffer).resize({height:720, width:1080, fit:"contain"}).toBuffer()
    console.log(file);
    try {
      const params = {
        Bucket: Storage, 
        Key: generateUniqueKey(file),
        Body: buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

const getObjectParams = {
  Bucket: Storage,
  Key:params.Key,
}
      const command2 = new GetObjectCommand(getObjectParams);
const url = await getSignedUrl(s3, command2, { expiresIn: 3600 });

      res.status(200).json(url);
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
}

module.exports = {uploadFile,generateUniqueKey}