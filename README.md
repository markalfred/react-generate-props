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

```js
// react-component.jsx

class Component extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    count: React.PropTypes.number.isRequired,
    user: ReactPropTypes.shape({
      loggedIn: React.PropTypes.bool.isRequired,
      name: React.PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    <div>
      <h1>{this.props.title}</h1>
      <small>{this.props.count}</small>
      {this.props.user.loggedIn && <p>Hello, {this.props.user.name}.</p>}
    </div>
  }
}

export default Component
```

=====

Then, pass your component to this library. It will generate reasonable defaults for all of your component's required propTypes.

```js
// component-test.js

import generateProps from 'react-generate-props'
import Component from './react-component'

const props = generateProps(Component)
assertEqual(props, { title: 'A String', count: 1, user: { loggedIn: true, name: 'A String' } })

render(<Component {...props}/>)

/***
Result:

<div>
  <h1>A String</h1>
  <small>1</small>
  <p>Hello, A String</p>
</div>

***/
```
