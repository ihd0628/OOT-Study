function Person(name, first, second, third) {
    this.name=name;
    this.first=first;
    this.second=second;
    this.third=third;
    this.sum=function(){
        return this.first + this.second + this.third;
    }
}

const kim = new Person('kim', 10, 10, 10);
const lee = new Person('lee', 10, 20, 30);

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

