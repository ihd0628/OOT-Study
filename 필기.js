const { links } = require("express/lib/response")

# 객체의 기본

$ 객체란. 
서로 연관된 변수와 함수를 그룹핑하고 이름을 붙인것. 

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

이미 알고있으니 저 인자를 생략하고 싶어서 아래처럼 코드를 짜면 에러가난다.

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

**********************************************************************************************************************************
const kim = {
    name: 'lee',
    first: 10,
    second: 10,
    sum: function(){
        return this.first + this.second;
    }
}

const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    sum: function(){
        return this.first + this.second;
    }
}

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());
**********************************************************************************************************************************

자 위의코드 잘 짯다. 
근데 아쉬운점이 하나 있다. 

예를들어서 kim은 게임을 3판해가지고 third: 10 점수가 객체안에 추가되었다고 해보자. 
lee도 그리고 3번쨰 판을 해서 third:30 점수가 객체에 추가되었다고 하자. 
그리고 sum 메소드도 this.third 를 추가해줘서 아래처럼 같은 형태를 가진 모든 객체들을 다 일일히 하나하나 수정해줘야 한다. 

**********************************************************************************************************************************
const kim = {
    name: 'lee',
    first: 10,
    second: 10,
    third: 10,
    sum: function(){
        return this.first + this.second;
    }
}

const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    third: 40,
    sum: function(){
        return this.first + this.second;
    }
}

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());
**********************************************************************************************************************************

근데 만약 이런 같은 형태를 가진 객체가 1억개라고 해보자. 
이건 뭐 절대 인간이 할 일이 아니지.

그래서 이제부터 이런 동일한 형태를 가지는 객체를 찍어내는 공장을 만들어 볼거다. 
그리고 그 공장을 이용해서 객체를 양산할것이다. 


# constructor의 사례

javascript 에는 내가 시간을 알고싶을 때 사용하는 Date() 라는것이 있다. 
그리고 이 Date() 를 이용할 땐 아래처럼 new 를 사용하여 안에 날짜를 넣고 변수에 집어넣어주면 
그 변수에 내부적으로 2019-4-10 이라고 하는 데이터를, 상태를 가지고있는 새로운 객체가 만들어져서 저 d1 변수가 되는것이다. 
저 객체가 어떻게 생겼는지는 우리가 알 필요가 없다. 

var d1 = new Date('2019-04-10');

우리는 저 new 를 사용하여 만든 d1의 객체가 어떠한 설계를 가지고 있는지 알 수도 볼 수도 없다. 
하지만 우리는 d1 이라는 객체를 쓸 수 있다. 
아래처럼. 

var d1 = new Date('2019-04-10');
console.log("d1.getFullYear() : ", d1.getFullYear());

-> d1.getFullYear() :  2019

year는 연도다. d1이라고 하는 객체의 내부상태 2019년 4월 10일 이라는 내부상태를 가지고있는 객체인데 그 객체에게 연도를 물어보는거다. 
월이 궁금하면 d1.getMonth() 를 통해 알 수 있다.

console.log("d1.getMonth() : ", d1.getMonth());
-> d1.getMonth() :  3

3이 나오는건 월을 0부터 세서 그런거임. 0~11 까지임. 

자 이를 통해서 알 수 있는건 저 Date() 라는 무언가는 앞에 new 를 붙임으로써 객체를 만들어서 우리에게 return 해준다는것을 알 수 있다. 

우리도 저런식으로 객체를 만들어내는 공장을 만든다면 코드도 훨씬 깨끗해지고 
그 공장을 변경시키면 그 공장을 통해 만들어지는 모든 객체가 자동으로 변경되어 생성이 될것이다. 
이거 아주 해보고싶다. 


# constructor 만들기

자 이제 나도 new Date() 처럼 객체를 찍어내는 공장을 만들어 보자. 
Date('2019-04-10')
요거만 봐바라 함수같지? 
왤까?
왜냐면 저 Date() 는 함수이기 때문이다. 

그렇다면 우리도 저 객체를 찍어내는 함수를 만들어보자. 
일단 아래처럼 Person 이라는 함수를 만들고 
"그 함수를 통해서 만들어지는 객체의 각 프로퍼티는 요러한 값을 갖는다" 라는 의미로 아래처럼 코드를 작성한 뒤 
저 Person() 한수를 console.log() 해보면 어떻게 될까?
**********************************************************************************************************************************
function Person() {
    this.name='lee';
    this.first=10;
    this.second=10;
    this.third=10;
    this.sum=function(){
        return this.first + this.second + this.third;
    }
}

console.log("Person()", Person());
**********************************************************************************************************************************

어떻게 되긴 undefined 가 나온다. 왜냐면 아무것도 return 하지 않기 때문이다. 

그런데 저 Person()이라는 함수앞에 new 라는 키워드를 넣어주면 저 Person() 이라는 함수는 완전히 다른 존재가 된다. 
 -> arrow function 쓰면 안된다. 

**********************************************************************************************************************************
function Person() {
    this.name='lee';
    this.first=10;
    this.second=10;
    this.third=10;
    this.sum=function(){
        return this.first + this.second + this.third;
    }
}

console.log("Person() : ", Person());
console.log("new Person() : ", new Person());

(출력)
Person() :  undefined
new Person() :  Person {
  name: 'lee',
  first: 10,
  second: 10,
  third: 10,
  sum: [Function (anonymous)]
}
**********************************************************************************************************************************

출력을 보다시피 그냥 함수를 호출했을 때 에는 undefined 가 나오고 
new Person() 이라고 하니 Person 이라고하는 객체가 만들어졌다는것을 console.log() 가 우리에게 알려주고있다. 
그리고 그 객체에 속성은 우리가 적어준 저 내용이 있다고 알려주고 있다. 

정리하자면 
함수를 그냥 호출하면 얘는 그냥 함수가 되지만 
앞에 new 를 붙여주면 이제부터 이 함수는 그냥 일반적인 함수가 아니라 객체를 생성하는 '생성자'(=constructor) 가 된다. 

그래서 이런 함수를 앞에 new 가 붙어있으면 맥락적으로 '생성자함수' 라고 한다. 

자 아무튼 이렇게 생성자함수를 아래처럼 만들어보자 
그럼 기존에 있던 코드는 아래처럼 바뀌겠지. 

**********************************************************************************************************************************
(기존)

const kim = {
    name: 'lee',
    first: 10,
    second: 10,
    third: 10,
    sum: function(){
        return this.first + this.second;
    }
}

const lee = {
    name: 'lee',
    first: 10,
    second: 20,
    third: 40,
    sum: function(){
        return this.first + this.second;
    }
}

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());
**********************************************************************************************************************************

**********************************************************************************************************************************
(생성자 이용)

function Person() {
    this.name='lee';
    this.first=10;
    this.second=10;
    this.third=10;
    this.sum=function(){
        return this.first + this.second + this.third;
    }
}

const kim = new Person();
const lee = new Person();

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());
**********************************************************************************************************************************

생성자를 이용하여 새로 구성한 코드를 실행하였을 떄의 결과는 아래와 같이 나온다. 

kim.sum():  30
lee.sum():  30

똑같이 30점이 나온다. 
왜그럴까?
당연하지, kim 과 lee 에 들어간 new Person() 모두 내부적으로 같은 속성을 가지는 생성자함수를 통해 객체를 받았으니까 

그럼 이제 뭘 하고 싶은걸까?
아래처럼 입력값을 받아서 각 속성의 값이 다른 객체를 받도록 해주는것이다. 

**********************************************************************************************************************************
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

(출력)
kim.sum():  30
lee.sum():  60
**********************************************************************************************************************************

