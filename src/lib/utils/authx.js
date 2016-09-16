'use strict'
var PubSub = require('../vendor/pubsub.js')

Object.defineProperty(window, 'Cookies', {
  get: function () {
    return document.cookie.split(';').reduce(function (cookies, cookie) {
      cookies[cookie.split('=')[0]] = unescape(cookie.split('=')[1])
      return cookies
    }, {})
  }
})

// upon load - read the cookie, and bring it's value into `self._.user.loggedin` and `self._.user.applerac`
module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function (stores) {
    let self = this

    // self._ shall already be existing, if not skip
    if (!self._) {
      self._ = {}
    }
    self._.authenticate = function () {
      if (!self._.user.loggedin || (self._.user.loggedin == 'false') && !self._.user.applerac) {
        console.debug(' ****  ', currentUri)
        let currentUri = self.currentLocation = document.location.origin + document.location.pathname + document.location.search

        // could be that cookies are present but not in store values
        if (Cookies.applerac && Cookies[' loggedinuserid']) {
          PubSub.publish('auth-done', ({applerac: Cookies.applerac, loggedin: Cookies[' loggedinuserid']}))
        } else {
          // todo :: rm this hardcoding for auth-service url
          let __AUTH_SERVICE_URL = 'http://saurabhs-macbook-air.local:5000/ed?apid=appler&apto='
          // or  it could be that auth has not happened on the Fyler server at all
          document.location.href = __AUTH_SERVICE_URL + currentUri
        }
      }
    }
  }
}
