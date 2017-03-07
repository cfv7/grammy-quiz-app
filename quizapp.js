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
var qBank = {
	questions:[ 
		{
			q: "At the 59th Annual Grammy Awards(2017), who won Record Of The Year?",
			a: ["a. Twenty One Pilots", "b. Rihanna", "c. Beyonce", "d. Adele"],
			correct: 3
		},
		{
			q: "At the 59th Grammy Awards(2017), who won best new Artist?",
			a: ["a. Anderson Paak", "b. Chance the Rapper", "c. Kelsea Ballerina", "d. The Chainsmokers"],
			correct: 1
		},	
		{
			q: "What was the Best Dance / Electronic Album at the 59th Grammy Awards(2017)?",
			a: ["a. Louie Vega Starring XXVIII - Louie Vega", "b. Skin - Flume", "c. Epoch - Tyco", "d. Barbara Barbara, We Face a Shining Future - Underworld"],
			correct: 1
		},
		{
			q: "How many Grammys has Drake won?",
			a: ["a. 1", "b. 2", "c. 3", "d. 0"],
			correct: 2
		},
		{
			q: "What year did Mariah Carey win Best New Artist?",
			a: ["a. 1989", "b. 1990", "c. 1991", "d. 1992"],
			correct: 1
		}
	],
	score: {numCorr:0, numIncorr:0},
	position: -1
}

//2- CREATE STATE MODIFICATION FUNCTIONS
// Should have functions to add and update points and current question.
// Functions: addPoints, updatePosition
function countUpCorr(state){
   state.score.numCorr++;
   console.log(state.score.numCorr);
}// add 1 to numCorr

function countUpIncorr(state){
	state.score.numIncorr++;
	console.log(state.score.numIncorr);
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
	let position = state.position;
	$(".correctOrNot").html('');
	$(".totals").html('');
	$(".card").html(state.questions[position].q);
	$(".card").append(`<ol>`);
	for (i=0; i<state.questions[position].a.length; i++) {
		$(".card").append(`<li answer-id="${i}" class="js-answer-${i}">${state.questions[position].a[i]}</li>`);
	}
	$(".card").append(`</ol><br>`);
	$(".card").append(`<button class="next" type="button">NEXT</button>`);
	$(".card").append((position+1) + " of " + state.questions.length);
}// render question card w/ possible answers & q number

function checkAnswer(state, position, answer){
	let indexP = position -1;
	return answer===state.questions[position].correct;
}

function displayAnswer(state, position){
	let indexP = position -1;
	let className='#js-answer-'+state.questions[indexP].correct;
	$(className).addClass('js-answer-highlight');
}

function displayNext(){
	$(".next").css('display', 'block');
}

function listenForClick(){
$("body").on("click", ".card > li", function(event){
	var getId = $(event.currentTarget).attr("answer-id");
	if (getId == qBank.questions[qBank.position].correct) {
		console.log(true);
		countUpCorr(qBank);
		$(".correctOrNot").append(`<span class="correct"> Correct!!! </span>`)
	}
	else {
		console.log(false);
		countUpIncorr(qBank);
		$(".correctOrNot").append(`<span class="incorrect"> Incorrect. </span>`)
	}
		$(".totals").append(`<span class="correct"> Correct: ${qBank.score.numCorr} </span> <span class="incorrect"> Incorrect: ${qBank.score.numIncorr} </span>`)
		console.log(qBank.score.numCorr, qBank.score.numIncorr)
		displayNext();	
		$("body").off("click", ".card > li");
})
}

$('.card').on("click", '.next', function(event){
	updatePosition(qBank);
	drawCard(qBank);
	listenForClick();		
})

function splashScreen(){
	$('.card').html(`<h1 class="splashTitle">Do You Know the Grammys?!</h1>`)
	$('.card').append(`<button class="splashButton"> Start Quiz </button> `)
}
$(".card").on('click', ".splashButton", function(event){
	drawCard(qBank);
})

//test functions here.
listenForClick();
splashScreen()
// drawCard(qBank);
// checkAnswer(qBank, 1, 3);
// displayAnswer(qBank, 1);

