'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)
  tesla.honk_horn(() => this.emit(':tell', 'Beep beep!'))
}
