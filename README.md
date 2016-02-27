Storm UI Client [![Build Status](https://travis-ci.org/andyroyle/storm-http.svg?branch=master)](https://travis-ci.org/andyroyle/storm-http)
---

Http client for the apache storm ui rest api.

####installing
```shell
npm i storm-http
```

####using

```javascript
var storm = require('storm-http');

var client = storm.createClient({
  host: 'https://my.storm.cluster',
  username: 'admin',
  password: 'password'
});

client.topologies(function(err, res){
  if(err){
    throw err;
  }

  console.log(res);
});
```

####methods

- `topologies(cb)`: get the summary of all running topologies
- `topology(id, [timespan], cb)`: get topology info by id (default timespan all-time)
- `cluster(cb)`: get the cluster summary
- `clusterConfig(cb)`: get the cluster configuration
- `component(topologyId, componentId, timespan, cb)`: get component info from the specified topology (default timespan all-time)
- `supervisor(cb)`: get the supervisor summary
- `kill(id, [waitTime], cb)`: kill a topology (default wait-time 30 seconds)
- `rebalance(id, [waitTime], cb)`: rebalance a topology (default wait-time 30 seconds)
- `activate(id, cb)`: activate a topology
- `deactivate(id, cb)`: deactivate a topology
