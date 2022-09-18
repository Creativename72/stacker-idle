import {SevenBag} from "./SevenBag.js"

export class NextQueue {
  constructor(size) {
    this.bag = new SevenBag();
    this.queue = [];
    for (var i = 0; i < size;i++) {
      this.queue.push(this.bag.getNextPiece());
    }
  }
  getNextPiece() {
    this.queue.push(this.bag.getNextPiece())
    return this.queue.shift() //removes and returns the first element in the queue
  }
}