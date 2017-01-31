const express = require('express'),
  router = express.Router(),
  //TBD worker as a micro service
  worker = require('../../push-sender/worker.js');

//list jobs
router.get('/', function (req, res, next) {
  //TBD handle err
  worker.getAll(jobs => res.send(jobs));
});

//list jobs per topic
router.get('/topic', function (req, res, next) {
  //TBD handle err
  //TBD check params
  const topic = req.query.topic;
  worker.get(topic, jobs => res.send(jobs));
});

//remove job
router.delete('/', function (req, res, next) {
  //TBD check params
  //TBD handle err
  worker.remove(req.body.id, () => res.sendStatus(200));
});

//add job
router.post('/', function (req, res, next) {
  //TBD check params
  //TBD handle err
  const job = req.body;
  worker.add(job.topicName, job.message, job.payload, job.time, () => res.sendStatus(200));
});

module.exports = router;
