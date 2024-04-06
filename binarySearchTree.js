import Node from './node.js'

class BinarySearchTree {
    constructor(baseArray){
        this._root = null;
    }

    buildTree(array){
        let arrayForTree = this.mergeSort(array);
        for(let i = 0; i< arrayForTree.length - 1 ;i++){
            let countRepeatedData = 0
            while(arrayForTree[i] === )
        }
        return balancedTree;
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

let checkTree = new BinarySearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let checkNode = new Node("3");

//console.log(checkTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(checkTree.tree);