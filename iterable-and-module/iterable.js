class ListArray {
    constructor(arr) {
        this.arr = arr;
    }
    //   getArray() {
    //     return this.arr; // can acesss with array ;
    //   }
    getArray() {
        return this.arr.slice(); // it safe but with overwhelm the memory in somecase
    }
}
const myArray = new ListArray([1, 2, 3]);
// console.log(myArray.getArray());
// console.log(myArray.getArray());
// Good object iterable
class ListArrayIterator {
    constructor(values) {
        this.values = values;
        this.index = 0;
        this.done = false;
    }
    next() {
        if (this.done) {
            this.done = true;
            return {
                done: this.done,
                value: undefined,
            };
        }
        if (this.index == this.values.length) {
            this.done = true;
            return {
                done: this.done,
                value: this.index,
            };
        }
        const value = this.values[this.index];
        this.index += 1;
        return {
            done: false,
            value,
        };
    }
}
class ListArrayExample {
    constructor(values) {
        this.values = values;
    }
    [Symbol.iterator]() {
        return new ListArrayIterator(this.values);
    }
}
const listArray = new ListArrayExample([1, 2, 3]);
for (const element of listArray) {
    console.log(element);
}
