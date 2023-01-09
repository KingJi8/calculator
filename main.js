let prevNum = [];
let prevDec = [];
let nextNum = [];
let nextDec = [];
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
  prevDec = [];
  nextNum = [];
  nextDec = [];
  calculation = '';
}
  
// 정답 구하기
function getAnswer(){
  switch(calculation) {
    case '+' : return answer = prevTotal + nextTotal;
    case '-' : return answer = prevTotal - nextTotal;
    case 'x' : return answer = prevTotal * nextTotal;
    case '/' : return answer = prevTotal / nextTotal;
  }
}

// 소수점 n자리수까지 표기
function decimalNum(ans,dec){
  return Math.floor(ans*(10 ** dec))/(10 ** dec);
}

//jQuery 반영
$(document).ready(function(){
  let $showAnswer = $(".showBox .showArea");
  let $showPrev = $(".showBox .prevArea");

  // 숫자 버튼
  $('.numBtn').click(function(){
    // 첫번째 숫자
    if(calculation == '' && (prevNum.length + prevDec.length) < 10) {
        $showPrev.text('');
        answer=0;
        // 소수점 더블클릭
        if($(this).text() == "." && prevDec.includes(".")) {
          console.log("nothing")
        } 
        // 소수점 반영
        else if($(this).text() == ".") {
          prevDec.push(".");
          prevNum.length == 0 && prevNum.push("0");
        }
        // 소수점 이하 숫자
        else if(prevDec.includes(".") == true) {
          prevDec.push($(this).text());
        }
        // 정수 부분
        else {
          prevNum.push($(this).text());
        }
        $showAnswer.text(numComma(Number(prevNum.join(''))) + prevDec.join(''));
        prevTotal = Number(prevNum.join('') + prevDec.join(''));
    } 
    // 두번째 숫자
    else if(calculation != '' && (nextNum.length + nextDec.length) < 10){
        if($(this).text() == "." && nextDec.includes(".")) {
          console.log("nothing");
        } else if($(this).text() == ".") {
          nextDec.push(".");
          nextNum.length == 0 && nextNum.push("0");
        } else if(nextDec.includes(".") == true) {
          nextDec.push($(this).text());
        }
        else {
          nextNum.push($(this).text());
          console.log(nextNum, nextDec);
        }
        $showAnswer.text(numComma(Number(nextNum.join(''))) + nextDec.join(''));
        nextTotal = Number(nextNum.join('') + nextDec.join(''));
    }
  })

  // 사칙연산 버튼
  $('.calBtn').click(function(){
    // 사칙연산, 첫번째 숫자 입력 완료
    if (calculation != '' && prevTotal != 0){
      // 사칙연산 변경
      if(nextNum.length == 0){
        calculation = $(this).text();
        $showPrev.text(numComma(prevTotal) + " " + calculation);
      } 
      // 두번째 숫자까지 입력 시, 기존 사칙 연산으로 계산
      else {
        getAnswer();
        clearAll();
        prevTotal = answer;
        calculation = $(this).text();
        $showPrev.text(numComma(prevTotal) + " " + calculation);
        $showAnswer.text(0);
        answer = 0;
      }
    }

    // 기존 사칙연산 x, 답 x (첫 계산)
    else if(calculation == '' && answer == 0) {
      calculation = $(this).text();
      $showPrev.text(numComma(prevTotal) + " " + calculation);
      $showAnswer.text(0);
    }
    // 기존 사칙연산 x, 답 o (=을 누르고 사칙연산을 누른 경우)
    else if(calculation == '' && answer != 0) {
      calculation = $(this).text();
      prevTotal = answer;
      $showPrev.text(numComma(prevTotal) + " " + calculation);
      $showAnswer.text(0);
    }
    // 그 외
    else {
      getAnswer();
      prevTotal = answer;
      calculation = $(this).text();
      $showPrev.text(numComma(prevTotal) + " " + calculation);
      $showAnswer.text(0);
      nextNum = [];
      answer = 0;
    }
  })

  // = 버튼을 눌렀을 때 (답 빼고 다른 값 전부 리셋)
  $('.answerBtn').click(function(){
    if (nextTotal != 0) {
      getAnswer();
      $showPrev.text(numComma(prevTotal) + " " + calculation + " " + numComma(nextTotal));
      // 정수인 경우
      if (Number.isInteger(answer)){
        if(answer <=999999999){
          $showAnswer.text(answer);
        } else {
          $showAnswer.text(answer.toPrecision(6));
        }
      } 
      // 아닌 경우
      else {
        if (answer<100) {
          $showAnswer.text(decimalNum(answer,6));
        } else if (answer < 1000) {
          $showAnswer.text(decimalNum(answer,5));
        } else if (answer < 10000) {
          $showAnswer.text(decimalNum(answer,4));
        } else if (answer < 100000) {
          $showAnswer.text(decimalNum(answer,3));
        } else if (answer < 1000000) {
          $showAnswer.text(decimalNum(answer,2));
        } else if (answer < 1000000) {
          $showAnswer.text(decimalNum(answer,1));
        } else {
          $showAnswer.text(decimalNum(answer,0));
        }
      }
      clearAll();
    }
  })
  
  // 그 외 버튼
  $('.otherBtn').click(function(){
    // C 버튼 누르면 하나만 지우기
    if($(this).text() == 'C'){
      if(nextTotal != 0) {
        nextNum = [];
        nextDec = [];
        $showAnswer.text(0);
      } else if (prevTotal !=0) {
        prevNum = [];
        prevDec = [];
        $showAnswer.text(0);
      }
    }

    // AC 버튼 누르면 전부 지우기
    if($(this).text() == 'AC'){
      clearAll();
      answer = 0;
      $showPrev.text('');
      $showAnswer.text(0);
    };

    // + / - 버튼 누르면 음양수 바꾸기
    if($(this).text() == '+/-') {
      if(nextTotal != 0){
        if(nextNum[0] == '-'){
          nextNum.shift('-');
          $showAnswer.text(numComma((-nextTotal)));
        } else {
          nextNum.unshift('-');
          $showAnswer.text(numComma((-nextTotal)));
        }
      } else if (prevTotal !=0) {
        if(prevNum[0] == '-'){
          prevNum.shift('-');
          $showAnswer.text(numComma((-prevTotal)));
        } else {
          prevNum.unshift('-');
          $showAnswer.text(numComma((-prevTotal)));
        }
      }
    }
  })

}) // jQuery end