자 이것이 바로 객체를 찍어내는 공장인 생성자 함수를 만드는 방법이다. 
이 생성자 함수를 만들면 뭐가 좋은지 알아야해 

이전에는 중괄호 열고 닫고 하면서 객체를 만들 때 마다 객체를 다시 정의해줘야했는데 
이제는 그냥 바로 생성자 함수로 앞에 new 를 사용함으로서 객체를 양산할 수 있게 된거다. 

그리고 이 생성자 함수의 내용을 슬쩍 바꿔줌으로서 저 생성자 함수를 통해 만들어지는 모든 객체가 
한번에 바뀌는 아주 폭발적인 효과를 얻게 되는것 이다. 



# prototype이 필요한 이유

prototype 은 '원형'이라는 한국말로 번역된다. 
javascript 에서 이 prototype 이라는것은 중급으로 넘어가는 길목에있다고도 볼 수 있다. 
심지어 어떤이들은 javascript를 이렇게 부르기다 한단다. 

"prototype based language" <- prototype 기반언어 

이번 공부를 통해서 이 prototype 의 모든것을 알 수는 없다. 
하지만 이게 무엇이고 어떻게 쓰이는지 정도를 알 고 추후에 실용적으로 사용해야할 떄 가 왔을때 놀라지 않도록 미리 알아두는것에 의의를 두자. 

**********************************************************************************************************************************
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
**********************************************************************************************************************************

위의 저 코드에서 또 무언가 맘에 안드는게 있다. 
kim 이라는 객체를 만들 때 Person() 이라는 함수를 생성자로서 동작시켰다. 

그안에서 이 부분
this.sum=function(){
    return this.first + this.second + this.third;
}

이 부분 아주 심기를 거스른다. 
아니 이걸 보면 이 생성자함수가 실행이 될 때 마다.
우리가 생성하려고 하는 객체에 sum 이라는 이름의 함수가 생성이 될 때마다 새로 만들어지고 있다. 

그러면 컴퓨터의 리소스를 낭비하는것이다. 
우리가 만드는 객체가 만약에 2개가 아니라 1억개라고 하면 1억개의 객체를 생성할 때 마다 1억개의 함수를 생성하고 저장해야하는것이다. 
이것은 컴퓨터 메모리의 엄청난 낭비이다. 
어차피 동일한 동작을 하는 함수인데 하나의 함수를 만들어서 여기저기 각자의 객체에서 가져다가 그 기능을 사용하게만 하면 훨씬 효율적이게 되는것이다.

그리고 이 생성자가  "객체가 만들어진 이후에" 이 객체에 sum 이라는 동작방법을 바꾸고싶을 때 
아래처럼 일일히 각 객체의 메소드를 하나하나 수정해줘야 한다. 
왜냐하면 각각 다른 함수들이니까!
이것은 매우 생산성이 떨어지는 일 이다. 

**********************************************************************************************************************************
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
kim.sum = function() {
    return 'modified : ' + (this.first + this.second + this.third);
}
const lee = new Person('lee', 10, 20, 30);
lee.sum = function() {
    return 'modified : ' + (this.first + this.second + this.third);
}

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());
**********************************************************************************************************************************

자 그래서 저 Person() 이라는 생성자를 이용해서 만든 모든 객체가 공통적으로 사용하는 함수를 만들 수 있으면 얼마나 좋을까?
공통적으로 사용되는 속성(this.name=name;) 을 만들 수 있으면 얼마나 좋을까
라는 생각을 통해서 prototype 이 생겨나게 된거다. 

#####################################################################################################################
프로토 타입의 의미는 객체가 생성될때마다 해당 객체의 메소드를 만들어 메모리에 할당을 해야 하는데 그렇게 하지않고 생성자의 프로토타입에  정의함으로서 
다른 모든 객체들이 참조하여 사용할 수 있도록 하여 메모리를 효율적으로 사용할 수 있도록 하는 장점과 메소드의 재정의가 필요한 객체들은 상황에 맞게 
자신만 사용가능한 메소드를 재정의 할수 있어 유지보수에도 많은 도움이 됩니다.
#####################################################################################################################



# prototype을 이용해서 재사용성을 높이기

prototype 이라는 굉장히 중요한 개념을 이용해서 
생성자를 통해서 우리가 만든 객체들 모두가 공통적으로 사용하는 속성을 만드는 방법을 살펴 볼 것이다. 

일단 생성자 함수 안에서는 prototype을 만들 수 없기 때문에 생성자함수 안의 메소드는 지운다. 

자 그리고 우리가 원하는 것은 Person 이라고하는 저 생성자 함수의 공통적으로 사용할 sum 이라는 메소드를 만들고 싶은것이다. 
아래처럼 만들어주면 되고 이것은 
Person 이라고하는 생성자 함수의 prototype. 즉, 원형을 정하는 것 이다. 

**********************************************************************************************************************************
function Person(name, first, second, third) {
    this.name=name;
    this.first=first;
    this.second=second;
    this.third=third;                                   <- 생성자 함수에서 sum 메소드 따로 뺴주고 
}

Person.prototype.sum=function(){                        <- 요기다가 새로 prototype을 통한 메소드를 만든것이다. 
    return this.first + this.second + this.third;
}

const kim = new Person('kim', 10, 10, 10);
const lee = new Person('lee', 10, 20, 30);

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

(출력)
kim.sum():  30
lee.sum():  60
**********************************************************************************************************************************

위의 코드를 실행하게 되면 이전과 똑같은 결과를 가져오게되지만 몇가지 차이가 있다. 
일단 시각적으로 Person 생성자 함수 안에 지금 sum 메소드가 들어있지 않으니 생성자함수를 통해 객체가 만들어 질 때 마다 sum 메소드 코드가 실행되지 않겠다. 
즉, 1번만 실행이 되어서 성능을 절약할 수 있고 메모리도 절약할 수 있다. 

또한 저 sum 이라는 메소드 하나만 수정하면 모든 객체에서 다 수정된 메소드를 공유할 수 있게된다. 

또한 특정 객체만 다른 메소드를 부여하고 싶다면 아래처럼 별도로 코드를 작성해줌으로서 특정 객체만 다른 메소드를 가질 수 있다. 

**********************************************************************************************************************************
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

(출력)
kim.sum():  this : 30
lee.sum():  60
**********************************************************************************************************************************

자 이걸 통해서 prototype 이라고하는것의 특징을 우리가 들어낼 수 있다. 
javascript는 저 kim 이라는 객체의 sum 메소드를 호출할 때 제일 먼저 그 객체 자신이 sum 이라는 속성을 가지고 있는지를 찾는다. 
근데 내가 만들어줬으니 있다. 
그러니 그걸 실행 시키고 딱 끝낸거다. 

근데 lee 라는 객체는 별도로 sum 이라는 메소드를 정의하지 않았다. 
그러니 저 lee 자신이 sum 이라는 메소드를 가지고 있지 않으면 이 객체의 생성자인 Person의 prototype 이라고하는 것의 sum 이라는 메소드가 정의되어있는지를 찾는다. 
그리고 그게 있으면 그것을 실행시킨다. 

일반적으로 코드를 작성할 떄 
일반 변수들은 생성자 안에 넣는것이 일반적이다. (물론 prototype 에 넣을수는 있다.)
그리고 함수는 특별한 이유가 있지 않다면 '생성자함수.prototype.함수의이름' 이렇게 일반적으로 코드를 짠다. 


프로토 타입을 사용함으로서 생성자를 통해 객체를 만들 때 마다 함수를 코드를 실행시키는 로스와 
각각의 객체마다에 별도로 메소드를 위한 메모리를 할당하여 저장하는것으로 발생하는 메모리 로스를 방지할 수 있다. 






# Classes

