/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */

const MaxIntSet = require('../src/maxIntSet');

describe('Max Int Set', () => {
  let maxIntSet;
  const maxSize = 5;

  beforeEach(() => {
    maxIntSet = new MaxIntSet(maxSize);
  });

  it('should have the methods, "insert", "remove", and "include"', () => {
    const hasInsert = Object.getPrototypeOf(maxIntSet).hasOwnProperty('insert');
    const hasRemove = Object.getPrototypeOf(maxIntSet).hasOwnProperty('remove');
    const hasIncludes = Object.getPrototypeOf(maxIntSet).hasOwnProperty('includes');
    expect(hasInsert).toBe(true);
    expect(hasRemove).toBe(true);
    expect(hasIncludes).toBe(true);
  });

  it('should initialize an array of the size passed in with false as the values', () => {
    const expected = [false, false, false, false, false];
    expect(maxIntSet.store).toEqual(expected);
  });

  it('should insert items into the correct positions', () => {
    maxIntSet.insert(3);
    maxIntSet.insert(2);
    const expected = [false, true, true, false, false];
    expect(maxIntSet.store).toEqual(expected);
  });

  it('should remove items from the store correctly', () => {
    maxIntSet.insert(3);
    maxIntSet.insert(2);
    maxIntSet.remove(3);
    const expected = [false, true, false, false, false];
    expect(maxIntSet.store).toEqual(expected);
  });

  it('should return a boolean indicating whether the argument is in the set', () => {
    maxIntSet.insert(3);
    maxIntSet.insert(2);
    const expectedOne = false;
    const expectedTwo = true;
    expect(maxIntSet.includes(5)).toEqual(expectedOne);
    expect(maxIntSet.includes(3)).toEqual(expectedTwo);
  });

  it('should return an error message when attempting to insert an invalid number', () => {
    const expected = `Invalid number. Max size is ${maxSize}.`;
    expect(maxIntSet.insert(12)).toBe(expected);
  });

  it('should return an error message when attempting to remove an invalid number', () => {
    const expected = `Invalid number. Max size is ${maxSize}.`;
    expect(maxIntSet.remove(12)).toBe(expected);
  });

  it('should return an error message when attempting to call includes() for an invalid number', () => {
    const expected = `Invalid number. Max size is ${maxSize}.`;
    expect(maxIntSet.includes(12)).toBe(expected);
  });
});
