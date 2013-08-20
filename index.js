var StringDecoder = require('string_decoder').StringDecoder

module.exports = function consume(src, encoding, cb) {
  if (typeof encoding == 'function') {
    cb = encoding
    encoding = null
  }

  var binary = !encoding
    , push
    , end

  if (binary) {
    var chunks = []
    var length = 0

    push = function(chunk) {
      length += chunk.length
      chunks.push(chunk)
    }

    end = function() {
      return Buffer.concat(chunks, length)
    }
  } else {
    var decoder = new StringDecoder(encoding)
    var out = ''

    push = function(chunk) {
      out += decoder.write(chunk)
    }

    end = function() {
      return out + decoder.end()
    }
  }

  ;(function read() {
    var sync = true
    do {
      var done = false
      src.read(function(err, chunk) {
        if (err) return cb(err)
        if (!chunk) return cb(null, end())
        done = true
        push(chunk)
        if (!sync) read()
      })
      sync = done
    } while(sync)
  })()
}
