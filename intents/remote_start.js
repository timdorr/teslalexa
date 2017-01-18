'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)
  tesla.remote_start_drive(res => {
    if (res.result) this.emit(':tell', 'Your car is ready to drive in the next 2 minutes.')
    else this.emit(':tell', 'Car couldn\'t be remote started.')
  })
}
