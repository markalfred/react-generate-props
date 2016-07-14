const _ = require('lodash')
const sinon = require('sinon')
const { PropTypes } = require('react')

const PROP_TYPE_MAP = [
  [ PropTypes.array.isRequired, () => [] ],
  [ PropTypes.bool.isRequired, () => true ],
  [ PropTypes.func.isRequired, () => sinon.spy() ],
  [ PropTypes.number.isRequired, () => 1 ],
  [ PropTypes.object.isRequired, () => ({}) ],
  [ PropTypes.string.isRequired, () => 'A String' ],
  [ PropTypes.any.isRequired, () => 'Any' ]

  // Complex types. Not yet implemented:

  // [ PropTypes.arrayOf.isRequired, _.noop ]
  // [ PropTypes.element.isRequired, _.noop ]
  // [ PropTypes.instanceOf.isRequired, _.noop ]
  // [ PropTypes.node.isRequired, _.noop ]
  // [ PropTypes.objectOf.isRequired, _.noop ]
  // [ PropTypes.oneOf.isRequired, _.noop ]
  // [ PropTypes.oneOfType.isRequired, _.noop ]
  // [ PropTypes.shape.isRequired, _.noop ]

]

const [TYPES, GENERATORS] = _.unzip(PROP_TYPE_MAP)

const generateProps = (arg) => {
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
    .map((propType, propName) => {
      const generate = GENERATORS[_.indexOf(TYPES, propType)]
      if (generate) { return [propName, generate()] }
    })
    .compact()
    .fromPairs()
    .value()
}

module.exports = generateProps
