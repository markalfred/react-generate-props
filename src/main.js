const _ = require('lodash')
const React = require('react')
const PropTypes = require('./prop-types')

let options
let initialized = false

const addHiddenProperties = (obj, prop, value) => {
  addHiddenProperty(obj, prop, value)
  addHiddenProperty(obj.isRequired, prop, value)
  return obj
}

const addHiddenProperty = (obj, prop, value) =>
  Object.defineProperty(obj, prop, { enumerable: false, value })

const wrapPropTypes = () => {
  initialized = true
  // Adds a .type key which allows the type to be derived during the
  // evaluation process. This is necessary for complex types which
  // return the result of a generator function, leaving no way to
  // determine which type instantiated it.

  const original = _.cloneDeep(PropTypes)

  _.each(_.keys(GENERATORS), (k) => {
    if (PropTypes[k].isRequired !== undefined) {
      // Simple type. Just extend the object
      PropTypes[k] = addHiddenProperties(PropTypes[k], 'type', k)
    } else {
      // Complex type. Must extend the creator's return value
      PropTypes[k] = (arg) => {
        let res = original[k](arg)
        res = addHiddenProperties(res, 'type', k)
        res = addHiddenProperties(res, 'arg', arg)
        return res
      }
    }
  })
}

const GENERATORS = {
  // Simple types
  array: (propName) => propName ? [propName] : [],
  bool: () => true,
  func: () => () => {},
  number: () => 1,
  object: (propName) => propName ? ({ [propName]: propName }): {},
  string: (propName) => propName || 'string',
  any: (propName) => propName || 'any',
  element: (propName) => React.createElement('div', propName),
  node: (propName) => propName || 'node',

  // Complex types
  arrayOf: (propName, type) => {
    const res = generateOneProp(type, propName, false)
    return res ? [res] : []
  },
  instanceOf: (propName, klass) => new klass(),
  objectOf: (propName, type) => ({ key: generateOneProp(type, propName, false) }),
  oneOf: (propName, values) => _.first(values),
  oneOfType: (propName, types) => forceGenerateOneProp(_.first(types), propName),
  shape: (propName, shape) => generateProps(shape, options)
}

const shouldGenerate = (propType) => {
  return (
    // Generate required props, and this is the required version
    (options.required && !propType.isRequired) ||
    // Generate optional props, and this is the optional version
    (options.optional && !!propType.isRequired)
  )
}

const initError = new Error(
  'generateProps.init() must be called at the beginning of your test suite'
)

const generateOneProp = (propType, propName, wrapInArray = true) => {
  if (propType.type === undefined && initialized === false) {
    throw initError
  }

  const generate = options.generators[propType.type].bind(this, propName)
  const arg = propType.arg
  if (generate) {
    if (shouldGenerate(propType)) {
      if (wrapInArray) {
        return [propName, generate(arg)]
      } else {
        return generate(arg)
      }
    }
  }
}

const forceGenerateOneProp = (propType, propName) => {
  const generate = GENERATORS[propType.type].bind(this, propName)
  const arg = propType.arg
  if (generate) {
    return generate(arg)
  }
}

const generateProps = (arg, opts) => {
  if (initialized === false) {
    throw initError
  }

  options = _.defaults({}, opts, { required: true, optional: false })
  if (opts && opts.generators) {
    options.generators = _.defaults({}, opts.generators, GENERATORS)
  } else {
    options.generators = GENERATORS
  }

  let propTypes

  if (!arg) {
    throw new TypeError('generateProps expected a propType object or a React Component')
  }

  if (arg.type && GENERATORS[arg.type]) {
    return generateOneProp(arg, undefined, false)
  } else if (arg.propTypes && arg.propTypes.type && GENERATORS[arg.propTypes.type]) {
    return generateOneProp(arg.propTypes, undefined, false)
  }

  if (_.isPlainObject(arg.propTypes)) {
    propTypes = arg.propTypes
  } else if (_.isPlainObject(arg)) {
    propTypes = arg
  } else {
    throw new TypeError('generateProps expected a propType object or a React Component')
  }

  return _(propTypes)
    .map(generateOneProp)
    .compact()
    .fromPairs()
    .value()
}

Object.assign(generateProps, { init: wrapPropTypes })

module.exports = generateProps
