var assert = require('chai').assert;
var config = require('../../lib/index');
var CLIENT_VAR = require('../stubs/config/client');

describe('config.set', function() {
  it('should set a new value successfully', function() {
    var value = 'new value';
    config.set('NEW_VALUE', value);

    assert.strictEqual(config.get('NEW_VALUE'), value);
  });

  it('should overwrite an existing value succesfully', function() {
    var value = 'new value';
    config.set('CLIENT', value);

    assert.strictEqual(config.get('CLIENT'), value);
  });

  it('should set a new nested value successfully', function() {
    var value = 'new value';
    config.set('NEW:NESTED_VALUE', value);

    assert.isObject(config.get('NEW'));
    assert.strictEqual(config.get('NEW:NESTED_VALUE'), value);
  });

  it('should overwrite an existing nested value successfully', function() {
    var value = 'new value';
    config.set('NESTED_CLIENT:VALUE', value);

    assert.strictEqual(config.get('NESTED_CLIENT:VALUE'), value);
  });
});
