var handlers = {}

// serve-auth handlers
handlers['test'] = {}
handlers['test'].onAuthDone = function (data, store, cb, event) {
  store.setState(data.domain, 'applerac', data.data.applerac)
  store.setState(data.domain, 'loggedin', data.data.loggedin)
}

// serve-auth handlers
handlers['counter'] = {}
handlers['counter'].increment = function (data, store, cb, event) {
  store.setState(data.domain || data.page, 'cnt', (store.getState(data.domain || data.page, 'cnt') + 1))
}

handlers['counter'].decrement = function (data, store, cb, event) {
  store.setState(data.domain || data.page, 'cnt', (store.getState(data.domain || data.page, 'cnt') - 1))
}

handlers['app'] = {}

module.exports = handlers
