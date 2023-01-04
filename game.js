let prevNum = [];
let nextNum = [];
let prevTotal = 0;
let nextTotal = 0;
let answer = 0;
let calculation = '';


// 숫자 사이 , 넣기
function numComma(num){
  return num.toLocaleString(undefined, { maximumFractionDigits: 9 });
}

// 숫자 저장 지우기
function clearAll(){
  prevTotal = 0;
  nextTotal = 0;
  prevNum = [];
  nextNum = [];
  calculation = '';
}

//jQuery 반영
$(document).ready(function(){
  let $showAnswer = $(".showBox .showArea");
  let $showPrev = $(".showBox .prevArea");

  // 숫자 버튼을 눌렀을 때
  $('.numBtn').click(function(){

  })
})