javascript에서 객체를 찍어내는 공장. 
생성자 함수를 대체하는 대체제인 class에 대해 알아보자. 

class라고 하는 문법은 javascript의 명세를 담고있는 표준인 ECMAscript6 버전에서 추가된 기능이다. 
당연히 ECMAscript6 이전버전에서는 동작하지 않는 문법이다. 


# Classes 의 생성

이것을 한번에 이해할 수 는 없을것이다.. 
각오하고 한번 시작 해보자. 


**********************************************************************************************************************************
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
**********************************************************************************************************************************

위의 코드는 아주 객체지향적으로 작성된 코드이다. 
이것을 class문법을 사용하여 다시 재구성 해볼 예정이다. 

결론적으로는 저 생성자 함수 대신에 class를 사용한다는 말 이다. 

생성자함수는 기본적으로 객체를 만들고, 그 객체의 초기 상태를 세팅한다. 
이걸 class에서는 어떻게 하는걸까. 
이래의 코드처럼 생성자 함수 대신 class를 써주면 된댜.
class또한 결국 객체를 만들어내는 공장이다. 

**********************************************************************************************************************************
class Person {

}

const kim = new Person();
console.log('kim : ', kim);

(출력)
kim :  Person {}
**********************************************************************************************************************************

위처럼 class를 사용하면 생성자함수를 사용했을 때 처럼 Person 이라는 객체가 생긴것을 알 수 있다. 
자 이를통해 우리는 class를 통해 객체를 만들어 낼 수 있다는것을 알게 되었다. 

자 그럼 생성자함수에서 했던것처럼 class에서는 어떻게 생성되는 객체를 초기화하는가를 아라보쟈. 



# class의 constructor_function

1. class안에서 메소드 정의 방법 

자 일단은 class안에서 메소드를 만들 때 에는 아래처럼 function이라는 키워드를 적어주지 않는다. 

class Person{
    function sum() {  <- 이거 아니여!!!
        
    }
}

아래처럼 그냥 메소드이름만 적어준다. 

class Person{
    sum() {  <- 이거여!!!
        
    }
}



2. class를 이용한 객체 생성시 초기상태의 설정

객체를 생성할 때 초기상태를 어떻게 생성할 것 인가. 
즉, 아래의 생성자함수를 사용했을 때 처럼 하려면 class에서는 어떻게 하는가. 

function Person(name, first, second, third) {
    this.name=name;
    this.first=first;
    this.second=second;
    this.third=third;
}



class를 통해 객체가 생성될 때 그 객체의 초기상태를 지정하기 위해서 객체가 만들어지기 직전에 실행되도록 약속되어있는 함수가 있다. 
그 함수를 정의해주면 우리의 목적인 객체생성시 초기상태를 설정해 줄 수 있다. 
그 함수가 뭐냐. 

constructor(){} 이다. 

이건 약속된 이름이다. 
맘대로 함수이름 지어주는게 아니다. 
반드시 'constructor' 라는 이름을 써줘야만 javascript는 객체를 생성할 때 이 constructor라는 함수를 자동으로 실행시켜 준다. 

아래의 코드의 출력에[서 확인 할 수 있듯이 저 Person 객체를 생성하는 과정에서 constructor 함수가 실행되었고 
그래서 console.log('constructor'); 가 나온것을 볼 수 있다. 

**********************************************************************************************************************************
class Person {
    constructor(){
        console.log('constructor');
    }
}

const kim = new Person();
console.log('kim : ', kim);

(출력)
constructor
kim :  Person {}
**********************************************************************************************************************************

자 그럼 이제 저 constructor 함수에 입력값을 주는것을 통해서 
이 객체의 초기값을 설정해 줄 수 있게 되는것이다. 
아래코드 참고 
**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
}

const kim = new Person('lee', 10, 20);
console.log('kim : ', kim);

(출력)
kim :  Person { name: 'lee', first: 10, second: 20 }
**********************************************************************************************************************************




# 메소드 구현 

class문법에서 객체안에 메소드를 만드는 방법을 살펴볼 것 이다. 

기존의 생성자함수를 사용하는 방법에서는 생성자함수의 prototype 이라는 객체에 
sum 이라는 프로퍼티를 함수로 지정하는걸 통해서 이 Person이라고하는 생성자를 통해서 만들어진 모든 객체가 공유하는 함수를 만들 수 있었다. 

자 그럼 class에서는 이걸 어떻게 하면 될까?

########################################################################################################################
모든 함수는 기본적으로 prototype 프로퍼티를 가지고 있습니다. 그렇기 때문에 생성자 함수에서 사용한 방법이 동일하게 적용된 것이에요.
(참고로 class를 생성하신 후, typeof를 사용해보시면 class는 "function" 라는 것을 알 수 있음)
########################################################################################################################

일단 아래처럼 기존의 방법을 그대로 사용해도 된다. 
이 class라는것도 사실 새로운게 아니라 기존에있던걸 문법만 추가해놓은 양념에 불과하기 때문이다. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
}

Person.prototype.sum = function() {
    return this.first + this.second;
}

const kim = new Person('lee', 10, 20);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());

(출력)
kim :  Person { name: 'lee', first: 10, second: 20 }
kim.sum():  30
**********************************************************************************************************************************

하지만 아래처럼 class안에 그냥 함수를 넣어줌으로서 동일한 기능을 해줄 수 있다. 
혹여나 class안에 넣어준다고 객체를 생성해줄때마다 저 함수가 생성되는거니 prototype의 기능을 안해주는게 아니냐고 생각헀지만 
console.log("lee.sum === kim.sum : ", lee.sum === kim.sum);
를 통해 확인해보니 모두 같은 함수를 사용하고 있는것을 통해 동일한 함수를 참조하여 사용하는것을 알 수 있었다. 

가만히 생각해보면 class를통해 객체를 생성할 때 에는 constructor함수만 실행을 하니 저 sum() 함수는 실행을 안해주니까 
객체가 생성될 때 마다 저 코드가 실행되지는 않는것이 당연하다. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

const kim = new Person('lee', 10, 20);
const lee = new Person('lee', 10, 10);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

console.log("lee.sum === kim.sum : ", lee.sum === kim.sum);

(출력)
kim :  Person { name: 'lee', first: 10, second: 20 }
kim.sum():  30
lee.sum():  20
lee.sum === kim.sum :  true
**********************************************************************************************************************************

만일 내가 우려헀던 객체가 생성될 때 마다 함수가 생성되게 하려면 아래처럼 constructor함수 안에 메소드를 넣어주면 그렇게 된다. 
실제로 kim 변수에 할당된 Person 객체 안에 메소드도 포함되어있다. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
        this.sum = function() {
            return this.first + this.second;
        }
    }
    
}

const kim = new Person('lee', 10, 20);
const lee = new Person('lee', 10, 10);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

console.log("lee.sum === kim.sum : ", lee.sum === kim.sum);

(출력)
kim :  Person {
    name: 'lee',
    first: 10,
    second: 20,
    sum: [Function (anonymous)]
  }
  kim.sum():  30
  lee.sum():  20
  lee.sum === kim.sum :  false
**********************************************************************************************************************************


즉, class안에 메소드를 지정해줌으로서 
저 sum이라는 메소드는 같은 class에 속해있는 모든 객체가 공유하는 함수가 되는것이다. 

그런데 만약 저 kim 이라는 객체에만 다른 메소드를 적용하고 싶다고하면 
이전에 했던것처럼, 아래의 코드처럼 별도로 한번 더 정의해주면 된다. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

const kim = new Person('lee', 10, 20);
kim.sum = function() {
    return 'this : ' + (this.first + this.second);
}

const lee = new Person('lee', 10, 10);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

console.log("lee.sum === kim.sum : ", lee.sum === kim.sum);

