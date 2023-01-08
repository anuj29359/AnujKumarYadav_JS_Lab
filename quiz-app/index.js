//"use strict";



// const gridEl = document.getElementsByClassName("grid");
// const quizEl = document.getElementById("quiz");

// const questionEl = document.querySelector("#question");

// const progressEl = document.getElementById("progress");

function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;

}

var questions = [
    new Question("javascript supports...", ["Functions","XHTML", "HTML", "CSS"], "Functions"),
    new Question("javascript is {} programing language",["compiled", "interpreted", "OPS", "machine-level"],"interpreted"),
    new Question("Which is used for connecting to dtabase?",["JS", "HTML","PHP","All of the above"],"PHP")
];

Question.prototype.isCorrectAnswer = function(ans){
    return this.answer == ans;
}

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionindex = 0;
}

var quiz = new Quiz(questions);

Quiz.prototype.checkOptionWithAnswer = function(answer){
    var isCorrect = false;
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
        isCorrect = true;
    }
    this.questionindex++;
    return isCorrect;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionindex]
}

Quiz.prototype.isEnded = function(){
    return (this.questions.length) == (this.questionindex);
}

function highlightOptionButton(isCorrect, id){
    const el = document.getElementById(id);
    if(isCorrect){
        el.style.backgroundColor="green";
        
    }
    else{
        el.style.backgroundColor="red";
    }
    
}

function handleOptionButton(id, choice){
    var button = document.getElementById(id);
    button.onclick= function(){
        //check the answer

        var isCorrect = quiz.checkOptionWithAnswer(choice);
        //load the next question
        highlightOptionButton(isCorrect, id);
        //change the bg-color of the button green if the selected option is correct otherwise red for 2ms.
        setTimeout(() => { document.getElementById(id).style.backgroundColor="#01BBFF"; loadQuiz(quiz); }, 200);
        
        console.log(id)
    }
}

function showScore(score){
    var quizOver = `<h1>Result</h1>
    <p class="score">Your score is: ` + quiz.score +` </p>
    <p class="score">Percentage: `+ Math.round(quiz.score/quiz.questions.length*100) +` %</p><hr>`
    var quizEl = document.getElementById("quiz");
    quizEl.innerHTML = quizOver; 
}

function showProgress(){
    var progressEl = document.getElementById("progress");
    progressEl.innerHTML=`Question ` +(quiz.questionindex + 1) +` of ` + quiz.questions.length;
}

function loadQuiz(qz){
    console.log(qz);
    console.log("isEnded - " + qz.isEnded());

    if(qz.isEnded()){
        console.log("quiz ended")
        showScore(this.score);
    }
    else {
            
        var indx = qz.questionindex;
        console.log(indx);
        var questionStatement = qz.getQuestionByIndex().text;
        console.log(questionStatement);

        var questionEl = document.getElementById("question");
        questionEl.innerHTML=questionStatement;

        var choices = qz.getQuestionByIndex().choices;
        console.log(choices);
        for (let index = 0; index < choices.length; index++) {
            const optionEl = document.getElementById("btn"+index);
            optionEl.innerHTML=choices[index];
            handleOptionButton("btn"+index, choices[index])
        }

        //show progress
        showProgress();
    }
}
loadQuiz(quiz);