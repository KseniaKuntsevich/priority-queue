const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap()
		this.size = 0;


	}

	push(data, priority) {
		if(this.size === this.maxSize){
			throw new Error ('Queue is full, maxSize is: ' + this.maxSize);
		}
		this.heap.push(data, priority);

		this.size++;

	}

	shift() {
		if(this.size === 0) {
			throw new Error ('Has not items to shift');
		}
		let removed = this.heap.pop();

		this.size--;

		return removed;


	}

	size() {
		return this.size;
	}

	isEmpty() {
		return this.size === 0;
	}
}

module.exports = PriorityQueue;