(출력)
kim :  Person {
    name: 'lee',
    first: 10,
    second: 20,
    sum: [Function (anonymous)]
  }
  kim.sum():  this : 30
  lee.sum():  20
  lee.sum === kim.sum :  false
**********************************************************************************************************************************

자 javascript는 저 kim 이라는 객체에 sum 이라는 함수가 속해있는지 확인해보고 
있다면 그것을 실행하고 만약에 없다면 Person이라고하는 class안에 sum 이라는 메소드가 정의되어있는지 보고 있다면 그놈을 실행하게 되는것이다. 



# 상속(inheritance)

상속이 뭘까?
이게 왜 필요할까? 
상속을 통해서 난 어떤것을 누릴 수 있는가?

이것부터 한번 가슴으로 느껴보자. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

const kim = new Person('lee', 10, 20);
kim.sum = function() {
    return 'this : ' + (this.first + this.second);
}

const lee = new Person('lee', 10, 10);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

console.log("lee.sum === kim.sum : ", lee.sum === kim.sum);
**********************************************************************************************************************************

자 위의 저 코드를 보면 아쉬운 마음이 생길 수 있다. 
난 아직 아쉬움이 안느껴지지만 일단 아쉬움을 느껴보자. 

어떤 아쉬움이냐면 
저 Person 이라고하는 class는 sum 이라고하는 메소드가 있는데 
다른 메소드는 없다. 
기능이 아주 부실한것이다. 

뭐 예를들어 평균을 구하고 싶을 때 에는 사용할 메소드가 없는것이다. 
아 물론 코드에 새로 추가해주면 되긴 하곘지만 
언제나 저 코드를 열고 수정할 수 있는것은 아니다. 

예를들어 저 Pesron class가 내가 만든게 아니라 다른사람이 만든 라이브러리를 가져다 쓴것에 있는거라면 
아 내가 그 코드를 수정할수는 없다. 
왜냐면 내가 나중에 그 라이브러리를 업데이트 하려고하는데 내가 수정한 코드 때문에 업데이트를 못 할 수 도 있고 뭐 그냥 괜히 남이 만든거 잘못만지면 일단 피곤해. 

그리고 평균을 구하는 메소드를 모든곳에서 사용하는게 아니라 특정 상황 아주 소수의 경우에만 사용할건데 저 Pesron class에 평균구하는 메소드를 추가하는것은 아주 부담스럽기 때문이다. 

이러한 경우에 우리는 상속을 사용할 수 있다. 

물론 상속을 사용하지 않고 class를 하나 더 만들어 줄 수도 있다. 
아래코드처럼
**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
    avg() {
        return (this.first + this.second)/2
    }
}

const kim = new PersonPlus('lee', 10, 20);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());

(출력)
kim :  PersonPlus { name: 'lee', first: 10, second: 20 }
kim.sum():  30
kim.avg():  15
**********************************************************************************************************************************

그런데 이것 또한 아쉬움이 남는다. 
프로그래머들이 정말로 싫어하는 중복이라는 아쉬움. 
기존의 Person에도 있고 PersonPlus 에도 동일하게 있는 저 코드가 아주 꼴보기가 싫다. 

그러면 우리는 자연스럽게 중복을 제거하고 싶은 꿈을 꾸고 그것을 위해 상속이 나오게 된것이다. 

그리고 그 상속을 사용하는 방법은 
아래처럼 extends 라는 키워드를 사용하여 기존의 Person class가 가지고 있던 요소들이 그대로 PersonPlus class에 상속시킬 수 있다. 
로딩 되는거다. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    avg() {
        return (this.first + this.second)/2
    }
}

const kim = new PersonPlus('lee', 10, 20);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());

(출력)
kim :  PersonPlus { name: 'lee', first: 10, second: 20 }
kim.sum():  30
kim.avg():  15
**********************************************************************************************************************************

똑같이 동작하는것을 볼 수 있다. 
하지만 저 PersonPlus 라는 class에는 avg라는 함수만 존재하고 나머지 Person과 공유하는 기능은 저 Person안에 있기 때문에 
Person class의 메소드나 프로퍼티를 수정하면 PersonPlus 를 사용하여 생성되는 객체에도 모두 동시다발적으로 수정이 되게 되는것이다. 

우리는 상속기능을 통해 중복되는 코드를 제거했고 그럼으로서 코드의 양을 줄였고 그리고 중복해서 사용하는 부분을 바꾸면 저걸 상속하는 모든 class에서
동시다발적으로 변경이 일어남으로서 유지보수의 편의성이 폭발적으로 상승하게 된다. 


# Super 

기능을 도입하면 장점도 분명 있지만 그에 따른 복잡성이 분명히 증가하게 된다. 
그리고 그 복잡성이 증가함으로 인해 눈에 보이지 않는 복잡한 문제들이 생기기 시작한다. 

이제 상속이라는걸 도입했을 때 밸생하는 문제중의 하나인 자식 class와 부모 class의 관계에 대한 문제 
그리고 super라는 키워드에 대해 공부해보자. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    avg() {
        return (this.first + this.second)/2
    }
}

const kim = new PersonPlus('lee', 10, 20);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());
**********************************************************************************************************************************

저 PersonPlus라는 class에다가 first, second 라는 저 2개의 값 외에 third 라는 3번쨰값도 가지고 싶어졌다고 해보자. 
Person은 바꾸지 않은체로 말이다. 

애매하다. 
Person에서는 first와 second만 인자로 받고있는 상태다. 
물론 아래처럼 PersonPlus안에 Person의 constructor함수를 그대로 가져와서 third만 추가해주는 방법도 있긴하다. 


**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    avg() {
        return (this.first + this.second)/2
    }
}

const kim = new PersonPlus('lee', 10, 20);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());

(출력)
kim :  PersonPlus { name: 'lee', first: 10, second: 20 }
kim.sum():  30
kim.avg():  15
**********************************************************************************************************************************

똑같이 동작하는것을 볼 수 있다. 
하지만 저 PersonPlus 라는 class에는 avg라는 함수만 존재하고 나머지 Person과 공유하는 기능은 저 Person안에 있기 때문에 
Person class의 메소드나 프로퍼티를 수정하면 PersonPlus 를 사용하여 생성되는 객체에도 모두 동시다발적으로 수정이 되게 되는것이다. 

우리는 상속기능을 통해 중복되는 코드를 제거했고 그럼으로서 코드의 양을 줄였고 그리고 중복해서 사용하는 부분을 바꾸면 저걸 상속하는 모든 class에서
동시다발적으로 변경이 일어남으로서 유지보수의 편의성이 폭발적으로 상승하게 된다. 


# Super 

기능을 도입하면 장점도 분명 있지만 그에 따른 복잡성이 분명히 증가하게 된다. 
그리고 그 복잡성이 증가함으로 인해 눈에 보이지 않는 복잡한 문제들이 생기기 시작한다. 

이제 상속이라는걸 도입했을 때 밸생하는 문제중의 하나인 자식 class와 부모 class의 관계에 대한 문제 
그리고 super라는 키워드에 대해 공부해보자. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    constructor(name, first, second, third){
        this.name = name;
        this.first = first;
        this.second = second;
        this.third = third;
    }
    sum() {
        return this.first + this.second + this.third;
    }
    avg() {
        return (this.first + this.second + this.third)/3
    }
}

const kim = new PersonPlus('lee', 10, 20);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());
**********************************************************************************************************************************

근데 위의 코드는 지금으로서는 동작하지 않는다고한다. 
그 이유는 나중에 알아보자. 

근데 이렇게하면 원점으로 다시 돌아온것이다. 
아니 저럴거면 상속이라는걸 사용하는 의미가 전혀 없지. 

