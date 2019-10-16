class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
        this.left = null;
        this.right = null;


	}

	appendChild(node) {
		if (!this.left){
			this.left = node;
			node.parent = this;
		} else if (!this.right){
			this.right = node;
			node.parent = this;
		}

		
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
		} else if (this.right === node) {
			this.right = null;
		} else {
			throw new Error ('Node is not a child of this node');
		}
		node.parent = null;

	}

	remove() {
		if(!this.parent) return;

		if(this.left) left.remove();

		if(this.right) right.remove();

		this.parent.removeChild(this);

	}

	swapWithParent() {
		if(!this.parent) return;
		
 	    const x = this,
	          pa = this.parent,
	          grandPa = this.parent.parent,
	          paLeftCopy = pa.left,
	          paRightCopy = pa.right;

        if(grandPa){
            grandPa.left = grandPa.left === pa ? x : grandPa.left;
            grandPa.right = grandPa.right === pa ? x : grandPa.right;
        }
        pa.right = x.right;
        pa.left = x.left;

        x.left = paLeftCopy === x ? pa : paLeftCopy;
        x.right = paRightCopy === x ? pa : paRightCopy;

        x.parent = x.parent.parent;
        pa.parent = x;

        updateCildPar(x)
        updateCildPar(pa)

        function updateCildPar(par) {
            if(par.left) par.left.parent = par;
            if(par.right) par.right.parent = par;
        }
		
	}
}

module.exports = Node;
