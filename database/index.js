const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  owner: String,
  repos: [{name: String, url: String, forks: Number}]
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  data.items.map( item => {
    let repo = new Repo({
      owner: item.login,
    })
    })
  var  = new Repo({owner: data.})
}

module.exports.save = save;