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

  // 숫자 버튼을 눌렀을 때
  $('.numBtn').click(function(){
    // 첫번째 숫자
    if(calculation == '' && prevNum.length < 10) {
        $showPrev.text('');
        answer=0;
        // 소수점 고려
        if($(this).text() == "." && prevNum.includes(".") == true) {
          console.log("nothing")
        } else if($(this).text() == "." && prevNum.length == 0) {
          prevNum.push("0.");
        } 
        // 그 외 숫자
        else {
          prevNum.push($(this).text());
          console.log($(this).text(), prevNum);
        }
        prevTotal = Number(prevNum.join(''));
        $showAnswer.text(numComma(prevTotal));
        console.log(prevNum,nextNum,prevTotal,nextTotal,answer,calculation)
    } 
    // 두번째 숫자
    else if(calculation != '' && nextNum.length < 10){
        // 소수점 고려
        if($(this).text() == "." && nextNum.includes("." || "0.") == true) {
          console.log("nothing")
        } else if($(this).text() == "." && nextNum.length == 0) {
          nextNum.push("0.");
        } 
        // 그 외 숫자
        else {
          nextNum.push($(this).text());
          console.log($(this).text(), nextNum);
        }
        nextTotal = Number(nextNum.join(''));
        $showAnswer.text(numComma(nextTotal));
    }
  })

  // 계산식 버튼을 눌렀을 때
  $('.calBtn').click(function(){
    // 사칙연산이 이미 있는 경우
    if (calculation != '' && prevTotal != 0){
      // 숫자를 아무것도 안 친 경우
      if(nextNum.length == 0){
        calculation = $(this).text();
        $showPrev.text(numComma(prevTotal) + " " + calculation);
      } 
      // 숫자를 친 경우, 계산 진행
      else {
        getAnswer();
        prevTotal = answer;
        calculation = $(this).text();
        $showPrev.text(numComma(prevTotal) + " " + calculation);
        $showAnswer.text(0);
        nextTotal = 0;
        prevNum = [];
        nextNum = [];
        answer = 0;
      }
    }

    // 사칙연산 x , 답 x (첫 계산)
    else if(calculation == '' && answer == 0) {
      calculation = $(this).text();
      $showPrev.text(numComma(prevTotal) + " " + calculation);
      $showAnswer.text(0);
    }
    // 사칙연산 x , 답 o (=을 누르고 사칙연산을 누른 경우)
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
        $showAnswer.text(0);
      } else if (prevTotal !=0) {
        prevNum = [];
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