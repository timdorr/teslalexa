'use strict';

const Alexa = require('alexa-sdk')

const APP_ID = 'amzn1.ask.skill.3a53e73c-e55d-45c6-8cec-651c968f9acd'

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
  alexa.appId = APP_ID
  alexa.dynamoDBTableName = 'Teslalexa'
  alexa.registerHandlers(handlers)
  alexa.execute()
}
