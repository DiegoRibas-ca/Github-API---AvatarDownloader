var request = require('request');
var secretKey = require('./secrets.js');
var fs = require('fs');
var repoArg = process.argv;

console.log('Welcome to the GitHub Avatar Downloader!')

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' + secretKey.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);
  })
}

function getAvatars(result) {
  var arrAvatars = [];
  for (obj of result) {
    arrAvatars.push({
      user: obj.login,
      url: obj.avatar_url
    });
  }
  return arrAvatars;
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('err', function(err){
      throw err;
    })
    .pipe(fs.createWriteStream(`avatars/${filePath}.jpg`));
}

var builder = function(err, result) {
  if (err) console.log("Errors:", err)
  else {
    for (i of getAvatars(result)) {
      downloadImageByURL(i.url, i.user)
    }
  }
}

getRepoContributors(repoArg[2], repoArg[3], builder);









