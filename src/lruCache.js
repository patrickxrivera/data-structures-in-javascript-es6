// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-case-declarations */

const HashMap = require('./hashMap');
const DoublyLinkedList = require('./doublyLinkedList');

class LRUCache {
  constructor(max) {
    this.map = new HashMap();
    this.store = new DoublyLinkedList();
    this.max = max;
    this.count = 0;
    this.errorMsg = 'Key not in list.';
  }

  set(key, val) {
    const cachedItem = this.map.get(key);

    if (this._isCached(cachedItem)) {
      this._updateCache(key, val);
      return;
    }

    this.store.append(key, val);

    const newLink = this.store.getTailLink();

    this.map.set(key, newLink);

    this.count >= this.max ? this._removeOldestCachedItem(key) : this.count++;
  }

  get(key) {
    return this.map.get(key).val || this.errorMsg;
  }

  _removeOldestCachedItem(key) {
    const oldestItemKey = this.store.getHeadLink().key;
    this.store.removeHead();
    this.map.remove(oldestItemKey);
  }

  // TODO: figure out how to update linked list that hash map is referencing
  _updateCache(key, val) {
    this.store.remove(key);
    this.store.append(key, val);
  }

  _isCached(cachedItem) {
    return cachedItem !== this.errorMsg;
  }
}

module.exports = LRUCache;
