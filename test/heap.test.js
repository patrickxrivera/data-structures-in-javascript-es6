/* eslint-disable no-undef */
const Heap = require('../src/heap');

describe('Heap', () => {
  let heap;

  beforeEach(() => {
    heap = new Heap();
  });

  it('should have methods named "insert", "delete", "getMax", "getSize", "bubbleUp", and "siftDown"', () => {
    expect(typeof heap.insert).toBe('function');
    expect(typeof heap.delete).toBe('function');
    expect(typeof heap.getMax).toBe('function');
    expect(typeof heap.getSize).toBe('function');
    expect(typeof heap.bubbleUp).toBe('function');
    expect(typeof heap.siftDown).toBe('function');
  });

  it('should properly insert multiple elements', () => {
    heap.insert(6);
    heap.insert(8);
    heap.insert(10);
    heap.insert(4);
    heap.insert(1);
    heap.insert(9);
    heap.insert(3);
    heap.insert(5);
    expect(heap.storage).toEqual([10, 6, 9, 5, 1, 8, 3, 4]);
  });

  it('should get the max value of the heap elements', () => {
    heap.insert(6);
    heap.insert(8);
    heap.insert(10);
    heap.insert(9);
    heap.insert(1);
    heap.insert(9);
    heap.insert(9);
    heap.insert(5);
    heap.insert(14);
    expect(heap.getMax()).toEqual(14);
  });

  it('should properly get the new max after the old max is deleted', () => {
    heap.insert(6);
    heap.insert(8);
    heap.insert(10);
    heap.insert(4);
    heap.insert(1);
    heap.insert(9);
    heap.insert(3);
    heap.insert(5);
    heap.delete();
    expect(heap.getMax()).toEqual(9);
  });

  it('should properly update the entire heap after the old max is deleted', () => {
    heap.insert(6);
    heap.insert(8);
    heap.insert(10);
    heap.insert(4);
    heap.insert(1);
    heap.insert(9);
    heap.insert(3);
    heap.insert(5);
    heap.delete();
    expect(heap.storage).toEqual([9, 6, 8, 5, 1, 4, 3]);
  });

  it('should delete the elements from greatest to least', () => {
    heap.insert(6);
    heap.insert(7);
    heap.insert(5);
    heap.insert(8);
    heap.insert(10);
    heap.insert(1);
    heap.insert(2);
    heap.insert(5);

    const descendingOrder = [];

    while (heap.getSize() > 0) {
      descendingOrder.push(heap.delete());
    }

    expect(descendingOrder).toEqual([10, 8, 7, 6, 5, 5, 2, 1]);
  });
});
