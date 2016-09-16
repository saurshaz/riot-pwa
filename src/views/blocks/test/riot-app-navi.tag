
const StoreWatcher = require('/src/lib/utils/storex.js')
<riot-app-navi>
  <section id='links'>
  <a onclick={_.fyler.navTo} class='__trigger' data-link='/?page=appbrowser&target=section#content-area&fragment=appbrowser'>R</a>
  <a onclick={_.fyler.navTo} class='__trigger' data-link='/?page=appbrowser&target=section#content-area&fragment=appbrowser'>C</a>
  <a onclick={_.fyler.navTo} class='__trigger' data-link='/?page=counter&target=section#content-area&fragment=counter'>{_.counter.cnt}</a>
  </section>

  <style scoped>
    :scope {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      box-sizing: border-box;
      font-family: sans-serif;
      text-align: center;
      color: #666;
      background: #333;
      width: 50px;
      transition: width .2s;
    }
    :scope:hover {
      width: 60px;
    }
    a {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 .8em;
      color: white;
      text-decoration: none;
      background: #444;
    }
    a:hover {
      background: #666;
    }
  </style>
  <script>
    // console.log(this.opts.data)
    let self = this
        // for validations
        //  - add a validationform
        //  - add a validate function in the handlers['<tag-name>'] section to set result
        //                into state.<store>.<validationform>.validated property
    self.stores = ['counter'] // stores to watch
    self.validationform = [] // validation form . this will have validated field

    // for store watching
    // import StoreWatcher from ../../event-manager/mixins/storex
    // self.mixin(StoreWatcher)
    let mixin = self.mixin(StoreWatcher)

    self.on('mount', ()=>{
        self.root.querySelector('section#links').onclick = function (e) {
            if(e.target.nodeName === "A" && e.target.classList.contains('__trigger')){
                self._.navTo(e.target.getAttribute('data-link'),'test')
            }
        }
    })
  </script>

</riot-app-navi>
