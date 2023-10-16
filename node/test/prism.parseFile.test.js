import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test.skip("parseFile", () => {
    const result = Prism.parseFile("/Users/marcoroth/Development/yarp/node/test.rb")

    expect(result).toBeDefined()
  })
})
