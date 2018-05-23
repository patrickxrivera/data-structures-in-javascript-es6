// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

const getHashedIdx = require('./hashFunction');

const not = fn => (...args) => !fn(args);

const isTargetNum = targetNum => currNum => targetNum === currNum;

const isNotTargetNum = targetNum => currNum => targetNum !== currNum;

class IntSet {
  constructor(size) {
    this.size = size;
    this.store = this._initStore(size);
    this.numOfUsedBuckets = 0;
  }

  insert(val) {
    this._checkCapacity();

    const idx = this._getIdx(val);

    this.numOfUsedBuckets++;

    this.store[idx].push(val);
  }

  remove(num) {
    const idx = this._getIdx(num);

    this.numOfUsedBuckets--;

    this.store[idx] = this.store[idx].filter(isNotTargetNum(num));
  }

  includes(num) {
    const idx = this._getIdx(num);
    return this.store[idx].some(isTargetNum(num));
  }

  _checkCapacity() {
    if (this.numOfUsedBuckets + 1 >= this.size) {
      this._resize();
    }
  }

  _resize() {
    for (let i = 0; i < this.size; i++) {
      this.store.push([]);
    }

    this.size *= 2;
  }

  _getIdx(val) {
    return typeof val === 'number' ? this._getUnhashedIdx(val) : getHashedIdx(val, this.size);
  }

  _getUnhashedIdx(num) {
    return (Math.abs(num) - 1) % this.size;
  }

  _initStore(size) {
    return Array(size).fill([]);
  }
}

module.exports = IntSet;
