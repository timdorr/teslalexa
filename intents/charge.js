'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)

  if (this.event.request.intent.slots.action.value == 'start') {
    tesla.charge_start(res => {
      if (res.result) this.emit(':tell', 'Charging started.')
      else this.emit(':tell', 'Charging wasn\'t started.')
    })
  } else {
    tesla.charge_start(res => {
      if (res.result) this.emit(':tell', 'Charging stopped.')
      else this.emit(':tell', 'Charging wasn\'t stopped.')
    })
  }
}
