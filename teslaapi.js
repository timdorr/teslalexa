'use strict';

const http = require('https')
const url = require('url')

const baseURL = 'https://owner-api.teslamotors.com/api/1'

const client_id = process.env.TESLA_CLIENT_ID
const client_secret = process.env.TESLA_CLIENT_SECRET

let access_token = null
let vehicle_id = null

function teslaGet(endpoint, callback) {
  const location = url.parse(baseURL + endpoint)
  location.headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer ' + access_token
  }

  http.get(location, res => {
    let response = ''
    res.on('data', data => response += data)
    res.on('end', () => callback(JSON.parse(response)))
  })
}

function teslaPost(endpoint, callback, body) {
  if (!callback) callback = () => {}

  const location = url.parse(baseURL + endpoint)
  location.method = 'POST'
  location.headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer ' + access_token
  }

  if (body) {
    body = JSON.stringify(body)
    location.headers['Content-Length'] = Buffer.byteLength(body)
  }

  const req = http.request(location, res => {
    let response = ''
    res.on('data', data => response += data)
    res.on('end', () => callback(JSON.parse(response)))
  })

  if (body) req.write(body)
  req.end()
}


exports.set_attributes = function(attributes) {
  access_token = attributes['access_token']
  vehicle_id = attributes['vehicle_id']
}

exports.login = function(callback) {
  const body = JSON.stringify({
    grant_type: "password",
    client_id: client_id,
    client_secret: client_secret,
    email: process.env.TESLA_EMAIL,
    password: process.env.TESLA_PASS
  })

  const req = http.request({
    hostname: 'owner-api.teslamotors.com',
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body)
    }
  }, res => {
    let response = ''
    res.on('data', data => response += data)
    res.on('end', () => callback(JSON.parse(response)))
  })

  req.write(body)
  req.end()
}

exports.get_vehicle = function(callback) {
  teslaGet('/vehicles', function(data) {
    callback(data['response'])
  })
}

function stateGet(endpoint, callback) {
  teslaGet('/vehicles/' + vehicle_id + '/data_request/' + endpoint, data => callback(data['response']))
}

exports.charge_state  = function(callback) { stateGet('charge_state',  callback) }
exports.climate_state = function(callback) { stateGet('climate_state', callback) }
exports.drive_state   = function(callback) { stateGet('drive_state',   callback) }
exports.vehicle_state = function(callback) { stateGet('vehicle_state', callback) }

function commandPost(endpoint, callback, body) {
  teslaPost('/vehicles/' + vehicle_id + '/command/' + endpoint, callback, body)
}

exports.commandPost = commandPost

exports.charge_port_door_open = function(callback) { commandPost('charge_port_door_open', callback) }
exports.charge_start          = function(callback) { commandPost('charge_start', callback) }
exports.charge_stop           = function(callback) { commandPost('charge_stop', callback) }

exports.honk_horn    = function(callback) { commandPost('honk_horn', callback) }
exports.flash_lights = function(callback) { commandPost('flash_lights', callback) }

exports.door_unlock = function(callback) { commandPost('door_unlock', callback) }
exports.door_lock   = function(callback) { commandPost('door_lock', callback) }

exports.auto_conditioning_start = function(callback) { commandPost('auto_conditioning_start', callback) }
exports.auto_conditioning_stop  = function(callback) { commandPost('auto_conditioning_stop', callback) }

exports.remote_start_drive  = function(callback) { commandPost('remote_start_drive', callback, { password: process.env.TESLA_PASS }) }
