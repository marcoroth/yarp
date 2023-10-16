import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test.skip("dump", () => {
    const code = `puts "Hello World"`
    const result = Prism.dump(code)

    const buffer = Buffer.from(result);
    const codepoints = Array.from(buffer);

    expect(result.length).toEqual(73)
    expect(buffer.length).toEqual(73)

    // | # bytes        | field                                                                                                                 |
    // |----------------|-----------------------------------------------------------------------------------------------------------------------|
    // | `5`            | "PRISM"                                                                                                               |
    // | `1`            | major version number                                                                                                  |
    // | `1`            | minor version number                                                                                                  |
    // | `1`            | patch version number                                                                                                  |
    // | `1`            | 1 indicates only semantics fields were serialized, 0 indicates all fields were serialized (including location fields) |
    // | string         | the encoding name                                                                                                     |
    // | varint         | number of comments                                                                                                    |
    // | comment*       | comments                                                                                                              |
    // | varint         | number of magic comments                                                                                              |
    // | magic comment* | magic comments                                                                                                        |
    // | varint         | number of errors                                                                                                      |
    // | diagnostic*    | errors                                                                                                                |
    // | varint         | number of warnings                                                                                                    |
    // | diagnostic*    | warnings                                                                                                              |
    // | `4`            | content pool offset                                                                                                   |
    // | varint         | content pool size                                                                                                     |

    expect(codepoints).toEqual(
      [
        80, 82, 73, 83, 77, // PRISM
        0, 14, 0, // VERSION
        0, // semantics fields
        5, // ?
        117, 116, 102, 45, 56, // utf-8
        0,
        0,
        0,
        0,
        64,
        0,
        0,
        0,
        1,
        111,
        0,
        18,
        0,
        129,
        0,
        18,
        1,
        19,
        0,
        18,
        0,
        0,
        1,
        0,
        4,
        0,
        5,
        5,
        13,
        1,
        131,
        5,
        13,
        0,
        1,
        5,
        1,
        6,
        11,
        1,
        17,
        1,
        1,
        6,
        11,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        4,
        0, 0, 0, 0
      ]
    )
  })
})
