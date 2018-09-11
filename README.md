# http-ephemeral-server
[![Build Status](https://travis-ci.org/kulikala/http-ephemeral-server.svg?branch=master)](https://travis-ci.org/kulikala/http-ephemeral-server)
[![NPM version](https://img.shields.io/npm/v/http-ephemeral-server.svg)](https://www.npmjs.com/package/http-ephemeral-server)
[![dependencies status](https://img.shields.io/david/kulikala/http-ephemeral-server.svg)](https://david-dm.org/kulikala/http-ephemeral-server)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Ephemeral Node.js HTTP application for investigation.

`http-ephemeral-server` is a simple, single-featured HTTP server.
It shows details of current request, cookies, and server environments available via Node.js process.

## Installing globally

Installation via `npm`:

```shell
$ npm install http-ephemeral-server -g
```

This will install `http-ephemeral-server` globally so that it may be run from the command line.

### Usage

```shell
$ http-ephemeral-server
```

or a short-hand command:

```shell
$ hes
```

**Now you can visit http://localhost:3000**

Listening port by default is `3000`.

You can change the listening port by specifying environment variable `PORT`:

```shell
$ PORT=8000 http-ephemeral-server
```

**Now your url has changed to http://localhost:8000**

## Docker support

`http-ephemeral-server` is a suitable solution when you need a simple web server running on Docker.

### Usage

Clone this repository localy, then:

```shell
$ git clone https://github.com/kulikala/http-ephemeral-server.git
$ cd http-ephemeral-server
```

Build a Docker image with `docker` command:

```shell
$ docker image build -t http-ephemeral-server:latest .
```

By default, the built image contains `PORT=80` environment variable and exposes port `80` to local Docker network.

You can pass `--build-arg` to change this port number:

```shell
$ docker image build -t http-ephemeral-server:latest --build-arg PORT=3000 .
```

This will build an image with environment variable with `PORT=3000` and `EXPOSE 3000`.

Now you can run the image:

```shell
$ docker container run -d http-ephemeral-server:latest
```

**Open browser and visit http://localhost:3000 to view your container**

You can change exposing port by passing `PORT` environment variable when you run the image:

```shell
$ docker container run -d -p 8000:8000 -e PORT=8000 http-ephemeral-server:latest
```

**Now your url has changed to http://localhost:8000**

If you prefer to use `docker-compose` instead, refer to `docker-compose.yml` in the root directory.

```shell
$ docker-compose build
$ docker-compose start
```

## Using as a dependent package

Installation via `npm`:

```shell
$ npm install http-ephemeral-server --save
```

`require('http-ephemeral-server')` returns an [Express Application](https://expressjs.com/en/4x/api.html#app).

```javascript
const app = require('http-ephemeral-server')

app.listen(3000)
```

**Now your server is listening on 3000**

## Switch to `503 Service Unavailable` mode

Open browser and visit `http://localhost:3000/sys/switch`.

Then, visit `http://localhost:3000` and you'll see `Service Unavailable` in your browser.

You can switch back from this mode by accessing `/sys/switch` again.

This url is modifiable by passing the `ROUTER_PATH_SWITCH` environment variable.

The default value is: `ROUTER_PATH_SWITCH='*/sys/switch'`

## License

MIT
