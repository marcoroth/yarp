import { LibRubyParser } from "./librubyparser.js"

import { PrismBuffer } from "./prism_buffer.js"
import { PrismString } from "./prism_string.js"

import { Serialize } from "./serialize.js"
import { Source } from "./source.js"

export class Prism {
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

  static lex(code, filepath = null) {
    return PrismBuffer.with(buffer => {
      const metadata = filepath
        ? Buffer.concat([Buffer.alloc(filepath.length), Buffer.from(filepath, 'utf8'), Buffer.alloc(0)]).toString('binary')
        : null

      LibRubyParser.pm_lex_serialize(
        Buffer.from(code),
        code.length,
        metadata,
        buffer.pointer
      )

      const source = new Source(code)
      const result = buffer.read()

      return Serialize.loadTokens(source, result)
    })
  }

  static lexFile(filepath) {
    return PrismString.with(filepath, string => {
      return this.lex(string.read(), filepath)
    })
  }
}
