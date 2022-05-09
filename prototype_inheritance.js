superObj = {superVal: 'super'};
// subObj = {subVal: 'sub'};
// subObj.__proto__ = superObj;
var subObj = Object.create(superObj);
subObj.subVal = 'sub';
console.log('subObj.subVal =>', subObj.subVal);
console.log('subObj.superVal =>', subObj.superVal);

subObj.superVal = 'sub';
console.log('superObj.superVal =>', superObj.superVal);

////실사용 예시//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const kim = {
    name: 'kim',
    fisrt: 10,
    second: 20,
    sum: function() {return this.fisrt + this.second}
}

// const lee = {
//     name: 'lee',
//     fisrt: 10,
//     second: 10,
//     avg: function(){
//         return (this.fisrt + this.second)/2
//     }
// }
// lee.__proto__ = kim;

const lee = Object.create(kim);
lee.name = 'lee';
lee.fisrt = 10;
lee.second = 10;
lee.avg = function() {
    return (this.fisrt + this.second)/2
}

console.log('lee.sum() => ', lee.sum());
console.log('lee.avg() => ', lee.avg());