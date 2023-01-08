let checkPlace = "";
let fstNum = 0;
let secNum = 0;
let answer = 0;
let mathood = '';
let checkVal;

let clickIns = [];
let clickDec = [];
let clickAns = '';

// 숫자 사이 , 넣기
function numComma(num){
  return num.toLocaleString(undefined, { maximumFractionDigits: 9 });
}

// 소수점 n자리수까지 표기
function decimalNum(ans,dec){
  return Math.floor(ans*(10 ** dec))/(10 ** dec);
}

// 랜덤 숫자 구하기 (max에는 반올림 고려하여 .5 추가)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 0.5 - min) + min);
}

// 사칙연산 랜덤 정하기
function getMathood(){
  let getM = getRandomInt(1,4);
  switch(getM) {
    case 1 : 
      answer = fstNum + secNum;
      return mathood = "+";
    case 2 :
      answer = fstNum - secNum;
      return mathood = "-";
    case 3 : 
      answer = fstNum * secNum;
      return mathood = "x";
    case 4 : 
      answer = fstNum / secNum;
      return mathood = "/";
  }
}

function getQuestionPlace(){
  let getP = getRandomInt(1,4);
  switch(getP) {
    case 1 : return checkVal = fstNum;
    case 2 : return checkVal = secNum;
    case 3 : return checkVal = answer;
    case 4 : return checkVal = mathood;
  }
}


// jQuery 반영
$(document).ready(function(){
  let $fstNum = $(".showBox .prevArea .fstNum");
  let $secNum = $(".showBox .prevArea .secNum");
  let $answer = $(".showBox .prevArea .answer");
  let $mathood = $(".showBox .prevArea .mathood");
  let $equal = $(".showBox .prevArea .equal");
  let $showAnswer = $(".showBox .showArea");

  // 문제 만들기
  $('.otherBtn').click(function(){
    fstNum = getRandomInt(1,10);
    secNum = getRandomInt(1,10);
    getMathood();
    answer = Math.floor(answer*100)/100;
    
    getQuestionPlace();

    console.log(fstNum, secNum, answer, mathood, isNaN(checkVal));

    if(checkVal == fstNum) { fstNum = "?"}
    else if(checkVal == secNum) { secNum = "?"}
    else if(checkVal == answer) { answer = "?"}
    else if(checkVal == mathood) { mathood = "?"}

    $fstNum.text(fstNum);
    $secNum.text(secNum);
    $answer.text(answer);
    $mathood.text(mathood);
    $equal.text(" = ");
  })

  // 답안 입력
  $('.numBtn').click(function(){
    if(isNaN(checkVal)){
      alert("사칙연산 버튼을 눌러주세요.");
    } else {
      if($(this).text() == '.' && clickDec.includes(".")) {
        console.log("don't");
      } else if($(this).text() == '.'){
        clickDec.push(".");
        clickIns.length == 0 && prevNum.push("0");
      } else if(clickDec.includes(".")) {
        clickDec.push($(this).text());
      } else {
        clickIns.push($(this).text());
      }
      $showAnswer.text(numComma(Number(clickIns.join(''))) + clickDec.join(''));
      clickAns = Number(clickIns.join('') + clickDec.join(''));
    }
  })

  $('.calBtn').click(function(){
    if(isNaN(checkVal)){
      clickAns = $(this).text();
      $showAnswer.text(clickAns);
    } else {
      alert("숫자 버튼을 눌러주세요.");
    }
  })

  // 답안 확인
  $('.answerBtn').click(function(){
    if(clickAns == checkVal) {
      $showAnswer.text("정답입니다.");
    } else {
      $showAnswer.text("땡! 틀렸네요.");
    }
    clickIns = [];
    clickDec = [];
  })
}) // jQuery end