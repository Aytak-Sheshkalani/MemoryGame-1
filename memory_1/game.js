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
    numberOfCards = settings.getNumberOfImages();

    $("#player_name").val(name);
    $("#num_cards").val(parseInt(numberOfCards) * 2);

    $("#new_game").click((e)=>{
        e.preventDefault();  
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
    console.log(score)
    $("#cards").html(`Your score is: ${score.toFixed(2)}`);
  };
  