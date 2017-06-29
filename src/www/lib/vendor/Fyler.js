'use strict'

const FYLER_SERVER_URL = 'http://0.0.0.0:3000'
// self.config = JSON.parse(self.root.querySelector('data-config').innerHTML)

module.exports = {
  run: function run(config, cb) {
    $.ajax({
      method: 'PUT',
      url: FYLER_SERVER_URL + '/fyler',
      data: config
    }).done(function (r) {
      console.log({
        'message': 'From Fyler - response',
        'text': r
      })
      cb(undefined, r)
    }).error(function (err) {
      console.error({
        'message': 'From Fyler - err',
        'text': err
      })
      cb(err, undefined)
    })
  }
}
