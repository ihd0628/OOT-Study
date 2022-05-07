function Person(name, first, second, third) {
    this.name=name;
    this.first=first;
    this.second=second;
    this.third=third;
}

Person.prototype.sum=function(){
    return this.first + this.second + this.third;
}

const kim = new Person('kim', 10, 10, 10);
kim.sum = function() {
    return 'this : ' + (this.first + this.second + this.third);
}

const lee = new Person('lee', 10, 20, 30);

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

