const StoreWatcher = require('/src/lib/utils/storex.js')
const RouterX = require('/src/lib/utils/routerx.js')
const Fyler = require('/src/lib/vendor/Fyler.js')
//const R = require('ramda')


<counter>
    <link href="http://materializecss.com/css/prism.css" rel="stylesheet">
    <link href="http://materializecss.com/css/ghpages-materialize.css" type="text/css" rel="stylesheet" media="screen,projection">
    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <style>
      .container {
        width: 450px;
        height: 400px;
      }
    </style>

    <div class="section white container" id="container-app" style="margin: 0;padding: 0;padding-bottom: 20;">
      <div>
        <span style={{color: 'cyan'}}>You have clicked {_.counter.cnt} times</span>
          <button style={{'background-color': 'green'}} onclick={props._.increment}>
            +1
          </button>
          <button style={{'background-color': 'red'}} onclick={props._.decrement}>
            -1
          </button>
      </div>
    </div>
  <script>
    let self = this
    // for validations
    //  - add a validationform
    //  - add a validate function in the handlers['<tag-name>'] section to set result
    //                into state.<store>.<validationform>.validated property
    self.stores = ['counter'] // stores to watch
    self.validationform = [] // validation form . this will have validated field

    self.mixin(StoreWatcher)
    // debugger;
    self.mixin(RouterX)

  </script>
</counter>
