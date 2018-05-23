/* eslint-disable no-undef */
/* eslint-disable no-undef, no-prototype-builtins */

const DoublyLinkedList = require('../src/doublyLinkedList');

xdescribe('Doubly Linked List', () => {
  let dll;

  beforeEach(() => {
    dll = new DoublyLinkedList();
  });

  it('should have a "first", "isEmpty", "append", "update", "get", "includes", and "remove" method', () => {
    const hasFirst = Object.getPrototypeOf(dll).hasOwnProperty('first');
    const hasisEmpty = Object.getPrototypeOf(dll).hasOwnProperty('isEmpty');
    const hasIncludes = Object.getPrototypeOf(dll).hasOwnProperty('includes');
    const hasAppend = Object.getPrototypeOf(dll).hasOwnProperty('append');
    const hasUpdate = Object.getPrototypeOf(dll).hasOwnProperty('update');
    const hasGet = Object.getPrototypeOf(dll).hasOwnProperty('get');
    const hasRemove = Object.getPrototypeOf(dll).hasOwnProperty('remove');
    expect(hasFirst).toBe(true);
    expect(hasisEmpty).toBe(true);
    expect(hasIncludes).toBe(true);
    expect(hasAppend).toBe(true);
    expect(hasUpdate).toBe(true);
    expect(hasGet).toBe(true);
    expect(hasRemove).toBe(true);
  });

  it('should connect the first link to the head and the tail', () => {
    dll.append('One', 1);
    expect(dll.head.val).toBe(Infinity);
    expect(dll.head.next.val).toBe(1);
    expect(dll.head.next.next.val).toBe(-Infinity);
    expect(dll.tail.val).toBe(-Infinity);
    expect(dll.tail.prev.val).toBe(1);
    expect(dll.tail.prev.prev.val).toBe(Infinity);
  });

  it('should append a key-value pair to the list', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.append('Three', 3);
    expect(dll.head.next.val).toBe(1);
    expect(dll.head.next.next.val).toBe(2);
    expect(dll.head.next.next.next.val).toBe(3);
    expect(dll.head.next.next.next.next.val).toBe(-Infinity);
    expect(dll.tail.prev.val).toBe(3);
    expect(dll.tail.prev.prev.val).toBe(2);
    expect(dll.tail.prev.prev.prev.val).toBe(1);
    expect(dll.tail.prev.prev.prev.prev.val).toBe(Infinity);
  });

  it('should return the first link in the list', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.append('Three', 3);
    expect(dll.first()).toBe(1);
  });

  it('should return the associated value for the given key', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.append('Three', 3);
    expect(dll.get('Three')).toBe(3);
    expect(dll.get('Twenty')).toBe('Key not in list.');
  });

  it('should return a boolean of whether the given key exists in the list', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.append('Three', 3);
    expect(dll.includes('Three')).toBe(true);
    expect(dll.includes('Twenty')).toBe(false);
  });

  it('should update a key-value pair', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.append('Three', 3);
    expect(dll.get('Two')).toBe(2);

    dll.update('Two', 22);
    expect(dll.get('Two')).toBe(22);

    expect(dll.update('Thirty', 30)).toBe('Key not in list.');
  });

  it('should remove a link', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.append('Three', 3);
    dll.append('Four', 4);
    expect(dll.head.next.val).toBe(1);
    expect(dll.head.next.next.val).toBe(2);
    expect(dll.head.next.next.next.val).toBe(3);
    expect(dll.head.next.next.next.next.val).toBe(4);
    expect(dll.tail.prev.val).toBe(4);
    expect(dll.tail.prev.prev.val).toBe(3);
    expect(dll.tail.prev.prev.prev.val).toBe(2);
    expect(dll.tail.prev.prev.prev.prev.val).toBe(1);

    dll.remove('Four');
    expect(dll.head.next.val).toBe(1);
    expect(dll.head.next.next.val).toBe(2);
    expect(dll.head.next.next.next.val).toBe(3);
    expect(dll.head.next.next.next.next.val).toBe(-Infinity);
    expect(dll.tail.prev.val).toBe(3);
    expect(dll.tail.prev.prev.val).toBe(2);
    expect(dll.tail.prev.prev.prev.val).toBe(1);
    expect(dll.tail.prev.prev.prev.prev.val).toBe(Infinity);
  });

  it('should remove the only link in the list', () => {
    dll.append('Three', 3);
    dll.remove('Three');
    expect(dll.includes('Three')).toBe(false);
    expect(dll.head.val).toBe(Infinity);
    expect(dll.head.next.val).toBe(-Infinity);
    expect(dll.tail.val).toBe(-Infinity);
    expect(dll.tail.prev.val).toBe(Infinity);
  });

  it('should loop through each item from head to tail', () => {
    const arr = [];
    const foo = ([key, val]) => arr.push(`${key}: ${val}`);
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.append('Three', 3);
    dll.append('Four', 4);
    dll.each(foo);
    expect(arr).toEqual(['One: 1', 'Two: 2', 'Three: 3', 'Four: 4']);
  });

  it('should return the head and tail values', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    expect(dll.getHeadVal()).toBe(1);
    expect(dll.getTailVal()).toBe(2);
  });

  it('should return the head and tail links', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    expect(dll.getHeadLink().key).toBe('One');
    expect(dll.getHeadLink().val).toBe(1);
    expect(dll.getTailLink().key).toBe('Two');
    expect(dll.getTailLink().val).toBe(2);
  });

  it('should remove the head', () => {
    dll.append('One', 1);
    dll.append('Two', 2);
    dll.removeHead();
    expect(dll.getHeadVal()).toBe(2);
    expect(dll.head.next.prev.val).toBe(Infinity);
  });
});
