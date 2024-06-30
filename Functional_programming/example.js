function notEmpty(item) {
    return item !== undefined && item !== null
}
function compact(arr) {
    return arr.filter(notEmpty);
}
function sortArr(arr) {
    return [...arr].sort()
}
function doubleNumbers(arr) {
    return arr.map(item => item * 2);
}

function compose(...functions) {
    return function (initialArgument) {
        return functions.reduceRight((acc, fn) => fn(acc), initialArgument)
    }
}

const doubleSortArray = compose(doubleNumbers, compact);
const result = doubleSortArray([1, 5, 3, 1, 2, 4, undefined, 0, null]);


//КАРРИРОВАНИЕ 

function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            console.log(args);
            console.log(func);
            return func.apply(this, args)
        } else {
            console.log('Тут');
            return function(...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3));

// КОНТЕЙНЕРЫ
class Container {
    constructor(x) {
        this.$value = x
    }
    static of(x) {
        return new Container(x)
    }
    map(f) {
        return Container.of(f(this.$value))
    }
    join() {
        return this.$value
    }
}
const number = Container.of(5);
const x = number.map(item => item + 10).join()
console.log(x);