const Promise = require('bluebird'),
  Agenda = require('agenda'),
  _ = require('lodash'),
  uuid = require('node-uuid');

jobs = require('./lib/jobs.js')
connectionString = "mongodb://localhost:27017/agenda",
  agenda = new Agenda({ db: { address: connectionString, collection: 'jobs' } });

//########### - WORKE API ####################

//add a job to a topic
const add = function (topicName, message, payload, time, cb) {
  //TBD check paramters
  //time= time.toAgednaTime()
  const id = uuid.v1()
  agenda.schedule(time, 'PublishToTopic', { topicName: topicName, message: message, payload: payload, id: id });
  //TBD handle erros
  if (cb) cb();
};

//get all jobs
const getAll = function (cb) {
  agenda.jobs({ name: 'PublishToTopic' }, function (err, jobs) {
    let jobsFiltered = _.map(jobs, function (j) {
      return {
        topicName: j.attrs.data.topicName,
        message: j.attrs.data.message,
        payload: j.attrs.data.payload,
        id: j.attrs.data.id
      }
    });
    if (cb) cb(jobsFiltered);
    //TBD handle err
  });
};


//get topic's jobs
const get = function (topicName, cb) {
  agenda.jobs({ name: 'PublishToTopic' }, function (err, jobsArr) {
    let matchingjobs = _.filter(jobsArr, function (j) { return j.attrs.data.topicName == topicName });
    if (_.isEmpty(matchingjobs)) {
      if (cb) cb([]);
    }
    else {
      jobs.topicSubscribers(matchingjobs[0].attrs.data.topicName, (subs) => {
        jobsFiltered = _.map(matchingjobs, function (j) {
          return {
            topicName: j.attrs.data.topicName,
            message: j.attrs.data.message,
            payload: j.attrs.data.payload,
            id: j.attrs.data.id,
            time: j.attrs.nextRunAt,
            subscribers: subs.length
          }
        });
        if (cb) cb(jobsFiltered);
      });
    }
  });

};


//list topics
const list = function (cb) {
  jobs.listTopics(cb);
}

//remove a job from a topic
const remove = function (jobId, cb) {
  agenda.cancel({ 'data.id': jobId }, function (err, numRemoved) {
    if (cb) cb(numRemoved);
    //TBD handle err
  });
};
//########### -         - ####################

agenda.define('PublishToTopic', function (job, done) {
  jobs.PublishToTopic.publish(job.attrs.data.topicName, job.attrs.data.message, job.attrs.data.payload, job.attrs.data.id);
});

agenda.on('ready', function () {
  agenda.start();
});


module.exports = { add: add, remove: remove, list: list, get: get, getAll: getAll };
