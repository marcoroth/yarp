import { LibRubyParser } from "./librubyparser.js"

export class PrismBuffer {
  static SIZEOF = LibRubyParser.pm_buffer_sizeof()

  constructor(pointer) {
    this.pointer = pointer
  }

  value() {
    return LibRubyParser.pm_buffer_value(this.pointer)
  }

  length() {
    return LibRubyParser.pm_buffer_length(this.pointer)
  }

  read() {
    const valuePointer = this.value();
    const length = this.length();

    const buffer = Buffer.from(
      valuePointer.buffer,
      valuePointer.byteOffset,
      length
    );

    return buffer.toString();
  }

  static with(callback) {
    const pointer = Buffer.alloc(this.SIZEOF);

    try {
      if (!LibRubyParser.pm_buffer_init(pointer)) {
        throw new Error('Failed to initialize pm_buffer');
      }

      const prismBuffer = new PrismBuffer(pointer);

      return callback(prismBuffer);
    } finally {
      LibRubyParser.pm_buffer_free(pointer);
    }
  }
}
