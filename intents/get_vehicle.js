'use strict';

const tesla = require('../teslaapi')

module.exports = function() {
  tesla.set_attributes(this.attributes)

  tesla.get_vehicle(vehicles => {
    const vehicle = vehicles.filter(v => v.vin == process.env.TESLA_VIN)[0]

    this.attributes['vehicle_id'] = vehicle['id']
    this.emit(':tell', 'Found the car called ' + vehicle['display_name'])
  })
}
