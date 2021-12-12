"use strict";

let a = [];

$(document).ready(() => {
    
    let settings = gamesApp.settings;
    let scores = gamesApp.scores;
    let cards = gamesApp.cards();

    // console.log(scores.getScore());

    $("#tabs").tabs();

    let name = "",
        numberOfCards = "",
        high_scores = "";

    //display player name and number of cards
    name = settings.getPlayerName();
    console.log(name);
    if (name) {
        document.querySelector('#play_name').innerHTML = name;
    }

    high_scores = scores.getScore();
    if (high_scores) {
        document.querySelector("#score_value").innerHTML = high_scores;
    }

    numberOfCards = settings.getNumberOfImages();

    if (numberOfCards) {
        cards.setCardNumber(numberOfCards)
        cards.drawGameBoard($("#cards"));
    }

    $("#player_name").val(name);
    $("#num_cards").val(parseInt(numberOfCards) * 2);

    $("#new_game").click((e)=>{
        e.preventDefault();  
        cards.setCorrectMoves();
        cards.setCardNumber(numberOfCards)
        cards.drawGameBoard($("#cards"));
    });
    $("#save_settings").click(() => {
        const playerName = $("#player_name").val();
        const numberOfImages = $("#num_cards").val();

        // save settings
        settings.setPlayerName(playerName);
        settings.setNumOfImages(numberOfImages / 2);

        window.location.reload();
    });
});


gamesApp.finishTheGame = (score) => {
    
    let b = score.toFixed(2);
    
    a.push(b);
    console.log(a);
    console.log(Math.max(...a));
    let high_score = Math.max(...a);
    let s = gamesApp.scores;
    s.setScore(high_score);

    let high_scores = s.getScore();
    if (high_scores) {
        document.querySelector("#score_value").innerHTML = high_scores;
    }

    $("#cards").html(`Your score is: ${score.toFixed(2)}`);
  };
  