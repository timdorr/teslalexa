'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)

  tesla.charge_state(charge_state => {
    this.emit(':tell', 'Your car has ' + charge_state['usable_battery_level'] + ' percent charge and ' + charge_state['battery_range'] + ' miles of range left.')
  })
}
