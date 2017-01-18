'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)

  if (this.event.request.intent.slots.lock.value == 'unlock') {
    tesla.door_unlock(res => {
      if (res.result) this.emit(':tell', 'Doors unlocked.')
      else this.emit(':tell', 'Doors couldn\'t be unlocked.')
    })
  } else {
    tesla.door_lock(res => {
      if (res.result) this.emit(':tell', 'Doors locked.')
      else this.emit(':tell', 'Doors couldn\'t be locked.')
    })
  }
}
