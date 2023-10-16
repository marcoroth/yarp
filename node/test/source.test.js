import { describe, test, expect } from "vitest"
import { Source } from "../src"

describe("Source", () => {
  const code = `
    class HelloWorld
      def initialize(name)
        puts "Hello #{name}"
      end
    end
  `

  const source = new Source(code)

  test("source", () => {
    expect(source.source).toEqual(code)
  })

  test("offsets", () => {
    expect(source.offsets).toEqual([0, 1, 22, 49, 78, 88, 96])
  })

  test("slice()", () => {
    expect(source.slice( 0,  1 -  0 - 1)).toEqual("")
    expect(source.slice( 1, 22 -  1 - 1)).toEqual("    class HelloWorld")
    expect(source.slice(22, 49 - 22 - 1)).toEqual("      def initialize(name)")
    expect(source.slice(49, 78 - 49 - 1)).toEqual(`        puts "Hello #{name}"`)
    expect(source.slice(78, 88 - 78 - 1)).toEqual("      end")
    expect(source.slice(88, 96 - 88 - 1)).toEqual("    end")
  })

  test("line()", () => {
    expect(source.line(-1)).toEqual(0)
    expect(source.line(0)).toEqual(1)

    expect(source.line(1)).toEqual(2)
    expect(source.line(2)).toEqual(2)
    expect(source.line(21)).toEqual(2)

    expect(source.line(22)).toEqual(3)
    expect(source.line(23)).toEqual(3)
    expect(source.line(48)).toEqual(3)

    expect(source.line(49)).toEqual(4)
    expect(source.line(50)).toEqual(4)
    expect(source.line(77)).toEqual(4)

    expect(source.line(78)).toEqual(5)
    expect(source.line(79)).toEqual(5)
    expect(source.line(87)).toEqual(5)

    expect(source.line(88)).toEqual(6)
    expect(source.line(89)).toEqual(6)
    expect(source.line(95)).toEqual(6)

    expect(source.line(96)).toEqual(7)
    expect(source.line(97)).toEqual(7)
    expect(source.line(98)).toEqual(7)
  })

  test("lineOffset()", () => {
    expect(source.lineOffset(-1)).toEqual(undefined)
    expect(source.lineOffset(0)).toEqual(0)

    expect(source.lineOffset(1)).toEqual(1)
    expect(source.lineOffset(2)).toEqual(1)
    expect(source.lineOffset(21)).toEqual(1)

    expect(source.lineOffset(22)).toEqual(22)
    expect(source.lineOffset(23)).toEqual(22)
    expect(source.lineOffset(48)).toEqual(22)

    expect(source.lineOffset(49)).toEqual(49)
    expect(source.lineOffset(50)).toEqual(49)
    expect(source.lineOffset(77)).toEqual(49)

    expect(source.lineOffset(78)).toEqual(78)
    expect(source.lineOffset(79)).toEqual(78)
    expect(source.lineOffset(87)).toEqual(78)

    expect(source.lineOffset(88)).toEqual(88)
    expect(source.lineOffset(89)).toEqual(88)
    expect(source.lineOffset(95)).toEqual(88)

    expect(source.lineOffset(96)).toEqual(96)
    expect(source.lineOffset(97)).toEqual(96)
    expect(source.lineOffset(98)).toEqual(96)
  })

  test("column()", () => {
    expect(source.column(-1)).toEqual(NaN)
    expect(source.column(0)).toEqual(0)

    expect(source.column(1)).toEqual(0)
    expect(source.column(2)).toEqual(1)
    expect(source.column(21)).toEqual(20)

    expect(source.column(22)).toEqual(0)
    expect(source.column(23)).toEqual(1)
    expect(source.column(48)).toEqual(26)

    expect(source.column(49)).toEqual(0)
    expect(source.column(50)).toEqual(1)
    expect(source.column(77)).toEqual(28)

    expect(source.column(78)).toEqual(0)
    expect(source.column(79)).toEqual(1)
    expect(source.column(87)).toEqual(9)

    expect(source.column(88)).toEqual(0)
    expect(source.column(89)).toEqual(1)
    expect(source.column(95)).toEqual(7)

    expect(source.column(96)).toEqual(0)
    expect(source.column(97)).toEqual(1)
    expect(source.column(98)).toEqual(2)
  })
})
