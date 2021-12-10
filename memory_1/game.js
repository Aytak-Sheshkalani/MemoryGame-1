"use strict";

$(document).ready(() => {
    let settings = gamesApp.settings;
    let scores = gamesApp.scores;
    let cards = gamesApp.cards();

    $("#tabs").tabs();

    let name = "",
        numberOfCards = "";
    

    //display player name and number of cards
    name = settings.getPlayerName();
    console.log(name);
    if (name) {
        document.querySelector('#play_name').innerHTML = name;
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
    console.log(score);
    $("#cards").html(`Your score is: ${score.toFixed(2)}`);
  };
  

gamesApp.settle_score = (scoree) => {
    scoree = scoree.toFixed(2);
    let s = gamesApp.scores;
    s.setScore(scoree);

    let score_value = "";
    score_value = s.getScore();
    if (score_value) {
        document.querySelector("#score_value").innerHTML = score_value;
    }
}