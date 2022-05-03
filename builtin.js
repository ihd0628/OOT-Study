const myMath = {
    random : () => {
        return Math.random()
    },
    PI: Math.PI,
    floor: (val) => {
        return Math.floor(val);
    }
}

console.log("myMath.PI: ", myMath.PI);
console.log("myMath.floor(3.9): ", myMath.floor(3.9));
console.log("myMath.random: ", myMath.random());