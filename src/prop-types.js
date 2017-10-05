let PropTypes

try { PropTypes = require('prop-types') }
catch (e) { PropTypes = require('react').PropTypes }

module.exports = PropTypes
