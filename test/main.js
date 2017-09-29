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

  describe('given a required element', () => {
    it('generates a react element', () => {
      const propTypes = { myElement: React.PropTypes.element.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myElement: React.createElement('div') }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required node', () => {
    it('generates a node', () => {
      const propTypes = { myNode: React.PropTypes.node.isRequired }
      ComponentAsClass.propTypes = propTypes
      ComponentAsFunction.propTypes = propTypes

      const expected = { myNode: [React.createElement('div'), React.createElement('div')] }

      generateProps(propTypes).should.deep.equal(expected)
      generateProps({ propTypes }).should.deep.equal(expected)
      generateProps(ComponentAsClass).should.deep.equal(expected)
      generateProps(ComponentAsFunction).should.deep.equal(expected)
    })
  })

  describe('given a required arrayOf', () => {
    describe('required arrays', () => {
      it('generates an array of arrays', () => {
        const propTypes = { myArrayOfArrays: React.PropTypes.arrayOf(React.PropTypes.array.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfArrays: [[]] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required bools', () => {
      it('generates an array of bools', () => {
        const propTypes = { myArrayOfBools: React.PropTypes.arrayOf(React.PropTypes.bool.isRequired).isRequired }
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
        const propTypes = { myArrayOfFuncs: React.PropTypes.arrayOf(React.PropTypes.func.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        generateProps(propTypes).myArrayOfFuncs[0].id.should.match(/spy#[0-9]+/)
        generateProps({ propTypes }).myArrayOfFuncs[0].id.should.match(/spy#[0-9]+/)
        generateProps(ComponentAsClass).myArrayOfFuncs[0].id.should.match(/spy#[0-9]+/)
        generateProps(ComponentAsFunction).myArrayOfFuncs[0].id.should.match(/spy#[0-9]+/)
      })
    })

    describe('required numbers', () => {
      it('generates an array of numbers', () => {
        const propTypes = { myArrayOfNumbers: React.PropTypes.arrayOf(React.PropTypes.number.isRequired).isRequired }
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
        const propTypes = { myArrayOfObjects: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfObjects: [{}] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required strings', () => {
      it('generates an array of strings', () => {
        const propTypes = { myArrayOfStrings: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfStrings: ['A String'] }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required anys', () => {
      it('generates an array of anys', () => {
        const propTypes = { myArrayOfAnys: React.PropTypes.arrayOf(React.PropTypes.any.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myArrayOfAnys: ['Any'] }

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

      const propTypes = { myInstance: React.PropTypes.instanceOf(MyClass).isRequired }
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
        const propTypes = { myObjectOfArrays: React.PropTypes.objectOf(React.PropTypes.array.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfArrays: { key: [] } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required bools', () => {
      it('generates an array of bools', () => {
        const propTypes = { myObjectOfBools: React.PropTypes.objectOf(React.PropTypes.bool.isRequired).isRequired }
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
        const propTypes = { myObjectOfFuncs: React.PropTypes.objectOf(React.PropTypes.func.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        generateProps(propTypes).myObjectOfFuncs.key.id.should.match(/spy#[0-9]+/)
        generateProps({ propTypes }).myObjectOfFuncs.key.id.should.match(/spy#[0-9]+/)
        generateProps(ComponentAsClass).myObjectOfFuncs.key.id.should.match(/spy#[0-9]+/)
        generateProps(ComponentAsFunction).myObjectOfFuncs.key.id.should.match(/spy#[0-9]+/)
      })
    })

    describe('required numbers', () => {
      it('generates an array of numbers', () => {
        const propTypes = { myObjectOfNumbers: React.PropTypes.objectOf(React.PropTypes.number.isRequired).isRequired }
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
        const propTypes = { myObjectOfObjects: React.PropTypes.objectOf(React.PropTypes.object.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfObjects: { key: {} } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required strings', () => {
      it('generates an array of strings', () => {
        const propTypes = { myObjectOfStrings: React.PropTypes.objectOf(React.PropTypes.string.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfStrings: { key: 'A String' } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })
    })

    describe('required anys', () => {
      it('generates an array of anys', () => {
        const propTypes = { myObjectOfAnys: React.PropTypes.objectOf(React.PropTypes.any.isRequired).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myObjectOfAnys: { key: 'Any' } }

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
        const propTypes = { myFooOrBar: React.PropTypes.oneOf(['foo', 'bar']).isRequired }
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
          const propTypes = { myArrayOrBool: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]).isRequired }
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
        const propTypes = { myShape: React.PropTypes.shape({ myArray: React.PropTypes.array.isRequired }).isRequired }
        ComponentAsClass.propTypes = propTypes
        ComponentAsFunction.propTypes = propTypes

        const expected = { myShape: { myArray: [] } }

        generateProps(propTypes).should.deep.equal(expected)
        generateProps({ propTypes }).should.deep.equal(expected)
        generateProps(ComponentAsClass).should.deep.equal(expected)
        generateProps(ComponentAsFunction).should.deep.equal(expected)
      })

      describe('and a required bool', () => {
        it('generates an object with an array value and a bool value', () => {
          const propTypes = {
            myShape: React.PropTypes.shape({
              myArray: React.PropTypes.array.isRequired,
              myBool: React.PropTypes.bool.isRequired
            }).isRequired
          }
          ComponentAsClass.propTypes = propTypes
          ComponentAsFunction.propTypes = propTypes

          const expected = { myShape: { myArray: [], myBool: true } }

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
              myShape: React.PropTypes.shape({
                myArray: React.PropTypes.array.isRequired,
                mySubShape: React.PropTypes.shape({
                  myNumber: React.PropTypes.number.isRequired
                }).isRequired
              }).isRequired
            }
            ComponentAsClass.propTypes = propTypes
            ComponentAsFunction.propTypes = propTypes

            const expected = { myShape: { myArray: [], mySubShape: { myNumber: 1 } } }

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
