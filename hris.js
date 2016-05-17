'use strict'
const request = require('request')
const URI = require('urijs')
const utils = require('./utils')

module.exports = function (config) {
  const updateCSDCache = function () {
    let uri = URI(config.url)
    let username = URI(config.username)
    let password = URI(config.password)
    let before = new Date()
    let auth = "Basic " + new Buffer(username + ":" + password).toString("base64")
    let options = {
      method: 'GET',    	
      url: uri.toString(),
      headers: {
        Authorization: auth
      }
    }
    console.log(`Updating iHRIS CSD`)

    request(options, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});
  }

  return {
    fetchPublishedCSD: function (oimurl,oimdoc, callback) {
	updateCSDCache()
    	let uri = new URI(oimurl)
        .segment('/CSD/pollService/directory/')
        .segment(oimdoc)
        .segment('update_cache')
    	let before = new Date()
    	let options = {
    		method: 'GET',
      	url: uri.toString()
    	}
      console.log("Updating Openinfoman CSD Doc" + uri.toString())
		var done = false
      request(options, function(error, response, body){
    		done = true
    		console.log(body)
			});
		while(!done) {
			console.log("Helllooooo")
      require('deasync').runLoopOnce();
    	}
    }
  }
}
