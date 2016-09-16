'use strict'
let PubSub = require('../vendor/pubsub.js')

// todo :: restrict property access without `setState`
let state = {
  global: {}, fyler: {request: '', requestjson: {}, response: '', err: ''}, user: {loggedin: 'false', applerac: '', authStatus: false, userId: '', userPassword: '', loginform: {validated: false}}, misc: {}, counter: {cnt: 0}
}

module.exports = function () {
  return {
    init: function () {
      return state
    },
    setState: function (module, key, val) {
      // if (!module && key)
      //   state[key] = val
      // else
      state[module][key] = val
      console.log('state is -> ', state)
      PubSub.publish(module + '_updated', {module: module, key: key, val: val, state: state})
    },
    getState: function (module, key) {
      if (!module || !key) {
        return undefined
      }
      return state[module][key]
    },
    register: function (storeName_key, val) {
      let arr_state = []
      if (typeof storeName_key !== 'object') {
        arr_state.push(storeName_key)
      }

      for (let i in arr_state) {
        // make the change in needed JSOn and then emit an update change for that store
        let module = arr_state[i].split('.')[0]
        let key = arr_state[i].split('.')[1]
        state[module] = state[module] || {}
        state[module][key] = val
      }
    }
  }
}()
