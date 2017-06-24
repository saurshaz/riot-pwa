const riot = require('riot');
module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  nextView: 'xxx',
  init: function (stores) {
    let self = this
    let appName = 'test' // @todo rm hardcoding

    // self._ shall already be existing, if not skip
    if (!self._) {
      self._ = {}
    }
    self._.navTo = function (event, targetUri, container) {

      if(event && event.target && event.target.getAttribute('data-link')){
        targetUri = event.target.getAttribute('data-link')
        container = event.target.getAttribute('data-container') || '#app'
      }

      // this.nextView = container
      if (targetUri.indexOf('target') !== -1) {
        let extraParams = {domain: '', page: '', view: '', target: '', fragment: ''}
        var replaced = targetUri.slice(1)
        var arr = replaced.split('&')
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i].split('=') && arr[i].split('=').length === 2) {
            var keyValArr = arr[i].split('=')
            extraParams[keyValArr[0]] = keyValArr[1] || ''
          }
        }
        let options = {
          domain: extraParams.domain,
          page: extraParams.page
        }
        
        require(`../../views/${appName}/${extraParams.fragment}/${appName}-${extraParams.fragment}.html`)
        riot.mount(extraParams.target, `${appName}-${extraParams.fragment}`, options)
        self.update()
      } else {
        document.location.href = targetUri
      }
    }

    self.showBlockingLoading = function showBlockingLoading(){
      $('#blocking-loading').show();
    }
    self.hideBlockingLoading = function hideBlockingLoading(){
      $('#blocking-loading').hide();
    }
    self.callNativeToGetDeviceToken = () => {
        var rootElm = document.documentElement;
        var newFrameElm = document.createElement("IFRAME");
        newFrameElm.setAttribute("src","nativecall://getdevicetoken");
        rootElm.appendChild(newFrameElm);
        newFrameElm.parentNode.removeChild(newFrameElm);
    }

    self.groupAction = (type,action,current_status,selected_ids,student_id,cb) => {

      const processMe = () => {
        let data = {
          id:selected_ids,
          student_id:student_id,
          update_status : current_status, 
          stareed:current_status
        }
        $.post(`${self.appConfig.nodejsURL}${type}/student/${action}`,data,cb);
      }

      if(action==="delete"){
        let confirmResult = confirm("Are you sure to delete?");
        if(confirmResult){
          processMe.call(this)
        }
      }else{
        processMe.call(this)
      }
    }

    self.getStudentDetailsObjectID = () => {
      return self.getStudentDetailsObject() && self.getStudentDetailsObject()[0]._id;
    }

    self.getStudentDetailsObject = () => {
      if(localStorage['student_details_object']){
        return $.parseJSON(localStorage['student_details_object']);
      }else{
        return null;
      }
    }

    self.getClassObject = () => {
      if(localStorage['logged_in_class']){
        return $.parseJSON(localStorage['logged_in_class']);
      }else{
        return null;
      }
    }

    self.getClassSchoolID = () => {
      return self.getClassObject().school_id;
    }

    self.getClassID = () => {
      return self.getClassObject()._id;
    }

    self.clearData = () => {
      localStorage.clear()
    }


    self.getStudentObjectFromData = (data) => {
      let returnalble = null
      $.each(data.student,function(i,c){
        if(c.id===self.getStudentDetailsObjectID()){
          returnalble=c;
        }
      });
      return returnalble;
    }

    self.getPagingButton = () => {
      if(self.appConfig.consumeItem<self.appConfig.totalItem){
        return '<div onclick="loadmore(this)" class="btn-load-more">Load More</div>';
      }
      return "";
    }


    // @todo :: rm hardcoding, get from server side
    self.appConfig = {
          totalItem:0,
          consumeItem:0,
          currentPage:0,
          pagePerItem:2,
          firebaseURL: 'https://schoolconect.firebaseio.com/',
          nodejsURL  : (location.hostname=="parentconnectlive.ml")?'http://parentconnect-api.ml:3000/':'http://localhost:3000/'
          //nodejsURL  : 'http://localhost:3000/'
          
        }
    }


}
