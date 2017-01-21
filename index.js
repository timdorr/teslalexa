'use strict';

const Alexa = require('alexa-sdk')

const handlers = {
    CheckBattery: require('./intents/battery'),

    ChargePortAction: require('./intents/charge_port'),
    ChargeAction: require('./intents/charge'),
    HonkAction: require('./intents/honk'),
    LightsAction: require('./intents/lights'),
    DoorAction: require('./intents/door'),
    ClimateAction: require('./intents/climate'),
    RemoteStartAction: require('./intents/remote_start'),

    LoginAction: require('./intents/login'),
    GetVehicleAction: require('./intents/get_vehicle')
}

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context)
  alexa.appId = process.env.APP_ID
  alexa.dynamoDBTableName = 'Teslalexa'
  alexa.registerHandlers(handlers)
  alexa.execute()
}
