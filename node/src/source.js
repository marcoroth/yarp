export class Source {
  constructor(source) {
    this.source = source;
    this.offsets = this.#computeOffsets(source);
  }

  slice(offset, length) {
    return this.source.slice(offset, offset + length);
  }

  line(value) {
    if (value < 0) return 0

    const offset = this.offsets.findIndex(offset => offset > value)

    return offset > 0 ? offset : this.offsets.length
  }

  lineOffset(value) {
    return this.offsets[this.line(value) - 1];
  }

  column(value) {
    return value - this.offsets[this.line(value) - 1];
  }

  #computeOffsets(code) {
    const offsets = [0];

    for (let i = 0; i < code.length; i++) {
      if (code[i] === '\n') {
        offsets.push(i + 1);
      }
    }

    return offsets;
  }
}

export class Location {
  constructor(source, startOffset, length) {
    this.source = source;
    this.startOffset = startOffset;
    this.length = length;
    this.comments = [];
  }

  copy(options = {}) {
    return new Location(
      options.source || this.source,
      options.startOffset || this.startOffset,
      options.length || this.length
    );
  }

  inspect() {
    return `#<Prism::Location @start_offset=${this.startOffset} @length=${this.length} start_line=${this.startLine}>`;
  }

  slice() {
    return this.source.slice(this.startOffset, this.startOffset + this.length);
  }

  get endOffset() {
    return this.startOffset + this.length;
  }

  get startLine() {
    return this.source.line(this.startOffset);
  }

  startLineSlice() {
    const offset = this.source.lineOffset(this.startOffset);
    return this.source.slice(offset, this.startOffset - offset);
  }

  get endLine() {
    return this.source.line(this.endOffset - 1);
  }

  get startColumn() {
    return this.source.column(this.startOffset);
  }

  get endColumn() {
    return this.source.column(this.endOffset);
  }

  deconstructKeys(keys) {
    return {
      startOffset: this.startOffset,
      endOffset: this.endOffset,
    };
  }

  prettyPrint() {
    // TODO: implement
  }

  equals(other) {
    return other instanceof Location &&
      other.startOffset === this.startOffset &&
      other.endOffset === this.endOffset;
  }

  join(other) {
    if (this.source !== other.source) {
      throw new Error('Incompatible sources');
    }
    if (this.startOffset > other.startOffset) {
      throw new Error('Incompatible locations');
    }
    return new Location(this.source, this.startOffset, other.endOffset - this.startOffset);
  }

  static get null() {
    return new Location(null, 0, 0);
  }
}

export class Comment {
  static TYPES = {
    0: 'Inline',
    1: 'Block',
  };

  constructor(type, location) {
    this.type = type;
    this.location = location;
  }

  deconstructKeys(keys) {
    return {
      type: this.type,
      location: this.location
    };
  }

  trailing() {
    return this.type === 'inline' && !this.location.startLineSlice.trim();
  }

  inspect() {
    return `#<Prism::Comment @type=${JSON.stringify(this.type)} @location=${this.location.inspect}>`;
  }
}

export class MagicComment {
  constructor(keyLoc, valueLoc) {
    this.keyLoc = keyLoc;
    this.valueLoc = valueLoc;
  }

  get key() {
    return this.keyLoc.slice();
  }

  get value() {
    return this.valueLoc.slice();
  }

  deconstructKeys(keys) {
    return {
      keyLoc: this.keyLoc,
      valueLoc: this.valueLoc
    };
  }

  inspect() {
    return `#<Prism::MagicComment @key=${JSON.stringify(this.key)} @value=${JSON.stringify(this.value)}>`;
  }
}

export class ParseError {
  constructor(message, location) {
    this.message = message;
    this.location = location;
  }

  deconstructKeys(keys) {
    return {
      message: this.message,
      location: this.location
    };
  }

  inspect() {
    return `#<Prism::ParseError @message=${JSON.stringify(this.message)} @location=${this.location.inspect}>`;
  }
}

export class ParseWarning {
  constructor(message, location) {
    this.message = message;
    this.location = location;
  }

  deconstructKeys(keys) {
    return {
      message: this.message,
      location: this.location
    };
  }

  inspect() {
    return `#<Prism::ParseWarning @message=${JSON.stringify(this.message)} @location=${this.location.inspect}>`;
  }
}

export class ParseResult {
  constructor(value, comments, magicComments, errors, warnings, source) {
    this.value = value;
    this.comments = comments;
    this.magicComments = magicComments;
    this.errors = errors;
    this.warnings = warnings;
    this.source = source;
  }

  deconstructKeys(keys) {
    return {
      value: this.value,
      comments: this.comments,
      magicComments: this.magicComments,
      errors: this.errors,
      warnings: this.warnings,
    };
  }

  success() {
    return this.errors.length === 0;
  }

  failure() {
    return !this.success();
  }
}

export class Token {
  constructor(type, value, location) {
    this.type = type;
    this.value = value;
    this.location = location;
  }

  deconstructKeys(keys) {
    return {
      type: this.type,
      value: this.value,
      location: this.location
    };
  }

  prettyPrint() {
    // TODO: implement
  }

  equals(other) {
    return other instanceof Token &&
      other.type === this.type &&
      other.value === this.value;
  }
}
