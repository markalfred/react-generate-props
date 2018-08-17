## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
  </summary>
  
  #18 - Generator can now accept a single type and will generate it.
  ```js
  generate(PropType.bool.isRequired)
  // => true
  ```
  
  #27 - Generator now generates Symbols.
</details>

## 0.4.0 (August 10, 2018)
Breaking Changes:

* #21 - Default generators now produce values that match their `propName`.
```js
generate({ foo: PropType.string, bar: PropTypes.object })
// Old: => { foo: 'string', bar: {} }
// New: => { foo: 'foo', bar: { bar: 'bar' } }
```

* #21 - Generator callbacks now receive `propName` as their first argument, and their definitions' argument as the second.

* #19 - `generateProps.init()` *must* be called prior to components being imported or `generateProps()` being called.

Non-breaking Changes:

* #17 - Fixed: Deeply nested props wouldn't respect opts argument.
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
