const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap()
		this.length = 0;


	}

	push(data, priority) {
		if(this.length === this.maxSize){
			throw new Error ('Queue is full, maxSize is: ' + this.maxSize);
		}
		this.heap.push(data, priority);

		this.length++;

	}

	shift() {
		if(this.length === 0) {
			throw new Error ('Has not items to shift');
		}
		let removed = this.heap.pop();

		this.length--;

		return removed;


	}

	size() {
		return this.length;
	}

	isEmpty() {
		return this.length === 0;
	}
}

module.exports = PriorityQueue;
