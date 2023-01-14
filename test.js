import Hss from 'hss.js';

const str = new Hss('hello');
const str2 = new Hss('world!');
const str3 = new Hss('the end of the world');

console.log(str);
console.log(str.at(-1));
console.log(str.charAt(0));
console.log(str.concat(', ', str2));
console.log(str.endsWith(new Hss('lo')));
console.log(str3.endsWith('end', 7));
console.log(str3.includes(new Hss('end')));
console.log(str3.indexOf(new Hss('end')));
