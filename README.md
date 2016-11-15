Universal Config
==================
Configuration for your [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) apps.

[![NPM Version](https://img.shields.io/npm/v/universal-config.svg?style=flat-square)](https://www.npmjs.org/package/universal-config)[![npm downloads](https://img.shields.io/npm/dm/universal-config.svg?style=flat-square)](https://www.npmjs.com/package/universal-config)[![Travis](https://img.shields.io/travis/naoufal/universal-config.svg?style=flat-square)](https://travis-ci.org/naoufal/universal-config)[![Climate](https://img.shields.io/codeclimate/github/naoufal/universal-config.svg?style=flat-square)](https://codeclimate.com/github/naoufal/universal-config)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/universal-config.svg)](https://saucelabs.com/u/universal-config)

## Install

```shell
npm i --save universal-config
```

## Usage
### Setup
Create a config folder at the root of your project.
```
mkdir config
```

Within the `config` folder, create a `server.js` file that exports an Object containing your private config.

__`config/server.js`__

```js
export default {
  AWS: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY
  },
  MAILCHIMP: {
    username: process.env.MAILCHIMP_USERNAME,
    password: process.env.MAILCHIMP_PASSWORD
  }
}
```
Once that's done, create a `client.js` file that does the same but for your publicly accessible config.

__`config/client.js`__

```js
export default {
  API_URL: process.env.API_URL || "//api.herokuapp.com",
  FACEBOOK_APP_ID: 123456789012345,
  NODE_ENV: process.env.NODE_ENV || "development",
  SENTRY_CLIENT_KEY: process.env.SENTRY_CLIENT_KEY || "a1b2c3d4e5f6g7h8i9j0"
}
```

### Server side
Using Universal Config on the server is as simple as importing the module.

```js
// Server JavaScript

import config from "universal-config";

config.get("AWS:accessKey");  // Outputs your AWS_SECRET_KEY
```

### Client side
Whether you're on team Browserify or Webpack, Universal Config has you covered!

#### Browserify
See the [Browserify example](https://github.com/naoufal/universal-config/tree/master/examples/browserify) for more info.

#### Webpack
See the [Webpack example](https://github.com/naoufal/universal-config/tree/master/examples/webpack) for more info.

---

Once you're setup, you'll be able to retrive your client config.  It's worth noting that your server config won't be accessible on the client.

```js
// Client JavaScript

import config from "universal-config";

config.get("AWS:accessKey");   // undefined
config.get("FACEBOOK_APP_ID"); // Outputs your FACEBOOK_APP_ID
```

### Local Development
In development, you may want to environment variables in a file instead of your `.bash_profile`.

If you want to use this approach, you can override any server or client variable by creating a `dev.js` file in your `config` directory.  You'll want to add this file to your `.gitignore`.

For testing production locally, you may also specify a `prod.js` in the config directory. It will be imported when NODE_ENV is set to 'production'.

__NOTE:__ _The variables in these files will be exposed both on the client and the server, but this shouldn't be a problem since you should only be using this locally._

## Methods

### get(key)
Retrieves a key from your config.

__Arguments__
- `key` - The variable you want to retrieve from your configuration.

__Examples__
```js
import config from "universal-config";

const FACEBOOK_APP_ID = config.get("FACEBOOK_APP_ID");
```
---

### set(key, value)
Overwrites a variable in your configuration or sets a new one if the variable doesn't exist.

__Arguments__
- `key` - The name of the variable you want to overwrite or sets it on your config instance.
- `value` - The value you want to store.

__Examples__
```js
import config from "universal-config";

config.set("FOO", "bar");
console.log(config.get("FOO")); // bar
```

## License
Copyright (c) 2015, [Naoufal Kadhom](http://naoufal.com)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
