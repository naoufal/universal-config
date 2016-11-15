var assert = require('chai').assert;
var mockery = require('mockery');
var config;
var CLIENT_VAR = require('./stubs/config/client');
var SERVER_VAR = require('./stubs/config/server');

describe('Server', function() {
  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    // Stub config files
    mockery.registerSubstitute(
      '../../../config/server',
      '../test/stubs/config/server'
    );
    mockery.registerSubstitute(
      '../../../config/client',
      '../test/stubs/config/client'
    );
    mockery.registerSubstitute(
      '../../../config/dev',
      '../test/stubs/config/dev'
    );

    config = require('../lib/index');
  });

  after(function() {
    mockery.disable();
  });

  describe('config.get', function() {
    // Client values
    it('should get client value', function() {
      assert.strictEqual(config.get('CLIENT'), CLIENT_VAR.CLIENT);
    });

    it('should get an environment variable client value', function() {
      assert.strictEqual(config.get('NODE_ENV'), CLIENT_VAR.NODE_ENV);
    });

    it('should get a nested client value', function() {
      assert.strictEqual(
        config.get('NESTED_CLIENT:VALUE'),
        CLIENT_VAR.NESTED_CLIENT.VALUE
      );
    });

    // Server values
    it('should get a server value', function() {
      assert.strictEqual(config.get('SERVER'), SERVER_VAR.SERVER);
    });

    it('should get an environment variable server value', function() {
      assert.strictEqual(config.get('LANG'), SERVER_VAR.LANG);
    });

    it('should get a nested server value', function() {
      assert.strictEqual(
        config.get('NESTED_SERVER:VALUE'),
        SERVER_VAR.NESTED_SERVER.VALUE
      );
    });

    // Dev values
     it('should get a dev value', function() {
      assert.strictEqual(
        config.get('DEV'),
        true
      );
    });

    // Prod values
     it('should not get the dev value', function() {
      assert.isUndefined(config.get('PROD'));
    });

    // Undefined values
    it('should return `undefined` for variables that are not defined', function() {
      assert.isUndefined(config.get('FOO'));
    });

    it('should return `undefined` when getting an undefined key on a nested variable', function() {
      assert.isUndefined(config.get('NESTED:FOO'));
    });

    it('should return `undefined` when getting a nested key on an undefined variable', function() {
      assert.isUndefined(config.get('FOO:BAR'));
    });
  });

  require('./shared/set');
  require('./shared/has');
});
