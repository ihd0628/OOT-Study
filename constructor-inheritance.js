function Person(name, first, second) {
    this.name = name;
    this.first = first;
    this.second = second;
}
Person.prototype.sum = function() {
    return this.first + this.second;
}

function PersonPlus(name, first, second, third) {
    Person.call(this, name, first, second);
    this.third = third;    
}
//PersonPlus.prototype.__proto__ = Person.prototype;

PersonPlus.prototype.avg = function() {
    return (this.first + this.second + this.third)/3;
}
PersonPlus.prototype = Object.create(Person.prototype);
PersonPlus.prototype.constructor = PersonPlus;

const kim = new PersonPlus('lee', 10, 20, 30);
console.log('kim : ', kim.constructor);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg()); 