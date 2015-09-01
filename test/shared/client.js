var assert = require('chai').assert;
var config = require('../../lib/index');
var CLIENT_VAR = require('../stubs/config/client');

describe('config.get', function() {
  it('should get client value', function() {
    assert.strictEqual(config.get('CLIENT'), CLIENT_VAR.CLIENT);
  });

  it('should get an environment variables client value', function() {
    assert.strictEqual(config.get('NODE_ENV'), CLIENT_VAR.NODE_ENV);
  });

  it('should get a nested client value', function() {
    assert.strictEqual(config.get('NESTED_CLIENT:VALUE'), CLIENT_VAR.NESTED_CLIENT.VALUE);
  });

  it('should return `undefined` for variables that are not defined', function() {
    assert.isUndefined(config.get('FOO'));
  });

  it('should return `undefined` when getting an undefined key on a nested variable', function() {
    assert.isUndefined(config.get('NESTED:FOO'));
  });

  it('should return `undefined` when getting a nested key on an undefined variable', function() {
    assert.isUndefined(config.get('FOO:BAR'));
  });

  it('should return `undefined` when getting server variables', function() {
    assert.isUndefined(config.get('SERVER'));
  });
});

require('./set');
require('./has');
