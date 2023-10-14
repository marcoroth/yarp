import { LibRubyParser } from "./librubyparser.js"

import { PrismBuffer } from "./prism_buffer.js"
import { PrismString } from "./prism_string.js"

class Prism {
  static get version() {
    return LibRubyParser.pm_version()
  }

  static dumpInternal(source, sourceSize, filepath) {
    return PrismBuffer.with(buffer => {
      const metadata = filepath
        ? Buffer.concat([Buffer.alloc(filepath.length), Buffer.from(filepath, 'utf8'), Buffer.alloc(0)]).toString('binary')
        : null

      LibRubyParser.pm_parse_serialize(
        Buffer.from(source),
        sourceSize,
        buffer.pointer,
        metadata
      )

      return buffer.read()
    })
  }

  static dump(code, filepath = null) {
    return this.dumpInternal(code, code.length, filepath)
  }

  static dumpFile(filepath) {
    return PrismString.with(filepath, string => {
      return this.dumpInternal(string.read(), string.length(), filepath)
    })
  }
}

console.log(Prism.version)

console.log(Prism.dump('puts "Hello World"'))
console.log(Prism.dumpFile('./test.rb'))
