const obj = {
        a : "a",
        b : "b",
        c : "c"
    }

console.log('before delete: ', obj);

delete obj.c;

console.log('after delete: ', obj);