import { describe, test, expect } from "vitest"
import { PrismBuffer } from "../src"

describe("PrismBuffer", () => {
  test("with", () => {
    PrismBuffer.with(buffer => {
      expect(buffer.length()).toEqual(0)
      expect(buffer.value().toString()).toEqual("")
      expect(buffer.read()).toEqual("")
      expect(buffer.pointer).toBeTruthy()
    })
  })
})
