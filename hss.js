/*
  hss.js
  copyright (c) 2023 sporeball
  MIT license
*/

export default class Hss {
  constructor (value) {
    if (typeof value === 'string') {
      this.value = [...value];
    }
    if (Array.isArray(value)) {
      // TODO: throw if any element is multiple characters long
      this.value = value;
    }
  }

  /**
   * Return the character at a specific index of this Hss.
   * Negative indices count from the end.
   * @param {number} index
   * @returns {string}
   */
  at (index) {
    return this.value.at(index);
  }

  /**
   * Return the character at a specific index of this Hss.
   * Negative indices return the empty string.
   * @param {number} [index]
   * @returns {string}
   */
  charAt (index = 0) {
    if (index < 0) {
      return '';
    }
    return this.at(index);
  }

  /**
   * Return the Unicode code point at a specific index of this Hss.
   * Negative indices return undefined.
   * Surrogate pairs return their code point.
   * @param {number}
   * @returns {number|undefined}
   */
  charCodeAt (index = 0) {
    if (index < 0) {
      return undefined;
    }
    return this.value[index].codePointAt(0);
  }

  codePointAt (index = 0) {
    return this.charCodeAt(index);
  }

  /**
   * Return a new Hss consisting of all passed values concatenated to this Hss.
   * @param {...Hss|string} values
   * @returns {Hss}
   */
  concat (...strs) {
    let value = this.value;
    for (const str of strs) {
      value = value.concat([...str.toString()]);
    }
    return new Hss(value);
  }

  /**
   * Return whether this Hss ends with a specific value.
   * Searches from index 0 (inclusive) to endPosition (exclusive).
   * @param {Hss|string} searchValue
   * @param {number} [endPosition]
   * @returns {boolean}
   */
  endsWith (searchValue, endPosition = this.value.length) {
    return this.value.slice(0, endPosition)
      .slice(-searchValue.valueOf().length)
      .every((ch, i) => ch === searchValue.valueOf()[i]);
  }

  /**
   * Return whether a value can be found within this Hss.
   * @param {Hss|string} searchValue
   * @param {number} startPosition
   * @returns {boolean}
   */
  includes (searchValue, startPosition = 0) {
    return this.indexOf(searchValue, startPosition) > -1;
  }

  /**
   * Return the index where a value can be found within this Hss.
   * @param {Hss|string} searchValue
   * @param {number} startPosition
   * @returns {boolean}
   */
  indexOf (searchValue, startPosition = 0) {
    if (startPosition < 0) {
      startPosition = 0;
    }
    return this.value.slice(startPosition)
      .findIndex((ch, i, value) => {
        return value.slice(i, searchValue.valueOf().length + i)
          .every((ch, i) => ch === searchValue.valueOf()[i]);
      });
  }

  /**
   * Return this Hss as a primitive string.
   * @returns {string}
   */
  toString() {
    return this.value.join('');
  }

  /**
   * Return the value of this Hss.
   * @returns {string[]}
   */
  valueOf () {
    return this.value;
  }
}
