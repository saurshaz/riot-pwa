const riot = require('riot')
require('./www/sw.js')

const processorFilter = (request, response, next) => {
  try {
    console.log(' *** app kickstarted *** ')
    require('./www/views/blocks/app/app-container.html')
    riot.mount('#app', 'app-container', {})
  } catch (e) {
    console.log(' **** error in routing for view  >> ')
    console.log('details of error ', e)
    next()
  } finally {
    next()
  }
}

require('./www/views/blocks/app/app-container.html')
riot.mount('#app', 'app-container', {})