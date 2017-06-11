// time limit (in seconds)
var limit = 30;
var intLimit = 5;
// 1000 miliseconds or 1 sec
var interval = 1000;
// bool to track what to do when timer = 0 (go to next question or time ran out)
var interlude = false;
// where the timer is displayed
var display = document.querySelector('#timer');
// the correct answer
var correct = 3;
// number of answers
var answers = 4;
// question number counter
var questionNumber = 0;
// counters for correct / incorrect answers
var correctcount = 0;
var incorrectcount = 0;

// tried this for ease of use in for loop/make it dynamic as possible. Doesnt seem possible. 
// var questions = [{
//     question: "Find the limit: Lim x->0 = (ln(1-x) - sin(x)) / ( 1 - cos^2(x) )",
//     0: "-1",
//     1: "1",
//     2: "Regina George",
//     3: "The Limit Does Not Exist"

// may change to a class in future. Dont like objects as much
var questions = [{
    question: "Find the limit: Lim x->0 = (ln(1-x) - sin(x)) / ( 1 - cos^2(x) )",
    a0: "-1",
    a1: "1",
    a2: "Regina George",
    a3: "The Limit Does Not Exist"
}, {
    question: 'In "The Ultimate Showdown" What did Abraham Lincoln pull out of his hat to blow batman away with a "ratta tat tat"?',
    a0: "Glock",
    a1: "Chainsaw",
    a2: "Bat Grenade",
    a3: "Ak-47"
}, {
    question: "Omae wa mou shindeiru",
    a0: "?",
    a1: "what?",
    a2: "english pls",
    a3: "NANI?!?!"
}, {
    question: "What shape is the Earth?",
    a0: "Circle",
    a1: "Sphere",
    a2: "Cube",
    a3: "The earth is flat"
}];

document.getElementById("main").style.display = "none";
document.getElementById("inter").style.display = "none";

// why does this work, time to stop shouldnt be in the scope
// something to do with not assigning it "var" keyword?
//clearInterval(timetostop);
// scope test
// console.log(test); doesnt work


// FUNCTIONS

// check the div that was clicked with correct answer
function check(me) {
    // sending "this" in the html as a jquery workaround. 
    // could also use "check().call(this)" to avoid passing an argument (i think thats what jquery does)

    // check if right answer / change page accordingly
    if (me.id == correct){
        clearInterval(timetostop);
        bingo();
    }
    else{
        clearInterval(timetostop);
        nope();
    }
}
// the correct answer was chosen
// add to correctcount / hide main / populate inter / display inter / set timer to 10 secs
function bingo() {
    correctcount++;
    document.getElementById("main").style.display = "none";
    document.getElementById("educate").innerHTML = "Well Done Meme-lord";
    document.getElementById("imgplace").src = "http://i.imgur.com/my1NJdG.gif";
    // seemed a bit overkill
    // switch case to catch the question number and populate "inter" accordingly
    // switch(questionNumber-1){
    //     case(0):
    //     case(1):
    //     case(2):
    //     case(3):
    // }
    document.getElementById("inter").style.display = "block";
    interlude = true;
    startTimer(intLimit, display);
}

// incorrect answer was chosen or time ran out
function nope() {
    incorrectcount++;
    document.getElementById("main").style.display = "none";
    document.getElementById("educate").innerHTML = "The Correct Answer was: " + questions[questionNumber-1].a3;
    document.getElementById("imgplace").src = "https://media.giphy.com/media/5DfqxlCj2wpfW/giphy.gif";

    document.getElementById("inter").style.display = "block";
    interlude = true;
    startTimer(intLimit, display);
}



function begin() {
    // check if done
    if(questionNumber >= questions.length)
    {
      document.getElementById("main").style.display = "none";
      document.getElementById("educate").innerHTML = "You Got "+correctcount+" Correct and "+incorrectcount+" Incorrect";
        switch(correctcount){
        case(0):document.getElementById("imgplace").src = "https://media.giphy.com/media/1mXkH6EeAEq1q/giphy.gif"; break;
        case(1):document.getElementById("imgplace").src = "https://media.giphy.com/media/10FHR5A4cXqVrO/giphy.gif"; break;
        case(2):document.getElementById("imgplace").src = "https://media.giphy.com/media/aLdiZJmmx4OVW/giphy.gif"; break;
        case(3):document.getElementById("imgplace").src = "https://media.giphy.com/media/AOrThUuuOoDCg/giphy.gif"; break;
        case(4):document.getElementById("imgplace").src = "https://media.giphy.com/media/3oEdv2NNoFaujmHV84/giphy.gif"; break;
        }



      document.getElementById("inter").style.display = "block";
      return;      
    }
    // display main div / hide button
    document.getElementById("main").style.display = "block";
    document.getElementById("start").style.display = "none";
    document.getElementById("inter").style.display = "none";

    //populate question and answer divs / add one to questionNumber
    document.getElementById("q").innerHTML = questions[questionNumber].question;
    // wanted to avoid typing basically the same line over 4 times, but cant find a workaround
    document.getElementById("0").innerHTML = questions[questionNumber].a0;
    document.getElementById("1").innerHTML = questions[questionNumber].a1;
    document.getElementById("2").innerHTML = questions[questionNumber].a2;
    document.getElementById("3").innerHTML = questions[questionNumber].a3;
    questionNumber++;

    interlude = false;
    startTimer(limit, display);

    // for(i=0; i<answers; i++)
    // {
    //     // trying to grab object keys using 'i'
    //     // var key = i.toString();
    //     // console.log(i);
    //     // console.log(questions[questionNumber].i);
    //     // console.log(questions[questionNumber].'0');
    //     // document.getElementById(i).innerHTML = questions[questionNumber].i; 

    //     // another shot at it. Also failed
    //     // key = 'a';
    //     // key += i.toString();
    //     // console.log(key);
    //     // console.log(questions[questionNumber].key);
    //     // console.log(questions[questionNumber].'0');
    //     // document.getElementById(i).innerHTML = questions[questionNumber].i; 
    // }
    return;
}

function startTimer(duration, display) {
    timetostop = setInterval(function() {
        // test = 3;
        duration--;
        display.textContent = duration;
        // '--timer' is just a efficency of code making the timer--; and if stmnt one line
        if (duration <= 0) {
            if (interlude){
                clearInterval(timetostop);
                begin();
            } else {
                clearInterval(timetostop);
                nope();
            }
        }
    }, interval);
}
