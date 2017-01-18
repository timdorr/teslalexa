'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)
  tesla.flash_lights(() => this.emit(':tell', 'Flashy flashy!'))
}
