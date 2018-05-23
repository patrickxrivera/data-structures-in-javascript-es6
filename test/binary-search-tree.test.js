/* eslint-disable no-undef */
const BinarySearchTree = require('../src/binary-search-tree');

describe('BinarySearchTree', () => {
  let binarySearchTree;

  beforeEach(() => {
    binarySearchTree = new BinarySearchTree(10); // change this to 5 to get tests to be green
  });

  it('should have methods named "insert", "contains", "depthFirstForEach", and "breadthFirstForEach"', () => {
    expect(typeof binarySearchTree.insert).toBe('function');
    expect(typeof binarySearchTree.contains).toBe('function');
    expect(typeof binarySearchTree.depthFirstForEach).toBe('function');
    expect(typeof binarySearchTree.breadthFirstForEach).toBe('function');
  });

  it('should insert values at the correct location in the tree', () => {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    binarySearchTree.insert(12);
    binarySearchTree.insert(11);
    expect(binarySearchTree.left.right.value).toBe(3);
    expect(binarySearchTree.right.left.value).toBe(11);
  });

  it('should have a working "contains" method', () => {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).toBe(true);
    expect(binarySearchTree.contains(8)).toBe(false);
  });

  it('should execute a callback on every value in the tree using "depthFirstForEach" in the correct order', () => {
    const array = [];
    const foo = value => array.push(value);
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(9);
    binarySearchTree.depthFirstForEach(foo);
    expect(array).toEqual([10, 2, 3, 7, 9]);
  });

  it('should execute a callback on every value in the tree using "breadthFirstForEach" in the correct order', () => {
    const array = [];
    const foo = value => array.push(value);
    binarySearchTree.insert(4);
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(5);
    binarySearchTree.insert(8);
    binarySearchTree.insert(13);
    binarySearchTree.insert(18);
    binarySearchTree.insert(14);
    binarySearchTree.breadthFirstForEach(foo);
    expect(array).toEqual([10, 4, 13, 2, 7, 18, 5, 8, 14]);
  });

  it('should execute a callback on every value in the tree using "preOrderForEach" in the correct order', () => {
    const array = [];
    const foo = value => array.push(value);
    binarySearchTree.insert(4);
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(5);
    binarySearchTree.insert(8);
    binarySearchTree.insert(13);
    binarySearchTree.insert(18);
    binarySearchTree.insert(14);
    binarySearchTree.preOrderForEach(foo);
    expect(array).toEqual([10, 4, 2, 7, 5, 8, 13, 18, 14]);
  });

  it('should execute a callback on every value in the tree using "inOrderForEach" in the correct order', () => {
    const array = [];
    const foo = value => array.push(value);
    binarySearchTree.insert(4);
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(5);
    binarySearchTree.insert(8);
    binarySearchTree.insert(13);
    binarySearchTree.insert(18);
    binarySearchTree.insert(14);
    binarySearchTree.inOrderForEach(foo);
    expect(array).toEqual([2, 4, 5, 7, 8, 10, 13, 14, 18]);
  });

  it('should execute a callback on every value in the tree using "postOrderForEach" in the correct order', () => {
    const array = [];
    const foo = value => array.push(value);
    binarySearchTree.insert(4);
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(5);
    binarySearchTree.insert(8);
    binarySearchTree.insert(13);
    binarySearchTree.insert(18);
    binarySearchTree.insert(14);
    binarySearchTree.postOrderForEach(foo);
    expect(array).toEqual([2, 5, 8, 7, 4, 14, 18, 13, 10]);
  });
});
