const request = require('request');
const config = require('../config.js');
const database = require('../database/index.js')


let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  callback = (err, res, body)=> {
    if (!err && res.statusCode === 200) {
      const info = JSON.parse(body);
      // console.log(info.name);
      database.save(info);
    }
  }

  request(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;