simple-binary-consume
=====================

Consume [simple](https://github.com/eldargab/stream-simple) binary stream.

##Examples

```javascript
var consume = require('simple-binary-consume')

consume(src, 'utf8', function(err, text) {
  console.log(text)
})

consume(src, function(err, buf) {
  buf.should.be.instanceOf(Buffer)
})
```
