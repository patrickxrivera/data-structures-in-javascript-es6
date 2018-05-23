/* eslint-disable */
class Heap {
  constructor() {
    this.storage = [];
    this.size = 0;
  }
  // Inserts the given value in the heap
  // Calls bubbleUp in order to put the newly-inserted element in the right place in the heap
  insert(val) {
    this.pushToStorage(val);
    this.size++;

    if (this.size === 1) return;

    this.callBubbleUp();
  }
  // Deletes the element located at the front of the heap (the max if a max heap, or a min if a min heap)
  // Calls siftDown in order to reorganize the heap with a new max/min
  // In some specifications, this method is also called `poll`
  delete() {
    console.log(this.storage);
    this.deleteSwap();
    this.siftDown();
  }

  deleteSwap() {
    const lastValue = this.getLastValue();
    const lastIdx = this.getLastIdx();

    const firstValue = this.getFirstValue();
    const firstIdx = 0;

    const last = [lastIdx, lastValue];
    const first = [firstIdx, firstValue];

    this.swap(...last, ...first);

    this.storage.pop();
  }
  // Returns the maximum value in the heap in constant time
  getMax() {
    return this.storage[0];
  }
  // Returns the size of the heap
  getSize() {}
  // Returns the storage array
  getStorage() {
    return this.storage;
  }
  // Moves the element at the specified index "up" by swapping it with its parent
  // if its parent value is less than the value located at the input index
  // This method is only used by the heap itself in order to maintain the heap property
  bubbleUp(currIdx) {
    const parentValue = this.getParentValue(currIdx);
    const currValue = this.getValueAt(currIdx);

    if (parentValue > currValue) return;

    const parentIdx = this.getParentIdx(currIdx);

    const parent = [parentIdx, parentValue];
    const curr = [currIdx, currValue];

    this.swap(...parent, ...curr);

    if (parentIdx === 0) return;

    this.bubbleUp(parentIdx);
  }
  // First grabs the indices of this element's children and determines which of the children are larger
  // If the larger of the child elements is larger than the parent, the child element is swapped with the parent
  // This method is only used by the heap itself in order to maintain the heap property
  siftDown(currIdx = 0) {
    const currValue = this.getValueAt(currIdx);
    const curr = [currIdx, currValue];

    const leftChildIdx = currIdx + 1;
    const leftChildValue = this.getValueAt(leftChildIdx);
    const left = [leftChildIdx, leftChildValue];

    const rightChildIdx = currIdx + 2;
    const rightChildValue = this.getValueAt(rightChildIdx);
    const right = [rightChildIdx, rightChildValue];

    switch (true) {
      case currValue < leftChildValue && currValue < rightChildValue:
      case currValue < leftChildValue && currValue >= rightChildValue:
        this.swap(...left, ...curr);
        this.siftDown(leftChildIdx);
        return;
      case currValue >= leftChildValue && currValue < rightChildValue:
        this.swap(...right, ...curr);
        this.siftDown(rightChildIdx);
        return;
      default:
        return;
    }
  }

  swap(firstIdx, firstValue, secondIdx, secondValue) {
    const temp = this.storage[firstIdx];
    this.storage[firstIdx] = secondValue;
    this.storage[secondIdx] = firstValue;
  }

  pushToStorage(val) {
    this.storage.push(val);
  }

  getValueAt(idx) {
    return this.storage[idx];
  }

  getParentValue(idx) {
    const parentIdx = this.getParentIdx(idx);
    return this.getValueAt(parentIdx);
  }

  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  getLastIdx() {
    return this.size - 1;
  }

  getLastValue() {
    return this.storage[this.getLastIdx()];
  }

  getFirstValue() {
    return this.storage[0];
  }

  callBubbleUp() {
    this.bubbleUp(this.getLastIdx());
  }
}

module.exports = Heap;
