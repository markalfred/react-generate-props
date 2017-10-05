## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
  </summary>

* Generators are now deterministic by default. Previously, snapshot tests might break if `oneOf` or `oneOfType` were used.
* `opts` can now be passed as the second arg to `generateProps` to generate or omit required or optional types. Default: `{ required: true, optional: false }`
* Generators can be overridden via the `opts` argument. Syntax: `generateProps(Component, { generators: { bool: () => false } })`
* `string`, `any`, and `node` generators now return exactly those strings. (`'string'`, `'any'`, or `'node'`)
* React 16 and the `prop-types` package are now supported.

</details>

## 0.3.0 (October 5, 2017)
## 0.2.0 (October 18, 2016)
## 0.1.0 (October 18, 2016)
## 0.0.1 (July 14, 2016)
