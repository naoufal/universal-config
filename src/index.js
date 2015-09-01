class Config {
  constructor() {
    this.setEnvironment();

    let store = {};
    this._server = this.getServerVars();
    this._client = this.getClientVars();

    Object.assign(store, this._client, this._server);
    this._store = store;
  }

  set(key, value) {
    if (key.match(/:/)) {
      var keys = key.split(':');
      var store_key = this._store;

      keys.forEach(function(k, i) {
        if (keys.length === (i + 1)) {
          store_key[k] = value;
        }

        if (store_key[k] === undefined) {
          store_key[k] = {};
        }

        store_key = store_key[k];
      });

    } else {
      this._store[key] = value;
    }
  }

  get(key) {
    // Is the key a nested object
    if (key.match(/:/)) {
      // Transform getter string into object
      var store_key = this.buildNestedKey(key);

      return store_key;
    }

    // Return regular key
    return this._store[key];
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  setEnvironment() {
    if (process.browser) {
      this._env = 'client';
    } else {
      this._env = 'server';
    }
  }

  getServerVars() {
    var serverVars = {};

    if (this._env === 'server') {
      try {
        serverVars = require('../../../config/server');
      } catch(e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Didn't find a server config in \`./config\`.`);
        }
      }
    }

    return serverVars;
  }

  getClientVars() {
    var clientVars;

    try {
      clientVars = require('../../../config/client');
    } catch(e) {
      clientVars = {};

      if (process.env.NODE_ENV === 'development') {
        console.warn(`Didn't find a client config in \`./config\`.`);
      }
    }

    return clientVars;
  }

  // Builds out a nested key to get nested values
  buildNestedKey(nested_key) {
    // Transform getter string into object
    var keys = nested_key.split(':');
    var store_key = this._store;

    keys.forEach(function(k) {
      try {
        store_key = store_key[k];
      } catch(e) {
        return undefined;
      }
    });

    return store_key;
  }
}

let config = new Config();

export default config;
