/* eslint-disable no-undef */

const getIdxBelowMax = require('../src/hashFunction');

xdescribe('Hash Function', () => {
  const testStr = 'hello';
  const testArr = [1, 2, 3];
  const max = 10;

  it('should return the same value for the same key each time', () => {
    const hashOne = getIdxBelowMax(testStr, max);
    const hashTwo = getIdxBelowMax(testStr, max);
    const hashThree = getIdxBelowMax(testStr, max);
    expect(hashOne).toEqual(hashTwo);
    expect(hashTwo).toEqual(hashThree);
  });
});
