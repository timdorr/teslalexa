'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.login(data => {
    this.attributes['access_token'] = data.access_token
    this.emit(':tell', 'Logged in.')
  })
}
