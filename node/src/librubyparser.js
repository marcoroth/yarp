import ffi from 'ffi-napi'

const LibRubyParser = ffi.Library('../build/librubyparser.dylib', {
  'pm_version': ['string', []],

  'pm_buffer_sizeof': ['size_t', []],
  'pm_buffer_init': ['bool', ['pointer']],
  'pm_buffer_value': ['pointer', ['pointer']],
  'pm_buffer_length': ['size_t', ['pointer']],
  'pm_buffer_free': ['void', ['pointer']],

  'pm_string_sizeof': ['size_t', []],
  'pm_string_source': ['pointer', ['pointer']],
  'pm_string_length': ['size_t', ['pointer']],
  'pm_string_mapped_init': ['bool', ['pointer', 'string']],
  'pm_string_free': ['void', ['pointer']],

  'pm_parse_serialize': ['void', ['pointer', 'size_t', 'pointer', 'string']],

  'pm_lex_serialize': ['void', ['pointer', 'size_t', 'string', 'pointer']],

  'pm_parse_lex_serialize': ['void', ['pointer', 'size_t', 'pointer', 'string']],
})

export {
  LibRubyParser
}
