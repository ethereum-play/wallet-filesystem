const Dat = require('dat-js')

const discovery = require('discovery-swarm-web')
const hypertrie = require('hypertrie')
const raw = require('random-access-web')

const dat = new Dat({ discovery: 'http://localhost:3472' })

// -----------------------------------------------------------

const RAW = require('random-access-web')
const storage = RAW('hypertrie')
const db = hypertrie(storage, { valueEncoding: 'json' })

db.put('hello', 'world', function () {
  db.get('hello', console.log)
})

// -----------------------------------------------------------

module.exports = filesystem

function filesystem (rootpath = '/', mount_url) {
  if (!mount_url) throw new Error('no mount url provided')
  const archive = dat.get(mount_url, { persist: true })
  window.archive = archive
  if (!rootpath || typeof rootpath !== 'string') rootpath = '/'
  if (rootpath[rootpath.length - 1] !== '/') rootpath = `${rootpath}/`
  if (rootpath.length > 1 && rootpath[0] !== '/') rootpath = `/${rootpath}`
  return {
    async get (path) {
      if (!path || typeof path !== 'string') path = '/'
      if (path[path.length - 1] !== '/') path = `${path}/`
      if (path.length > 1 && path[0] !== '/') path = `/${path}`
      return new Promise((resolve, reject) => {
        archive.readdir(path, (err, data) => {
          if (err) return reject(err)
          // archive.readFile('hello.txt', function (err, data) {
          //   console.log(data)
          // })
          // var readStream = archive.createReadStream('hello.txt')
          // readStream.on('data', console.log)
          const results = []
          ;(function collect (i) {
            const name = data[i]
            archive.stat(path + name, (err, stat) => {
              if (stat.isDirectory()) results.push({ type: 'folder', name })
              else results.push({ type: 'file', name })
              if (results.length === data.length) return resolve(results)
              else collect(++i)
            })
          })(0)
        })
      })
    }
  }
}