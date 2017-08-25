const riot = require('riot');
module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  nextView: 'xxx',
  init: function (stores) {
    let self = this
    let appName = 'app' // @todo rm hardcoding

    // self._ shall already be existing, if not skip
    if (!self._) {
      self._ = {}
    }
    self._.navTo = function (component, container, page) {
      let options = {};// @todo :: fill this in
      if (!page || (page === 'app')) {
        require(`../../views/blocks/${appName}/${appName}-${component}.html`)
        riot.mount(container, `${appName}-${component}`, options)
        self.update()
      } else{
        document.location.href = page
      }
    }
  }
}