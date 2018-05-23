// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

class MaxIntSet {
  constructor(max) {
    this.max = max;
    this.store = this._initStore(max);
    this.errMsg = `Invalid number. Max size is ${this.max}.`;
  }

  insert(num) {
    const idx = this._idx(num);
    const storeVal = this.store[idx];

    switch (storeVal) {
      case false:
        this.store[idx] = true;
        return;
      case undefined:
        return this.errMsg;
      default:
        return;
    }
  }

  remove(num) {
    const idx = this._idx(num);
    const storeVal = this.store[idx];

    switch (storeVal) {
      case true:
        this.store[idx] = false;
        return;
      case undefined:
        return this.errMsg;
      default:
        return;
    }
  }

  includes(num) {
    const idx = this._idx(num);
    const storeVal = this.store[idx];

    return this._isUndefined(storeVal) ? this.errMsg : storeVal;
  }

  _isUndefined(storeVal) {
    return storeVal === undefined;
  }

  _idx(num) {
    return num - 1;
  }

  _initStore(max) {
    return Array(max).fill(false);
  }
}

module.exports = MaxIntSet;
