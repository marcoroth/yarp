export function codepoints(string) {
  return string.split("").map(s => s.codePointAt(0))
}
