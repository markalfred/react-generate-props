const React = require('react')

const ComponentAsClass = class extends React.Component { render() { 'component' } }
const ComponentAsFunction = () => 'component'

const generateProps = require('../src/main')

describe('generateProps', () => {
  describe('given a bad argument', () => {
    it('throws an error', () => {
      // TODO: Add plain objects, or things like "React" to this.
      const badArgs = [null, undefined, 0, 1, -1, false, true, [], NaN, '', 'string']

      for (let arg of badArgs) {
        let fnCall = () => generateProps(arg)
        fnCall.should.throw(TypeError, 'generateProps expected a propType object or a React Component')
      }
    })
  })

  describe('given a required array', () => {
    it('generates an array', () => {
      const propTypes = { myArray: React.PropTypes.array.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myArray: [] }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required bool', () => {
    it('generates a bool', () => {
      const propTypes = { myBool: React.PropTypes.bool.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myBool: true }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required func', () => {
    it('generates a func', () => {
      const propTypes = { myFunc: React.PropTypes.func.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      generateProps(propTypes).myFunc.id.should.match(/spy#[0-9]+/)
      generateProps({ propTypes }).myFunc.id.should.match(/spy#[0-9]+/)
      generateProps(ComponentAsClass).myFunc.id.should.match(/spy#[0-9]+/)
      generateProps(ComponentAsFunction).myFunc.id.should.match(/spy#[0-9]+/)
    })
  })

  describe('given a required number', () => {
    it('generates a number', () => {
      const propTypes = { myNumber: React.PropTypes.number.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myNumber: 1 }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required object', () => {
    it('generates an object', () => {
      const propTypes = { myObject: React.PropTypes.object.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myObject: {} }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required string', () => {
    it('generates a string', () => {
      const propTypes = { myString: React.PropTypes.string.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myString: 'A String' }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required any', () => {
    it('generates an any', () => {
      const propTypes = { myAny: React.PropTypes.any.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myAny: 'Any' }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })
})