바로 이러한 경우를 위해서 
우리가 부모 class를 불러서 부모 class에게 일을 시키고 부모 class가 하지 못하는 일 들은 나만이 하도록 하는것 
그 떄 사용하는 키워드가 바로 super 이다. 

super를 이용하면 부모가 가지고 있는 기능을 실행할 수 있다. 
예를 들어서 
PersonPlus의 constructor함수를 실행할 때 부모 class의 constructor함수를 먼저 실행하게 하면 
이러한 중복코딩의 문제를 해결할 수 있게된다. 
부모는 이미 name, fisrt, second 를 가지고 있으니까 말이다. 

그래서 부모가 이미 가지고있는 기능과 나도 가지고 있는 공통적인 부분에서  중복을 제거하는 것 이다. 
그 떄 사용하는게 super()와 super 이다. 
아래처럼 사용하면 된다. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    constructor(name, first, second, third){
        super(name, fisrt, second);
        this.third = third;
    }
    sum() {
        return super.sum() + this.third;
    }
    avg() {
        return (this.first + this.second + this.third)/3
    }
}

const kim = new PersonPlus('lee', 10, 20);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());

(출력)
kim :  PersonPlus { name: 'lee', first: 10, second: 20, third: 30 }
kim.sum():  60
kim.avg():  20
**********************************************************************************************************************************

super 는 2가지 사용법이 있다. 

1. super() 
 -> 함수처럼 뒤에 괄호 붙여서 사용하면 부모 class의 생성자로서 기능한다.(=부모class의 constructor 함수를 가져온거라고 보면 된다.)
    생성자 안에서 부모class의 프로퍼티들이 세팅이 되기때문에 자식class는 새로 추가할 것 만 넣어주면 된다. 

2. super 
 -> 부모 class를 그대로 가져온것이다. 그래서 super.sum() 을 해주면 부모 class인 Person 에서 sum() 메소드를 가져올 수 있는것 이다. 
    그러면 super.sum() 은  this.first + this.second 을 return 해주고 거기다가 this.third 더해줘서 전부 더해준 값을 return 해주게 되는것이다. 

super에 괄호가 있으면 부모클래스의 생성자, 괄호가 없으면 부모클래스 자체를 뜻한다. 
만약 super라는 기능이 없으면, 자식클래스에서 부모클래스의 속성과 기능에 추가적인 무언가를 넣어 활용때 다시 부모클래스의 코드를 사용해야하는 중복이 발생할 것이다.



# object inheritance

객체지향 프로그래밍은 크게 2가지 요소로 나뉘어져 있다. 

첫번째는 객체를 만들어내는 공장인 class_
두번째는 그 class를 통해 만들어진 객체 

이다. 
    
그래서 이 두가지의 요소들이 어떻게 상호작용하느냐에 따라서 
다양한 객체지향언어들이 만들어진다. 

그래서 주류객체지향언어인 JAVA와 비슷한 문법을가진 언어들이 있고 
javascript는 JAVA와 이름은 비슷하지만 상당히 다른 차이점을 가지고있는 객체지향 언어이다. 
prototype based language 라고 부를정도로 말이다. 

JAVA와 같은 주류객체지향 언어에서는 상속을 
sub class가 super class의 자식이 된다. 
그리고 그렇게 만들어진 sub class를 통해서 객체를 생성해낸다. 

그렇기 때문에 이렇게 만등어진 객체가 어떠한 기능을 갖게 될것인지라는것은 class단에서 결정이 된다. 
객체가 다른 객체의 상속을 받는다는것은 불가능하다. 
그냥 객체는 그냥 생성되면서 모든 기능이 결정이 되게 된다. 

물론 javascript에서도 class가 있고 extends가 있지만 그것은 그냥 장식일 뿐 이다. 
javascript가 동작하는 내부 메커니즘이 바뀌는건 없다. 
그냥 다른 언어를 쓰던 사람들이 편하게 쓸 수 있게 도입된 문법일 뿐 이다. 

javascript는 훨씬 자유로우면서도 혼란스럽다. 
javascript는 sub객체가 super 객체의 기능을 직접 상속받을 수 있다. 

전통적인 주류객체지향언어에서는 class가 상속을 받는데 
javascript에서는 객체가 직접 다른 객체의 상속을 받을 수 있고 
내가 얼마든지 그 상속관계를 바꿀 수 있다. 
그 상속관계를 바꿀 때는 link만 바꿔주면 되는데 그 링크가 'prototype link' 이다. 

그리고 이러한 맥락에서 이 'sub object'의 'prototype link'가 가리키고있는 객체를 'prototype object' 라고 한다. 

자 그러니 이제 javascript의 객체지향은 어떻게 다른지 한번 자세히 살펴보자. 




# __proto__ 

자 이제 class가 아닌 javascript의 전통적인 방법으로 상속을 하는 방법을 아라보자. 

**********************************************************************************************************************************
superObj = {superVal: 'super'};
subObj = {subVal: 'sub'};
**********************************************************************************************************************************

위의 코드에서 superObj 와 subObj는 현재까지는 서로 남남이다. 
그런데 javascript에서는 class가 아닌 instance 즉, 객체를 직접 다른 객체의 자식으로 만들어버릴 수 있다. 

어떻게 하냐면 
subObj의 원형을 정해주는 protoType link를 정해주면 되는데 
그걸 하기 위해서 subObj에 '__proto__' 라는 속성을 주고 (이 속성은 이미 있는것인데 값을 따로 지정해주는것이다.)
그 '__proto__' 속성의 값으로 superObj 를 지정해주면 된다. 

이를 통해서 subObj에서 superVal을 가져올 수 있게 된다. 
아래코드와 출력처럼 말이다. 아주 놀랍다. 

**********************************************************************************************************************************
superObj = {superVal: 'super'};
subObj = {subVal: 'sub'};
subObj.__proto__ = superObj;
console.log('subObj.subVal =>', subObj.subVal);
console.log('subObj.superVal =>', subObj.superVal);

(출력)
subObj.subVal => sub
subObj.superVal => super
**********************************************************************************************************************************

즉, '__proto__' 라는 prototype link를 통해서 subObj가 superObj의 자식이다 라는걸 우리가 위의 코드처럼 링크를 걸어주니까 
javascript가 제일먼저 subObj 에서 superVal 이라는 프로퍼티가 있는지 찾아보고 없으니까 
__proto__ 라는 속성이 담고있는 객체에서 superVal 을 찾아다가 있으면 가져다 쓰는거다. 

또한 자식객체를 통해서 부모객체를 바꿀수는 없다. 
아래처럼 코드를 작성하면 그냥 자식객체 그 자체를 바꾸는 거지 부모객체에게는 털끝하나 건들리 수 없다. 

**********************************************************************************************************************************
superObj = {superVal: 'super'};
subObj = {subVal: 'sub'};
subObj.__proto__ = superObj;
console.log('subObj.subVal =>', subObj.subVal);
console.log('subObj.superVal =>', subObj.superVal);

subObj.superVal = 'sub';
console.log('superObj.superVal =>', superObj.superVal);

(츌력)
subObj.subVal => sub
subObj.superVal => super
superObj.superVal => super
**********************************************************************************************************************************

하지만 이 '__proto__' 는 정석이 아니다. 
이것은 뭐랄까.. 약간... 아무튼 정석은 아니다. 

정석의 방법을 한번 아라보자. 




# Object.create()

자 이제 __proto__ 의 대체제를 아라보자. 

-> var subObj = Object.create(superObj);

자... 이거다. 
저렇게 하면 superObj 를 부모객체로 하는 개로운 객체를 subObj 변수에 return 해준다. 

