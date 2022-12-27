//jQuery 반영
$(document).ready(function(){
  let prevNum = [];
  let nextNum = [];
  let prevTotal = 0;
  let nextTotal = 0;
  let answer = 0;
  let calculation = '';

  let $showAnswer = $(".showBox .showArea");
  let $showPrev = $(".showBox .prevArea");
  
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
  
  // 숫자 버튼을 눌렀을 때
  $('.numBtn').click(function(){
    // 첫번째 숫자
    if(calculation == ''){
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
        $showAnswer.text(prevTotal.toLocaleString());
    } 
    // 두번째 숫자
    else {
        // 소수점 고려
        if($(this).text() == "." && nextNum.includes(".") == true) {
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
        $showAnswer.text(nextTotal.toLocaleString());
    }
  })

  // 계산식 버튼을 눌렀을 때
  $('.calBtn').click(function(){
    // 사칙연산이 이미 있는 경우
    if (calculation != '' && prevTotal != 0){
      // 숫자를 아무것도 안 친 경우
      if(nextNum.length == 0){
        calculation = $(this).text();
        $showPrev.text(prevTotal.toLocaleString() + " " + calculation);

        console.log("ㄱ", prevNum, nextNum, prevTotal, nextTotal, answer, calculation);
      } 
      // 숫자를 친 경우, 계산 진행
      else {
        getAnswer();
        prevTotal = answer;
        calculation = $(this).text();
        $showPrev.text(prevTotal.toLocaleString() + " " + calculation);
        $showAnswer.text(0);
        nextTotal = 0;
        prevNum = [];
        nextNum = [];
        answer = 0;

        console.log("ㄴ", prevNum, nextNum, prevTotal, nextTotal, answer, calculation);
      }
    }

    // 사칙연산 x , 답 x (첫 계산)
    else if(calculation == '' && answer == 0) {
      calculation = $(this).text();
      $showPrev.text(prevTotal.toLocaleString() + " " + calculation);
      $showAnswer.text(0);

      console.log("ㄷ", prevNum, nextNum, prevTotal, nextTotal, answer, calculation);
    }
    // 사칙연산 x , 답 o (=을 누르고 사칙연산을 누른 경우)
    else if(calculation == '' && answer != 0) {
      calculation = $(this).text();
      prevTotal = answer;
      $showPrev.text(prevTotal.toLocaleString() + " " + calculation);
      $showAnswer.text(0);

      console.log("ㄹ", prevNum, nextNum, prevTotal, nextTotal, answer, calculation);
    }
    // 그 외
    else {
      getAnswer();
      prevTotal = answer;
      calculation = $(this).text();
      $showPrev.text(prevTotal.toLocaleString() + " " + calculation);
      $showAnswer.text(0);
      nextNum = [];
      answer = 0;

      console.log("ㅁ", prevNum, nextNum, prevTotal, nextTotal, answer, calculation);
    }
  })

  // = 버튼을 눌렀을 때 (답 빼고 다른 값 전부 리셋)
  $('.answerBtn').click(function(){
    if (nextTotal != 0) {
      getAnswer();
      $showPrev.text(prevTotal.toLocaleString() + " " + calculation + " " + nextTotal.toLocaleString());
      $showAnswer.text(answer.toLocaleString());
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
          $showAnswer.text((-nextTotal).toLocaleString());
        } else {
          nextNum.unshift('-');
          $showAnswer.text((-nextTotal).toLocaleString());
        }
      } else if (prevTotal !=0) {
        if(prevNum[0] == '-'){
          prevNum.shift('-');
          $showAnswer.text((-prevTotal).toLocaleString());
        } else {
          prevNum.unshift('-');
          $showAnswer.text((-prevTotal).toLocaleString());
        }
      }
    }
  })

}) // jQuery end