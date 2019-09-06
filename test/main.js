const React = require('react')
const PropTypes = require('../src/prop-types')

const ComponentAsClass = class extends React.Component { render() { 'component' } }
const ComponentAsFunction = () => 'component'

const generateProps = require('../src/main')

describe('generateProps (incorrect)', () => {
  describe('when called before generateProps.init() was called', () => {
    it('throws an error', () => {
      const fnCall = () => generateProps({})
      fnCall.should.throw(Error, 'generateProps.init() must be called at the beginning of your test suite')
    })
  })

  describe('given the bad argument', () => {
    // TODO: Add plain objects, or things like "React" to this.
    const badArgs = [null, undefined, 0, 1, -1, false, true, [], NaN, '', 'string']

    for (let arg of badArgs) {
      describe('(' + arg + ')', () => {
        it('throws an error', () => {
          generateProps.init()
          let fnCall = () => generateProps(arg)
          fnCall.should.throw(TypeError, 'generateProps expected a propType object or a React Component')
        })
      })
    }
  })
})

describe('generateProps (correct)', () => {
  before(() => { generateProps.init() })
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
      generateProps(propTypes.myArray).should.deep.equal([])
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
      generateProps(propTypes.myBool).should.equal(true)
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
      generateProps(propTypes.myFunc).should.be.a('function')
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
      generateProps(propTypes.myNumber).should.equal(1)
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
      generateProps(propTypes.myObject).should.deep.equal({})
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
      generateProps(propTypes.myString).should.deep.equal('string')
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
      generateProps(propTypes.myAny).should.deep.equal('any')
    })
  })

  describe('given a required element', () => {
    it('generates a react element', () => {
      const propTypes = { myElement: PropTypes.element.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myElement: React.createElement('div') }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
      generateProps(propTypes.myElement).should.deep.equal(React.createElement('div'))
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
      generateProps(propTypes.myNode).should.deep.equal('node')
    })
  })

  describe('given a required symbol', () => {
    it('generates a symbol', () => {
      if (PropTypes.symbol === undefined) return

      const propTypes = { mySymbol: PropTypes.symbol.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = 'Symbol(mySymbol)'

      generateProps(propTypes).mySymbol.toString().should.equal(expected)
      generateProps({ propTypes }).mySymbol.toString().should.equal(expected)
      generateProps(ComponentAsClass).mySymbol.toString().should.equal(expected)
      generateProps(ComponentAsFunction).mySymbol.toString().should.equal(expected)
      generateProps(propTypes.mySymbol).toString().should.equal('Symbol()')
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
        generateProps(propTypes.myArrayOfArrays).should.deep.equal([[]])
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
        generateProps(propTypes.myArrayOfBools).should.deep.equal([true])
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
        generateProps(propTypes.myArrayOfFuncs)[0].should.be.a('function')
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
        generateProps(propTypes.myArrayOfNumbers).should.deep.equal([1])
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
        generateProps(propTypes.myArrayOfObjects).should.deep.equal([{}])
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
        generateProps(propTypes.myArrayOfStrings).should.deep.equal(['string'])
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
        generateProps(propTypes.myArrayOfAnys).should.deep.equal(['any'])
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
      generateProps(propTypes.myInstance).should.deep.equal(new MyClass())
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
        generateProps(propTypes.myObjectOfArrays).should.deep.equal({ key: [] })
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
        generateProps(propTypes.myObjectOfBools).should.deep.equal({ key: true })
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
        generateProps(propTypes.myObjectOfFuncs).key.should.be.a('function')
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
        generateProps(propTypes.myObjectOfNumbers).should.deep.equal({ key: 1 })
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
        generateProps(propTypes.myObjectOfObjects).should.deep.equal({ key: {} })
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
        generateProps(propTypes.myObjectOfStrings).should.deep.equal({ key: 'string' })
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
        generateProps(propTypes.myObjectOfAnys).should.deep.equal({ key: 'any' })
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
        generateProps(propTypes.myFooOrBar).should.equal(expected)
      })
    })
  })

  describe('given a required oneOfType', () => {
    describe('bool or', () => {
      describe('number', () => {
        it('generates the first option, a bool', () => {
          const propTypes = { myBoolOrNumber: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired }
          ComponentAsClass.propTypes = propTypes
          ComponentAsFunction.propTypes = propTypes

          const expected = true

          generateProps(propTypes).myBoolOrNumber.should.equal(expected)
          generateProps({ propTypes }).myBoolOrNumber.should.equal(expected)
          generateProps(ComponentAsClass).myBoolOrNumber.should.equal(expected)
          generateProps(ComponentAsFunction).myBoolOrNumber.should.equal(expected)
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
        generateProps(propTypes.myShape).should.deep.equal(expected.myShape)
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
          generateProps(propTypes.myShape).should.deep.equal(expected.myShape)
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
            generateProps(propTypes.myShape).should.deep.equal(expected.myShape)
          })
        })
      })
    })
  })

  describe('given a required exact', () => {
    describe('with a required array value', () => {
      it('generates an object with an array value', () => {
        if (!PropTypes.exact) return

        const propTypes = { myExact: PropTypes.exact({ myArray: PropTypes.array.isRequired }).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myExact: { myArray: ['myArray'] } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
        generateProps(propTypes.myExact).should.deep.equal(expected.myExact)
      })

      describe('and a required bool', () => {
        it('generates an object with an array value and a bool value', () => {
          if (!PropTypes.exact) return

          const propTypes = {
            myExact: PropTypes.exact({
              myArray: PropTypes.array.isRequired,
              myBool: PropTypes.bool.isRequired
            }).isRequired
          }
          ComponentAsClass.propTypes = propTypes
          ComponentAsFunction.propTypes = propTypes

          const expected = { myExact: { myArray: ['myArray'], myBool: true } }

          generateProps(propTypes).should.deep.equal(expected)
          generateProps({ propTypes }).should.deep.equal(expected)
          generateProps(ComponentAsClass).should.deep.equal(expected)
          generateProps(ComponentAsFunction).should.deep.equal(expected)
          generateProps(propTypes.myExact).should.deep.equal(expected.myExact)
        })
      })

      describe('and a required shape', () => {
        describe('with a required number', () => {
          it('generates an object with an array value and a sub-object with bool value', () => {
            if (!PropTypes.exact) return

            const propTypes = {
              myExact: PropTypes.exact({
                myArray: PropTypes.array.isRequired,
                mySubShape: PropTypes.shape({
                  myNumber: PropTypes.number.isRequired
                }).isRequired
              }).isRequired
            }
            ComponentAsClass.propTypes = propTypes
            ComponentAsFunction.propTypes = propTypes

            const expected = { myExact: { myArray: ['myArray'], mySubShape: { myNumber: 1 } } }

            generateProps(propTypes).should.deep.equal(expected)
            generateProps({ propTypes }).should.deep.equal(expected)
            generateProps(ComponentAsClass).should.deep.equal(expected)
            generateProps(ComponentAsFunction).should.deep.equal(expected)
            generateProps(propTypes.myExact).should.deep.equal(expected.myExact)
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
    requiredElement: React.createElement('div'),
    requiredNode: 'requiredNode'
  }

  const optional = {
    optionalArray: ['optionalArray'],
    optionalBool: true,
    optionalNumber: 1,
    optionalObject: { optionalObject: 'optionalObject' },
    optionalString: 'optionalString',
    optionalAny: 'optionalAny',
    optionalElement: React.createElement('div'),
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

describe('PropTypes.checkPropTypes', () => {
  before(() => {
    generateProps.init()
    global._errorBackup = global.console.error
    global.console.error = err => { throw err }
  })
  after(() => {
    global.console.error = global._errorBackup
  })

  it('handles a generated shape', () => {
    const shape = PropTypes.shape({ myAny: PropTypes.any.isRequired }).isRequired
    const props = generateProps(shape)
    const fn = () => PropTypes.checkPropTypes
      ? PropTypes.checkPropTypes(shape, props)
      : shape(props)
    fn.should.not.throw()
  })
})
