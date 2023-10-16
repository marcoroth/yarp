import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test.skip("lex", () => {
    const code = `def hello; puts "hello"; end`
    const result = Prism.lex(code)

    expect(result.value.length).toEqual(1)
    expect(result.comments.length).toEqual(0)
    expect(result.magicComments.length).toEqual(0)
    expect(result.errors.length).toEqual(0)
    expect(result.warnings.length).toEqual(0)

    expect(result.source.source).toEqual(code)
    expect(result.source.offsets).toEqual([0])

    expect(source.source).toEqual(code)
  })
})
