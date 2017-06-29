'use strict'
const handlers = require('../../handlers.js')
const store = require('./store.js')
const PubSub = require('../vendor/pubsub.js')

module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function (stores) {
    // this.on('updated', function () { console.log('Updated!') })

    let self = this
    self.state = store.init()
    self._ = self.state
    let identifier = self.identifier || self.root.getAttribute('data-is')

    self.props = self.props || {}
    self.props._ = self.props._ || {}

    // / setup all events
    PubSub.publish('setup_all_events', {context: self})

    self.on('mount', function () {
// todo : try to get this stores from init param only
      self.stores.map((item, i) => {
        //  todo :: validation needed shall be fetched from module name
        // debugger
        PubSub.subscribe(item + '_updated', (data) => {
          for (let i in self.validationform) {
            if (data.key === self.validationform[i] && data.val.validated && data.val.validated === true) {
              PubSub.publish(identifier + '_setup_events', {context: self})
            } else if (data.key === self.validationform[i] && data.val.validated && data.val.validated !== true) {
              PubSub.publish(identifier + '_destroy_events', {context: self})
            }
          }

          console.debug(' update data >>> ', data)
          self['_'][data.module][data.key] = data.val
          self.update()
        })
      })

      if (identifier && handlers[identifier] && handlers[identifier].onmount && (typeof handlers[identifier].onmount === 'function')) {
        handlers[identifier].onmount.call(self, {page: identifier, domain: self.opts.domain}, store, null, null)
      }

      // add handler functions as properties to functions
      if (handlers[identifier] && Object.keys(handlers[identifier]) && self.props._) {
        Object.keys(handlers[identifier] && handlers[identifier]).forEach((func, i) => {
          // @todo :: get the page and domain in abetter manner, this is not correct
          self.props._[func] = handlers[identifier][func].bind(this, {page: identifier, domain: identifier}, store, null, null)
        })
        self.update()
      }
    })

    self.validate = () => {
      let identifier = this.opts.dataIs
      if (identifier && handlers[identifier] && handlers[identifier].validate && (typeof handlers[identifier].validate === 'function')) {
        handlers[identifier].validate.call(self, {page: identifier, domain: self.opts.domain}, store, null, null)
      }
    }
  }
}
