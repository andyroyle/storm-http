var request = require('request');
var util = require('util');

module.exports.createClient = (options) => {
  
  options.baseUrl = `${options.host}/stormui/api/v1`;

  var execute = (opts, cb) => {
    opts.json = true;
    opts.auth = {
      user: options.username,
      password: options.password
    };

    request(opts, (err, res, body) => {
      if(err){
        return cb(err);
      }

      if(!body){
        return cb(new Error("empty response from server"));
      }

      cb(err, body);
    });
  }

  return {
    topologies: (cb) => {
      execute({
        uri: `${options.baseUrl}/topology/summary`
      }, (err, body) => {
        if(err){
          return cb(err);
        }

        return cb(null, body.topologies);
      });
    },
    topology: (id, timespan, cb) => {
      if(typeof timespan == "function"){
        cb = timespan;
        timespan = 0;
      }
      execute({
        uri: `${options.baseUrl}/topology/${id}?window=${timespan}`
      }, cb);
    },
    component: (topology, component, timespan, cb) => {
      if(typeof timespan == "function"){
        cb = timespan;
        timespan = 0;
      }

      execute({
        uri: `${options.baseUrl}/topology/${topology}/component/${component}?window=${timespan}`
      }, cb);
    },
    cluster: (cb) => {
      execute({
        uri: `${options.baseUrl}/cluster/summary`
      }, cb);
    },
    clusterConfig: (cb) => {
      execute({
        uri: `${options.baseUrl}/cluster/configuration`
      }, cb);
    },
    supervisor: (cb) => {
      execute({
        uri: `${options.baseUrl}/supervisor/summary`
      }, cb);
    },
    kill: (id, waitTime, cb) => {
      if(typeof waitTime == "function"){
        cb = waitTime;
        waitTime = 30;
      }

      execute({
        method: 'post',
        uri: `${options.baseUrl}/topology/${id}/kill/${waitTime}`
      });
    },
    activate: (id, cb) => {
      execute({
        method: 'post',
        uri: `${options.baseUrl}/topology/${id}/activate`
      });
    },
    deactivate: (id, cb) => {
      execute({
        method: 'post',
        uri: `${options.baseUrl}/topology/${id}/deactivate`
      });
    },
    rebalance: (id, waitTime, cb) => {
      if(typeof waitTime == "function"){
        cb = waitTime;
        waitTime = 30;
      }

      execute({
        method: 'post',
        uri: `${options.baseUrl}/topology/${id}/rebalance/${waitTime}`
      });
    }
  }
};
