import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test.skip("parse empty string", () => {
    const result = Prism.parse('')

    expect(result.value.statements.body).toEqual([])
  })

  test("parse", () => {
    const code = `puts "Hello World"`
    const result = Prism.parse(code)

    expect(result).toBeDefined()
  })

  test("parse takes filepath", () => {
    const code = "def foo; __FILE__; end"
    const filepath = "filepath.rb"
    const result = Prism.parse(code, filepath)

    expect(result.value).toEqual(filepath)
  })
})
