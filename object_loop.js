const corpArray = ['LG', "Samsung", "SK"];
let i = 0;

console.group("array loop");
while(i<corpArray.length) {
    console.log(corpArray[i]);
    i = i + 1;
}
console.groupEnd("array loop");


const corpObject = {
    No1: "Samasung",
    No2: "SK", 
    No300: "LG"
}

for(let name in corpObject) {
    console.log(corpObject[name]);
}
