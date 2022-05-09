const kim = {name: 'kim', first: 10, second: 20};
const lee = {name: 'lee', first: 10, second: 10};

function sum(prefix) {
    return prefix + (this.first + this.second)
}
console.log('sum.call(kim) ', sum.call(kim, '->'));
console.log('sum.call(lee) ', sum.call(lee, '-->'));

const kimsum = sum.bind(kim, '--->')
console.log('kimsum()', kimsum());