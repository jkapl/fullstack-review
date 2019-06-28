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

  Repo.distinct('owner', null, (err, owners) => {
    if (err) {
      console.log('database error')
    } else {
      console.log(owners)
      console.log(data[0].owner.login);
      for (var i = 0; i < owners.length; i++) {
        if (data[0].owner.login === owners[i]) {
          console.log('already in DB!!!!')
          return
        }
      }

    const repos = data.map( item => {
      return {
        name: item.name,
        url: item.html_url,
        forks: item.forks
      }
    });

    let repo = new Repo({
      owner: data[0].owner.login,
      repos: repos
    });

    repo.save((err, success) => {
      if (err) {
        return console.error(err)
      } else {
        console.log('success')
      }
    });

    }
  })
}

const get = (cb) => {
  Repo.find({}, (err, arr)=> {
    if (err) {
      console.log(err);
    } else {
      cb(arr);
    }
  })
}

module.exports.save = save;
module.exports.get = get;
