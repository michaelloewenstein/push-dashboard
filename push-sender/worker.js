const Promise = require('bluebird'),
  Agenda = require('agenda'),
  _ = require('lodash'),
  jobs = require('./lib/jobs.js')
  connectionString = "mongodb://localhost:27017/agenda",
  agenda = new Agenda({ db: { address: connectionString, collection: 'jobs' } });

//########### - WORKE API ####################

//add a job to a topic
const add = function (topicName, message, payload, time, cb) {
  //time= time.toAgednaTime()
  agenda.schedule(time, 'PublishToTopic', { topicName: topicName, message: message, payload: payload });
  if(cb) cb();
};

//get topic's jobs
const get = function (topicName, cb) {
  agenda.jobs({ name: 'PublishToTopic' }, function (err, jobs) {
    let matchingjobs = _.filter(jobs, function (j) { return j.attrs.data.topicName == topicName });
    if(cb) cb(matchingjobs);
  });
};

//list topics
const list = function(cb){
  jobs.listTopics(cb);
}

//remove a job from a topic
const remove = function (jobId, cb) {
  agenda.cancel({ _id: jobId }, function (err, numRemoved) {
    if(cb) cb();
  });
};
//########### -         - ####################

agenda.define('PublishToTopic', function (job, done) {
  jobs.PublishToTopic.publish(job.attrs.data.topicName, job.attrs.data.message, job.attrs.data.payload);
});

agenda.on('ready', function () {
  add('topic1', 'message', 'pay!', 'in 1 second');
  // var a = get('a',(j)=>{
  //   console.log(j);
  // });
  agenda.start();
});


module.exports.add = add;
module.exports.get = get;