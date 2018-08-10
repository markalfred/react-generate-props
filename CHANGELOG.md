## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
  </summary>
  Breaking Changes:

  * Default generators now produce values that match their `propName`.
  ```js
  generate({ foo: PropType.string, bar: PropTypes.object })
  // Old: => { foo: 'string', bar: {} }
  // New: => { foo: 'foo', bar: { bar: 'bar' } }
  ```

  Non-breaking Changes:

  * Generator callbacks now receive the `propName` as an argument.

  * Fixed: Deeply nested props wouldn't respect opts argument.
  ```js
  generate({
    foo: PropType.shape({
      bar: PropType.shape({
        baz: PropType.string
      })
    })
  }, { optional: true })
  // Old: => { foo: {} }
  // New: => { foo: { bar: { baz: 'baz' } } }
  ```
</details>

## 0.3.0 (October 5, 2017)
* Generators are now deterministic by default. Previously, snapshot tests might break if `oneOf` or `oneOfType` were used.
* `opts` can now be passed as the second arg to `generateProps` to generate or omit required or optional types. Default: `{ required: true, optional: false }`
* Generators can be overridden via the `opts` argument. Syntax: `generateProps(Component, { generators: { bool: () => false } })`
* `string`, `any`, and `node` generators now return exactly those strings. (`'string'`, `'any'`, or `'node'`)
* React 16 and the `prop-types` package are now supported.

### A Note On React v15.3 - v16.0
If you are using React v15.3 or higher, you should port your PropTypes to the
new `prop-type` lib. https://github.com/facebook/prop-types

## 0.2.0 (October 18, 2016)
## 0.1.0 (October 18, 2016)
## 0.0.1 (July 14, 2016)
