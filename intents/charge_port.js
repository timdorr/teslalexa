'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)
  tesla.charge_port_door_open(() => this.emit(':tell', 'Charge port opened.'))
}
