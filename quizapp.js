/*------------------------------------------------------------------------------------------------*/
// names: Colin & Ally
// date: 3.6.17
// project: Quiz App
/*------------------------------------------------------------------------------------------------*/

//  REQUIREMENTS
//  start screen w/ button click to start quiz
//  question cards (div) forward arrow function
//  question cards generate questions/ potential answers from object
//  question cards output number of correct answers
//  create correct or incorrect card background overlay
//  questions cards number out of ten
//  final card w/ number correct and start new game button
/*------------------------------------------------------------------------------------------------*/

// 1~CREATE QUESTIONS OBJECT
// Should have questions, answer choices, and correct answer
// Store user's correct answer count and wrong answer count., current question number e.g. 3/10

// 2~CREATE STATE MODIFICATION FUNCTIONS
// Should have functions to add and update points and current question.
// Functions: addPoints, updatePosition

// 3~CREATE RENDER / LOGIC FUNCTIONS
// Draw Card - Render Questions to Dom.
// Display what currentCard they are on.
// Display numCorr and numIncorr.
// Get usersAnswer
// Check answer isCorrect
// Display Response  "Correct / Incorrect"
// Display Correct Answer
// Display nextButton.

// 4~CREATE EVENT LISTENERS
// Display start card.
// When users click on start button, advance to question card
// Display the question card.
// When users click on answer buttons,check if correct. display correct Answer. Show next button.
/*------------------------------------------------------------------------------------------------*/

//1- CREATE QUESTIONS OBJECT
// Should have questions, answer choices, and correct answer
// Store user's correct answer count and wrong answer count., current question number e.g. 3/10
var questionBank = {
	questions:[
		{
			question: "At the 59th Annual Grammy Awards(2017), who won Record Of The Year?",
			answer: ["Twenty One Pilots", "Rihanna", "Beyonce", "Adele"],
			correct: 3
		},
		{
			question: "At the 59th Grammy Awards(2017), who won best new Artist?",
			answer: ["Anderson Paak", "Chance the Rapper", "Kelsea Ballerina", "The Chainsmokers"],
			correct: 1
		},
		{
			question: "What was the Best Dance / Electronic Album at the 59th Grammy Awards(2017)?",
			answer: ["Louie Vega Starring XXVIII - Louie Vega", "Skin - Flume", "Epoch - Tyco", "Barbara Barbara, We Face a Shining Future - Underworld"],
			correct: 1
		},
		{
			question: "How many Grammys has Drake won?",
			answer: ["1", "2", "3", "0"],
			correct: 2
		},
		{
			question: "What year did Mariah Carey win Best New Artist?",
			answer: ["1989", "1990", "1991", "1992"],
			correct: 1
		},
		{
			question: "Which song won Michael Jackson's first Grammy award?",
			answer: ["Thriller", "Don't Stop Til You Get Enough", "Beat It", "Billie Jean"],
			correct: 1
		},
		{
			question: "In this list, who has won a Grammy?",
			answer: ["Katie Perry", "Brian McKnight", "Jimi Hendrix", "Fiona Apple"],
			correct: 3
		},
		{
			question: "In which year did Daft Punk win 4 Grammys",
			answer: ["2007", "2008", "2011", "2013"],
			correct: 3
		},
		{
			question: "Which score won John Williams his first Grammy? ",
			answer: ["Jaws", "Star Wars", "Raiders of the Lost Ark", "Jurassic Park"],
			correct: 0
		},
		{
			question: "Who is not the top 10 Grammy award winners that has won the most Grammys?",
			answer: ["John Williams","Beyonce","U2","Jay-Z"],
			correct: 3
		}
	],
	score: {numCorr:0, numIncorr:0},
	position: 0
}

//2- CREATE STATE MODIFICATION FUNCTIONS
// Should have functions to add and update points and current question.
// Functions: addPoints, updatePosition
function countUpCorr(state){
   state.score.numCorr++;
}// add 1 to numCorr

