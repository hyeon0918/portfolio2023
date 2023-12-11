// main.js

// cursor
var cursor = document.querySelector('.cursor');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  // var x = e.clientX;
  // var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('cursorinnerhover')
});
document.addEventListener('mousedown', function(){
  cursor.classList.add('cursorinnerhover')
});

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
})

// 스크롤 이벤트
const contents = document.querySelectorAll("#container > div"); // content 5개 저장
const sections =document.querySelectorAll("container > div > section"); // section 5개 저장
const gnbLis = document.querySelectorAll("nav.gnb > ul > li"); // gnb li 4개 저장

// 브라우저 높이값을 각각의 content의 높이값으로 지정
let devHeight = window.innerHeight;

window.addEventListener("resize", () => {
   devHeight = window.innerHeight;
})
console.log(devHeight);

// 각각의 콘텐츠에 devHeight 값 지정하기
contents.forEach(item => {
   item.style.height = `${devHeight}px`
});

// scroll, section, gnbLis, minGnb 클래스 on 화살표 함수
let activation = (wheel) => {
   window.scroll({
      top: wheel,
      left: 0,
      behavior: "smooth"
   });

   for(let i = 0; i < contents.length; i++ ){
      if( wheel >= i*devHeight && wheel < (i+1)*devHeight) {

         activation2(i, sections); // sections의 forEach문
         // quickMenu 자리



      };
   };

};

// activation 함수 내에 반복되는 forEach문
let activation2 = (index, list) => {
   list.forEach(item => {
      item.classList.remove("on");
   })
   list[index].classList.add("on")
};

// gnbLis의 li를 클릭하면 각각의 content 위치로 이동하기
// content1 제외
// 클릭할 때 스크롤이 content(윈도우) 높이값 만큼 내려오도록 li에 클래스 on을 붙여라.
for(let i = 0; i < gnbLis.length; i++) { 
   gnbLis[i].addEventListener("click", e => { 
      e.preventDefault(); 

      activation2(i, gnbLis);
      window.scroll({
         top: (i+1)*devHeight,
         left: 0,
         behavior: "smooth"
      });

   });
};

// content에서 마우스 휠을 움직였을 때, 방향에 따라 content 이동

for(let i = 0; i < contents.length; i++){
   contents[i].addEventListener("wheel", e => {

      if( e.deltaY < 0 ) {
         // wheel / scroll up
         let prev = e.currentTarget.previousElementSibling.offsetTop; // 위에 있는 content의 top값을 알 수 있음.
         activation(prev);

      } else if ( e.deltaY > 0 ) { 
         // wheel / scroll down
         let next = e.currentTarget.nextElementSibling.offsetTop; // 아래에 있는 content의 top값을 알 수 있음.
         activation(next);
      };
   });
};



// header
// header-1 name text in/out
const txts = document.querySelector(".name_position").children; // span 5개 저장
let txtsLen = txts.length;
let index = 0;
const textInTimer = 3200;
const textOutTimer = 3000;

function animateText(){
   for(let i = 0; i < txtsLen; i++) {
      txts[i].classList.remove("on", "off");
   } 
   txts[index].classList.add("on");

   setTimeout( function(){
      txts[index].classList.add("off");
   }, textOutTimer )

   setTimeout ( function(){
      if(index == txtsLen - 1 ){
         index = 0;
      } else {
         index++;
      }
      animateText();
   }, textInTimer );
};

window.onload = animateText;

// header-2 gnb 메뉴
// gnb 메뉴 클릭했을 때 content 위치로 이동, class on 붙이기









