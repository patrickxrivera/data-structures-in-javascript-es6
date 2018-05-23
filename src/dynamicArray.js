// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

class DynamicArray {
  constructor(capacity = 20) {
    this.capacity = capacity;
    this.store = [];
    this.emptyArrayErrMsg = 'Unable to perform this action because array is empty.';
    this.outOfRangeErrMsg = 'This index is out of range.';
    this.pointer = 0;
    this._length = null;
  }

  get length() {
    return this.store.length;
  }

  push(val) {
    if (this._hasReachedCapacity()) this._resize();

    this.store[this.pointer++] = val;
  }

  pop() {
    if (this._isEmpty()) return this.emptyArrayErrMsg;

    const poppedItem = this.store[--this.pointer];
    const newStore = [];

    for (let i = 0; i < this.pointer; i++) {
      newStore[i] = this.store[i];
    }

    this.store = newStore;

    return poppedItem;
  }

  unshift(val) {
    if (this._hasReachedCapacity()) this._resize();

    const newStore = [val];

    for (let i = 1; i <= this.pointer; i++) {
      newStore[i] = this.store[i - 1];
    }

    this.store = newStore;

    this.pointer++;
  }

  shift() {
    if (this._isEmpty()) return this.emptyArrayErrMsg;

    const shiftedItem = this.store[0];
    const newStore = [];

    for (let i = 1; i < this.pointer; i++) {
      newStore[i - 1] = this.store[i];
    }

    this.store = newStore;

    this.pointer--;

    return shiftedItem;
  }

  setValueAtIdx(idx, val) {
    if (this._isOutOfRange(idx)) return this.outOfRangeErrMsg;

    this.store[idx] = val;
    this.pointer++;
  }

  getValueAtIdx(idx) {
    return this.store[idx] || this.outOfRangeErrMsg;
  }

  deleteValueAtIdx(idx) {
    if (this._isOutOfRange(idx)) return this.outOfRangeErrMsg;

    const deletedValue = this.store[idx];
    const newStore = [];

    for (let i = 0; i < idx; i++) {
      newStore[i] = this.store[i];
    }

    for (let i = idx + 1; i < this.pointer; i++) {
      newStore[i - 1] = this.store[i];
    }

    this.store = newStore;

    this.pointer--;

    return deletedValue;
  }

  _isOutOfRange(idx) {
    return idx > this.pointer || idx < 0;
  }

  _isEmpty() {
    return this.pointer === 0;
  }

  _resize() {
    this.capacity *= 2;
  }

  _hasReachedCapacity() {
    return this.pointer >= this.capacity;
  }
}

module.exports = DynamicArray;
