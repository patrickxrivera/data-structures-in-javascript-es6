/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */

const DynamicArray = require('../src/dynamicArray');

describe('Dynamic Array', () => {
  let dynamicArray;

  beforeEach(() => {
    dynamicArray = new DynamicArray(3);
  });

  it('starts off with capacity of 3', () => {
    expect(dynamicArray.capacity).toBe(3);
  });

  it('should push items', () => {
    dynamicArray.push(1);
    dynamicArray.push(2);
    dynamicArray.push(3);
    expect(dynamicArray.store[0]).toBe(1);
    expect(dynamicArray.store[1]).toBe(2);
    expect(dynamicArray.store[2]).toBe(3);
  });

  it('should pop items', () => {
    dynamicArray.push(1);
    dynamicArray.push(2);
    expect(dynamicArray.pop()).toBe(2);
    expect(dynamicArray.store[0]).toBe(1);
    expect(dynamicArray.store[1]).toBe(undefined);
    expect(dynamicArray.length).toBe(1);
  });

  it('unshifts items onto array', () => {
    dynamicArray.unshift(3);
    dynamicArray.unshift(2);
    dynamicArray.unshift(1);
    expect(dynamicArray.store[0]).toBe(1);
    expect(dynamicArray.store[1]).toBe(2);
    expect(dynamicArray.store[2]).toBe(3);
  });

  it('shift items out of array', () => {
    dynamicArray.push(1);
    dynamicArray.push(2);
    expect(dynamicArray.shift()).toBe(1);
    expect(dynamicArray.store[0]).toBe(2);
  });

  it('resizes when the array reaches capacity', () => {
    dynamicArray.unshift(1);
    dynamicArray.unshift(2);
    dynamicArray.unshift(3);
    expect(dynamicArray.capacity).toBe(3);
    dynamicArray.unshift(4);
    expect(dynamicArray.capacity).toBe(6);
  });

  it('correctly handles a mixture of pops, pushes, shifts, and unshifts', () => {
    dynamicArray.push(1);
    dynamicArray.push(2);
    dynamicArray.push(3);
    dynamicArray.pop();
    dynamicArray.unshift(4);
    dynamicArray.shift();
    expect(dynamicArray.length).toBe(2);
    expect(dynamicArray.capacity).toBe(3);
    expect(dynamicArray.store[0]).toBe(1);
    expect(dynamicArray.store[1]).toBe(2);
  });

  it('should return the value at the given index', () => {
    dynamicArray.push(1);
    dynamicArray.push(2);
    dynamicArray.push(3);
    expect(dynamicArray.getValueAtIdx(2)).toBe(3);
  });

  it('should set the value at the given index', () => {
    dynamicArray.setValueAtIdx(0, 1);
    expect(dynamicArray.getValueAtIdx(0)).toBe(1);
  });

  it('should delete a value at the given index', () => {
    dynamicArray.push(1);
    dynamicArray.push(2);
    dynamicArray.push(3);
    expect(dynamicArray.deleteValueAtIdx(1)).toBe(2);
    expect(dynamicArray.store.length).toBe(2);
    expect(dynamicArray.store[0]).toBe(1);
    expect(dynamicArray.store[1]).toBe(3);
    expect(dynamicArray.pointer).toBe(2);
  });

  it('should return an error message when attempting to pop an empty list', () => {
    expect(dynamicArray.pop()).toBe('Unable to perform this action because array is empty.');
  });

  it('should return an error message when attempting to shift an empty list', () => {
    expect(dynamicArray.shift()).toBe('Unable to perform this action because array is empty.');
  });

  it('should return an error message when attempting to get a value at an out of range index', () => {
    dynamicArray.push(1);
    dynamicArray.push(2);
    dynamicArray.push(3);
    expect(dynamicArray.getValueAtIdx(5)).toBe('This index is out of range.');
  });

  it('should return an error message when attempting to set a value at an out of range index', () => {
    expect(dynamicArray.setValueAtIdx(5)).toBe('This index is out of range.');
  });

  it('should return an error message when attempting to delete a value at an out of range index', () => {
    expect(dynamicArray.deleteValueAtIdx(5)).toBe('This index is out of range.');
  });
});
