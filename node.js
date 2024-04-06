class Node {
    constructor(data, left = null, right = null)  {
        this.data = data;
        this.left = left;
        this.right = right;
        // depending on the implementation of the binary
        // search tree there are ways to handle duplicates
        // classically the trees don't allow duplicates
        // but in this case the program will allow duplicated data
        // using the count variable
        this.count = 1;
    }
}



export default Node;