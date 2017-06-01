const Command = require('./command')

module.exports = Mp4Hls

/**
 * @constructor
 * The Mp4Dump Constructor
 *
 **/
function Mp4Hls(os, process, options = {}) {
  let instance = this
  instance.args = []

  if (!(instance instanceof Mp4Hls)) {
    const obj = Object.create(Mp4Hls.prototype)
    return Mp4Hls.apply(obj, arguments)
  }

  Object.assign(options, {
    win32ext: 'exe'
  })
  Object.assign(instance, Command(os, process, Mp4Hls, options))

  instance.setSingleFile = function(singleFile) {
    if (singleFile) {
      instance.args.push('--output-single-file')
    }
  }

  instance.input = function(input) {
    if (Array.isArray(input)) {
      input.map(i => instance.args.push(i))
    } else {
      instance.args.push(input)
    }
  }

  instance.encryptionMode = function(mode) {
    instance.args.push(`--encryption-mode=${mode}`)
  }

  instance.encryptionKey = function(key) {
    instance.args.push(`--encryption-key=${key}`)
  }

  instance.playlistName = function(name) {
    instance.args.push(`--master-playlist-name=${name}`)
  }

  instance.hlsVersion = function(version) {
    instance.args.push(`--hls-version=${version}`)
  }

  instance.outputDir = function(dir) {
    instance.args.push(`--output-dir=${dir}`)
  }

  return Object.freeze(instance)
}
