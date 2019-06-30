const express = require('express');
const bodyParser = require('body-parser');
const gitReq = require('../helpers/github.js')
const showRepos = require('../database/index.js');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let { term } = req.body;

  gitReq.getReposByUsername(term, res);
  //res.sendStatus(200);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  showRepos.get((data) => {
    console.log(data);
    res.send(data)
  });
});

let port = process.env.PORT || 1128

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

