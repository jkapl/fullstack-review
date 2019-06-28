const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  owner: String,
  repoName: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.distinct('owner', null, (err, owners) => {
    if (err) {
      console.log('database error')
    } else {
      for (var i = 0; i < owners.length; i++) {
        if (data[0].owner.login === owners[i]) {
          console.log('already in DB!!!!')
          return
        }
      }

    for (var i = 0; i < data.length; i++) {
      let repo = new Repo({
        owner: data[i].owner.login,
        repoName: data[i].name,
        url: data[i].html_url,
        forks: data[i].forks_count
      });

      repo.save((err, success) => {
        if (err) {
          return console.error(err)
        } else {
          console.log('success')
        }
      });
    }

    }
  })
}

const get = (cb) => {
  var query = Repo.find({})
  query.sort('-forks');
  query.limit(25)
  query.exec((err,repos) => {
    if (err) {
      console.log(err);
    } else {
      cb(repos)
    }
  });
}

module.exports.save = save;
module.exports.get = get;
