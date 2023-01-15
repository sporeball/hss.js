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
    return this.value[index] // character at index
      .codePointAt(0); // top
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
    // for each parameter
    for (const str of strs) {
      // concatenate that parameter, spread
      value = value.concat([...str.valueOf()]);
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
    // end at the end position
    return this.value.slice(0, endPosition)
      // take the last (length of searchValue) characters
      .slice(-[...searchValue.valueOf()].length)
      // assert that all of them match those of searchValue
      .every((ch, i) => ch === [...searchValue.valueOf()][i]);
  }

  /**
   * Return whether a value can be found within this Hss.
   * Searches from startPosition to the end of the string.
   * @param {Hss|string} searchValue
   * @param {number} [startPosition]
   * @returns {boolean}
   */
  includes (searchValue, startPosition = 0) {
    return this.indexOf(searchValue, startPosition) > -1;
  }

  /**
   * Return the first index where a value can be found within this Hss.
   * Searches from startPosition to the end of the string.
   * @param {Hss|string} searchValue
   * @param {number} [startPosition]
   * @returns {number}
   */
  indexOf (searchValue, startPosition = 0) {
    if (startPosition < 0) {
      startPosition = 0;
    }
    if (startPosition > this.value.length) {
      return -1;
    }
    // start at the start position
    return this.value.slice(startPosition)
      // find the first index where
      .findIndex((ch, i, value) => {
        // (length of searchValue) consecutive characters
        return value.slice(i, [...searchValue.valueOf()].length + i)
          // are all equal to those of searchValue
          .every((ch, i) => ch === [...searchValue.valueOf()][i]);
      }) + startPosition;
  }

  /**
   * Return the last index where a value can be found within this Hss.
   * Searches from index 0 to endPosition (both inclusive).
   * @param {Hss|string} searchValue
   * @param {number} [endPosition]
   * @returns {number}
   */
  lastIndexOf (searchValue, endPosition = Infinity) {
    if (endPosition < 0) {
      endPosition = 0;
    }
    // end at the end position
    return this.value.slice(0, endPosition + 1)
      // find the last index where
      .findLastIndex((ch, i, value) => {
        // (length of searchValue) consecutive characters
        return value.slice(i, [...searchValue.valueOf()].length + i)
          // are all equal to those of searchValue
          .every((ch, i) => ch === [...searchValue.valueOf()][i]);
      });
  }

  /**
   * Return an array of Hss instances based on the result of matching this Hss
   * against a value.
   * If the match value is a Hss or a primitive string, only the first match
   * will be returned.
   * @param {Hss|string|RegExp} value
   * @returns {Hss[]}
   */
  match (value) {
    if (value instanceof Hss) {
      value = value.toString();
    }
    // cast to string, and match
    return (this.toString().match(new RegExp(value)) || [])
      // cast each to Hss
      .map(match => new Hss(match));
  }

  /**
   * Return a new Hss consisting of this Hss padded to length targetLength with
   * padValue.
   * The padding is applied from the end of this Hss.
   * @param {number} targetLength
   * @param {Hss|string} [padValue]
   * @returns {Hss}
   */
  padEnd (targetLength, padValue = ' ') {
    let value = this.value;
    // concat the full padValue as many times as possible
    while (value.length + padValue.valueOf().length <= targetLength) {
      value = value.concat([...padValue.valueOf()]);
    }
    // concat a portion of padValue one time
    value = value.concat(
      [...padValue.valueOf()].slice(
        0, targetLength - value.length
      )
    );
    return new Hss(value);
  }

  /**
   * Return a new Hss consisting of this Hss padded to length targetLength with
   * padValue.
   * The padding is applied from the beginning of this Hss.
   * @param {number} targetLength
   * @param {Hss|string} [padValue]
   * @returns {Hss}
   */
  padStart (targetLength, padValue = ' ') {
    let value = this.value;
    let concatValue = [];
    // concat the full padValue as many times as possible
    while (
      value.length + concatValue.length + padValue.valueOf().length <=
      targetLength
    ) {
      concatValue = concatValue.concat([...padValue.valueOf()]);
    }
    // concat a portion of padValue one time
    concatValue = concatValue.concat([...padValue.valueOf()].slice(
      0, targetLength - value.length - concatValue.length
    ));
    value = concatValue.concat([...value]);
    return new Hss(value);
  }

  /**
   * Return a new Hss consisting of this Hss repeated a certain number of
   * times.
   * @param {number} count
   * @returns {Hss}
   */
  repeat (count) {
    if (count < 0) {
      throw new RangeError('invalid repeat count');
    }
    if (count === 0) {
      return new Hss('');
    }
    let originalValue = this.value;
    let value = this.value;
    for (let i = 1; i < count; i++) {
      value = value.concat(originalValue);
    }
    return new Hss(value);
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
