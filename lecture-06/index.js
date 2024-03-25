class ListItem {
  constructor(value, prev = null, next = null) {
    this.value = value;

    this.prev = prev;
    this.next = next;
  }

  destroy() {
    this.prev = null;
    this.next = null;
    this.value = null;
  }
}

class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  *[Symbol.iterator]() {
    let currentNode = this.first;

    while (currentNode) {
      yield currentNode.value;
      currentNode = currentNode.next;
    }
  }

  add(value) {
    const listItem = new ListItem(value);

    this.first = this.first || listItem;

    if (this.last) {
      this.last.next = listItem;
      listItem.prev = this.last;
    }

    this.last = listItem;

    return this;
  }

  remove(value) {
    let node = this.first;

    while (node) {
      if (node.value !== value) {
        node = node.next;
        continue;
      }

      if (node.next) {
        node.next.prev = node.prev;
      }

      if (node.prev) {
        node.prev.next = node.next;
      } else {
        this.first = node.next;
      }

      if (node === this.last) {
        this.last = node.prev;
      }

      const nextNode = node.next;

      removed = true;
      node.destroy();

      node = nextNode;
    }

    return this;
  }
}

const list = new LinkedList();

list.add(1).add(2).add(3).add(4);
console.log(...list);
