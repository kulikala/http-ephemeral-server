const express = require('express')
const router = express.Router()

/* GET home page. */
router.all('*', (req, res, next) => {
  res.render('index', {
    now: new Date().toLocaleString(),
    tables: [
      {
        title: 'Request',
        data: buildObjectByKeys([
          // Express request
          'body',
          'hostname',
          'ip',
          'ips',
          'method',
          'protocol',
          'secure',
          'xhr',

          // http.IncomingMessage
          'httpVersion',
          'url'
        ], req)
      },
      {
        title: 'HTTP Request Headers',
        data: getRawHeaders(req)
      },
      {
        title: 'Incoming Cookies',
        data: sortObjectKey(req.cookies)
      },
      {
        title: 'Server',
        data: sortObjectKey(Object.assign(
          {
            // This app
            port: req.app.get('port')
          },

          // process
          buildObjectByKeys([
            'pid',
            'platform',
            'release',
            'version'
          ], process)
        ))
      },
      {
        title: 'Env',
        data: getEnv()
      }
    ]
  })
})

function sortObjectKey (obj) {
  const keys = Object.keys(obj)

  return buildObjectByKeys(keys, obj)
}

function buildObjectByKeys (keys, obj) {
  keys.sort()

  return keys.reduce((prev, s) => {
    switch (typeof obj[s]) {
      case 'object':
        if (obj[s] && Object.keys(obj[s]).length === 0) {
          prev[s] = ''
        } else if (obj[s]) {
          prev[s] = JSON.stringify(obj[s], null, 2)
        } else {
          prev[s] = String(obj[s])
        }
        break

      default:
        prev[s] = String(obj[s])
    }

    return prev
  }, {})
}

function getRawHeaders (req) {
  const h = req.rawHeaders
  const ret = {}
  let i = 0

  while (i < h.length) {
    ret[h[i]] = h[i + 1]
    i += 2
  }

  return sortObjectKey(ret)
}

function getEnv () {
  const keys = Object.keys(process.env).filter(s => !/^npm_/.test(s))

  return buildObjectByKeys(keys, process.env)
}

module.exports = router
