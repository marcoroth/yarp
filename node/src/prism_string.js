import { LibRubyParser } from "./librubyparser.js"

export class PrismString {
  static SIZEOF = LibRubyParser.pm_string_sizeof()

  constructor(pointer) {
    this.pointer = pointer
  }

  source() {
    return LibRubyParser.pm_string_source(this.pointer)
  }

  length() {
    return LibRubyParser.pm_string_length(this.pointer)
  }

  read() {
    const source = this.source()

    // TODO: check if source.readCString() is right here.
    return source ? source.readCString() : null
  }

  static with(filepath, callback) {
    const pointer = Buffer.alloc(this.SIZEOF)

    try {
      if (!LibRubyParser.pm_string_mapped_init(pointer, filepath)) {
        throw new Error('Failed to initialize pm_string')
      }

      const prismString = new PrismString(pointer)

      return callback(prismString)
    } finally {
      LibRubyParser.pm_string_free(pointer)
      // pointer.free ?
    }
  }
}
