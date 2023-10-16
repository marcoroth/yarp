import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test("parseLex", () => {
    const code = `puts "Hello World"`
    const result = Prism.parseLex(code)

    expect(result).toBeDefined()
  })
})
