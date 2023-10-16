import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test("parseLexFile", () => {
    const result = Prism.parseLexFile('/Users/marcoroth/Development/yarp/node/test.rb')

    expect(result).toBeDefined()
  })
})
