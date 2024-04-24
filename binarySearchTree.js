import Node from './node.js'

class BinarySearchTree {
    constructor(baseArray) {
        // for getting the first root of the binarySearchTree
        this._root = this.buildTree(this.buildNodeArray(baseArray));
    }

    // from an array of sorted nodes builds the tree and returns the root
    buildTree(sortedArray) {
        if (sortedArray.length === 0) {
            return null;
        }
        const mid = Math.floor(sortedArray.length / 2);
        const node = sortedArray[mid];
        node.left = this.buildTree(sortedArray.slice(0, mid));
        node.right = this.buildTree(sortedArray.slice(mid + 1));
        return node;
    }

    // From an array of non-sorted data creates a sorted array of nodes

    buildNodeArray(array) {
        let arrayForTree = this.mergeSort(array);
        let balancedArray = []
        for (let i = 0; i < arrayForTree.length; i++) {
            let newNodeForBalancedArray = new Node(arrayForTree[i]);
            while (arrayForTree[i] === arrayForTree[i + 1]) {
                newNodeForBalancedArray.count++;
                i++;
            }
            balancedArray.push(newNodeForBalancedArray);
        }
        return balancedArray;
    }

    //calls insertRec
    insertNode(value) {
        this.insertRec(this._root, value)
    }

    // recursively inserts a Node with a data value
    insertRec(root, value) {
        let actualNode = root;

        // If the tree is empty, return a new node
        if (actualNode === null) {
            actualNode = new Node(value);
            return actualNode;
        }

        // Otherwise, recur down the tree
        if (value < actualNode.data) {
            actualNode.left = this.insertRec(actualNode.left, value);
        } else if (value > actualNode.data) {
            actualNode.right = this.insertRec(actualNode.right, value);
        } else if (value === actualNode.data) {
            actualNode.count++;
        }

        // Return the (unchanged) node pointer
        return actualNode;
    }

    find(value) {
        let actualNode = this._root;
        if (actualNode === null) {
            return;
        }
        while (actualNode) {
            if (value < actualNode.data) {
                actualNode = actualNode.left;
            }
            else if (value > actualNode.data) {
                actualNode = actualNode.right;
            } else if(actualNode.data === value){
                return actualNode;
            }
        }
        return false;
    }

    deleteNode(value){
        this.deleteRec(this._root, value);
    }

    deleteRec(root, value){
        if (root === null){
            return root;
        }

        if(value < root.data){
            root.left = this.deleteRec(root.left, value);
        } else if(value > root.data){
            root.right = this.deleteRec(root.right, value);
        } else{
            if(root.left === null){
                return root.right;
            }else if(root.right === null){
                return root.left;
            }
            
            root.data = this.minValue(root.right).data;
            root.count = this.minValue(root.right).count;
            root.right = this.deleteRec(root.right, root.data);
        }
        return root;
    }

    minValue(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    levelOrder(){
        let root = this._root;
        let queue = [];
        let dataArray = [];

        if(root === null){
            return;
        }

        queue.push(root);
        while(queue.length){
            let temp = queue.shift();
            dataArray.push(temp.data);
            if(temp.left){
                queue.push(temp.left);
            }
            if(temp.right){
                queue.push(temp.right);
            }
        }
        return dataArray;
    }

    mergeSort(list) {
        if (list.length <= 1) {
            return list;
        }

        let listLeft = this.mergeSort(list.slice(0, (list.length / 2)));
        let listRight = this.mergeSort(list.slice(list.length / 2));
        let mergedList = []

        while (listLeft.length >= 1 && listRight.length >= 1) {
            if (listLeft[0] < listRight[0]) {
                mergedList.push(listLeft.shift(listLeft[0]));
            } else {
                mergedList.push(listRight.shift(listRight[0]));
            }
        }

        if (listLeft.length < 1) {
            mergedList = mergedList.concat(listRight);
        } else if (listRight.length < 1) {
            mergedList = mergedList.concat(listLeft);
        }

        return mergedList;
    }
}


// function to visually see the BST

let prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let checkTree = new BinarySearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 9, 67, 9, 6345, 324]);


prettyPrint(checkTree._root)

console.log(checkTree.levelOrder());

//console.log(checkTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
//console.log(checkTree.buildNodeArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 9, 67, 9, 6345, 324]));
//console.log(checkTree.buildTree(checkTree.buildNodeArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 9, 67, 9, 6345, 324])));



checkTree.insertNode(10);
checkTree.insertNode(10);
checkTree.insertNode(10);
checkTree.insertNode(9);
checkTree.insertNode(45);
checkTree.insertNode(44);
checkTree.insertNode(43);
checkTree.insertNode(42);
checkTree.insertNode(100);

console.log(checkTree)

console.log(checkTree.find(23));
console.log(checkTree.find(4));
console.log(checkTree.find(999));
console.log(checkTree.deleteNode(67));
prettyPrint(checkTree._root)
console.log(checkTree.find(4))

console.log(checkTree.levelOrder());