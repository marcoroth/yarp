import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test.skip("lex", () => {
    const code = `def hello; puts "hello"; end`
    const result = Prism.lex(code)

    expect(result.value.length).toEqual(2)
    expect(result.comments.length).toEqual(0)
    expect(result.magicComments.length).toEqual(0)
    expect(result.errors.length).toEqual(0)
    expect(result.warnings.length).toEqual(0)

    expect(result.source.source).toEqual(code)
    expect(result.source.offsets).toEqual([0])

    const value = result.value[0][0]
    const location = value.location
    const source = location.source

    expect(value).toBeDefined()
    expect(location).toBeDefined()
    expect(source).toBeDefined()

    expect(value.type).toEqual("KEYWORD_DEF")

    expect(location.startOffset).toEqual(0)
    expect(location.length).toEqual(3)
    expect(location.comments).toEqual([])

    expect(source.source).toEqual(code)
  })
})
