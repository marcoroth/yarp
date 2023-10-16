import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test.skip("parse", () => {
    const code = `puts "Hello World"`
    const result = Prism.parse(code)

    expect(result).toBeDefined()
  })
})
