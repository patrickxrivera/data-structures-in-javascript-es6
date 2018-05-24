// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-case-declarations */

const getIdxBelowMax = require('./hashFunction');
const DoublyLinkedList = require('./doublyLinkedList');

class HashMap {
  constructor(size = 20) {
    this.size = size;
    this.count = 0;
    this.store = [];
    this.errorMsg = 'Key not in list.';
  }

  set(key, val) {
    const bucket = this._getBucket(key);

    if (this._hasReachedCapacity()) this._resize();

    switch (true) {
      case this._isEmpty(bucket):
        const list = new DoublyLinkedList();
        this.store[bucket] = list;
        list.append(key, val);
        this.count++;
        return;
      case this.store[bucket].includes(key):
        this.store[bucket].update(key, val);
        return;
      default:
        this.store[bucket].append(key, val);
        this.count++;
        return;
    }
  }

  get(key) {
    const bucket = this._getBucket(key);

    return this._isEmpty(bucket) ? this.errorMsg : this.store[bucket].get(key);
  }

  remove(key) {
    const bucket = this._getBucket(key);
    const removed = this.store[bucket].remove(key);

    if (this._isError(removed)) return;

    this.count++;
  }

  each(cb, store) {
    store.forEach((bucket) => {
      bucket.each(([key, val]) => cb(key, val));
    });
  }

  _hasReachedCapacity() {
    const fillPercentage = this.count / this.size;
    return fillPercentage >= 0.75;
  }

  _resize() {
    const newSize = this.size * 2;
    const oldStore = this.store;

    this.store = Array(newSize).fill([]);

    this._rehash(oldStore);
  }

  // `TODO`: get rehash working
  _rehash(oldStore) {
    this.each(this.set, oldStore);
  }

  _getBucket(key) {
    return getIdxBelowMax(key, this.size);
  }

  _isEmpty(bucket) {
    return this.store[bucket] === undefined;
  }

  _isError(item) {
    return item === this.errorMsg;
  }
}

module.exports = HashMap;
