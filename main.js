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
        if (calculation == '+'){
            answer = prevTotal + nextTotal;
        } else if(calculation == '-'){
            answer = prevTotal - nextTotal;
        } else if(calculation == '*'){
            answer = prevTotal * nextTotal;
        } else if(calculation == '/'){
            answer = prevTotal / nextTotal;
        }
    }

    $('.btn').click(function(){
        // 숫자 버튼을 눌렀을 때
        if($(this).hasClass('numBtn') == true){
            if(calculation == ''){
                $showPrev.text(" ");
                prevNum.push($(this).text());
                prevTotal = Number(prevNum.join(''));
                $showAnswer.text(prevTotal.toLocaleString());
            } else if (calculation != '') {
                nextNum.push($(this).text());
                nextTotal = Number(nextNum.join(''));
                $showAnswer.text(nextTotal.toLocaleString());
            }
        } 
        // 계산식 버튼을 눌렀을 때
        if($(this).hasClass('calBtn') == true) {
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
            // 계산식이 없고, 답이 없는 경우 (첫 계산)
            else if(calculation == '' && answer == 0) {
                calculation = $(this).text();
                $showPrev.text(prevTotal.toLocaleString() + " " + calculation);
                $showAnswer.text(0);

                console.log("ㄷ", prevNum, nextNum, prevTotal, nextTotal, answer, calculation);
            }
            // 계산식이 없고, 답이 있는 경우(=을 누르고 사칙연산을 누른 경우)
            else if(calculation == '' && answer != 0) {
                calculation = $(this).text();
                prevTotal = answer;
                $showPrev.text(prevTotal.toLocaleString() + " " + calculation);
                $showAnswer.text(0);

                console.log("ㄹ", prevNum, nextNum, prevTotal, nextTotal, answer, calculation);
            }
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
        }

        // = 버튼을 눌렀을 때 (답 빼고 다른 값 전부 리셋)
        if ($(this).hasClass('answerBtn') == true && nextTotal != 0) {
            getAnswer();
            $showPrev.text(prevTotal.toLocaleString() + " " + calculation + " " + nextTotal.toLocaleString());
            $showAnswer.text(answer.toLocaleString());
            clearAll();
        }
        
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
    
});