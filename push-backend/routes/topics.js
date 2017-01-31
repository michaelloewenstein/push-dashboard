const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    //TBD worker as a micro service
    worker = require('../../push-sender/worker.js'),
    AWS = require('aws-sdk');

AWS.config.update({ 
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, 
    "region": process.env.AWS_DEFAULT_REGION, 
});

const sns = new AWS.SNS();

//list jobs
router.get('/', function (req, res, next) {
    //TBD handle err
    listTopics(topics => res.send(topics));
});

const listTopics = function (cb) {
    //TBD handle more then 100 topics    
    sns.listTopics({}, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            //TBD return topic name instead of ARN
            const arns = _.map(data.Topics, 'TopicArn');
            if (cb) cb(arns);
        }
    });
};

module.exports = router;