**********************************************************************************************************************************
superObj = {superVal: 'super'};
// subObj = {subVal: 'sub'};
// subObj.__proto__ = superObj;
var subObj = Object.create(superObj);
subObj.subVal = 'sub';
console.log('subObj.subVal =>', subObj.subVal);
console.log('subObj.superVal =>', subObj.superVal);

subObj.superVal = 'sub';
console.log('superObj.superVal =>', superObj.superVal);

(출력)
subObj.subVal => sub
subObj.superVal => super
superObj.superVal => super
**********************************************************************************************************************************

위처럼 부모객체를 받아서 새로운 객체를 subObj 에 return 해준 후 그 새로만든 자식객체인 subObj에 subVal 프로퍼티를 할당해주면 
저 주석처리 된 부분과 완전히 똑같은 기능과 결과를 하게 되는 것 이다. 

저 __proto__ 를 사용하는것 보다는 Object.create() 를 사용해서 객체와 객체간의 상속관계 
좀 더 명확하게는 proto link 를 지정해주는것이 더 좋은 방법 이라고 할 수 있다. 



# 객체상속의 사용

지금은 생성자함수를 상속하는게 아니라 직접 만든 객체간의 상속에 대한 내용이라는걸 잊지 말자. 
자 아래처럼 코드를 작성해주면 javascript는 lee 에서 sum() 메소드가 있는지 찾아보고 없으면 __proto__ 링크를 통해 
부모객체에 sum() 메소드가 있는지 다시 확인 후 고것을 사용한다. 

또한 lee 객체에만 별도로 avg() 라는 메소드를 아래처럼 추가해줄 수 도 있다. 
**********************************************************************************************************************************
const kim = {
    name: 'kim',
    fisrt: 10,
    second: 20,
    sum: function() {return this.fisrt + this.second}
}

const lee = {
    name: 'lee',
    fisrt: 10,
    second: 10,
    avg: function(){
        return (this.fisrt + this.second)/2
    }
}

lee.__proto__ = kim;

console.log('lee.sum() => ', lee.sum());
console.log('lee.avg() => ', lee.avg());

(출력)
lee.sum() =>  20
lee.avg() =>  10
**********************************************************************************************************************************

그렇다면 요걸 권장되는 방법인 Object.create() 를 사용하면 아래처럼 작성하면 되겠다. 

**********************************************************************************************************************************
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

(출력)
lee.sum() =>  20
lee.avg() =>  10
**********************************************************************************************************************************



# 객체와 함수

javascript의 유연함. 프로그램이 실행되고있는 런타임에서 객체를 상속한다는 이 엄청난 유연함이 끝이 아니다. 

javascript 에서는 함수가 그냥 함수가 아니다. 
new 를 붙이면 객체를 생성하는 생성자가 된다. 
많은 객체지향언어에서 이 함수라는것은 특정한 객체나 class에 종속된것으로 보지만 
javascript에서는 함수는 신과같은 존재다. 

그냥 혼자 존재하다가도 필요에 따라 어떤 객체의 메소드도 될 수 가 있다. 

이러한 관점에서 이제부터 배울 call, bind, this 라는것이 객체지향에서 얼마나 중요한건지 한번 배워보자. 



# call 

const kim = {name: 'kim', first: 10, second: 20};
const lee = {name: 'lee', first: 10, second: 10};

위처럼 2개의 객체가 있을 때 

lee.__proto__ = kim;

요래 해주면 kim은 lee의 부모객체가 된다. 
이게 굉장히 다른 객체지향언어에 비해 유연한 특성이 되는것이다. 

근데 이거말고 이 객체들에게 sum 이라는 메소드를 줄것인데

function sum() {
    return this.first + this.second
}

이상하지 않은가?
지금 저 sum함수는 어떤 객체에도 속해있지 않다. 

아니 그럼 저 lee나 kim이 저 함수를 어떻게 가져다가 쓸 수 있는걸까 
그 떄 사용하는게 바로 call 이다. 

sum.call();

이렇게 해주면 된다. 
이것은 sum(); <- 요것과 같은 의미이다. 

아니 그럼 그냥 sum() 하면 되지 굳이 왜 sum.call() 이걸 해주는가? 

모든 함수는 call() 이라는 메소드를 가지고 있다. 
 -> javascript에서는 함수도 객체이기 때문 

그리고 이 함수의 call() 메소드를 호출할 때 첫번쨰 인자로 어떠한 객체를 주게되면 
즉, 

sum.call(kim);

이렇게 해주면 
sum.call(kim) 이 싫행될 때 내부적으로 어떤 일 이 일어나게 되는거냐면 
this 는 kim 객체게 되는것이다...

아래의 코드의 출력값을 통해 확인할 수 있다. 

**********************************************************************************************************************************
const kim = {name: 'kim', first: 10, second: 20};
const lee = {name: 'lee', first: 10, second: 10};

function sum() {
    return this.first + this.second
}
console.log('sum.call(kim) => ', sum.call(kim));

(출력)
sum.call(kim) =>  30
**********************************************************************************************************************************

즉, 이 코드에서 sum 이라고하는 저 function은 kim이라고하는 객체의 메소드가 아니었는데 
call 이라고하는 저 특이한 요상망측한 함수를 호출할 때 첫번쨰 인자로 sum 이 내부적으로 사용할 this의 값을 kim 으로 지정했더니 
sum 이라는 함수가 kim의 멤버인 메소드가 된 것 이다. 

그러면 만약에 우리가 sum.call(lee);
인자로 lee 를 주게되면 그러면 또 sum 함수의 this 를 lee 객체로 쓰게 되는것이다. 

**********************************************************************************************************************************
const kim = {name: 'kim', first: 10, second: 20};
const lee = {name: 'lee', first: 10, second: 10};

function sum() {
    return this.first + this.second
}
console.log('sum.call(kim) => ', sum.call(kim));
console.log('sum.call(lee) => ', sum.call(lee));

(출력)
sum.call(kim) =>  30
sum.call(lee) =>  20
**********************************************************************************************************************************

근데 만야게 원래 함수에 사용할 변수가 있다면 어떻게 할까?
그러면 
sum.call(객체, 원래함수의인자1, 원래함수의인자2, ...); 
이렇게 첫번쨰 인자로는 this에 할당될 객체를 넣어주고 그 뒤로 원래 함수의 인자들을 넣어주면 된다. 
아래의 코드처럼 사용할 수 있는것 이다. 

**********************************************************************************************************************************
const kim = {name: 'kim', first: 10, second: 20};
const lee = {name: 'lee', first: 10, second: 10};

function sum(prefix) {
    return prefix + this.first + this.second
}
console.log('sum.call(kim) => ', sum.call(kim, 10));
console.log('sum.call(lee) => ', sum.call(lee, 10));

(출력)
sum.call(kim) =>  40
sum.call(lee) =>  30
**********************************************************************************************************************************



# bind 

call은 기존함수를 실행 시킬 때 그것의 this 객체를 지정해준뒤 그 기존함수 자체를 실행시켜준다면,
bind는 기존함수에 this 객체를 지정한뒤 그렇게 지정된 함수를 return 해준다. 

**********************************************************************************************************************************
const kim = {name: 'kim', first: 10, second: 20};
const lee = {name: 'lee', first: 10, second: 10};

function sum(prefix) {
    return prefix + (this.first + this.second)
}
console.log('sum.call(kim) ', sum.call(kim, '->'));
console.log('sum.call(lee) ', sum.call(lee, '-->'));

const kimsum = sum.bind(kim, '--->')
console.log('kimsum()', kimsum());

(출력)
sum.call(kim)  ->30
sum.call(lee)  -->20
kimsum() --->30
**********************************************************************************************************************************

bind는 새로운 함수가 만들어져서 return 되는것이기 때문에 기존의 sum 함수에는 영향을 주지 않는다. 

