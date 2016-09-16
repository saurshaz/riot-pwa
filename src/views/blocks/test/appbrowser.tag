
const Fyler = require('/src/lib/vendor/Fyler.js')
<!-- const R = require('ramda') -->


<appbrowser header='false' nofooter='false'>
    <link href="http://materializecss.com/css/prism.css" rel="stylesheet">
    <link href="http://materializecss.com/css/ghpages-materialize.css" type="text/css" rel="stylesheet" media="screen,projection">
    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <section>
    <style>
      .container {
        width: 450px;
        height: 400px;
      }

      #selectedAppDiv {
        margin:5vh;
        padding: 2vh;
        width: 100%;
      }

      #selectAppDiv {
        margin:5vh;
        padding: 2vh;
        width: 100%;
      }

      #createAppDiv {
        position: relative;
        z-index: 11111;
        top: 20%;
        margin-left: 5vh;
        padding: 2vh;
        width: 100%;
      }

      #appMessageDiv {
        z-index: 11;
        top: 30%;
        margin-left: 5vh;
        padding: 2vh;
        width: 100%;
        position: absolute;
      }



      #createAppBtn {
        margin-top:5vh;
      }

    </style>

    <div class="section white container" id="container-app" style="margin: 0;padding: 0;padding-bottom: 20;">
      <div>

        <div id='selectAppDiv'>
          <!-- Dropdown Trigger -->
          <span><button id='existingAppBtn' class='dropdown-button btn' data-activates='app-selector'>My Apps</button>
            </span>
          <span><button id='createAppBtn' class='btn' onclick={processAppCreate}>Create App</button></span>
        </div>

        <!-- Dropdown Structure -->
        <ul id='app-selector' class='dropdown-content'>
          <li each={ app_item in app_items }>
            <a href="#!" data-appid={app_item._id} onclick={processAppSelect}>{app_item._id}</a>
          </li>
        </ul>


        <div id='createAppDiv'>
          <input id='createAppInput' class='input' placeholder="New App name"/>
          <button id='createRollbackAppBtn' class='btn' onclick={resetAppCreate}>Reset</button>
          <button id='createConfirmAppBtn'class='btn' onclick={submitAppCreate}>Submit</button>
        </div>

        <div id='appMessageDiv'>
          <div if={created_app_name || selected_app_name}>
            <p>App is <a href='#!app?app_id={selected_app || created_app}'>{selected_app_name || created_app_name}</a></p>
            <button class='btn' data-app_id='{selected_app || created_app}' data-app_name='{created_app_name || selected_app_name}'  onclick={deleteApp}>Delete App</button>
            <button class='btn' data-app_id='{selected_app || created_app}' data-app_name='{created_app_name || selected_app_name}'  onclick={goToApp}>Select App</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script>
    let self = this
    self.mode = ''
    self.selected_app = ''
    self.selected_app_name = ''
    self.created_app = ''
    self.created_app_name = ''

    // TODO :: GET THESE DYNAMICALLY AND MAKE THEM SECURE
    let user_id = 'saurshaz@gmail.com'
    let appler_ac = 'saurshaz@gmail.com'



    self.on('mount',function() {
      //debugger;
      self.root.querySelector('#createAppBtn').style.display = 'block'
      self.root.querySelector('#existingAppBtn').style.display = 'block'
      self.root.querySelector('#createAppDiv').style.display = 'none'


      // test call to fyler
      let fyler_config = {
        'commands': [{
          'what': 'fileio',
          'handler': 'getMatchingFiles',
          'listingpath': '/appler/' + user_id,
          'group_by_column': 'metadata.project_id',
          'user': user_id,
          'token': appler_ac
        }],
        'config': {
          'where': 'server',
          'how': 'sync',
          'lookat': 'context'
        }
      }

      Fyler.run(fyler_config, function (err, results) {

        self.app_items = (results && results[0] && results[0][0]) || [{app_name:'rioter-one',app_id:'1'},{app_name:'rioter-two',app_id:'2'},{app_name:'rioter-three',app_id:'3'}]
        self.update()

         $('#app-selector').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: false, // Displays dropdown below the button
          alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });


      })

      // var url = function(user_id) {
      //   return 'user/'+user_id+'/public/projects';
      // }

      // var _setProjects = function(data) {
      //     //data = data.map(function(item,i){ return {_id : item[0]._id} })
      //     self.app_items = data
      //     self.noApp = (!self.app_items || (self.app_items.length === 0 ))
      //     if(!self.noApp)
      //       self.app_items.unshift({_id:'Select an app'})
      //     self.update()
      // }

      // var jsonize = function(data) {
      //     return data[0]
      // }

      // var _initSelectIfNeeded = function(data){
      //   if(!self.noApp){
      //     let select = self.root.querySelector('#existingAppBtn')
      //     let options = {
      //       enablePagination: false,
      //       removeFirstOptionFromSearch: true,
      //       useFirstOptionTextAsPlaceholder: true,
      //       placeholderText: self.selected_app_name,
      //       noResultsMessage: self.selected_app_name,
      //       onchange: function() {
      //         console.log('You selected the ' + this.text + ' model.')
      //       }
      //     }
      //     let barq = new Barq(select, options).init()
      //   }
      //   self.update()
      // }



      // var updateState = R.compose(_initSelectIfNeeded,_setProjects,jsonize)
      // var getDataApp = R.compose(Utils.getJSON(updateState), url)





    })
    processAppSelect(e){
      let target =  e.target
      self.selected_app =target.getAttribute('data-appid')
      self.selected_app_name = target.innerHTML
      self.created_app = ''
      self.created_app_name = ''
      self.root.querySelector('#appMessageDiv').style.display = 'block'
      //self.root.querySelector('#createAppBtn').style.display ='none'
      self.update()
    }

    processAppCreate(e){
      let target =  e.target
      self.root.querySelector('#createAppDiv').style.display = 'block'
      self.root.querySelector('#appMessageDiv').style.display ='none'
      self.root.querySelector('#existingAppBtn').style.display = 'none'
      self.update()
    }


    submitAppCreate(e){
      let target =  e.target
      self.mode = 'created'
      self.created_app_name = self.root.querySelector('#createAppInput').value
      self.created_app ='4'
      self.selected_app = ''
      self.selected_app_name = ''
      self.app_items.push({app_name:self.root.querySelector('#createAppInput').value, app_id:'4'})
      // TODO :: add logic for above hardcoding removal

      self.root.querySelector('#appMessageDiv').style.display = 'block'
      self.root.querySelector('#createAppDiv').style.display = 'none'
      //self.root.querySelector('#createAppBtn').style.display ='block'
      self.root.querySelector('#existingAppBtn').style.display = 'block'
      //debugger
    }

    resetAppCreate(e){
      let target =  e.target
      self.mode = ''
      self.created_app_name = ''
      self.created_app =''
      self.selected_app = ''
      self.selected_app_name = ''
      self.root.querySelector('#appMessageDiv').style.display = 'block'
      self.root.querySelector('#createAppDiv').style.display = 'none'
     // self.root.querySelector('#createAppBtn').style.display ='block'
      self.root.querySelector('#existingAppBtn').style.display = 'block'
      //debugger
    }

    processAppSelection(e){
      let target =  e.target
      self.mode = 'selected'
      self.selected_app =target.getAttribute('data-appid')
      self.selected_app_name = target.getAttribute('data-app_name')
      self.created_app_name = ''
      self.created_app =''
      self.root.querySelector('#createAppDiv').style.display = 'block'
      self.root.querySelector('#appMessageDiv').style.display ='block'
      self.root.querySelector('#existingAppBtn').style.display = 'none'
      self.update()
    }

    processAppDeletion(e){
      let target =  e.target
      self.selected_app =target.getAttribute('data-appid')
      self.selected_app_name = target.innerHTML
      self.created_app_name = ''
      self.created_app =''
      self.root.querySelector('#createAppDiv').style.display = 'block'
      //self.root.querySelector('#createAppBtn').style.display ='none'
      self.root.querySelector('#existingAppBtn').style.display = 'none'
      self.update()
    }


    deleteApp(e){
      let target =  e.target
      self[self.mode +'_app'] = target.getAttribute('data-app_id')
      self[self.mode +'_app_name'] = target.getAttribute('data-app_name')
      // todo :: add logic to actually remove app
      debugger
    }

    goToApp(e){
      let target =  e.target
      self[self.mode +'_app'] = target.getAttribute('data-app_id')
      self[self.mode +'_app_name'] = target.getAttribute('data-app_name')
      // todo :: add logic to actually navigate to that App
      debugger
    }


  </script>
</appbrowser>
