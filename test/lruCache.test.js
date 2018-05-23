/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */

const LRUCache = require('../src/lruCache');

describe('LRU Cache', () => {
  let lruCache;

  beforeEach(() => {
    lruCache = new LRUCache(3);
  });

  it('should have methods, "get", and "set"', () => {
    const hasSet = Object.getPrototypeOf(lruCache).hasOwnProperty('set');
    const hasGet = Object.getPrototypeOf(lruCache).hasOwnProperty('get');
    expect(hasSet).toBe(true);
    expect(hasGet).toBe(true);
  });

  it('should set values in both the hash map and the linked list', () => {
    lruCache.set('One', 1);
    expect(lruCache.map.get('One').key).toBe('One');
    expect(lruCache.map.get('One').val).toBe(1);
    expect(lruCache.store.includes('One')).toBe(true);
  });

  it('should update recently cached items in the linked list', () => {
    lruCache.set('One', 1);
    lruCache.set('Two', 2);
    expect(lruCache.store.getTailVal()).toBe(2);
    lruCache.set('One', 1);
    // console.log(lruCache.map.get('One').next);
    expect(lruCache.store.head.val).toBe(Infinity);
    expect(lruCache.store.head.next.val).toBe(2);
    expect(lruCache.store.head.next.next.val).toBe(1);
    expect(lruCache.store.head.next.next.next.val).toBe(-Infinity);
    expect(lruCache.store.tail.val).toBe(-Infinity);
    expect(lruCache.store.tail.prev.val).toBe(1);
    expect(lruCache.store.tail.prev.prev.val).toBe(2);
    expect(lruCache.store.tail.prev.prev.prev.val).toBe(Infinity);
    expect(lruCache.store.getTailVal()).toBe(1);
  });

  it('should return a cached value', () => {
    lruCache.set('One', 1);
    lruCache.set('Two', 2);
    expect(lruCache.get('Two')).toBe(2);
  });

  it('should return an error when attempting to return a non-existing value', () => {
    expect(lruCache.get('Thirty')).toBe('Key not in list.');
  });

  it('should delete old cached items when the max size has been reached', () => {
    lruCache.set('One', 1);
    lruCache.set('Two', 2);
    lruCache.set('Three', 3);
    expect(lruCache.store.includes('One')).toBe(true);
    expect(lruCache.get('One')).toBe(1);

    lruCache.set('Four', 4);
    expect(lruCache.store.includes('One')).toBe(false);
    expect(lruCache.get('One')).toBe('Key not in list.');
  });
});
