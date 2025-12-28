
export class TreeNode {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
        // this.maxLevel = (this.value === null) ? 0 : 1;
    }

    insert(newValue) {
        if (newValue === null || newValue === undefined || newValue === "") {
            return;
        }
        newValue = Number(newValue);
        if (this.value === null) {
            this.value = newValue;
            // this.maxLevel = this.maxLevel + 1;
            return;
        }
        console.log("newValue:", newValue, "this.value:", this.value);
        if (newValue < this.value) {
            if (newValue == 113) { debugger; }
            if (this.left === null) {
                this.left = new TreeNode(newValue);
                // this.maxLevel = this.maxLevel + 1;
            } else {
                this.left.insert(newValue);
            }
        } else {
            if (this.right === null) {
                this.right = new TreeNode(newValue);
                // this.maxLevel = this.maxLevel + 1;
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

    printByLevel2() {
        let state = {};
        // console.log(this.maxLevel)

        // for (let i = 0; i <= this.maxLevel; i++) {
        //     state[i] = new Array(2 ** i).fill(null);
        // }

        state = this.printByLevel3(state, 0, 0);

        return state;
    }

    printByLevel3(state = {}, level = 0, index = 0) {
        console.log("value:", this.value, "level:", level, "index:", index);

        if (!state[level]) {
            state[level] = new Array(2 ** level).fill(null);
        }

        state[level][index] = this.value === null ? null : Number(this.value);

        if (this.left !== null) {
            this.left.printByLevel3(state, level + 1, index * 2);
        }
        if (this.right !== null) {
            this.right.printByLevel3(state, level + 1, (index + 1) * 2 - 1);
        }
        return state;
    }

    printByLevel(level = 0, state = {}) {
        // console.log("Level:", level, "maxLevel:", this.maxLevel);
        if (!state[level]) {
            state[level] = [];
        }
        state[level].push(this.value);
        if (this.value === null) {
            return state;
        }
        state[level + 1] = state[level + 1] || [];

        if (this.left === null) {
            // console.log("A");
            state[level + 1] = [null].concat(state[level + 1]);
        }
        if (this.left !== null) {
            // console.log("B");
            this.left.printByLevel(level + 1, state);
        }

        if (this.right === null) {
            // console.log("C");
            state[level + 1].push(null);
        }
        if (this.right !== null) {
            // console.log("D");
            this.right.printByLevel(level + 1, state);
        }

        return state;
    }
}

