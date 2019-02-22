[![Build Status](https://travis-ci.org/alfredosalzillo/babel-plugin-preserve-arrow-function-to-string.svg?branch=master)](https://travis-ci.org/alfredosalzillo/babel-plugin-preserve-arrow-function-to-string)
#babel-plugin-preserve-arrow-function-to-string
> Babel plugin to preserve arrow function toString

## Install

```bash
$ npm install babel-plugin-preserve-arrow-function-to-string --save-dev
```

## Usage

**.babelrc**
```json
{
  "plugins": [
    "preserve-arrow-function-to-string"
  ]
}
```

## Motivation
Library how use metadata reflection to analyze code not work with es5
transpiled arrow function
(and default parameters value, rest parameters, deconstruction ecc...).
This plugin replace the native `toString` to match
the behavior of no transpiled arrow function.

This plugin is useful with library like
[z](https://github.com/z-pattern-matching/z)
how use the `toString` result to analyze arrow function metadata.
