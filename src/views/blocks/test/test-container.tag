

require('/src/views/common/serve-auth.tag!')
require('/src/views/blocks/test/riot-app-main.tag!')
require('/src/views/blocks/test/riot-app-navi.tag!')
require('/src/views/blocks/test/riot-app-help.tag!')
const StoreWatcher = require('/src/lib/utils/storex.js')
const RouterX = require('/src/lib/utils/routerx.js')

<test-container>

  
    <riot-app-main></riot-app-main>
    <riot-app-navi></riot-app-navi>
    <riot-app-help></riot-app-help>

  <style>
    body { margin: 0 }
  </style>

  <script>
  	var self = this
    // for validations
    //  - add a validationform
    //  - add a validate function in the handlers['<tag-name>'] section to set result
    //                into state.<store>.<validationform>.validated property
    self.stores = ['user'] // stores to watch
    self.validationform = [] // validation form . this will have validated field

    self.mixin(StoreWatcher)
    self.mixin(RouterX)
  </script>
</test-container>
