const _ = require('lodash')
const React = require('react')
const PropTypes = require('./prop-types')

let options

const wrapPropTypes = () => {
  // Adds a .type key which allows the type to be derived during the
  // evaluation process. This is necessary for complex types which
  // return the result of a generator function, leaving no way to
  // determine which type instantiated it.

  const original = _.cloneDeep(PropTypes)

  _.each(PropTypes, (v, k) => {
    if (v.isRequired !== undefined) {
      // Simple type. Just extend the object
      _.defaultsDeep(PropTypes[k], { type: k, isRequired: { type: k } })
    } else {
      // Complex type. Must extend the creator's return value
      PropTypes[k] = (arg) =>
        _.defaultsDeep(original[k](arg), {
          type: k, arg: arg,
          isRequired: { type: k, arg: arg }
        })
    }
  })
}

wrapPropTypes()

const GENERATORS = {
  // Simple types
  array: (propName) => [propName],
  bool: () => true,
  func: () => () => {},
  number: () => 1,
  object: (propName) => ({ [propName]: propName }),
  string: (propName) => propName,
  any: (propName) => propName,
  element: (propName) => React.createElement('div', propName),
  node: (propName) => propName,

  // Complex types
  arrayOf: (propName, type) => [generateOneProp(type, propName, false)],
  instanceOf: (propName, klass) => new klass(),
  objectOf: (propName, type) => ({ key: generateOneProp(type, propName, false) }),
  oneOf: (propName, values) => _.first(values),
  oneOfType: (propName, types) => forceGenerateOneProp(_.first(types), propName),
  shape: (propName, shape) => generateProps(shape)
}

const shouldGenerate = (propType) => {
  return (
    // Generate required props, and this is the required version
    (options.required && !propType.isRequired) ||
    // Generate optional props, and this is the optional version
    (options.optional && !!propType.isRequired)
  )
}

const generateOneProp = (propType, propName, wrapInArray=true) => {
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
  options = _.defaults({}, opts, { required: true, optional: false })
  if (opts && opts.generators) {
    options.generators = _.defaults({}, opts.generators, GENERATORS)
  } else {
    options.generators = GENERATORS
  }

  let propTypes

  if (!arg) {
    throw new TypeError('generateProps expected a propType object or a React Component')
  } else if (_.isPlainObject(arg.propTypes)) {
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

module.exports = generateProps