call은 실행되는 함수의 this값을 원하는 객체로 바꿔서 실행할 수 있게 해준다. 
bind는 실행되는 함수의 this값을 원하는 객체로 고정시키는 새로운 함수를 만들어낸다.



# prototype vs proto

function Person() {};
var Person = new function();

javascript에서 함수는 객체이고 그렇기 때문에 위의 두 구문은 완전히 같은의미이다. 
또한 javascript에서 함수는 객체이고 그렇기 떄문에 프로퍼티를 가질 수 있다. 

function Person(name, fisrt, second) {
    this.name = name;
    this.first = first;
    this.second = second;
}

위와같은 함수를 정의했을 때 
그러면 저 함수는 객체이기 때문에 Person 이라고하는 새로운 객체가 생성이 된다. 
그런데 객체가 하나 더 생성된다. 
그것은 바로 저 Person의 prototype 객체이다. 

그리고 이 Person 객체와 Person의 prototype 객체는 서로 연관되어있기 때문에 서로의 존재를 알아야하고 
그렇기 때문에 Person 이라는 객체에는 prototype 이라는 프로퍼티가 생기고 그 프로퍼티는 Person의 prototype 객체를 가리킨다. 

그렇기에 Pesron.protoype 이라고 하면 그것은 Person의 prototype 객체인 것이다.

그러면 Person의 prototype 객체도 자신이 Pesron 객체의 소속이라는것을 어디에 기록해놔야하는데 
그렇기에 constructor 라는 프로퍼티를 만들고 그 프로퍼티는 Person을 가리킨다. 

이렇게 서로간에 상호참조를 하고 있는 것 이다. 

Person.prototype.sum = function(){}
그리고 위와같은 코드를 정의해주면 이것은 어떠한 의미를 가지냐면 
Person의 prototype 객체에 sum 이라는 함수를 정의해주는것이다. 

그러면 이제 우리가 객체를 찍어내는 공장인 Person 이라고하는 생성자함수를 만든것이다. 
그리고 이제 아래처럼 kim 이라는 객체를 생성하게 되면 

var kim = new Person('kim', 10, 20)

kim 이라는 객체가 생기고 
생성자함수인 Person 가 실행이되면서  this 값이 세팅된 결과 각 name, fist, secon 프로퍼티의 값이 세팅이 되고 
동시에 "__proto__" 라는 프로퍼티도 생성이 된다. 

그리고 kim 이라는 객체가 생성이 될 때 저 "__proto__" 프로퍼티는 Person의 prototype 객체를 가리키게 된다. 

var lee = new Person('lee', 10, 20)
위처럼 lee라는 객체를 생성해도 
그 lee 객체의 __proto__ 프로퍼티는 자신을 생성한 함수의 prototype 객체를 가리킨다. 

그럼 이 상태에서 kim.name 을 호출하려고하면 javascript는 kim 이라는 객체에 name 이라는 프로퍼티가 있는지를 확인하고 있으니까 
그 name이라는 프로퍼티에 저장된 값을 출력할 것 이다. 

혹여나 만약에 없다면 __proto__ 가 가리키는 객체에 name이 있는지를 다시 찾아본다. 

그러니까 kim.sum() 을 해주면 
javascript는 kim 이라는 객체에 sum 이라는 메소드가 있는지 확인을 먼저 하고 없으니까 
__proto__ 를 통해서 이 __proto__ 가 가리키는 Person의 prototypeq 객체에 sum 이 있는지를 찾고 있으니까 그놈을 사용을 하는것이다. 

그리고 만약에 Person의 prototype 객체에 없다?
그러면 또 거기서 __proto__ 를 보고 이게 가리키는 누군가를 찾아서 올라가는것이다. 

이렇것이 지금까지 우리가 작성한 코드가 동작할 때의 내부적인 속사정인것이다. 

Person의 prototype은 말 그대로 prototype object를 가집니다.
그리고 객체들의 __proto__는 prototype이 가리키고 있는 object로 향하는 링크이다. 그 메모리의 주소값이라고 보면 될것 같다. 



# 생성자 함수를 통한 상속 : 소개

기본적으로 상속은 class문법을 사용하는게 더 쉽고 안전하다고 보여진다. 
그래도 전통적인 javascript 문법에서의 생성자함수를 사용한 상속의 방법도 알아야곘지. 
그전에 class문법을 이용하여 상속을 구현한 아래의 코드를 다시 리뷰해보자. 

**********************************************************************************************************************************
class Person {
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
    sum() {
        return this.first + this.second;
    }
}

class PersonPlus extends Person {
    constructor(name, first, second, third){
        super(name, first, second);
        this.third = third;
    }
    sum() {
        return super.sum() + this.third;
    }
    avg() {
        return (this.first + this.second + this.third)/3
    }
}

const kim = new PersonPlus('lee', 10, 20, 30);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());
**********************************************************************************************************************************

위의 코드를 보면 Person 이라는 class를 만들었고 
그 class가 new 를 통해서 생성될 때 class안의 constructor_function이 실행이 되면서 초기값이 생성된다. 
그리고 그 객체는 sum 이라는 메소드를 가지고있는데 이 메소드는 만들어진 그 객체의 소속이 아니고 
만들어진 객체의 prototype의 소식이기 때문에 저 Person을 이용해서 생성된 모든 객체가 공유하는 메소드/함수 이다. 

그리고 PersonPlus 라는 class를 만들었는데 저 class의 모든 기능을 다 구현하는게 아니라 
Person의 기능을 물려받는다라고 extends를 통해 선언을 하고 
super 라는 메소드를 통해서 부모class가 가지고 있는 constructor 함수를 실행하고 
그리고 this.third를 넣는것은 별도로 자식 class에서 별도로 실행하는것을 통해서 
부모의 코드를 재활용하면서 자신만의 작업을 할 수 있게 된다. 

sum 이라는 메소드또한 부모가 이미 가지고 있기 때문에 super.sum 을 통해서 재활용하고 거기에 자식만의 작업을 추가했다. 

avg 메소드는 부모한테 없었던 메소드이기 때문에 PersonPlus에 추가된 부분이다. 



# 생성자 함수를 통한 상속 : 부모 생성자 실행

**********************************************************************************************************************************
function Person(name, first, second) {
    this.name = name;
    this.first = first;
    this.second = second;
}
Person.prototype.sum = function() {
    return this.first + this.second;
}

function PersontPlus(name, first, second, third) {
    Person.call(this, name, first, second);
    this.third = third;    
}
PersontPlus.prototype.avg = function() {
    return (this.first + this.second + this.third)/3;
}

const kim = new PersontPlus('lee', 10, 20, 30);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg()); 
**********************************************************************************************************************************

기존 class문법을 사용하던 코드를 생성자 함수를 이용하여 위와같이 작성하였다. 
(PersonPlus 의 내부는 아직 미작성 상태)

function PersontPlus(name, first, second, third) {
    Person.call(this, name, first, second);
    this.third = third;    
}

이부분을 주목하자. 
아래의 class문법과 동일한 부분 인데 

class PersonPlus extends Person {
    constructor(name, first, second, third){
        super(name, first, second);
        this.third = third;
    }
}

super 대신 call 메소드를 사용한것이다. 
call 메소드를 사용하면 해당 생성자함수의 this를 call 메소드의 첫번쨰 인자로 할당해주는 기능을 해주는데 
Person 생성자함수의 this 를 PersonPlus의 this 로 할당해 줌으로서 이전 Person 생성자함수의 기능을 고대로 가져오게 되는것이다. 
그냥 아래처럼 call 안써주고 Person 함수 가져다가 쓰면 안된다. 
그 떄 Person 함수 안의 this는 PersonPlus의 this와 다르기 때문이다. !

