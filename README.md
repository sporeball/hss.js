# hss.js

<a href="https://www.npmjs.com/package/hss.js"><img src="https://img.shields.io/npm/v/hss.js" /></a>

> library for Haskell-style strings in JavaScript - so bad it'll make you hiss

**hss.js** brings Haskell-style "a string is a list of characters" thinking to JavaScript:

```js
new Hss('hello')
// Hss { value: [ 'h', 'e', 'l', 'l', 'o' ] }
```

astral symbols are counted as just one character:

```js
new Hss('hi 😄')
// Hss { value: [ 'h', 'i', ' ', '😄' ] }
```

## disclaimer
this package is stupid. it should work, but it's really stupid.\
it does not implement several methods which we judged as unnecessary, such as `String#replaceAll` or `Array#copyWithin`.\
it also uses `Array#findLastIndex`, a method compatible only with fairly recent browser and Node.js versions, and does not provide a polyfill.\
**use at your own risk.**

## install
```
$ npm install hss.js
```

## API

### new Hss (value)
construct a new Hss instance.

#### value
type: `string|string[]`

### string methods
all of JavaScript's native string methods are available **except** for the following:
- `fromCharCode` and `fromCodePoint`
- `localeCompare`
- `matchAll` and `replaceAll`
- `normalize`
- `substring`
- `toLocaleLowerCase` and `toLocaleUpperCase`

additionally, `length` **is** available.

### array methods
all of JavaScript's native array methods are available **except** for the following:
- `copyWithin`
- `entries`, `keys`, and `values`
- `fill`
- `flat`
- `join`
- `reduce` and `reduceRight`
- `toLocaleString`

additionally, `reverse` and `sort` do **not** mutate Hss instances on which they are called.

## license
MIT
