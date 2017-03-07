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
			a: ["Twenty One Pilots", "Rihanna", "Beyonce", "Adele"],
			correct: 3
		},
		{
			q: "At the 59th Grammy Awards(2017), who won best new Artist?",
			a: ["Anderson Paak", "Chance the Rapper", "Kelsea Ballerina", "The Chainsmokers"],
			correct: 1
		},
		{
			q: "What was the Best Dance / Electronic Album at the 59th Grammy Awards(2017)?",
			a: ["Louie Vega Starring XXVIII - Louie Vega", "Skin - Flume", "Epoch - Tyco", "Barbara Barbara, We Face a Shining Future - Underworld"],
			correct: 1
		},
		{
			q: "How many Grammys has Drake won?",
			a: ["1", "2", "3", "0"],
			correct: 2
		},
		{
			q: "What year did Mariah Carey win Best New Artist?",
			a: ["1989", "1990", "1991", "1992"],
			correct: 1
		},
		{
			q: "Which song won Michael Jackson’s first Grammy award?",
			a: ["Thriller", "Don't Stop Til You Get Enough", "Beat It", "Billie Jean"],
			correct: 1
		},
		{
			q: "In this list, who has won a Grammy?",
			a: ["Katie Perry", "Brian McKnight", "Jimi Hendrix", "Fiona Apple"],
			correct: 4
		},
		{
			q: "In which year did Daft Punk win 4 grammy’s",
			a: ["2007", "2008", "2011", "2013"],
			correct: 3
		},
		{
			q: "Which score won John Williams his first Grammy? ",
			a: ["Jaws", "Star Wars", "Raiders of the Lost Ark", "Jurassic Park"],
			correct: 0
		},
		{
			q: "Who is not the top 10 grammy award winners that has won the most grammys?",
			a: ["John Williams","Beyonce","U2","Jay-Z"],
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
	$(".correctOrNot").html('');
	$(".totals").html('');
	$(".card").html(`<h2>${state.questions[state.position].q}</h2>`);
	$(".card").append(`<ol>`);
	for (i=0; i<state.questions[state.position].a.length; i++) {
		$(".card").append(`<li answer-id="${i}" class="js-answer-${i}">${state.questions[state.position].a[i]}</li>`);
	}
	$(".card").append(`</ol><br>`);
	$(".card").append(`<button class="next" type="button">NEXT</button>`);
	$(".card").append((state.position+1) + " of " + state.questions.length);
	console.log(state);
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


//listens for clicks on li elements.
function listenForClick(){
$("body").on("click", ".card > li", function(event){
	var getId = $(event.currentTarget).attr("answer-id");
	if (getId == qBank.questions[qBank.position].correct) {
		console.log(true);
		countUpCorr(qBank);
		$(".correctOrNot").append(`<h3 class="correct"> Correct!!! </h3>`);
	}
	else {
		console.log(false);
		countUpIncorr(qBank);
		$(".correctOrNot").append(`<h3 class="incorrect"> Incorrect. </h3>`);
	}
	$(".totals").append(`<span class="correct"> Correct: ${qBank.score.numCorr} </span> <span class="incorrect"> Incorrect: ${qBank.score.numIncorr} </span>`);
	console.log(qBank.score.numCorr, qBank.score.numIncorr);
	displayNext();
	$("body").off("click", ".card > li");
});
}

//the function below is the next button event handler.
$('.card').on("click", '.next', function(event){
	if(qBank.position<qBank.questions.length-1){
	updatePosition(qBank);
	drawCard(qBank);
	listenForClick();
	} else {
		$('.correctOrNot').html('');  //clear correct or not div
		$('.totals').html('');        //clear points
		$('.card').html(`<h1>GAME OVER!</h1><p>You got ${qBank.score.numCorr} correct!</p>`);
	}

});

//splashScreen display
function splashScreen(){
	$('.card').html(`<h1 class="splashTitle">Do You Know the Grammys?!</h1>`);
	$('.card').append(`<button class="splashButton"> Start Quiz </button> `);
}
$(".card").on('click', ".splashButton", function(event){
	drawCard(qBank);
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
