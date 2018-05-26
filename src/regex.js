// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const match123 = (input) => {
  const regexp = /[aex]/gi;
  const test = input.match(regexp);
  return test;
};

module.exports = {
  match123,
};

// exercise # 2
// [0-9+0-9\s+monkey+s?]
