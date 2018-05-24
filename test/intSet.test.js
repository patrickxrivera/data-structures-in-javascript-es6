/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */

const IntSet = require('../src/intSet');

const isEmptyArray = item => item.length === 0 && typeof item === 'object';

describe('Int Set', () => {
  let intSet;

  beforeEach(() => {
    intSet = new IntSet(20);
  });

  it('should initialize an empty array with subarrays', () => {
    const intSetStore = intSet.store.every(isEmptyArray);
    expect(intSetStore).toBe(true);
    expect(intSet.store.length).toBe(20);
  });

  it('should be able to insert a number', () => {
    intSet.insert(4);
    expect(intSet.store[3][0]).toBe(4);
  });

  it('should be able to remove a number', () => {
    intSet.insert(4);
    intSet.insert(24);
    expect(intSet.store[3][0]).toBe(4);
    expect(intSet.store[3][1]).toBe(24);
    intSet.remove(4);
    expect(intSet.store[3][0]).toBe(24);
  });

  it('should return a boolean of whether the number exists in the set', () => {
    intSet.insert(3);
    expect(intSet.includes(3)).toBe(true);
    expect(intSet.includes(71)).toBe(false);
  });

  it('should be able to hold negative numbers', () => {
    intSet.insert(-3);
    expect(intSet.store[2][0]).toBe(-3);
  });

  it('should resize when the number of items is one below the number of buckets', () => {
    intSet = new IntSet(3);
    intSet.insert(1);
    intSet.insert(2);
    expect(intSet.numOfUsedBuckets).toBe(2);

    intSet.insert(4);
    expect(intSet.store.length).toBe(6);
    expect(intSet.numOfUsedBuckets).toBe(3);
    expect(intSet.store[3][0]).toBe(4);
  });

  it('should be able to store a string', () => {
    intSet.insert('hello');
    expect(intSet.includes('hello')).toBe(true);
  });
});
