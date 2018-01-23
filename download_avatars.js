var request = require('request');
var secretKey = require('./secrets.js');
var fs = require('fs');


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
  }).on('response', function(response) {

  });
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


getRepoContributors("jquery", "jquery", builder);




/*var getUser = getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var arrLogin = [];
  function logAvatar(result){
    for (obj of result) {
      arrLogin.push(obj.login);
      // console.log("Avatar url: " + obj.avatar_url)
    }
    //console.log('getArrLogin', arrLogin);
    return arrLogin;
  };
  logAvatar(result);
});*/



//put login
// downloadImageByURL("https://avatars1.githubusercontent.com/u/38577?v=4", "avatars/kvirani.jpg")










