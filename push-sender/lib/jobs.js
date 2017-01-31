const AWS = require('aws-sdk'),
    _ = require('lodash');
AWS.config.update({ 
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY, 
    "region": process.env.AWS_DEFAULT_REGION, 
});

const sns = new AWS.SNS();

const PublishToTopic = {
    publish: function (topicName, message, payload) {
        topicNameToARN(topicName, arn => {
            //TBD error handling
            if (_.isEmpty(arn)) {
                console.log('no matching topic');
            }
            var params = {
                Message: message,
                TopicArn: arn
            };

            sns.publish(params, function (err, data) {
                if (err) {
                    console.log('no matching topic');
                }
                else {
                    console.log("Publish To", arn, message);
                }
            });

        });
    }
};

const topicNameToARN = function (topicName, cb) {
    //TBD handle more then 100 topics    
    sns.listTopics({}, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
            if (_.isEmpty(data.Topics)) {
                return cb('');
            }
            const topics = _.filter(data.Topics, function (topic) { return topic.TopicArn.endsWith(topicName); });
            
            if (_.isEmpty(topics)) {
                return cb('');
            }
            //TBD handle more then one match        
            if (cb) cb(topics[0].TopicArn);
        }
    });
};

const topicSubscribers = function (topicName, cb) {
    topicNameToARN(topicName, arn => {
        //TBD handle more then 100 topics
        var params = {
            TopicArn: arn
        };

        sns.listSubscriptionsByTopic(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else {
                if (_.isEmpty(data.Subscriptions)) {
                    return cb('');
                }
                const subs = _.map(data.Subscriptions, function (s) { return s.Endpoint });
                if (cb) cb(subs);
            }
        });
    });
}

module.exports = { PublishToTopic: PublishToTopic, topicSubscribers: topicSubscribers };
