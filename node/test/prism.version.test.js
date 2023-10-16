import { describe, test, expect } from "vitest"
import { Prism } from "../src"

describe("Prism", () => {
  test("version", () => {
    expect(Prism.version).toEqual("0.14.0")
  })
})
