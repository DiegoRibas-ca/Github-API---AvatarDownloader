var request = require('request');
var secretKey = require('./secrets.js')


console.log('Welcome to the GitHub Avatar Downloader!')


function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' + secretKey.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    // console.log(data)
    cb(err, data);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  function logAvatar(result){
    for (obj of result) {
      console.log("Avatar url: " + obj.avatar_url)
    }
  };
  logAvatar(result);
});