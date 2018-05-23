// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

const hasTree = queue => queue.length;

class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  // Wraps the input value in a new BinarySearchTree and
  // assigns it to either the left or right subtree,
  // depending on its value
  insert(value) {
    const newTree = new BinarySearchTree(value);

    const search = (currTree, treeToInsert) => {
      if (treeToInsert.value > currTree.value) {
        if (currTree.right === null) return (currTree.right = treeToInsert);
        search(currTree.right, treeToInsert);
        return;
      }

      if (currTree.left === null) return (currTree.left = treeToInsert);

      search(this.left, newTree);
    };

    return search(this, newTree);
  }
  // Checks the binary search tree for the input target
  // Can be written recursively or iteratively
  contains(targetParam) {
    const search = (currTree, target) => {
      if (currTree === null) return false;

      if (currTree.value === target) return true;

      return currTree.value > target
        ? search(currTree.left, target)
        : search(currTree.right, target);
    };

    return search(this, targetParam);
  }
  // Traverses the tree in a depth-first manner, i.e. from top to bottom
  // Applies the given callback to each tree node in the process
  depthFirstForEach(cb, currTree = this) {
    cb(currTree.value);
    currTree.left && this.depthFirstForEach(cb, currTree.left);
    currTree.right && this.depthFirstForEach(cb, currTree.right);
  }
  // Traverses the tree in a breadth-first manner, i.e. in layers, starting
  // at the root node, going down to the root node's children, and iterating
  // through all those nodes first before moving on to the next layer of nodes
  // Applies the given callback to each tree node in the process
  // You'll need the queue-helper file for this. Or could you roll your own queue
  // again. Whatever floats your boat.
  breadthFirstForEach(cb) {
    const queue = [this];

    while (hasTree(queue)) {
      const currTree = queue.shift();

      cb(currTree.value);

      currTree.left && queue.push(currTree.left);
      currTree.right && queue.push(currTree.right);
    }
  }

  preOrderForEach(cb, currTree = this) {
    cb(currTree.value);
    currTree.left && this.preOrderForEach(cb, currTree.left);
    currTree.right && this.preOrderForEach(cb, currTree.right);
  }

  inOrderForEach(cb, currTree = this) {
    if (currTree.left) {
      this.inOrderForEach(cb, currTree.left);
    }

    cb(currTree.value);

    if (currTree.right) {
      this.inOrderForEach(cb, currTree.right);
    }
  }

  postOrderForEach(cb, currTree = this) {
    if (currTree.left) {
      this.postOrderForEach(cb, currTree.left);
    }

    if (currTree.right) {
      this.postOrderForEach(cb, currTree.right);
    }
    cb(currTree.value);
  }
}

module.exports = BinarySearchTree;
