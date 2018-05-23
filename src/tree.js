/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
const hasNode = queue => queue.length;

class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  // Adds a new Tree node with the input value to the current Tree node
  addChild(value) {
    const node = new Tree(value);
    this.children.push(node);
  }
  // Checks this node's children to see if any of them matches the given value
  // Continues recursively until the value has been found or all of the children
  // have been checked
  contains(value) {
    let containsValue = false;

    if (this.value === value) return true;

    const search = (children) => {
      children.forEach((childNode) => {
        if (childNode.value === value) return (containsValue = true);

        if (childNode.children) search(childNode.children);
      });
    };

    search(this.children);

    return containsValue;
  }
}

module.exports = Tree;
