export class TreeNode {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    insert(newValue) {
        if (this.value === null) {
            this.value = Number(newValue);
            return;
        }
        if (newValue < this.value) {
            if (this.left === null) {
                this.left = new TreeNode(newValue);
            } else {
                this.left.insert(newValue);
            }
        } else {
            if (this.right === null) {
                this.right = new TreeNode(newValue);
            } else {
                this.right.insert(newValue);
            }
        }
    }

    print(level = 0) {
        console.log(level + ": " + this.value);
        if (this.left !== null) {
            this.left.print(level + 1);
        }
        if (this.right !== null) {
            this.right.print(level + 1);
        }
    }

    printByLevel(level = 0, state = {}) {
        if (!state[level]) {
            state[level] = [];
        }
        state[level].push(this.value);
        if (this.left !== null) {
            this.left.printByLevel(level + 1, state);
        }
        if (this.right !== null) {
            this.right.printByLevel(level + 1, state);
        }
        return state;
    }
}

