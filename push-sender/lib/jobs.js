const AWS = require('aws-sdk'),
    _ = require('lodash');
AWS.config.update({ 
    "accessKeyId": "AKIAISY5KEIC7EAHSG3Q", 
    "secretAccessKey": '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', 
    "region": "us-west-2" 
});
// AWS.config.update({ 
//     "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
//     "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, 
//     "region": process.env.AWS_DEFAULT_REGION, 
// });

const sns = new AWS.SNS();
const PublishToTopic = {
    publish: function (topicName, message, payload) {
        console.log("Publish To", topicName, message, payload);
        topicNameToARN(topicName, arn =>{
            var params = {
                Message: message,
                TopicArn: arn
            };

            sns.publish(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
            });
            
        });
    }
};

const topicNameToARN = function(topicName, cb){
    //TBD handle more then 100 topics    
    sns.listTopics({}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        const topics = _.filter(data.Topics, function (topic) { return topic.TopicArn.endsWith(topicName); });
        //TBD handle more then one match        
        if(cb) cb(topics[0].TopicArn);
    }
    });
    
};

//TBD remove from jobs.js
const listTopics = function(cb){
    //TBD handle more then 100 topics    
    sns.listTopics({}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {        
        //TBD return topic name instead of ARN
        const arns = _.map(topics, 'TopicArn');        
        if(cb) cb(arns);
    }
    });
    
};

module.exports.PublishToTopic = PublishToTopic;