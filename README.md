# react-generate-props
Generate default props based on your React component's PropTypes

[![Coverage Status](https://coveralls.io/repos/github/markalfred/react-generate-props/badge.svg?branch=master)](https://coveralls.io/github/markalfred/react-generate-props?branch=master)
[![CircleCI](https://circleci.com/gh/markalfred/react-generate-props.svg?style=svg)](https://circleci.com/gh/markalfred/react-generate-props)

## Installation
```bash
$ npm install --save-dev react-generate-props
```

## Usage

Define your component's propTypes.

```jsx
const Counter = ({ count }) => <div>{count}</div>
Counter.propTypes = { count: PropTypes.number.isRequired }
export default Counter
```

Pass the component to this library. It will generate reasonable props based on the defined types.

```js
import generateProps from 'react-generate-props'
import Counter from './counter'
generateProps(Counter)
// => { count: 1 }
```

Use these default props to reduce boilerplate and prop type validation errors in your tests! :tada:

## Example

A more in-depth example.

```jsx
// component.jsx

class Component extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    user: PropTypes.shape({
      loggedIn: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    <div>
      <h1>{this.props.title}</h1>
      <small>{this.props.followers}</small>
      {this.props.user.loggedIn && <p>Hello, {this.props.user.name}.</p>}
    </div>
  }
}

export default Component
```

```js
// component-test.js

import generateProps from 'react-generate-props'
import Component from './component.jsx'

const props = generateProps(Component)
// => { title: 'title', followers: 1, user: { loggedIn: true, name: 'name' } }
```

## API

The library takes two arguments.

```js
generateProps(schema, opts)
```

#### `schema`: An Object, Function, or Class containing a PropTypes definition. All of the following are valid:

Plain Object
```js
const Counter = { count: PropTypes.number.isRequired }
```

Plain Object with a `propTypes` key
```js
const Counter = { propTypes: { count: PropTypes.number.isRequired } }
```

Functional Component
```js
const Counter = ({ counter }) => {/* ... */}
Counter.propTypes = { count: PropTypes.number.isRequired }
```

`React.Component` Class
```js
class Counter extends React.Component {
  static propTypes = { count: PropTypes.number.isRequired }
}
```

In each of these cases, the effect would be the same
```js
generateProps(Counter)
// => { count: 1 }
```

#### `opts`: An Object which may contain the following:

```js
{
  required: true,
  // default: true. When true, props marked as .isRequired will be generated.
  
  optional: false,
  // default: false. When true, props *not* marked as .isRequired will be generated.
  
  generators: {
    // Can be used to override this lib's default generators.
    // Each key is a prop type, each value is a function, 
    // each function receives its definition's arguments.
    bool: () => false,
    function: () => spy(),
    instanceOf: (klass) => new klass(),
    oneOf: (values) => values[values.length - 1]
  }
}
```

## One More Example

```jsx
const propTypes = {
  name: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
  userType: PropTypes.oneOf(['admin', 'user']).isRequired
}

generateProps(propTypes)
// => { name: 'string', userType: 'admin' }

generateProps(propTypes, { optional: true })
// => { name: 'string', loggedIn: true, userType: 'admin' }

generateProps(propTypes, { 
  optional: true,
  generators: { 
    string: () => 'Alice',
    bool: () => false,
    oneOf: (values) => values[values.length - 1]
  }
})
// => { name: 'Alice', loggedIn: false, userType: 'user' }
```
