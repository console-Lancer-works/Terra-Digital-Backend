const aws = require('aws-sdk')
const { request } = require('express')
const fs = require('fs')


    exports.uploadImage = async (requestParam, type) => {
        try {
            let locationUrl
            aws.config.setPromisesDependency()
            aws.config.update({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                region: process.env.AWS_REGION_NAME
            })
            const s3 = new aws.S3()
            let params = {
                ACL: 'public-read',
                Body: fs.createReadStream(requestParam.file.path),
            }
            if(type === 'PROFILE'){
               params.Bucket = process.env.AWS_BUCKET_DEV
               if(requestParam.type === 'A'){
                   params.Key = `agent_images/agent${requestParam.id}` 
               }else{
                   params.Key = `user_images/user${requestParam.id}`
               }
            }
            

            return new Promise((resolve, reject) => {
                s3.upload(params, (err, data) => {
                    if (err) {
                        reject()
                    }
                    if (data) {
                        fs.unlinkSync(requestParam.file.path) // Empty temp folder
                        locationUrl = data.Location
                        resolve(locationUrl)
                    }
                })
            })
        } catch (error) {
            return false
        }
    }

