/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */
/* eslint-disable no-underscore-dangle */

const HashMap = require('../src/hashMap');

xdescribe('Hash Map', () => {
  let hashMap;

  beforeEach(() => {
    hashMap = new HashMap(3);
  });

  it('should contain methods, "set", "get", and "delete"', () => {
    const hasSet = Object.getPrototypeOf(hashMap).hasOwnProperty('set');
    const hasGet = Object.getPrototypeOf(hashMap).hasOwnProperty('get');
    const hasRemove = Object.getPrototypeOf(hashMap).hasOwnProperty('remove');
    expect(hasSet).toBe(true);
    expect(hasGet).toBe(true);
    expect(hasRemove).toBe(true);
  });

  it('should return the same hash value for the same key in multiple instances', () => {
    const bucketOne = hashMap._getBucket('Three');
    const bucketTwo = hashMap._getBucket('Three');
    expect(bucketOne).toBe(bucketTwo);
  });

  it('should set a key-value pair in the hash map', () => {
    hashMap.set('Three', 3);
    expect(hashMap.store[2].head.next.key).toBe('Three');
    expect(hashMap.store[2].head.next.val).toBe(3);
    expect(hashMap.store[2].tail.prev.key).toBe('Three');
    expect(hashMap.store[2].tail.prev.val).toBe(3);
  });

  it('should update a value for the given key', () => {
    hashMap.set('Three', 3);
    hashMap.set('Three', 33);
    expect(hashMap.store[2].head.next.key).toBe('Three');
    expect(hashMap.store[2].head.next.val).toBe(33);
    expect(hashMap.store[2].tail.prev.key).toBe('Three');
    expect(hashMap.store[2].tail.prev.val).toBe(33);
  });

  it('should get a value for the given key', () => {
    hashMap.set('Three', 3);
    expect(hashMap.get('Three')).toBe(3);
    hashMap.set('Three', 33);
    expect(hashMap.get('Three')).toBe(33);
  });

  it('should remove a value for the given key', () => {
    hashMap.set('Three', 3);
    hashMap.remove('Three');
    expect(hashMap.store[2].includes('Three')).toBe(false);
  });

  it('should enumerate the hash map and return each key value pair', () => {
    const arr = [];
    const foo = (key, val) => arr.push(`${key}: ${val}`);
    hashMap.set('One', 1);
    hashMap.set('Two', 2);
    hashMap.set('Three', 3);
    hashMap.each(foo, hashMap.store);
    expect(arr).toEqual(['Two: 2', 'One: 1', 'Three: 3']);
  });

  it('should return an error message when attempting to get a non-existent key', () => {
    expect(hashMap.get('Eleven')).toBe('Key not in list.');
  });

  xit('should resize the hash map when at least 75% of buckets are filled', () => {
    hashMap.set('One', 1);
    hashMap.set('Two', 2);
    expect(hashMap.store.length).toBe(3);
    hashMap.set('Three', 3);
    hashMap.set('Four', 4);
    hashMap.set('Five', 5);
    expect(hashMap.store.length).toBe(6);
  });
});
