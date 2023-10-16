import { LibRubyParser } from "./librubyparser.js"

import { PrismBuffer } from "./prism_buffer.js"
import { PrismString } from "./prism_string.js"

import { Serialize, Loader } from "./serialize.js"
import { Source, ParseResult } from "./source.js"

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

  static parse(code, filepath = null) {
    return Serialize.load(code, this.dump(code, filepath))
  }

  static parseFile(filepath) {
    return PrismString.with(filepath, string => {
      return this.parse(string.read(), filepath)
    })
  }

  static parseLex(code, filepath = null) {
    return PrismBuffer.with(buffer => {
      const metadata = filepath
        ? Buffer.concat([Buffer.alloc(filepath.length), Buffer.from(filepath, 'utf8'), Buffer.alloc(0)]).toString('binary')
        : null

      LibRubyParser.pm_parse_lex_serialize(
        Buffer.from(code),
        code.length,
        buffer.pointer,
        metadata
      );

      const serialized = buffer.read();
      const source = new Source(code);
      const loader = new Loader(source, serialized);

      const tokens = loader.loadTokens();
      // const [node, comments, magicComments, errors, warnings] = loader.loadNodes();
      const [node, comments, magicComments, errors, warnings] = [[], [], [], [], []]

      tokens.forEach(([token]) => {
        token.value = token.value.toString(loader.encoding);
      });

      return new ParseResult(
        [node, tokens],
        comments,
        magicComments,
        errors,
        warnings,
        source
      );
    })
  }

  static parseLexFile(filepath) {
    return PrismString.with(filepath, string => {
      return this.parseLex(string.read(), filepath)
    })
  }
}
