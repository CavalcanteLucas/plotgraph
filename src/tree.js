
export class TreeNode {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    insert(newValue) {
        if (newValue === null || newValue === undefined || newValue === "") {
            return;
        }
        newValue = Number(newValue);
        if (this.value === null) {
            this.value = newValue;
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
        if (this.left !== null) {
            this.left.print(level + 1);
        }
        if (this.right !== null) {
            this.right.print(level + 1);
        }
    }

    printByLevel(state = {}, level = 0, index = 0) {
        if (!state[level]) {
            state[level] = new Array(2 ** level).fill(null);
        }
        state[level][index] = this.value === null ? null : Number(this.value);
        if (this.left !== null) {
            this.left.printByLevel(state, level + 1, index * 2);
        }
        if (this.right !== null) {
            this.right.printByLevel(state, level + 1, (index + 1) * 2 - 1);
        }
        return state;
    }

    delete(value) {
        console.log("delete")
    }
}

