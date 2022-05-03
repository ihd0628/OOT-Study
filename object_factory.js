const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    sum: function(){
        return this.first + this.second;
    }
}

console.log("lee.sum(lee.first, lee.second): ", lee.sum());