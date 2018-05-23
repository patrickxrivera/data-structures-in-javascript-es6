// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

class Link {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Link(Infinity, Infinity);
    this.tail = new Link(-Infinity, -Infinity);
  }

  first() {
    return this.head.next.val;
  }

  isEmpty() {
    return this.head.next === null;
  }

  append(key, val) {
    if (this.isEmpty()) {
      const link = new Link(key, val);

      this.head.next = link;
      this.tail.prev = link;

      link.prev = this.head;
      link.next = this.tail;
      return;
    }

    const prevTail = this.tail.prev;
    const newTail = new Link(key, val);

    this.tail.prev = newTail;

    newTail.prev = prevTail;
    newTail.next = this.tail;

    prevTail.next = newTail;
  }

  update(key, val, currLink = this.head.next) {
    switch (true) {
      case currLink.key === key:
        currLink.val = val;
        return;
      case currLink.next === null:
        return 'Key not in list.';
      default:
        return this.update(key, val, currLink.next);
    }
  }

  remove(key, currLink = this.head.next) {
    switch (true) {
      case currLink.key === key:
        return this._removeLink(currLink);
      case currLink.next === null:
        return 'Key not in list.';
      default:
        return this.remove(key, currLink.next);
    }
  }

  get(key, currLink = this.head.next) {
    switch (true) {
      case currLink.key === key:
        return currLink.val;
      case currLink.next === null:
        return 'Key not in list.';
      default:
        return this.get(key, currLink.next);
    }
  }

  includes(key, currLink = this.head.next) {
    switch (true) {
      case currLink.key === key:
        return true;
      case currLink.next === null:
        return false;
      default:
        return this.includes(key, currLink.next);
    }
  }

  each(cb, currLink = this.head.next) {
    if (currLink.next === null) return;

    cb([currLink.key, currLink.val]);

    return this.each(cb, currLink.next);
  }

  removeHead() {
    this.head.next = this.head.next.next;
    this.head.next.prev = this.head;
  }

  getHeadLink() {
    return this.head.next;
  }

  getTailLink() {
    return this.tail.prev;
  }

  getHeadVal() {
    return this.head.next.val;
  }

  getTailVal() {
    return this.tail.prev.val;
  }

  // TODO: figure out how to use each to replace switch statements in above methods
  // enum(successRes, errorRes, currLink = this.head.next, ...args) {}

  _removeLink(currLink) {
    const prevLink = currLink.prev;
    const nextLink = currLink.next;
    prevLink.next = nextLink;
    nextLink.prev = prevLink;
  }
}

module.exports = DoublyLinkedList;
