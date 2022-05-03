$ 객체란. 
서로 연관된 변수와 함수를 그룹핑하고 이름을 붙인것. 


# 객체의 기본
정보시스템에서의 핵심은 CRUD 이다. 

그중 delete는 아래처럼 delete 해주고 지울놈 적어주면 됨. 
**********************************************************************************************************************************
obj = {
    a : "a",
    b : "b",
    c : "c"
}

console.log('before delete: ', obj);
delete obj.c;                           <- 여기서 지운겨
console.log('after delete: ', obj);

(커맨드라인)
before delete:  { a: 'a', b: 'b', c: 'c' }
after delete:  { a: 'a', b: 'b' }          <- c가 없어졌다. 
**********************************************************************************************************************************



# 객체와 반복문

배열과 반복문 쓸땐 아래처럼 그냥 숫자를 넣어서 사용하면 된다. 
(물론 for문을 사용해도 된다.)

const corpArray = ['LG', "Samsung", "SK"];
let i = 0;
while(i<corpArray.length) {
    console.log(corpArray[i]);
    i = i + 1;
}

객체에 반복문을 사용할 때 는 for in 문을 사용하면 된다. 

const corpObject = {
    No1: "Samasung",
    No2: "SK", 
    No300: "LG"
}

for(let name in corpObject) {
    console.log(name);
}

위처럼 코드를 작성 후 실행하면 아래같은 객체의 프로퍼티명이 출력되는걸 볼 수 있다. 
(출력)
No1
No2
No300

근데 아래처럼 corpObject.name 이건 안된다. 
왜냐면 그냥 name 자체를 변수로서 받아들이는게 아니라 
하나의 프로퍼티명으로서 인식하기 때문이다. 

const corpObject = {
    No1: "Samasung",
    No2: "SK", 
    No300: "LG"
}

for(let name in corpObject) {
    console.log(corpObject.name);
}

그렇기 떄문에 객체의 프로퍼티지시할 때 변수를 넣으려면 배열처럼 대괄호를 이용하면 된댜. 

const corpObject = {
    No1: "Samasung",
    No2: "SK", 
    No300: "LG"
}

for(let name in corpObject) {
    console.log(corpObject[name]);
}

(출력)
Samasung
SK
LG


# 객체 만들어 보기

객체안에는 함수도 들어갈 수 있다. 

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

(출력)
myMath.PI:  3.141592653589793
myMath.floor(3.9):  3
myMath.random:  0.15524198915568577

이걸 통해서 내가 알아야하는것은 
이 객체라고 하는것은 같은 취지의 서로 연관된 변수, 함수들을 객체라고하는것으로 그룹핑해서 거기다가 이름을 붙인것이다. 
라는걸 가슴으로 느껴야한다. 



# this 

사람이 자기자신을 '나' 라고 표현하듯이 객체에서도 자기자신을 가리키는 표현이 있는데 그것이 this 이다. 

아램의 함수는 lee라는 사람의 첫번째 점수와 두번쨰 점수를 가지고 그 합을 구하게 한 것이다. 

const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    sum: (f,s) => {
        return f+s;
    }
}

console.log("lee.sum(lee.first, lee.second): ", lee.sum(lee.first, lee.second));

(출력)
lee.sum(lee.first, lee.second):  30

그런데 아쉬운게 lee 라는 객체는 내부적으로 자신이 10점과 20점을 가지고있다. 
그런데 이 sum 이라는걸 호출하면서 이 메소드의 인자로 이 lee를 또한번 언급하고있다. 
이미 내부적으로 자신이 몇점인지 다 알고 있는데도 말이다. 

이미 알고있으니 저 인자를 생략하고 싶어서 아래처럼 코드를 짜면 에러가난다?

const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    sum: () => {
        return fisrt + second;
    }
}

console.log("lee.sum(lee.first, lee.second): ", lee.sum());

위처럼 코드를 따면 first is not defined 라는 에러가 나온다. 
그러면 어떻게 할까

첫번쨰는 아래처럼 lee.first, lee.second 라고 명확하게 지시를 해주는것이다. 


const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    sum: () => {
        return lee.first + lee.second;
    }
}

console.log("lee.sum(lee.first, lee.second): ", lee.sum());

근데 이것도 좀 아쉽다. 
뭐가 아쉽냐면 좀 유연함이 떨어져 예를들어서 저 'lee'라는 객체의 이름이 'kim' 이라고 바뀌면 
저 객체의 sum 메소드는 동작하지 않기 때문이다. 

그렇기 때문에 이 객체지향을 만든 사람들은 어떤 메소드가 있으면 그 메소드가 자신이 속해있는 객체를 가리키는 특수한 키워드를 만들었다. 
마치 인간의 '나는', '저는' 이런것처럼. 
그것이 뭐냐면 바로 this 다. 

짠 그래서 아래처럼 this를 이용하여 메소드를 만들었더니 undefined 에러가 나온다. 

const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    sum: ()=>{
        return this.first + this.second;
    }
}

console.log("lee.sum(lee.first, lee.second): ", lee.sum());

왜냐면 arrow function의 this 는 상위 환경의 this를 계승하므로 전역 객체를 가리키게 되는 것이다. 
하지만 본래 의도는 lee 객체를 가리키는 것이었으므로 결과적으로 부자연스러운 동작이 된다. 아래와 같이 전통을 따르자.

const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    sum: function(){
        return this.first + this.second;
    }
}

console.log("lee.sum(lee.first, lee.second): ", lee.sum());

이제 이렇개 this 를 사용해주면 객체의 이름이 바뀌어도 문제없이 동작하여 30이라는 output을 돌려준다. 

다시한번 말하지만 this는 this 가 속해있는 메소드가 속해있는 객체를 가리키도록 약속되어있는 특수한 예약어이다.
(arrow function 쓰면 안된다.)


1. 일반 함수에서 this -> window

2. 중첩 함수에서 this -> window

3. 이벤트에서 this -> 이벤트 객체

4. 메소드에서 this -> 메소드 객체

5. 메소드 내부의 중첩 함수에서 this -> window



 
# constructor의 필요성

