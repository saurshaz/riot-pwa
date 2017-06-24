const riot = require('riot')
require('riot-router')

function processorFilter(request, response, next) {
  try {
    let options = {
      domain: 'user',
      page: 'test'
    }
    let moduleName
    console.log(' *** app kickstarted *** ')
    require('./views/blocks/app/app-container.html')
    riot.mount('#app', 'app-container', options)
   
    riot.routeState = {
      view: ''
    }
  } catch (e) {
    console.log(' **** error in routing for view  >> ')
    console.log('details of error ', e)
    next()
  } finally {
    next()
  }
}
// Apply security filter to Riot-Router
riot.router.use(processorFilter)
riot.mount('*')
// Start routing
riot.router.start()
