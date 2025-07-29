import { Node } from "./node";

class Binary_Search_Tree{
    constructor(){
        this.root = null;
    }

    buildTree(array){
        for(let i=0;i<array.length;i++){
            this.append[array[i]];
        }
    }

    append(value){
        const newnode = new Node(value);
        let temp = this.root;
        if(this.root == null){
            this.root = newnode;
            return;
        }
        while(true){
            if(temp.value>newnode.value){
                if(temp.left == null){
                    temp.left = newnode;
                    return;
                }
                temp = temp.left;
            }
            else{
                if(temp.right == null){
                    temp.right = newnode;
                    return;
                }
                temp = temp.right;
            }
        }
    }

    insert(value){
        this.append(value);
    }

    deleteItem(value){
        let temp = this.root;
        let before;
        let isleft;
         while(true){
            if(temp.value>value){
                before = temp;
                isleft = true;
                temp = temp.left;
            }
            else if(temp.value>value){
                before = temp;
                isleft = false;
                temp = temp.right;
            }
            else if(temp.value == value){
                if(temp.left != null){
                    if(temp.right != null){
                        const rights = temp.right;
                        if(isleft ==true){
                        before.left = temp.left;
                        }
                        else{
                            before.right = temp.left;
                        }
                        this.append(rights);
                        return;
                    }
                    else{
                        if(isleft ==true){
                        before.left = temp.left;
                        }
                        else{
                            before.right = temp.left;
                        }
                        return;
                    }
                }
                else if(temp.right != null){
                    if(isleft ==true){
                        before.left = temp.right;
                    }
                    else{
                        before.right = temp.right;
                    }
                    return;
                }
                else{
                    if(isleft ==true){
                        before.left = null;
                    }
                        else{
                            before.right = null;
                    }
                }
                
            }
            else{
                return false;
            }
        }
    }

    find(value){
        const temp = this.root;
        while(true){
            if(temp.value>value){
                temp = temp.left;
            }
            else if(temp.value<value){
                temp = temp.right;
            }
            else if(temp == value){
                return temp;
            }
            else{
                return false;
            }
        }
    }

    levelOrderForEach(callback){
        if(!this.root){
            return;
        } 

        const queue = [this.root];

        while(queue.length > 0){
            const current = queue.shift();
            callback(current);
            if(current.left){
                queue.push(current.left);
            } 
            if(current.right){
                queue.push(current.right);
            } 
        }
    }


    inOrderForEach(callback, node = this.root){
         if (!node) return;
        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }

    height(value){
        const startNode = this.find(value);
        if (!startNode) return null;

        const findHeight = (node) => {
            if (!node) return -1;
            return 1 + Math.max(findHeight(node.left), findHeight(node.right));
        };

        return findHeight(startNode);
    }

    depth(value){
        let current = this.root;
        let depth = 0;

        while (current) {
            if (value === current.value) {
                return depth;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }

        return null;
    }

    isBalanced(){
        const check = (node) => {
        if (!node) return { height: -1, balanced: true };

        const left = check(node.left);
        const right = check(node.right);

        const height = 1 + Math.max(left.height, right.height);
        const balanced =
            left.balanced &&
            right.balanced &&
            Math.abs(left.height - right.height) <= 1;

        return { height, balanced };
        };

        return check(this.root).balanced;
    }

    rebalance(){
        const nodes = [];
        const inOrder = (node) => {
        if (!node) return;
        inOrder(node.left);
        nodes.push(node.value);
        inOrder(node.right);
    };

    inOrder(this.root);

    const buildBalanced = (arr) => {
        if (arr.length === 0) return null;

        const mid = Math.floor(arr.length / 2);
        const node = new Node(arr[mid]);

        node.left = buildBalanced(arr.slice(0, mid));
        node.right = buildBalanced(arr.slice(mid + 1));

        return node;
    }
}



    prettyPrint(){
        const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
        };
    }
}