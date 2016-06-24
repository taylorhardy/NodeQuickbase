var express = require('express');
var router = express.Router();

var QuickBase = require('../quickbaseAPI');

var quickbase = new QuickBase({
  realm: '****', //realm name in URL
  appToken: '****' // application token
});

quickbase.api('API_Authenticate', {
  username: '****', //quickbase user ID
  password: '****' // quickbase password
}).then(function (result) {
  return quickbase.api('API_DoQuery', {
    dbid: '*', //tableID
    clist: '8', //fields you wish to query
    //options: 'num-10',
    fmt: 'structured'


  }).then(function (result) {

    return result.table.records;
  });
}).then(function (result) {
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].f._);
  }
  router.get('/', function(req, res, next) { // render index with data from query.
    res.render('index', { data : result});
  });
  //console.log(result)
}).catch(function (err) {
  console.error(err);
});

module.exports = router;