function countUpIncorr(state){
	state.score.numIncorr++;
}// add 1 to numIncorr

function updatePosition(state){
	state.position++;
	// console.log(state.position);
}// add 1 to position

//3- CREATE RENDER / LOGIC FUNCTIONS
// Draw Card - Render Questions to Dom.	[  ]
// Display what currentCard they are on. [done]
// Display numCorr and numIncorr. [done]
// Get usersAnswer [colin]
// Check answer isCorrect [ally]
// Display Response  "Correct / Incorrect" [colin]
// Display Correct Answer[ally]
// Display nextButton. [ally]
function drawCard(state){
	// let indexP = state.position-1; //change position from index to normal
	$(".totals").html('');
	$(".card").html(`<h2>${state.questions[state.position].question}</h2>`);
	$(".card").append(`<ol>`);
	for (i=0; i<state.questions[state.position].answer.length; i++) {
		$(".card").append(`<li answer-id="${i}" class="js-answer-${i}">${state.questions[state.position].answer[i]}</li>`);
	}
	$(".card").append(`</ol><br>`);
	$(".card").append(`<button class="next" type="button">NEXT</button>`);
	$(".status").html((state.position+1) + " of " + state.questions.length);
	console.log(state);
}// render question card w/ possible answers & q number

function checkAnswer(state, position, answer){
	let indexP = position -1;
	return answer===state.questions[position].correct;
}

function displayAnswer(state, position){
	let className='.js-answer-'+state.questions[questionBank.position].correct;
	$(className).addClass('js-answer-highlight');
}

function displayNext(){
	$(".next").css('display', 'block');
}


//listens for clicks on li elements.
function listenForClick(){
$("body").on("click", ".card > li", function(event){
	var getId = $(event.currentTarget).attr("answer-id");
	if (getId == questionBank.questions[questionBank.position].correct) {
		console.log(true);
		countUpCorr(questionBank);
		$(event.currentTarget).append(`<h3 class="correct"> Correct!!! </h3>`);
	}
	else {
		console.log(false);
		countUpIncorr(questionBank);
		$(event.currentTarget).append(`<h3 class="incorrect"> Incorrect. </h3>`);
		$(event.currentTarget).css('color', '#ccc');
	}
	$(".totals").append(`<span> Correct: ${questionBank.score.numCorr} </span> <span> Incorrect: ${questionBank.score.numIncorr} </span>`);
	console.log(questionBank.score.numCorr, questionBank.score.numIncorr);
	displayAnswer(questionBank, getId);
	displayNext();
	$("body").off("click", ".card > li");
});
}

//the function below is the next button event handler.
$('.card').on("click", '.next', function(event){
	if(questionBank.position<questionBank.questions.length-1){
	updatePosition(questionBank);
	drawCard(questionBank);
	listenForClick();
	} else {
		$('.totals').html('');        //clear points
		$('.card').html(`<div class="finalcard"><h1>Thanks for playing!</h1><img src="grammy_logo.png" alt="Grammy Award"><p>You got ${questionBank.score.numCorr} correct!</p></div>`);
		$('.card').append(`<button class="restartButton"> Restart Quiz </button> `);
		$(".card").on('click', ".restartButton", function(event){
			restart();
	});
}

});

// reset card order + scores
function restart(){
	questionBank.position = 0;
	questionBank.score = {numCorr:0, numIncorr:0};
	splashScreen();
	listenForClick();
}

//splashScreen display
function splashScreen(){
	$('.card').html(`<h1 class="splashTitle">Do You Know the Grammys?!</h1>`);
	$('.card').append(`<button class="splashButton"> Start Quiz </button> `);
}
$(".card").on('click', ".splashButton", function(event){
	drawCard(questionBank);
});

//Runs the game
(function() {
splashScreen();
listenForClick();
})();



//test functions here.
// drawCard(qBank);
// checkAnswer(qBank, 1, 3);
// displayAnswer(qBank, 1);
