const StoreWatcher = require('/src/lib/utils/storex.js')
const RouterX = require('/src/lib/utils/routerx.js')
const AuthenticatorX = require('/src/lib/utils/authx.js')

<serve-auth>
    <section if={_.user.loggedin}>

      <yield />
    </section>
    <section if={ ! _.user.loggedin}>
      <p>please authenticate .. </p>

      <a href="{APP_URL}/ed?apid=appler&apto={currentLocation}" class="btn btn-danger">
                    <span class="fa fa-google-plus"></span> Google+</a>
    </section>
  <style>
    body { margin: 0 }
  </style>

  <script>
    let self = this
    // for validations
    //  - add a validationform
    //  - add a validate function in the handlers['<tag-name>'] section to set result
    //                into state.<store>.<validationform>.validated property
    self.stores = ['user'] // stores to watch
    self.validationform = [] // validation form . this will have validated field

    self.mixin(StoreWatcher)
    self.mixin(RouterX)
    self.mixin(AuthenticatorX)

    self._.user.loggedin = false
    self._.authenticate()
    self.currentLocation = document.location.origin + document.location.pathname + document.location.search
    self.APP_URL = 'http://saurshaz.xyz:5000'// todo :: rm hardcoding
  </script>
</serve-auth>
