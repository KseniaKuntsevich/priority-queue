const Node = require('./node');

class MaxHeap {
	constructor() {
		this.parentNodes = [];
		this.root = null;
		this.length = 0;
		
	}

	push(data, priority) {
		let node = new Node(data, priority);

        this.insertNode(node);

		this.shiftNodeUp(node);
	}

	pop() {
		if(!this.root) return;

        let detached = this.detachRoot();

        this.restoreRootFromLastInsertedNode(detached);

        this.shiftNodeDown(this.root);

        return detached.data;
		
	}

	detachRoot() {
		let copy = this.root;

        let rootIndex = this.parentNodes.indexOf(this.root);

        if(rootIndex > -1 ) this.parentNodes.splice(rootIndex , 1);

        this.root = null;

        this.length--;

        return copy;
		
	}

	restoreRootFromLastInsertedNode(detached) {
		let node = this.parentNodes[this.parentNodes.length - 1];

        if(!node) return;

        if(node.parent && node.parent.left === node) node.parent.left = null;
        if(node.parent && node.parent.right === node) node.parent.right = null;

        this.root = node;

        if(detached.left) detached.left.parent = node;
        if(detached.right) detached.right.parent = node;

        node.left = detached.left;
        node.right = detached.right;


        this.parentNodes.pop();

        if(this.parentNodes.length <= 1) {

        	this.parentNodes.unshift(node)

        } else if(this.parentNodes.indexOf(node.parent) < 0) {

        	this.parentNodes.unshift(node.parent)
        }
        
        
        
	}

	size() {
		return this.length
		
	}

	isEmpty() {
		return !this.root;
		
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.length = 0
		
	}

	insertNode(node) {
		if(this.length < 1) { 
	        this.root = node ;
	        this.parentNodes.push(node)
	        this.length++;
	        return
        };
       
        let nodeParent = this.parentNodes[0];

        if(nodeParent.left) this.parentNodes.shift()
        
        this.parentNodes.push(node)
       
        nodeParent.appendChild(node)

        this.length++;
		
	}

	shiftNodeUp(node) {
        if(!node.parent) {
            this.root = node;
            return;
        };

        if(node.priority <= node.parent.priority) return;

        let parentIndex = this.parentNodes.indexOf(node.parent);
        let nodeIndex = this.parentNodes.indexOf(node);

        if(parentIndex >= 0) this.parentNodes[parentIndex] = node;
        if(nodeIndex >= 0) this.parentNodes[nodeIndex] = node.parent;
   
        node.swapWithParent();
        this.shiftNodeUp(node);
		
	}

	shiftNodeDown(node) {
        if(!node || !node.left && !node.right) return;

        let leftPriority = node.left ? node.left.priority : 0;
        let rightPriority = node.right ? node.right.priority : 0;

        let priorityChild = leftPriority > rightPriority ? node.left : node.right;

        if(!priorityChild || priorityChild.priority < node.priority) return;

        let parentIndex = this.parentNodes.indexOf(node);
        let nodeIndex = this.parentNodes.indexOf(priorityChild);

        if(parentIndex >= 0) this.parentNodes[parentIndex] = priorityChild;    
        if(nodeIndex >= 0) this.parentNodes[nodeIndex] = node;
        
        priorityChild.swapWithParent();

        if(node === this.root) this.root = node.parent;
   
        this.shiftNodeDown(node)
		
	}
}

module.exports = MaxHeap;
