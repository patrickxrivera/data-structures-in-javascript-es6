/* eslint-disable no-undef */

const { match123 } = require('../src/regex');

describe.only('Regex', () => {
  it.only("should match a 1, followed by 0 or more 2's, followed by 0-1 3's", () => {
    const inputOne = 'Hello my favorite number is 1';
    const inputTwo = '12222';
    const inputThree = '13';
    const inputFour = '2';
    const inputFive = '133';
    expect(inputOne).toBe(true);
    // expect(inputTwo).toBe(true);
    // expect(inputThree).toBe(true);
    // expect(inputFour).toBe(false);
    // expect(inputFive).toBe(false);
  });
});
