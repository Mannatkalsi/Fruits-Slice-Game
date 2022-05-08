var playing = false;
var score;
var trialLeft;
var step;
var action; //used for setInterval function
var fruits = ['apple', 'mango', 'cherries', 'peach', 'kiwi', 'orange', 'pineapple', 'watermelon', 'pear'];

$(function () {
    //Click on start/reset button

    $("#startReset").click(function () {
        //Check if we are playing ?
        //Yes - we are playing
        if (playing == true) {
            //Reload page
            location.reload();
        }
        //No - Not playing
        else {
            playing = true; // game initiated

            //set score to 0
            score = 0;
            $("#scoreValue").html(score);

            //Show trials left
            $("#trialLeft").show();
            trialLeft = 3;
            addHearts();

            //hide Gameover Box
            $("#gameOver").hide();

            //Change button text to "reset game"
            $("#startReset").html("Reset Game")

            //Start sending fruits
            startAction();
        }
    });


    $("#fruit1").mouseover(function () {
        score++;
        $("#scoreValue").html(score);//Update Score

        //document.getElementById("sliceSound").play();//Play Sound
        $("#sliceSound")[0].play();//Play Sound and return array

        //Stop Fruits going down 
        clearInterval(action);

        //hide the fruits
        //Note: if we only use jquery it not gonna work so we need need to add jquery UI 
        $("#fruit1").hide("explode", 500);//Slice the fruit /explode fruits

        //Send new fruit 
        setTimeout(startAction, 800);
    });

    //functions

    function addHearts() {
        $("#trialLeft").empty();//Empty the trial box
        for (i = 0; i < trialLeft; i++) {
            $("#trialLeft").append('<img src="images/heart.png" class="trial">');
        }
    }

    //Start sending fruits
    function startAction() {

        //1. Create/ generate a fruit
        $("#fruit1").show();
        chooseFruit(); //Choose Random fruit

        $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });//random position of fruits

        //Define/Generate a random step
        step = 1 + Math.round(5 * Math.random()); //Change the step

        //2. Move fruits down by one step every 10ms
        action = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //Check if fruit is too low ?
            if ($("#fruit1").position().top > $("#fruitContainer").height()) {

                //Yes --> Check any trials left ?
                if (trialLeft > 1) {
                    //Yes: repeat number 1
                    //1. Create/ generate a fruit
                    $("#fruit1").show();
                    chooseFruit(); //Choose Random fruit

                    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });//random position of fruits

                    //Define/Generate a random step
                    step = 1 + Math.round(5 * Math.random()); //Change the step

                    //Reduce number of trials by 1
                    trialLeft--;

                    //populate trialsLeft box
                    addHearts();
                }
                //No: show game over, button change to "start game"
                else {
                    playing = false; // we are not playing anymore
                    $("#startReset").html("Start Game"); // Change button to "Start Game"
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!!!</p><p>Your Score is ' + score + '</p>');
                    $("#trialLeft").hide();
                    stopAction();
                }
            }
        }, 10);

    }

    //Generate a random fruit
    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
    }

    //Stop Dropping Fruits
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }
});