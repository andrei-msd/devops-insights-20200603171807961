
const requireHelper = require('./requireHelper');
const apiv2 = requireHelper.require('routes/apiv2');
const assert = require('chai').assert;
const sinon = require('sinon');

// create mock request and response
let reqMock = {};

let resMock = {};
resMock.status = function() {
  return this;
};
resMock.send = function() {
  return this;
};
resMock.end = function() {
  return this;
};
sinon.spy(resMock, "status");
sinon.spy(resMock, "send");


describe('Ver 2 Get Weather', function() {

  it('with without lan', function() {
    reqMock = {
      query: {

      }
    };

    apiv2.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
  });

  it('with valid lan and error from request call', function() {
    reqMock = {
      query: {
        lan: "auckland"
      }
    };

    const request = function( obj, callback ){
      callback("error", null, null);
    };

    apiv2.__set__("request", request);

    apiv2.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
  });

  it('with incomplete lan', function() {
    reqMock = {
      query: {
        lan: ""
      }
    };

    const request = function( obj, callback ){
      callback(null, null, {});
    };

    apiv2.__set__("request", request);

    apiv2.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
  });

  it('with valid lan', function() {
    reqMock = {
      query: {
        lan: "123"
      }
    };

    const body = {
      cod: 200,
      name: 'auckland',
      weather: [
        {
          main: 'hot'
        }
      ],
      main: {
        temp: 25
      }
    };

    const request = function( obj, callback ){
      callback(null, null, body);
    };

    apiv2.__set__("request", request);

    apiv2.getWeather(reqMock, resMock);

    assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
    assert(resMock.send.lastCall.args[0].lan === 'auckland', 'Unexpected response:' + resMock.send.lastCall.args[0].lan);
    assert(resMock.send.lastCall.args[0].weather === 'Conditions are hot and temperature is 25 C', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
  });
});
