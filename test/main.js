const React = require('react')
const PropTypes = require('../src/prop-types')

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
      const propTypes = { myArray: PropTypes.array.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myArray: ['myArray'] }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required bool', () => {
    it('generates a bool', () => {
      const propTypes = { myBool: PropTypes.bool.isRequired }
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
      const propTypes = { myFunc: PropTypes.func.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      generateProps(propTypes).myFunc.should.be.a('function')
      generateProps({ propTypes }).myFunc.should.be.a('function')
      generateProps(ComponentAsClass).myFunc.should.be.a('function')
      generateProps(ComponentAsFunction).myFunc.should.be.a('function')
    })
  })

  describe('given a required number', () => {
    it('generates a number', () => {
      const propTypes = { myNumber: PropTypes.number.isRequired }
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
      const propTypes = { myObject: PropTypes.object.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myObject: { myObject: 'myObject' } }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required string', () => {
    it('generates a string', () => {
      const propTypes = { myString: PropTypes.string.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myString: 'myString' }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required any', () => {
    it('generates an any', () => {
      const propTypes = { myAny: PropTypes.any.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myAny: 'myAny' }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required element', () => {
    it('generates a react element', () => {
      const propTypes = { myElement: PropTypes.element.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myElement: React.createElement('div', 'myElement') }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required node', () => {
    it('generates a node', () => {
      const propTypes = { myNode: PropTypes.node.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myNode: 'myNode' }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required arrayOf', () => {
    describe('required arrays', () => {
      it('generates an array of arrays', () => {
        const propTypes = { myArrayOfArrays: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfArrays: [['myArrayOfArrays']] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required bools', () => {
      it('generates an array of bools', () => {
        const propTypes = { myArrayOfBools: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfBools: [true] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required funcs', () => {
      it('generates an array of funcs', () => {
        const propTypes = { myArrayOfFuncs: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        generateProps(propTypes).myArrayOfFuncs[0].should.be.a('function')
        generateProps({ propTypes }).myArrayOfFuncs[0].should.be.a('function')
        generateProps(ComponentAsClass).myArrayOfFuncs[0].should.be.a('function')
        generateProps(ComponentAsFunction).myArrayOfFuncs[0].should.be.a('function')
      })
    })

    describe('required numbers', () => {
      it('generates an array of numbers', () => {
        const propTypes = { myArrayOfNumbers: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfNumbers: [1] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required objects', () => {
      it('generates an array of objects', () => {
        const propTypes = { myArrayOfObjects: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfObjects: [{ myArrayOfObjects: 'myArrayOfObjects' }] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required strings', () => {
      it('generates an array of strings', () => {
        const propTypes = { myArrayOfStrings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfStrings: ['myArrayOfStrings'] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required anys', () => {
      it('generates an array of anys', () => {
        const propTypes = { myArrayOfAnys: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfAnys: ['myArrayOfAnys'] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })
  })

  describe('given a required instanceOf(MyClass)', () => {
    it('generates a an instance of MyClass', () => {
      class MyClass {}

      const propTypes = { myInstance: PropTypes.instanceOf(MyClass).isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myInstance: new MyClass() }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required objectOf', () => {
    describe('required arrays', () => {
      it('generates an array of arrays', () => {
        const propTypes = { myObjectOfArrays: PropTypes.objectOf(PropTypes.array.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfArrays: { key: ['myObjectOfArrays'] } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required bools', () => {
      it('generates an array of bools', () => {
        const propTypes = { myObjectOfBools: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfBools: { key: true } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required funcs', () => {
      it('generates an array of funcs', () => {
        const propTypes = { myObjectOfFuncs: PropTypes.objectOf(PropTypes.func.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        generateProps(propTypes).myObjectOfFuncs.key.should.be.a('function')
        generateProps({ propTypes }).myObjectOfFuncs.key.should.be.a('function')
        generateProps(ComponentAsClass).myObjectOfFuncs.key.should.be.a('function')
        generateProps(ComponentAsFunction).myObjectOfFuncs.key.should.be.a('function')
      })
    })

    describe('required numbers', () => {
      it('generates an array of numbers', () => {
        const propTypes = { myObjectOfNumbers: PropTypes.objectOf(PropTypes.number.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfNumbers: { key: 1 } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required objects', () => {
      it('generates an array of objects', () => {
        const propTypes = { myObjectOfObjects: PropTypes.objectOf(PropTypes.object.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfObjects: { key: { myObjectOfObjects: 'myObjectOfObjects' } } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required strings', () => {
      it('generates an array of strings', () => {
        const propTypes = { myObjectOfStrings: PropTypes.objectOf(PropTypes.string.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfStrings: { key: 'myObjectOfStrings' } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required anys', () => {
      it('generates an array of anys', () => {
        const propTypes = { myObjectOfAnys: PropTypes.objectOf(PropTypes.any.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfAnys: { key: 'myObjectOfAnys' } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })
  })

  describe('given a required oneOf', () => {
    describe('foo or bar', () => {
      it('generates the first option, foo', () => {
        const propTypes = { myFooOrBar: PropTypes.oneOf(['foo', 'bar']).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = 'foo'

        generateProps(propTypes).myFooOrBar.should.equal(expected)
        generateProps({ propTypes }).myFooOrBar.should.equal(expected)
        generateProps(ComponentAsClass).myFooOrBar.should.equal(expected)
        generateProps(ComponentAsFunction).myFooOrBar.should.equal(expected)
      })
    })
  })

  describe('given a required oneOfType', () => {
    describe('bool or', () => {
      describe('number', () => {
        it('generates the first option, a bool', () => {
          const propTypes = { myArrayOrBool: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired }
          ComponentAsClass.propTypes = propTypes
          ComponentAsFunction.propTypes = propTypes

          const expected = true

          generateProps(propTypes).myArrayOrBool.should.equal(expected)
          generateProps({ propTypes }).myArrayOrBool.should.equal(expected)
          generateProps(ComponentAsClass).myArrayOrBool.should.equal(expected)
          generateProps(ComponentAsFunction).myArrayOrBool.should.equal(expected)
        })
      })
    })
  })

  describe('given a required shape', () => {
    describe('with a required array value', () => {
      it('generates an object with an array value', () => {
        const propTypes = { myShape: PropTypes.shape({ myArray: PropTypes.array.isRequired }).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myShape: { myArray: ['myArray'] } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })

      describe('and a required bool', () => {
        it('generates an object with an array value and a bool value', () => {
          const propTypes = {
            myShape: PropTypes.shape({
              myArray: PropTypes.array.isRequired,
              myBool: PropTypes.bool.isRequired
            }).isRequired
          }
          ComponentAsClass.propTypes = propTypes
          ComponentAsFunction.propTypes = propTypes

          const expected = { myShape: { myArray: ['myArray'], myBool: true } }

          generateProps(propTypes).should.deep.equal(expected)
          generateProps({ propTypes }).should.deep.equal(expected)
          generateProps(ComponentAsClass).should.deep.equal(expected)
          generateProps(ComponentAsFunction).should.deep.equal(expected)
        })
      })

      describe('and a required shape', () => {
        describe('with a required number', () => {
          it('generates an object with an array value and a sub-object with bool value', () => {
            const propTypes = {
              myShape: PropTypes.shape({
                myArray: PropTypes.array.isRequired,
                mySubShape: PropTypes.shape({
                  myNumber: PropTypes.number.isRequired
                }).isRequired
              }).isRequired
            }
            ComponentAsClass.propTypes = propTypes
            ComponentAsFunction.propTypes = propTypes

            const expected = { myShape: { myArray: ['myArray'], mySubShape: { myNumber: 1 } } }

            generateProps(propTypes).should.deep.equal(expected)
            generateProps({ propTypes }).should.deep.equal(expected)
            generateProps(ComponentAsClass).should.deep.equal(expected)
            generateProps(ComponentAsFunction).should.deep.equal(expected)
          })
        })
      })
    })
  })
})

describe('generateProps(opts)', () => {
  const propTypes = {
    optionalArray: PropTypes.array,
    requiredArray: PropTypes.array.isRequired,
    optionalBool: PropTypes.bool,
    requiredBool: PropTypes.bool.isRequired,
    optionalNumber: PropTypes.number,
    requiredNumber: PropTypes.number.isRequired,
    optionalObject: PropTypes.object,
    requiredObject: PropTypes.object.isRequired,
    optionalString: PropTypes.string,
    requiredString: PropTypes.string.isRequired,
    optionalAny: PropTypes.any,
    requiredAny: PropTypes.any.isRequired,
    optionalElement: PropTypes.element,
    requiredElement: PropTypes.element.isRequired,
    optionalNode: PropTypes.node,
    requiredNode: PropTypes.node.isRequired
  }

  const required = {
    requiredArray: ['requiredArray'],
    requiredBool: true,
    requiredNumber: 1,
    requiredObject: { requiredObject: 'requiredObject' },
    requiredString: 'requiredString',
    requiredAny: 'requiredAny',
    requiredElement: React.createElement('div', 'requiredElement'),
    requiredNode: 'requiredNode'
  }

  const optional = {
    optionalArray: ['optionalArray'],
    optionalBool: true,
    optionalNumber: 1,
    optionalObject: { optionalObject: 'optionalObject' },
    optionalString: 'optionalString',
    optionalAny: 'optionalAny',
    optionalElement: React.createElement('div', 'optionalElement'),
    optionalNode: 'optionalNode'
  }

  describe('given opts = ', () => {
    describe('undefined', () => {
      it('generates required props only by default', () => {
        const expected = required
        generateProps(propTypes).should.deep.equal(expected)
      })
    })

    describe('{ required: true }', () => {
      it('generates required props', () => {
        const expected = required
        generateProps(propTypes, { required: true }).should.deep.equal(expected)
      })
    })

    describe('{ required: false }', () => {
      it('does not generate required props', () => {
        const expected = {}
        generateProps(propTypes, { required: false }).should.deep.equal(expected)
      })
    })

    describe('{ optional: true }', () => {
      it('generates optional props', () => {
        const expected = Object.assign({}, required, optional)
        generateProps(propTypes, { optional: true }).should.deep.equal(expected)
      })

      it('generates optional props in nested objects', () => {
        const expected = Object.assign({}, required, optional)
        generateProps({ wrappingShape: PropTypes.shape(propTypes) }, { optional: true })
          .should.deep.equal({ wrappingShape: expected })
      })
    })

    describe('{ optional: false }', () => {
      it('does not generate optional props', () => {
        const expected = required
        generateProps(propTypes, { optional: false }).should.deep.equal(expected)
      })
    })
  })

  describe('given opts.generators = ', () => {
    describe('with bool override', () => {
      it('generates a custom bool', () => {
        const opts = { generators: { bool: () => false } }
        generateProps(propTypes, opts).requiredBool.should.be.false
      })
    })
  })
})
