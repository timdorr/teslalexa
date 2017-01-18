'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)

  if (this.event.request.intent.slots.action.value == 'start') {
    tesla.auto_conditioning_start(res => {
      if (res.result) this.emit(':tell', 'Climate control started.')
      else this.emit(':tell', 'Climate control couldn\'t be started.')
    })
  } else {
    tesla.auto_conditioning_stop(res => {
      if (res.result) this.emit(':tell', 'Climate control stopped.')
      else this.emit(':tell', 'Climate control couldn\'t be stopped.')
    })
  }
}
