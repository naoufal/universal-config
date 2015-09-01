var assert = require('chai').assert;
var config = require('../../lib/index');
var CLIENT_VAR = require('../stubs/config/client');

describe('config.has', function() {
  it('should return `true` if value is in config', function() {
    assert.isTrue(config.has('CLIENT'));
  });

  it('should return `false` if value is not in config', function() {
    assert.isFalse(config.has('FOO'));
  });
});