function PersontPlus(name, first, second, third) {
    Person(name, first, second);
    this.third = third;    
}

자 이렇게 이전 Person 함수를 호출하는것 까진 헀는데 
PersonPlus는 아직 sum 메소드를 아직 가지고 있지 않다. 
왜냐면 우리가 아직 상속관께를 표현해주지 않았으니까 !



# 생성자 함수를 통한 상속 : 부모와 연결하기

**********************************************************************************************************************************
function Person(name, first, second) {
    this.name = name;
    this.first = first;
    this.second = second;
}
Person.prototype.sum = function() {
    return this.first + this.second;
}

function PersontPlus(name, first, second, third) {
    Person.call(this, name, first, second);
    this.third = third;    
}
PersontPlus.prototype.avg = function() {
    return (this.first + this.second + this.third)/3;
}

const kim = new PersontPlus('lee', 10, 20, 30);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg()); 
**********************************************************************************************************************************

위의 코드에서 아직 PersonPlus와 Person은 부모자식관계가 아니다. 
아무런 관련이 없다. 

현재의 상태는 하기와같은 이미지1 과 같은 상태이다. 

자 이상태에서 우리가 PersonPlus 를 기반으로해서 new 연산자를 사용해서 kim 이라는 객체를 만들었다. 
그러면 이 객체를 생성하면 무슨일이 생기냐면 그 kim 객체의 __proto__ 가 자신을 생성한 생성자함수의 prototype이 가리키고 있는 객체를 가리키게 된다. 
하기 이미지2와 같은 상태인 것 이다. 

여기서 kim.avg() 를 실행하면 어떻게 동작할까? 
일단 kim 이라는 객체에는 avg 라는 프로퍼티가 있는지 찾아보고 없는걸 확인후 
__proto__ 를 따라가서 PersonPlus의 prototype 객체의 avg가 있는지를 확인한다. 
근디 PersonPlus 에는 avg가 있으니까 실행이 되는거다. 

근데 kim.sum() 을 해주게 되면 
동일한 프로세스로 PersonPlus의 prototype 객체를 찾는데 
없네?
그러면 javascript는 에러를 내버린다. 
어떻게 해야할까? 간단하지. 
PersonPlus의 prototype 객체의 __proto__ 가 Person의 prototype 객체를 가리키게 하면 된다. 
 ->기본적으로 객체가 만들어질 때 __proto__는 object 라고하는 객체의 prototype 객체를 가리키도록 약속이 되어있다. 

코드로 구현하는것은 아주 쉽다. 
그냥 아래처럼 값만 넣어주면 된다. 

**********************************************************************************************************************************
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
PersonPlus.prototype.__proto__ = Person.prototype;   <- 여기!!!여기서 넣어준겨!!!!!!

PersonPlus.prototype.avg = function() {
    return (this.first + this.second + this.third)/3;
}

const kim = new PersonPlus('lee', 10, 20, 30);
console.log('kim : ', kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg()); 
**********************************************************************************************************************************

근데 __proto__ 는 굳이 따지면 오피셜은 아니니까 
object.creat() 를 사용해서 구현해보자. 
object.creat() 는 인자로 들어가는 객체를 __proto__ 의 값으로 가지는 객체를 return 해주는것이다. !
아래의 코드처럼 짜면 된다. 
**********************************************************************************************************************************
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
PersonPlus.prototype = Object.create(Person.prototype); <- Person.prototype을 __proto__ 로 가지는 객체를 만들어서 return 해주는거다.!!!!

PersonPlus.prototype.avg = function() {
    return (this.first + this.second + this.third)/3;
}

const kim = new PersonPlus('lee', 10, 20, 30);
console.log('kim : ', kim.constructor);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg()); 

(출력)
kim :  [Function: Person]       <- ??? 이게 뭐여 ???
kim.sum():  30
kim.avg():  20
**********************************************************************************************************************************


근데 이거...이거 아주 큰 문제가 있다. 
출력을 보니 kim 객체의 생성자함수가 Person 으로 되어있다. 
하지만 kim 의 생성자함수는 PersonPlus 가 되어야한다. 
요원티다. 
그것을 해결해주기 위해서 

PersonPlus.prototype.constructor = PersonPlus;
아래처럼 이코드를 넣어주면 된다.  

**********************************************************************************************************************************
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
PersonPlus.prototype = Object.create(Person.prototype);
PersonPlus.prototype.constructor = PersonPlus;

PersonPlus.prototype.avg = function() {
    return (this.first + this.second + this.third)/3;
}

const kim = new PersonPlus('lee', 10, 20, 30);
console.log('kim : ', kim.constructor);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg()); 

(출력)
kim :  [Function: PersonPlus]  <- 이거지. 
kim.sum():  30
kim.avg():  20
**********************************************************************************************************************************




# 생성자 함수를 통한 상속 : constructor 속성은 무엇인가?

근데 나는 constructor 속성이 뭔지 아직 모른다. 
모르는데 그냥 넣은거다. 
이제 그게 뭔지 알아보자. 

자 하기 '이미지3' 처럼 Person 이라는 객체가 있는데 저 객체가 prototype 프로퍼티를 통해서 
Person의 prototype 객체를 참고하고있고 다시 역으로 Person의 prototype 객체는 constructor 라는걸 통해서 Person을 참고한다. 
즉, Person 과 Person의 prototype 객체는 각각 prototype 프로퍼티와 constructor 프로퍼티를 통해 서로 상호참조하고있는 상태 이다. 

그리고 우리가 생성자함수인 Perons을 new 를통해서 사용하여 새로운 객체를 만들면 그 새로운 객체는 __proto__ 를통해서 생성자함수의 prototype 객체를 가리킨다. 

그러면 우리가 여기에서 kim.constructor 라고하면 이건 뭘 가리킬까?
일단 kim 이라는 객체에는 constructor 프로퍼티가 없으니 __proto__ 가 가리키는 Person의 prototype 객체를 찾아가서 보니까 있네?
그러면 그게 뭘 가리키나 봤더니 Perons 생성자 함수이네?
즉, kim.constructor는 kim 이라는 객체를 생성한 생성자함수구나... 라는걸 알 수 있다. 

그러니 앞으로는 어떤객체가 있는데
오잉 이건 도대체 어떤 생성자가 만든거지? 라는 궁금증이 생기면 
->어떤객체.constructor  요거 해주면 다 알 수 있다. 아주 조타. 




# 생성자 함수를 통한 상속 : constructor 속성 바로잡기

-> PersonPlus.prototype = Object.create(Person.prototype);
이렇게 Object.create 를 해주면 새로운 객체로 PersontPlus.prototype 을 교체해버린다. 

-> PersonPlus.prototype.__proto__ = Person.prototype; 
이것과는 의미가 달라지는건데 

기존의 PersonPlus.prototype 은 PersonPlus 를 가리키고 있었을텐데 
그 기존의 객체를 replace 해버리기 때문에 더 이상 PersonPlus.prototype 은 PersonPlus 를 가리키지 않는다. 

그러니 
-> PersonPlus.prototype.constructor = PersonPlus; 
이걸 해주는거다... 사실 뭐 땜빵이지. 

그런디 이거 또 웃긴게 뭐냐면 아래처럼 순서를 바꾸면 PersonPlus.proto 이 replace 되면서 avg 기능이 지워져버린다. 

**********************************************************************************************************************************
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

(출력)
TypeError: kim.avg is not a function_
**********************************************************************************************************************************

그러니 __proto__ 를 쓰면 깔끔하게 해결되지만 또 __proto__ 는 비표준이니까...
내가 가치를 어디에 두느냐에따라 사용하니마니 하는거지 뭐. 



