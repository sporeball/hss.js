import Hss from 'hss.js';
import Tentamen from 'tentamen';

let tentamen = new Tentamen({});
tentamen.fn = () => (x => x)(tentamen.input);

const str1 = new Hss('Hello, World!');
const str2 = new Hss('😄 and 😄 and also 😄');
const str3 = new Hss('foo');
const str4 = new Hss('😄😄');

/**
 * in this file, test titles use some magic words:
 * - sp: test acts at the index of, or otherwise involves, a surrogate pair
 * - asp: test acts at a (positive) index after a surrogate pair
 * - oob: test includes a parameter which is out of normal bounds
 */

/**
 * at
 * charAt is equivalent except for the negative case
 */
tentamen.suite('at');
tentamen.add(
  'positive',
  str1.at(3),
  'l'
);
tentamen.add(
  'positive (sp)',
  str2.at(6),
  '\ud83d\ude04'
);
tentamen.add(
  'positive (asp)',
  str2.at(7),
  // should return the space, not the lower half of the surrogate pair
  ' '
);
tentamen.add(
  'negative',
  str1.at(-2),
  'd'
);

/**
 * charCodeAt
 * codePointAt is equivalent
 */
tentamen.suite('charCodeAt');
tentamen.add(
  'negative',
  str1.charCodeAt(-1),
  undefined
);
tentamen.add(
  'non-negative',
  str1.charCodeAt(1),
  101
);
tentamen.add(
  'non-negative (sp)',
  str2.charCodeAt(6),
  128516
);
tentamen.add(
  'non-negative (asp)',
  str2.charCodeAt(7),
  // should return the codepoint of the space,
  // not the lower half of the surrogate pair
  32
);

/**
 * concat
 */
tentamen.suite('concat');
tentamen.add(
  'Hss + Hss',
  str1.concat(new Hss(' :)')),
  new Hss('Hello, World! :)')
);
tentamen.add(
  'Hss + string',
  str1.concat(' :)'),
  new Hss('Hello, World! :)')
);
tentamen.add(
  'Hss + string (sp)',
  str1.concat(' \ud83d\ude04'),
  new Hss('Hello, World! \ud83d\ude04')
);

/**
 * endsWith
 */
tentamen.suite('endsWith');
tentamen.add(
  'Hss -> Hss',
  str1.endsWith(new Hss('World!')),
  true
);
tentamen.add(
  'Hss -> string',
  str1.endsWith('World!'),
  true
);
tentamen.add(
  'Hss -> string (sp)',
  str2.endsWith('\ud83d\ude04'),
  true
);

/**
 * indexOf
 */
tentamen.suite('indexOf');
tentamen.add(
  'Hss -> Hss',
  str1.indexOf(new Hss('or')),
  8
);
tentamen.add(
  'Hss -> string',
  str1.indexOf('or'),
  8
);
tentamen.add(
  'Hss -> string (sp)',
  str2.indexOf('\ud83d\ude04'),
  0
);
tentamen.add(
  'Hss -> string, startPosition (sp)',
  str2.indexOf('\ud83d\ude04', 3),
  6
);
tentamen.add(
  'Hss -> string, startPosition (oob)',
  str1.indexOf('o', 300),
  -1
);

/**
 * lastIndexOf
 */
tentamen.suite('lastIndexOf');
tentamen.add(
  'Hss -> Hss',
  str1.lastIndexOf(new Hss('l')),
  10
);
tentamen.add(
  'Hss -> string',
  str1.lastIndexOf('l'),
  10
);
tentamen.add(
  'Hss -> string, endPosition',
  str1.lastIndexOf('l', 4),
  3
);
tentamen.add(
  'Hss -> string, endPosition (sp)',
  str2.lastIndexOf('\ud83d\ude04', 10),
  6
);

/**
 * match
 */
tentamen.suite('match');
tentamen.add(
  'Hss -> Hss',
  str1.match(new Hss('l')),
  [new Hss('l')]
);
tentamen.add(
  'Hss -> string',
  str1.match('l'),
  [new Hss('l')]
);
tentamen.add(
  'Hss -> RegExp (sp)',
  str2.match(/\ud83d\ude04/g),
  [new Hss('\ud83d\ude04'), new Hss('\ud83d\ude04'), new Hss('\ud83d\ude04')]
);

/**
 * padEnd
 */
tentamen.suite('padEnd');
tentamen.add(
  'Hss -> Hss (even)',
  str3.padEnd(9, new Hss('bar')),
  new Hss('foobarbar')
);
tentamen.add(
  'Hss -> string (uneven)',
  str3.padEnd(13, 'quux'),
  new Hss('fooquuxquuxqu')
);
tentamen.add(
  'Hss -> string (no-op)',
  str3.padEnd(2, 'a'),
  new Hss('foo')
);
tentamen.add(
  'Hss -> string (sp)',
  str4.padEnd(5, 'a'),
  new Hss('\ud83d\ude04\ud83d\ude04aaa')
);

/**
 * padStart
 */
tentamen.suite('padStart');
tentamen.add(
  'Hss -> Hss (even)',
  str3.padStart(9, new Hss('bar')),
  new Hss('barbarfoo')
);
tentamen.add(
  'Hss -> string (uneven)',
  str3.padStart(13, 'quux'),
  new Hss('quuxquuxqufoo')
);
tentamen.add(
  'Hss -> string (no-op)',
  str3.padStart(2, 'a'),
  new Hss('foo')
);
tentamen.add(
  'Hss -> string (sp)',
  str4.padStart(5, 'a'),
  new Hss('aaa\ud83d\ude04\ud83d\ude04')
);

/**
 * repeat
 */
tentamen.suite('repeat');
tentamen.add(
  'zero',
  str3.repeat(0),
  new Hss('')
);
tentamen.add(
  'one',
  str3.repeat(1),
  new Hss('foo')
);
tentamen.add(
  'five',
  str3.repeat(5),
  new Hss('foofoofoofoofoo')
);

/**
 * replace
 */
tentamen.suite('replace');
tentamen.add(
  'Hss -> Hss',
  str1.replace(new Hss('Hello'), new Hss('Goodbye')),
  new Hss('Goodbye, World!')
);
tentamen.add(
  'Hss -> string',
  str3.replace('foo', 'bar'),
  new Hss('bar')
);
tentamen.add(
  'Hss -> RegExp (sp)',
  str4.replace(/\ud83d\ude04/g, '😍'),
  new Hss('\ud83d\ude0d\ud83d\ude0d')
);

/**
 * startsWith
 */
tentamen.suite('startsWith');
tentamen.add(
  'Hss -> Hss',
  str1.startsWith(new Hss('Hello,')),
  true
);
tentamen.add(
  'Hss -> string',
  str1.startsWith('Hello,'),
  true
);
tentamen.add(
  'Hss -> string (sp)',
  str2.startsWith('\ud83d\ude04'),
  true
);

tentamen.done();
